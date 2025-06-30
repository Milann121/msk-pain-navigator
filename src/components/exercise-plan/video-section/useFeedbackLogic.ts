
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/integrations/supabase/client';

type FeedbackMap = Record<string, "good" | "neutral" | "not-good">;

interface UseFeedbackLogicProps {
  videoId: string;
  exerciseTitle: string;
}

export const useFeedbackLogic = ({ videoId, exerciseTitle }: UseFeedbackLogicProps) => {
  const [feedbackMap, setFeedbackMap] = useState<FeedbackMap>({});
  const { user } = useAuth();
  const { toast } = useToast();
  const { t } = useTranslation();

  // Load existing feedback on component mount
  useEffect(() => {
    const loadExistingFeedback = async () => {
      if (!user) return;
      
      try {
        const { data: existingFeedback, error } = await supabase
          .from('exercise_feedback')
          .select('video_id, feedback_value')
          .eq('user_id', user.id)
          .eq('video_id', videoId)
          .order('created_at', { ascending: false })
          .limit(1);

        if (error) {
          console.error('Error loading feedback:', error);
          return;
        }

        if (existingFeedback && existingFeedback.length > 0) {
          const feedback = existingFeedback[0];
          let feedbackValue: "good" | "neutral" | "not-good" = "neutral";
          
          if (feedback.feedback_value === 1) {
            feedbackValue = "good";
          } else if (feedback.feedback_value === -1) {
            feedbackValue = "not-good";
          }
          
          setFeedbackMap(prev => ({
            ...prev,
            [videoId]: feedbackValue
          }));
        }
      } catch (error) {
        console.error('Error loading existing feedback:', error);
      }
    };

    loadExistingFeedback();
  }, [user, videoId]);

  // Store feedback in database
  const handleStoreFeedback = async (value: 1 | -1 | 0) => {
    if (!user) return;
    
    const { error } = await supabase.from("exercise_feedback").upsert([
      {
        user_id: user.id,
        exercise_title: exerciseTitle,
        video_id: videoId,
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
      const message = value === 1 ? t('exercisePlan.markedGood') : 
                     value === -1 ? t('exercisePlan.requestedChange') : 
                     t('exercisePlan.feedbackSaved');
      toast({
        title: t('exercisePlan.feedbackSaved'),
        description: message,
      });
    }
  };

  const handleToggleChange = (value: "good" | "neutral" | "not-good") => {
    setFeedbackMap((prev) => ({ ...prev, [videoId]: value }));
    
    // Save feedback immediately when user changes toggle
    if (value === "good") {
      handleStoreFeedback(1);
    } else if (value === "not-good") {
      // Don't write feedback yet, wait for confirm in dialog
    } else if (value === "neutral") {
      handleStoreFeedback(0);
    }
  };

  const feedbackValue = feedbackMap[videoId] ?? "neutral";

  return {
    feedbackValue,
    handleToggleChange,
    handleStoreFeedback
  };
};
