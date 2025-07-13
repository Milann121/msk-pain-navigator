import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Check, Loader2 } from 'lucide-react';
import { useExerciseCompletion } from '@/hooks/useExerciseCompletion';

interface ExerciseCompletionButtonProps {
  secondaryProgram: 'stretching' | 'strength' | 'yoga';
  programType: string;
  exerciseName: string;
}

export const ExerciseCompletionButton: React.FC<ExerciseCompletionButtonProps> = ({
  secondaryProgram,
  programType,
  exerciseName,
}) => {
  const { t } = useTranslation();
  const { markAsCompleted, isLoading } = useExerciseCompletion({
    secondaryProgram,
    programType,
    exerciseName,
  });

  return (
    <Button
      onClick={markAsCompleted}
      disabled={isLoading}
      className="w-full mt-4"
      variant="outline"
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : (
        <Check className="w-4 h-4 mr-2" />
      )}
      {t('common.markAsCompleted')}
    </Button>
  );
};