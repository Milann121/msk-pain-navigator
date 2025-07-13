import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface UseExerciseCompletionProps {
  secondaryProgram: 'stretching' | 'strength' | 'yoga';
  programType: string;
  exerciseName: string;
}

export const useExerciseCompletion = ({ 
  secondaryProgram, 
  programType, 
  exerciseName 
}: UseExerciseCompletionProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [completionId, setCompletionId] = useState<string | null>(null);
  const [completedAt, setCompletedAt] = useState<Date | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  // Check if exercise is already completed on mount
  useEffect(() => {
    if (!user) return;
    
    const checkCompletion = async () => {
      try {
        const { data, error } = await supabase
          .from('secondary_programs')
          .select('id, created_at')
          .eq('user_id', user.id)
          .eq('secondary_program', secondaryProgram)
          .eq('program_type', programType)
          .eq('secondary_exercise_name', exerciseName)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (error) throw error;
        
        if (data) {
          setIsCompleted(true);
          setCompletionId(data.id);
          setCompletedAt(new Date(data.created_at));
        }
      } catch (error) {
        console.error('Error checking completion status:', error);
      }
    };

    checkCompletion();
  }, [user, secondaryProgram, programType, exerciseName]);

  const canRevert = completedAt && (Date.now() - completedAt.getTime()) < 30000; // 30 seconds

  const markAsCompleted = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to mark exercises as completed.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      if (isCompleted && canRevert && completionId) {
        // Revert completion
        const { error } = await supabase
          .from('secondary_programs')
          .delete()
          .eq('id', completionId);

        if (error) throw error;

        setIsCompleted(false);
        setCompletionId(null);
        setCompletedAt(null);

        toast({
          title: "Exercise Unmarked",
          description: "Exercise completion has been reverted.",
        });
      } else {
        // Mark as completed
        const { data, error } = await supabase
          .from('secondary_programs')
          .insert({
            user_id: user.id,
            secondary_program: secondaryProgram,
            program_type: programType,
            secondary_exercise_name: exerciseName,
          })
          .select('id, created_at')
          .single();

        if (error) throw error;

        setIsCompleted(true);
        setCompletionId(data.id);
        setCompletedAt(new Date(data.created_at));

        toast({
          title: "Exercise Completed!",
          description: "Exercise has been marked as completed.",
        });
      }
    } catch (error) {
      console.error('Error updating exercise completion:', error);
      toast({
        title: "Error",
        description: "Failed to update exercise completion. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    markAsCompleted,
    isLoading,
    isCompleted,
    canRevert,
  };
};