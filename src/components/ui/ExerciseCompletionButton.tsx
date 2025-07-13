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
  const { markAsCompleted, isLoading, isCompleted, canRevert } = useExerciseCompletion({
    secondaryProgram,
    programType,
    exerciseName,
  });

  const getButtonVariant = () => {
    if (isCompleted) {
      return canRevert ? "default" : "secondary";
    }
    return "outline";
  };

  const getButtonText = () => {
    if (isCompleted && canRevert) {
      return t('common.markAsCompleted'); // Can still revert
    } else if (isCompleted) {
      return t('common.markAsCompleted'); // Completed, no revert
    }
    return t('common.markAsCompleted');
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