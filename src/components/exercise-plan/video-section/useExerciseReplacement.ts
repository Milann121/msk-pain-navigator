
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useTranslation } from 'react-i18next';
import { findReplacementExercise } from '@/utils/exerciseHelpers';

interface Video {
  videoId: string;
  title?: string;
  description?: string;
  importance?: 1 | 2 | 3;
  bodyPart?: Array<'neck' | 'middle-back' | 'lower-back' | 'shoulder' | 'elbow' | 'forearm' | 'hand' | 'fingers'>;
  mainGroup?: Array<'mobility' | 'stability' | 'pain-relief'| 'neuro-mobs'>;
}

export const useExerciseReplacement = (video: Video) => {
  const [replaceDialogOpen, setReplaceDialogOpen] = useState(false);
  const [proposedExercise, setProposedExercise] = useState<{
    exerciseTitle: string;
    videoId: string;
    description?: string;
  } | null>(null);
  
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleExerciseChangeRequest = (handleStoreFeedback: (value: -1) => Promise<void>) => async () => {
    // Write negative feedback
    await handleStoreFeedback(-1);
    
    // Find a new exercise with same bodyPart/mainGroup
    if (video.bodyPart && video.mainGroup) {
      const newExercise = findReplacementExercise(
        video.videoId,
        video.bodyPart[0], // Use first body part for replacement
        video.mainGroup[0] // Use first main group for replacement
      );
      
      if (newExercise) {
        setProposedExercise(newExercise);
        setReplaceDialogOpen(true);
      } else {
        toast({
          title: t('exercisePlan.replacementErrorTitle'),
          description: t('exercisePlan.replacementErrorDescription'),
          variant: 'destructive',
        });
      }
    } else {
      toast({
        title: t('exercisePlan.missingInfoTitle'),
        description: t('exercisePlan.missingInfoDescription'),
        variant: 'destructive',
      });
    }
  };

  const handleConfirmReplace = (newEx: { exerciseTitle: string; videoId: string }) => {
    setReplaceDialogOpen(false);
    toast({
      title: t('exercisePlan.exerciseChangedTitle'),
      description: t('exercisePlan.exerciseChangedDesc'),
    });
  };

  return {
    replaceDialogOpen,
    setReplaceDialogOpen,
    proposedExercise,
    handleExerciseChangeRequest,
    handleConfirmReplace
  };
};
