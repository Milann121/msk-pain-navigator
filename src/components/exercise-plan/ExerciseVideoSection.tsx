import React from 'react';
import { ExerciseCompletionCheckbox } from '@/components/ExerciseCompletionCheckbox';
import { FavoriteExerciseButton } from '@/components/FavoriteExerciseButton';
import { StarRating } from './StarRating';
import { ExerciseSwapDialog } from './ExerciseSwapDialog';
import { useExerciseActions } from './hooks/useExerciseActions';

interface Video {
  videoId: string;
  title?: string;
  description?: string;
  importance?: 1 | 2 | 3;
  bodyPart?: Array<'neck' | 'middle-back' | 'lower-back' | 'shoulder' | 'elbow' | 'forearm' | 'hand' | 'fingers'>;
  mainGroup?: Array<'mobility' | 'stability' | 'pain-relief'| 'neuro-mobs'>;
  alternatives?: string[];
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
  const {
    rating,
    hoveredRating,
    showSwapButton,
    showSwapDialog,
    setHoveredRating,
    handleStarClick,
    handleSwapExercise,
    confirmSwap,
    cancelSwap,
    getTranslatedText
  } = useExerciseActions(video, exerciseTitle);

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
              <StarRating 
                rating={rating}
                hoveredRating={hoveredRating}
                onStarClick={handleStarClick}
                onMouseEnter={setHoveredRating}
                onMouseLeave={() => setHoveredRating(0)}
              />
              <ExerciseSwapDialog
                showSwapButton={showSwapButton}
                showSwapDialog={showSwapDialog}
                onSwapClick={handleSwapExercise}
                onConfirmSwap={confirmSwap}
                onCancelSwap={cancelSwap}
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
            <StarRating 
              rating={rating}
              hoveredRating={hoveredRating}
              onStarClick={handleStarClick}
              onMouseEnter={setHoveredRating}
              onMouseLeave={() => setHoveredRating(0)}
            />
            <ExerciseSwapDialog
              showSwapButton={showSwapButton}
              showSwapDialog={showSwapDialog}
              onSwapClick={handleSwapExercise}
              onConfirmSwap={confirmSwap}
              onCancelSwap={cancelSwap}
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