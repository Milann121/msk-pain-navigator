
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
}

export const useAssessments = () => {
  const [assessments, setAssessments] = useState<UserAssessment[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchUserAssessments = async () => {
      if (!user) return;

      try {
        setLoading(true);
        
        // Get assessments with completed exercise counts
        const { data, error } = await supabase
          .from('user_assessments')
          .select(`
            *,
            completed_exercises:completed_exercises(count)
          `)
          .order('timestamp', { ascending: false });

        if (error) throw error;
        
        // Transform the data to include the completed exercises count
        const assessmentsWithCounts = (data || []).map(assessment => {
          const completedCount = assessment.completed_exercises?.length || 0;
          return {
            ...assessment,
            completed_exercises_count: completedCount
          };
        });
        
        setAssessments(assessmentsWithCounts);
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

    fetchUserAssessments();
  }, [user, toast]);
  
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
    handleDeleteAssessment
  };
};
