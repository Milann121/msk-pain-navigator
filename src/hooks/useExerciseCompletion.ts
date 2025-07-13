import { useState } from 'react';
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
  const { user } = useAuth();
  const { toast } = useToast();

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
      const { error } = await supabase
        .from('exercise_completions')
        .insert({
          user_id: user.id,
          secondary_program: secondaryProgram,
          program_type: programType,
          secondary_exercise_name: exerciseName,
        });

      if (error) throw error;

      toast({
        title: "Exercise Completed!",
        description: "Exercise has been marked as completed.",
      });
    } catch (error) {
      console.error('Error marking exercise as completed:', error);
      toast({
        title: "Error",
        description: "Failed to mark exercise as completed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    markAsCompleted,
    isLoading,
  };
};