import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Check, Loader2 } from 'lucide-react';
import { useExerciseCompletion } from '@/hooks/useExerciseCompletion';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface ProgramExerciseCompletionButtonProps {
  secondaryProgram: 'stretching' | 'strength' | 'yoga';
  programType: string;
  exerciseName: string;
  isContinuing?: boolean;
  completedExerciseNames?: string[];
  onCompletion?: () => void;
  totalExercises: number;
}

export const ProgramExerciseCompletionButton: React.FC<ProgramExerciseCompletionButtonProps> = ({
  secondaryProgram,
  programType,
  exerciseName,
  isContinuing = false,
  completedExerciseNames = [],
  onCompletion,
  totalExercises
}) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [canRevert, setCanRevert] = useState(false);
  const [completedAt, setCompletedAt] = useState<Date | null>(null);

  // Check if this exercise is completed based on the progress
  useEffect(() => {
    const isExerciseCompleted = completedExerciseNames.includes(exerciseName);
    setIsCompleted(isExerciseCompleted);
  }, [completedExerciseNames, exerciseName]);

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
      if (isCompleted && canRevert) {
        // Find and delete the most recent completion for this exercise
        const { data: recentCompletion, error: findError } = await supabase
          .from('secondary_programs')
          .select('id')
          .eq('user_id', user.id)
          .eq('secondary_program', secondaryProgram)
          .eq('program_type', programType)
          .eq('secondary_exercise_name', exerciseName)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (findError) throw findError;

        if (recentCompletion) {
          const { error } = await supabase
            .from('secondary_programs')
            .delete()
            .eq('id', recentCompletion.id);

          if (error) throw error;

          setIsCompleted(false);
          setCanRevert(false);
          setCompletedAt(null);

          toast({
            title: "Exercise Unmarked",
            description: "Exercise completion has been reverted.",
          });
        }
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
        setCompletedAt(new Date(data.created_at));
        setCanRevert(true);

        // Set timer to disable revert after 30 seconds
        setTimeout(() => {
          setCanRevert(false);
        }, 30000);

        toast({
          title: "Exercise Completed!",
          description: "Exercise has been marked as completed.",
        });

        // Check if all exercises are now completed for 100% logic
        if (onCompletion) {
          // Get all completed exercises for this program to check 100%
          const { data: allCompletions, error: checkError } = await supabase
            .from('secondary_programs')
            .select('secondary_exercise_name')
            .eq('user_id', user.id)
            .eq('secondary_program', secondaryProgram)
            .eq('program_type', programType);

          if (!checkError && allCompletions) {
            const completedCount = allCompletions.length;
            
            // Check if we just completed a full cycle
            if (completedCount % totalExercises === 0) {
              toast({
                title: "Program Completed! 🎉",
                description: `You've completed the program ${Math.floor(completedCount / totalExercises)} time(s)!`,
              });
              
              // Call the completion callback to update the progress badge
              onCompletion();
            }
          }
        }
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

  const getButtonVariant = () => {
    if (isCompleted) {
      return canRevert ? "default" : "secondary";
    }
    return "outline";
  };

  const getButtonText = () => {
    return t('misc.markAsCompleted');
  };

  return (
    <Button
      onClick={markAsCompleted}
      disabled={isLoading || (isCompleted && !canRevert)}
      className={`w-full mt-4 ${isCompleted ? 'bg-green-600 hover:bg-green-700 text-white border-green-600' : ''}`}
      variant={getButtonVariant()}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : (
        <Check className="w-4 h-4 mr-2" />
      )}
      {getButtonText()}
    </Button>
  );
};