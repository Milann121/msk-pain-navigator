import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { ExerciseCompletionCheckbox } from '@/components/ExerciseCompletionCheckbox';
import { FavoriteExerciseButton } from '@/components/FavoriteExerciseButton';
import SwapExerciseButton from '@/components/exercise-plan/SwapExerciseButton';
import SwapConfirmationDialog from '@/components/exercise-plan/SwapConfirmationDialog';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { useTranslation } from 'react-i18next';
import { useExerciseSwap } from '@/hooks/useExerciseSwap';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

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
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [showSwapDialog, setShowSwapDialog] = useState(false);

  const { user } = useAuth();
  const { toast: toastHook } = useToast();
  const { t } = useTranslation();
  const { loading: swapLoading, swapExercise, getSwappedVideoId, loadUserSwaps } = useExerciseSwap();

  // Get the actual video to display (swapped or original)
  const actualVideoId = getSwappedVideoId(video.videoId, assessmentId);

  // Helper function to get translated text
  const getTranslatedText = (text: string) => {
    if (!text) return '';
    
    if (text.startsWith('exercises.')) {
      const translated = t(text);
      return translated === text ? text : translated;
    }
    
    return text;
  };

  // Load existing rating and user swaps on component mount
  useEffect(() => {
    const loadExistingRating = async () => {
      if (!user) return;
      
      try {
        const { data: existingFeedback, error } = await supabase
          .from('exercise_feedback')
          .select('feedback_value')
          .eq('user_id', user.id)
          .eq('video_id', actualVideoId)
          .order('created_at', { ascending: false })
          .limit(1);

        if (error) {
          console.error('Error loading rating:', error);
          return;
        }

        if (existingFeedback && existingFeedback.length > 0) {
          const feedback = existingFeedback[0];
          setRating(feedback.feedback_value || 0);
        }
      } catch (error) {
        console.error('Error loading existing rating:', error);
      }
    };

    if (user) {
      loadExistingRating();
      loadUserSwaps(assessmentId);
    }
  }, [user, actualVideoId, loadUserSwaps, assessmentId]);

  // Handle star click
  const handleStarClick = async (starValue: number) => {
    if (!user) return;
    
    setRating(starValue);
    
    try {
      const { error } = await supabase.from("exercise_feedback").upsert([
        {
          user_id: user.id,
          exercise_title: getTranslatedText(video.title || exerciseTitle),
          video_id: actualVideoId,
          feedback_value: starValue,
        },
      ]);
      
      if (error) {
        toastHook({
          title: t('goals.errorTitle'),
          description: t('exercisePlan.errorSave'),
          variant: 'destructive',
        });
      } else {
        toastHook({
          title: 'Rating saved',
          description: `You rated this exercise ${starValue} star${starValue !== 1 ? 's' : ''}`,
        });
      }
    } catch (error) {
      console.error('Error saving rating:', error);
      toastHook({
        title: t('goals.errorTitle'),
        description: t('exercisePlan.errorSave'),
        variant: 'destructive',
      });
    }
  };

  const handleSwapClick = () => {
    setShowSwapDialog(true);
  };

  const handleSwapConfirm = async () => {
    if (!video.alternatives || video.alternatives.length === 0) {
      toast.error(t('exerciseSwap.noAlternatives'));
      setShowSwapDialog(false);
      return;
    }

    // Select a random alternative
    const randomAlternative = video.alternatives[Math.floor(Math.random() * video.alternatives.length)];
    
    const success = await swapExercise(video.videoId, randomAlternative, assessmentId);
    if (success) {
      setRating(0); // Reset rating for the new exercise
    }
    setShowSwapDialog(false);
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
              src={`https://www.youtube.com/embed/${actualVideoId}`}
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
                  videoId={actualVideoId}
                />
              )}
              <div className="space-y-2">
                <span className="text-base font-medium text-gray-900 block">Rating:</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((starValue) => (
                    <Star
                      key={starValue}
                      className={`w-6 h-6 cursor-pointer transition-colors ${
                        starValue <= (hoveredRating || rating) 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : 'text-gray-300'
                      }`}
                      onClick={() => handleStarClick(starValue)}
                      onMouseEnter={() => setHoveredRating(starValue)}
                      onMouseLeave={() => setHoveredRating(0)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div className="flex gap-2 flex-wrap">
            <FavoriteExerciseButton
              exerciseTitle={translatedTitle || getTranslatedText(exerciseTitle)}
              videoId={actualVideoId}
              description={translatedDescription}
            />
            {video.alternatives && video.alternatives.length > 0 && (
              <SwapExerciseButton 
                onClick={handleSwapClick}
                disabled={swapLoading}
              />
            )}
          </div>
        </div>
      </div>
      {/* Mobile */}
      <div className="md:hidden space-y-4">
        <div className="aspect-video w-full">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${actualVideoId}`}
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
                videoId={actualVideoId}
              />
            )}
            <div className="space-y-2">
              <span className="text-base font-medium text-gray-900 block">Rating:</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((starValue) => (
                  <Star
                    key={starValue}
                    className={`w-6 h-6 cursor-pointer transition-colors ${
                      starValue <= (hoveredRating || rating) 
                        ? 'fill-yellow-400 text-yellow-400' 
                        : 'text-gray-300'
                    }`}
                    onClick={() => handleStarClick(starValue)}
                    onMouseEnter={() => setHoveredRating(starValue)}
                    onMouseLeave={() => setHoveredRating(0)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        <div className="flex gap-2 flex-wrap">
          <FavoriteExerciseButton
            exerciseTitle={translatedTitle || getTranslatedText(exerciseTitle)}
            videoId={actualVideoId}
            description={translatedDescription}
          />
          {video.alternatives && video.alternatives.length > 0 && (
            <SwapExerciseButton 
              onClick={handleSwapClick}
              disabled={swapLoading}
            />
          )}
        </div>
      </div>

      <SwapConfirmationDialog
        open={showSwapDialog}
        onOpenChange={setShowSwapDialog}
        onConfirm={handleSwapConfirm}
        loading={swapLoading}
      />
    </div>
  );
};