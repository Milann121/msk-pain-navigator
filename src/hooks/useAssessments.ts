
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { UserAssessment } from '@/components/follow-up/types';
import { safeDatabase } from '@/utils/database-helpers';

export const useAssessments = () => {
  const [assessments, setAssessments] = useState<UserAssessment[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchUserAssessments = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      
      // Get assessments
      const { data: assessmentsData, error: assessmentsError } = await supabase
        .from('user_assessments')
        .select('*')
        .eq('user_id', user.id)
        .order('timestamp', { ascending: false });

      if (assessmentsError) {
        console.error('Error fetching assessments:', assessmentsError);
        throw assessmentsError;
      }
      
      if (!assessmentsData || assessmentsData.length === 0) {
        setAssessments([]);
        setLoading(false);
        return;
      }
      
      // For each assessment, get completed exercises count and latest completion date
      const assessmentsWithData = await Promise.all(
        assessmentsData.map(async (assessment) => {
          try {
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
                initial_pain_level: assessment.intial_pain_intensity, // Use the field from the database
                latest_pain_level: undefined
              } as UserAssessment;
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
                // If RPC fails, try direct query using the safe helper
                console.log('RPC not available, trying direct query');
                
                const { data: followUpResponsesData, error: directQueryError } = await safeDatabase.followUpResponses.select({
                  assessment_id: assessment.id,
                  user_id: user.id,
                  limit: 1,
                  orderBy: { column: 'created_at', ascending: false }
                });
                  
                if (!directQueryError && followUpResponsesData && Array.isArray(followUpResponsesData) && followUpResponsesData.length > 0) {
                  latestPainLevel = followUpResponsesData[0]?.pain_level;
                }
              } else if (followUpData && followUpData.length > 0) {
                latestPainLevel = followUpData[0]?.pain_level;
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
              initial_pain_level: assessment.intial_pain_intensity, // Use the column directly
              latest_pain_level: latestPainLevel
            } as UserAssessment;
          } catch (error) {
            console.error('Error processing assessment data:', error);
            return {
              ...assessment,
              completed_exercises_count: 0,
              last_completed_at: undefined,
              initial_pain_level: assessment.intial_pain_intensity,
              latest_pain_level: undefined
            } as UserAssessment;
          }
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
      setAssessments([]);
    } finally {
      setLoading(false);
    }
  }, [user, toast]);

  useEffect(() => {
    if (!user) return;
    
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

    // Listen for the custom exercise-completed event
    const handleExerciseCompleted = () => {
      console.log('Exercise completion event received');
      fetchUserAssessments();
    };
    
    window.addEventListener('exercise-completed', handleExerciseCompleted);
      
    // We'll try to listen for follow-up responses changes - this might fail if table doesn't exist
    let followUpChannel;
    try {
      followUpChannel = supabase
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
    } catch (error) {
      console.log('Could not subscribe to follow-up responses:', error);
    }
        
    return () => {
      if (exercisesChannel) {
        supabase.removeChannel(exercisesChannel);
      }
      if (followUpChannel) {
        supabase.removeChannel(followUpChannel);
      }
      window.removeEventListener('exercise-completed', handleExerciseCompleted);
    };
  }, [user, fetchUserAssessments]);
  
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
