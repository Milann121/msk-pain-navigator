import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { UserAssessment } from '@/components/follow-up/types';
import { useToast } from '@/hooks/use-toast';

export const useAssessments = () => {
  const [assessments, setAssessments] = useState<UserAssessment[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchAssessments = useCallback(async () => {
    if (!user) return;
    
    setLoading(true);
    
    try {
      // Fetch user assessments
      const { data: assessmentsData, error: assessmentsError } = await supabase
        .from('user_assessments')
        .select('*')
        .eq('user_id', user.id)
        .order('timestamp', { ascending: false });
      
      if (assessmentsError) throw assessmentsError;

      // For each assessment, get completion statistics
      const enrichedAssessments = await Promise.all(
        (assessmentsData || []).map(async (assessment: any) => {
          // Get completion count and last completion date
          const { data: completions, error: completionsError } = await supabase
            .from('completed_exercises')
            .select('completed_at')
            .eq('user_id', user.id)
            .eq('assessment_id', assessment.id)
            .order('completed_at', { ascending: false });

          if (completionsError) {
            console.error('Error fetching completions:', completionsError);
          }

          const completedExercisesCount = completions ? completions.length : 0;
          const lastCompletedAt = completions && completions.length > 0 
            ? completions[0].completed_at 
            : undefined;

          // Correct mapping for pain intensity, program dates, etc.
          return {
            id: assessment.id,
            primary_mechanism: assessment.primary_mechanism,
            sin_group: assessment.sin_group,
            primary_differential: assessment.primary_differential,
            pain_area: assessment.pain_area,
            timestamp: assessment.timestamp,
            completed_exercises_count: completedExercisesCount,
            last_completed_at: lastCompletedAt,
            initial_pain_level: assessment.intial_pain_intensity ?? undefined,
            program_start_date: assessment.program_start_date ?? null,
            program_ended_at: assessment.program_ended_at ?? null,
          } as UserAssessment;
        })
      );

      setAssessments(enrichedAssessments);
    } catch (error) {
      console.error('Error fetching assessments:', error);
      toast({
        title: "Chyba pri načítavaní hodnotení",
        description: "Nepodarilo sa načítať vaše hodnotenia.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [user, toast]);

  const handleDeleteAssessment = async (assessmentId: string) => {
    try {
      // First delete all related completed exercises
      const { error: completedExercisesError } = await supabase
        .from('completed_exercises')
        .delete()
        .eq('assessment_id', assessmentId);

      if (completedExercisesError) throw completedExercisesError;

      // Then delete all related follow-up responses
      const { error: followUpError } = await supabase
        .from('follow_up_responses')
        .delete()
        .eq('assessment_id', assessmentId);

      if (followUpError) throw followUpError;

      // Finally delete the assessment itself
      const { error: assessmentError } = await supabase
        .from('user_assessments')
        .delete()
        .eq('id', assessmentId)
        .eq('user_id', user?.id);

      if (assessmentError) throw assessmentError;

      // Refresh the assessments list
      await fetchAssessments();
      
      toast({
        title: "Hodnotenie vymazané",
        description: "Hodnotenie a všetky súvisiace údaje boli úspešne vymazané.",
      });
    } catch (error) {
      console.error('Error deleting assessment:', error);
      toast({
        title: "Chyba pri vymazávaní",
        description: "Nepodarilo sa vymazať hodnotenie.",
        variant: "destructive"
      });
    }
  };

  const refreshAssessments = useCallback(() => {
    fetchAssessments();
  }, [fetchAssessments]);

  useEffect(() => {
    fetchAssessments();
    
    // Listen for exercise completion events to refresh assessments
    const handleExerciseCompleted = () => {
      fetchAssessments();
    };
    
    window.addEventListener('exercise-completed', handleExerciseCompleted);
    
    return () => {
      window.removeEventListener('exercise-completed', handleExerciseCompleted);
    };
  }, [fetchAssessments]);

  return {
    assessments,
    loading,
    handleDeleteAssessment,
    refreshAssessments
  };
};
