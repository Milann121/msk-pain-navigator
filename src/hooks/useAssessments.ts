
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface UserAssessment {
  id: string;
  primary_mechanism: string;
  sin_group: string;
  primary_differential: string;
  pain_area: string;
  timestamp: string;
  completed_exercises_count: number;
  last_completed_at?: string;
  initial_pain_level?: number;
  latest_pain_level?: number;
}

export const useAssessments = () => {
  const [assessments, setAssessments] = useState<UserAssessment[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchUserAssessments = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      // Get assessments
      const { data: assessmentsData, error: assessmentsError } = await supabase
        .from('user_assessments')
        .select('*')
        .eq('user_id', user.id)
        .order('timestamp', { ascending: false });

      if (assessmentsError) throw assessmentsError;
      
      // For each assessment, get completed exercises count and latest completion date
      const assessmentsWithData = await Promise.all(
        (assessmentsData || []).map(async (assessment) => {
          // Get completed exercises for this assessment
          const { data: completionsData, error: completionsError } = await supabase
            .from('completed_exercises')
            .select('completed_at')
            .eq('assessment_id', assessment.id)
            .eq('user_id', user.id)
            .order('completed_at', { ascending: false });
            
          if (completionsError) {
            console.error('Error fetching completions:', completionsError);
            return {
              ...assessment,
              completed_exercises_count: 0,
              last_completed_at: undefined,
              initial_pain_level: assessment.initial_pain_level || undefined,
              latest_pain_level: undefined // Default to undefined if no follow-up data
            };
          }

          // Try to get the latest pain level from follow-up responses
          let latestPainLevel = undefined;
          try {
            // First try using an RPC function
            const { data: followUpData, error: followUpError } = await supabase.rpc(
              'get_latest_pain_level',
              { assessment_id_param: assessment.id, user_id_param: user.id }
            );
            
            if (followUpError) {
              // If RPC fails, try direct query
              console.log('RPC not available, trying direct query');
              const { data, error } = await supabase
                .from('follow_up_responses')
                .select('pain_level')
                .eq('assessment_id', assessment.id)
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })
                .limit(1);
                
              if (!error && data && data.length > 0) {
                latestPainLevel = data[0].pain_level;
              }
            } else if (followUpData && followUpData.length > 0) {
              latestPainLevel = followUpData[0].pain_level;
            }
          } catch (error) {
            // Table might not exist yet, which is fine
            console.log('Follow-up data not available yet:', error);
          }
          
          return {
            ...assessment,
            completed_exercises_count: completionsData?.length || 0,
            last_completed_at: completionsData && completionsData.length > 0 
              ? completionsData[0].completed_at 
              : undefined,
            initial_pain_level: assessment.initial_pain_level || undefined,
            latest_pain_level: latestPainLevel
          };
        })
      );
      
      setAssessments(assessmentsWithData);
    } catch (error) {
      console.error('Error fetching user assessments:', error);
      toast({
        title: 'Chyba pri načítaní cvikov',
        description: 'Nepodarilo sa načítať vaše hodnotenia a cviky.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserAssessments();
    
    // Set up subscription to listen for changes to the completed_exercises table
    const exercisesChannel = supabase
      .channel('exercises_changes')
      .on('postgres_changes', 
        {
          event: '*',
          schema: 'public',
          table: 'completed_exercises',
          filter: `user_id=eq.${user?.id}`,
        }, 
        (payload) => {
          console.log('Exercise completion change detected:', payload);
          fetchUserAssessments();
        }
      )
      .subscribe();
      
    // We'll try to listen for follow-up responses changes
    const followUpChannel = supabase
      .channel('follow_up_changes')
      .on('postgres_changes', 
        {
          event: '*',
          schema: 'public',
          table: 'follow_up_responses',
          filter: `user_id=eq.${user?.id}`,
        }, 
        (payload) => {
          console.log('Follow-up response change detected:', payload);
          fetchUserAssessments();
        }
      )
      .subscribe();
      
    return () => {
      supabase.removeChannel(exercisesChannel);
      supabase.removeChannel(followUpChannel);
    };
  }, [user]);
  
  const handleDeleteAssessment = async (id: string) => {
    try {
      const { error } = await supabase
        .from('user_assessments')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      // Update the local state to remove the deleted assessment
      setAssessments(assessments.filter(assessment => assessment.id !== id));
      
      toast({
        title: 'Hodnotenie odstránené',
        description: 'Hodnotenie bolo úspešne odstránené.',
      });
    } catch (error) {
      console.error('Error deleting assessment:', error);
      toast({
        title: 'Chyba pri odstraňovaní hodnotenia',
        description: 'Nepodarilo sa odstrániť hodnotenie.',
        variant: 'destructive',
      });
    }
  };

  return {
    assessments,
    loading,
    handleDeleteAssessment,
    refreshAssessments: fetchUserAssessments
  };
};
