import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ExerciseCompletionCheckbox } from '@/components/ExerciseCompletionCheckbox';
import { FavoriteExerciseButton } from '@/components/FavoriteExerciseButton';
import { ExerciseGoodToggle } from './ExerciseGoodToggle';
import { ExerciseFeedbackDialog } from './ExerciseFeedbackDialog';
import { ExerciseReplaceDialog } from './ExerciseReplaceDialog';
import { findReplacementExercise } from '@/utils/exerciseHelpers';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

interface Video {
  videoId: string;
  title?: string;
  description?: string;
  importance?: 1 | 2 | 3;
  bodyPart?: string;
  mainGroup?: string;
}

interface ExerciseVideoSectionProps {
  video: Video;
  exerciseTitle: string;
  showGeneral: boolean;
  assessmentId?: string;
}

type FeedbackMap = Record<string, "good" | "neutral" | "not-good">;

export const ExerciseVideoSection = ({
  video,
  exerciseTitle,
  showGeneral,
  assessmentId
}: ExerciseVideoSectionProps) => {
  const [feedbackMap, setFeedbackMap] = useState<FeedbackMap>({});
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
  const [replaceDialogOpen, setReplaceDialogOpen] = useState(false);
  const [proposedExercise, setProposedExercise] = useState<{
    exerciseTitle: string;
    videoId: string;
    description?: string;
  } | null>(null);

  const { user } = useAuth();
  const { toast } = useToast();
  const { t } = useTranslation();
  
  // Helper function to get translated text
  const getTranslatedText = (text: string) => {
    if (text.startsWith('exercises.')) {
      return t(text);
    }
    return text;
  };

  // Neutral is the default
  const feedbackValue = feedbackMap[video.videoId] ?? "neutral";

  // Feedback logic (store feedback in supabase)
  const handleStoreFeedback = async (value: 1 | -1) => {
    if (!user) return;
    // Write feedback
    const { error } = await supabase.from("exercise_feedback").upsert([
      {
        user_id: user.id,
        exercise_title: getTranslatedText(video.title || exerciseTitle),
        video_id: video.videoId,
        feedback_value: value,
      },
    ]);
    if (error) {
      toast({
        title: t('goals.errorTitle'),
        description: t('exercisePlan.errorSave'),
        variant: 'destructive',
      });
    } else {
      toast({
        title: t('exercisePlan.feedbackSaved'),
        description: value === 1 ? t('exercisePlan.markedGood') : t('exercisePlan.requestedChange'),
      });
    }
  };

  const handleToggleChange = (value: "good" | "neutral" | "not-good") => {
    setFeedbackMap((prev) => ({ ...prev, [video.videoId]: value }));
    if (value === "not-good") {
      setFeedbackDialogOpen(true);
      // Don't write feedback yet, wait for confirm.
    } else if (value === "good") {
      handleStoreFeedback(1);
    }
  };

  const handleDialogOpenChange = (open: boolean) => {
    setFeedbackDialogOpen(open);
  };

  // When "Zmeniť cvik" is confirmed in feedback dialog:
  const handleExerciseChangeRequest = async () => {
    // Write negative feedback
    await handleStoreFeedback(-1);
    // Find a new exercise with same bodyPart/mainGroup
    if (video.bodyPart && video.mainGroup) {
      const newExercise = findReplacementExercise(
        video.videoId,
        video.bodyPart,
        video.mainGroup
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

  // Handle user confirming exercise replacement
  const handleConfirmReplace = (newEx: { exerciseTitle: string; videoId: string }) => {
    // Here we would update the UI/list with the new exercise in a parent context, but for this demo just close dialog.
    setReplaceDialogOpen(false);
    toast({
      title: t('exercisePlan.exerciseChangedTitle'),
      description: t('exercisePlan.exerciseChangedDesc'),
    });
    // Optionally update local state/UI
  };

  const translatedTitle = getTranslatedText(video.title || '');
  const translatedDescription = getTranslatedText(video.description || '');

  return (
    <div className="space-y-4">
      {video.title && (
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-bold text-gray-800">{translatedTitle}</h3>
        </div>
      )}
      {/* Desktop */}
      <div className="hidden md:flex gap-6">
        <div className="w-1/2">
          <div className="aspect-video w-full">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${video.videoId}`}
              title={translatedTitle || getTranslatedText(exerciseTitle)}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
        <div className="w-1/2 space-y-4">
          {video.description && (
            <div className="space-y-2">
              <p className="text-gray-600">
                {translatedDescription.split('\n').map((line, index) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
              {assessmentId && (
                <ExerciseCompletionCheckbox
                  exerciseTitle={translatedTitle || getTranslatedText(exerciseTitle)}
                  assessmentId={assessmentId}
                  videoId={video.videoId}
                />
              )}
              <div className="space-y-2">
                <span className="text-base font-medium text-gray-900 block">{t('exercisePlan.suitableQuestion')}</span>
                <div className="flex justify-start">
                  <ExerciseGoodToggle
                    value={feedbackValue}
                    onChange={handleToggleChange}
                  />
                </div>
              </div>
              <ExerciseFeedbackDialog
                open={feedbackDialogOpen}
                onOpenChange={handleDialogOpenChange}
                onChangeRequest={handleExerciseChangeRequest}
              />
              <ExerciseReplaceDialog
                open={replaceDialogOpen}
                onOpenChange={setReplaceDialogOpen}
                newExercise={proposedExercise}
                onConfirm={handleConfirmReplace}
              />
            </div>
          )}
          <FavoriteExerciseButton
            exerciseTitle={translatedTitle || getTranslatedText(exerciseTitle)}
            videoId={video.videoId}
            description={translatedDescription}
          />
        </div>
      </div>
      {/* Mobile */}
      <div className="md:hidden space-y-4">
        <div className="aspect-video w-full">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${video.videoId}`}
            title={translatedTitle || getTranslatedText(exerciseTitle)}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        {video.description && (
          <div className="space-y-2">
            <p className="text-gray-600">
              {translatedDescription.split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
            {assessmentId && (
              <ExerciseCompletionCheckbox
                exerciseTitle={translatedTitle || getTranslatedText(exerciseTitle)}
                assessmentId={assessmentId}
                videoId={video.videoId}
              />
            )}
            <div className="space-y-2">
              <span className="text-base font-medium text-gray-900 block">{t('exercisePlan.suitableQuestion')}</span>
              <div className="flex justify-start">
                <ExerciseGoodToggle
                  value={feedbackValue}
                  onChange={handleToggleChange}
                />
              </div>
            </div>
            <ExerciseFeedbackDialog
              open={feedbackDialogOpen}
              onOpenChange={handleDialogOpenChange}
              onChangeRequest={handleExerciseChangeRequest}
            />
            <ExerciseReplaceDialog
              open={replaceDialogOpen}
              onOpenChange={setReplaceDialogOpen}
              newExercise={proposedExercise}
              onConfirm={handleConfirmReplace}
            />
          </div>
        )}
        <FavoriteExerciseButton
          exerciseTitle={translatedTitle || getTranslatedText(exerciseTitle)}
          videoId={video.videoId}
          description={translatedDescription}
        />
      </div>
    </div>
  );
};
