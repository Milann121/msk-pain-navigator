
import React from 'react';
import { VideoPlayer } from './VideoPlayer';
import { VideoDescription } from './VideoDescription';
import { FeedbackSection } from './FeedbackSection';
import { ExerciseCompletionCheckbox } from '@/components/ExerciseCompletionCheckbox';
import { FavoriteExerciseButton } from '@/components/FavoriteExerciseButton';

interface VideoSectionContentProps {
  videoId: string;
  title: string;
  description: string;
  assessmentId?: string;
  feedbackValue: "good" | "neutral" | "not-good";
  onToggleChange: (value: "good" | "neutral" | "not-good") => void;
}

export const VideoSectionContent = ({
  videoId,
  title,
  description,
  assessmentId,
  feedbackValue,
  onToggleChange
}: VideoSectionContentProps) => {
  return (
    <>
      <VideoPlayer videoId={videoId} title={title} />
      {description && (
        <div className="space-y-2">
          <VideoDescription description={description} />
          {assessmentId && (
            <ExerciseCompletionCheckbox
              exerciseTitle={title}
              assessmentId={assessmentId}
              videoId={videoId}
            />
          )}
          <FeedbackSection
            feedbackValue={feedbackValue}
            onToggleChange={onToggleChange}
          />
        </div>
      )}
      <FavoriteExerciseButton
        exerciseTitle={title}
        videoId={videoId}
        description={description}
      />
    </>
  );
};
