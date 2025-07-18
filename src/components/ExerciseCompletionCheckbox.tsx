
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CelebrationAnimation } from './CelebrationAnimation';
import { useExerciseCompletion } from './exercise-completion/useExerciseCompletion';
import { CompletionButtonContent } from './exercise-completion/CompletionButtonContent';

interface ExerciseCompletionCheckboxProps {
  exerciseTitle: string;
  assessmentId: string;
  videoId?: string;
}

export const ExerciseCompletionCheckbox = ({ exerciseTitle, assessmentId, videoId }: ExerciseCompletionCheckboxProps) => {
  const [showCelebration, setShowCelebration] = useState(false);
  
  const {
    completionCount,
    loading,
    cooldownActive,
    resetCompletion,
    addCompletion
  } = useExerciseCompletion({ exerciseTitle, assessmentId });

  const handleButtonClick = async () => {
    // If cooldown is active, reset the state (unclick)
    if (cooldownActive) {
      await resetCompletion();
      return;
    }
    
    // Add new completion
    const success = await addCompletion();
    
    if (success) {
      // Show celebration animation
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }
  };

  if (loading) {
    return <div className="h-10 w-48 animate-pulse bg-gray-200 rounded" />;
  }

  // Determine button styling based on state - ensure consistency across languages
  const getButtonStyle = () => {
    if (completionCount > 0) {
      return 'bg-green-600 hover:bg-green-700 text-white border-green-600';
    } else {
      return 'bg-accent hover:bg-accent/90 text-accent-foreground border-accent';
    }
  };

  return (
    <>
      <Button 
        onClick={handleButtonClick}
        className={`${getButtonStyle()} flex items-center gap-2`}
        variant="outline"
      >
        <CompletionButtonContent completionCount={completionCount} />
      </Button>
      {showCelebration && (
        <CelebrationAnimation isActive={showCelebration} onComplete={() => setShowCelebration(false)} />
      )}
    </>
  );
};
