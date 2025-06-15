
import React, { useState } from 'react';
import { ExerciseCompletionCheckbox } from '@/components/ExerciseCompletionCheckbox';
import { FavoriteExerciseButton } from '@/components/FavoriteExerciseButton';
import { ExerciseGoodToggle } from './ExerciseGoodToggle';
import { ExerciseFeedbackDialog } from './ExerciseFeedbackDialog';

interface Video {
  videoId: string;
  title?: string;
  description?: string;
  importance?: 1 | 2 | 3;
}

interface ExerciseVideoSectionProps {
  video: Video;
  exerciseTitle: string;
  showGeneral: boolean;
  assessmentId?: string;
}

// Helper to store feedback by video ID
type FeedbackMap = Record<string, "good" | "not-good">;

export const ExerciseVideoSection = ({ 
  video, 
  exerciseTitle, 
  showGeneral, 
  assessmentId 
}: ExerciseVideoSectionProps) => {
  // Local feedback state per video
  const [feedbackMap, setFeedbackMap] = useState<FeedbackMap>({});
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);

  const feedbackValue = feedbackMap[video.videoId] ?? "good";

  const handleToggleChange = (value: "good" | "not-good") => {
    setFeedbackMap((prev) => ({ ...prev, [video.videoId]: value }));
    if (value === "not-good") {
      setFeedbackDialogOpen(true);
    }
  };

  const handleDialogOpenChange = (open: boolean) => {
    setFeedbackDialogOpen(open);
  };

  const handleExerciseChangeRequest = () => {
    alert("Žiadosť o zmenu cviku bola odoslaná.");
  };

  return (
    <div className="space-y-4">
      {video.title && (
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-bold text-gray-800">{video.title}</h3>
        </div>
      )}
      
      {/* Desktop layout: video on left, description and favorite on right */}
      <div className="hidden md:flex gap-6">
        {/* Video - half size, aligned left */}
        <div className="w-1/2">
          <div className="aspect-video w-full">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${video.videoId}`}
              title={video.title || exerciseTitle}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
        
        {/* Description, favorite button and completion button on right */}
        <div className="w-1/2 space-y-4">
          {video.description && (
            <div className="space-y-2">
              <p className="text-gray-600">
                {video.description.split('\n').map((line, index) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
              {assessmentId && (
                <ExerciseCompletionCheckbox 
                  exerciseTitle={video.title || exerciseTitle}
                  assessmentId={assessmentId}
                  videoId={video.videoId}
                />
              )}
              {/* Question and toggle now inline */}
              <div className="flex items-center gap-4 mt-1 mb-2">
                <span className="text-base font-medium text-gray-900">Vyhovuje vám cvik?</span>
                <ExerciseGoodToggle 
                  value={feedbackValue} 
                  onChange={handleToggleChange} 
                />
              </div>
              <ExerciseFeedbackDialog
                open={feedbackDialogOpen}
                onOpenChange={handleDialogOpenChange}
                onChangeRequest={handleExerciseChangeRequest}
              />
            </div>
          )}
          
          <FavoriteExerciseButton
            exerciseTitle={video.title || exerciseTitle}
            videoId={video.videoId}
            description={video.description}
          />
        </div>
      </div>
      
      {/* Mobile layout: original stacked layout */}
      <div className="md:hidden space-y-4">
        <div className="aspect-video w-full">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${video.videoId}`}
            title={video.title || exerciseTitle}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        {video.description && (
          <div className="ml-4 border-l-2 border-gray-200 pl-4 space-y-2">
            <p className="text-gray-600">
              {video.description.split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
            {assessmentId && (
              <ExerciseCompletionCheckbox 
                exerciseTitle={video.title || exerciseTitle}
                assessmentId={assessmentId}
                videoId={video.videoId}
              />
            )}
            {/* Question and toggle now inline (mobile) */}
            <div className="flex items-center gap-4 mt-1 mb-2">
              <span className="text-base font-medium text-gray-900">Vyhovuje vám cvik?</span>
              <ExerciseGoodToggle 
                value={feedbackValue} 
                onChange={handleToggleChange} 
              />
            </div>
            <ExerciseFeedbackDialog
              open={feedbackDialogOpen}
              onOpenChange={handleDialogOpenChange}
              onChangeRequest={handleExerciseChangeRequest}
            />
          </div>
        )}
        <FavoriteExerciseButton
          exerciseTitle={video.title || exerciseTitle}
          videoId={video.videoId}
          description={video.description}
        />
      </div>
    </div>
  );
};
