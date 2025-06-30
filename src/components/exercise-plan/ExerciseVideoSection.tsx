
import React, { useState } from 'react';
import { ExerciseFeedbackDialog } from './ExerciseFeedbackDialog';
import { ExerciseReplaceDialog } from './ExerciseReplaceDialog';
import { VideoSectionContent } from './video-section/VideoSectionContent';
import { useFeedbackLogic } from './video-section/useFeedbackLogic';
import { useExerciseReplacement } from './video-section/useExerciseReplacement';
import { useTranslationHelpers } from './video-section/useTranslationHelpers';

interface Video {
  videoId: string;
  title?: string;
  description?: string;
  importance?: 1 | 2 | 3;
  bodyPart?: Array<'neck' | 'middle-back' | 'lower-back' | 'shoulder' | 'elbow' | 'forearm' | 'hand' | 'fingers'>;
  mainGroup?: Array<'mobility' | 'stability' | 'pain-relief'| 'neuro-mobs'>;
}

interface ExerciseVideoSectionProps {
  video: Video;
  exerciseTitle: string;
  showGeneral: boolean;
  assessmentId?: string;
}

export const ExerciseVideoSection = ({
  video,
  exerciseTitle,
  showGeneral,
  assessmentId
}: ExerciseVideoSectionProps) => {
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
  
  const { getTranslatedText } = useTranslationHelpers();
  const translatedTitle = getTranslatedText(video.title || '');
  const translatedDescription = getTranslatedText(video.description || '');
  const finalTitle = translatedTitle || getTranslatedText(exerciseTitle);
  
  const {
    feedbackValue,
    handleToggleChange,
    handleStoreFeedback
  } = useFeedbackLogic({
    videoId: video.videoId,
    exerciseTitle: finalTitle
  });

  const {
    replaceDialogOpen,
    setReplaceDialogOpen,
    proposedExercise,
    handleExerciseChangeRequest,
    handleConfirmReplace
  } = useExerciseReplacement(video);

  const handleToggleChangeWithDialog = (value: "good" | "neutral" | "not-good") => {
    handleToggleChange(value);
    
    if (value === "not-good") {
      setFeedbackDialogOpen(true);
    }
  };

  const handleDialogOpenChange = (open: boolean) => {
    setFeedbackDialogOpen(open);
  };

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
          <VideoSectionContent
            videoId={video.videoId}
            title={finalTitle}
            description={translatedDescription}
            assessmentId={assessmentId}
            feedbackValue={feedbackValue}
            onToggleChange={handleToggleChangeWithDialog}
          />
        </div>
        <div className="w-1/2 space-y-4">
          {/* Content moved to VideoSectionContent */}
        </div>
      </div>
      
      {/* Mobile */}
      <div className="md:hidden space-y-4">
        <VideoSectionContent
          videoId={video.videoId}
          title={finalTitle}
          description={translatedDescription}
          assessmentId={assessmentId}
          feedbackValue={feedbackValue}
          onToggleChange={handleToggleChangeWithDialog}
        />
      </div>

      <ExerciseFeedbackDialog
        open={feedbackDialogOpen}
        onOpenChange={handleDialogOpenChange}
        onChangeRequest={handleExerciseChangeRequest(() => handleStoreFeedback(-1))}
      />
      
      <ExerciseReplaceDialog
        open={replaceDialogOpen}
        onOpenChange={setReplaceDialogOpen}
        newExercise={proposedExercise}
        onConfirm={handleConfirmReplace}
      />
    </div>
  );
};
