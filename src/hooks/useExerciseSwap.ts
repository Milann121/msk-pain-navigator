import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

interface ExerciseSwap {
  id: string;
  user_id: string;
  assessment_id?: string;
  original_video_id: string;
  replacement_video_id: string;
  created_at: string;
  updated_at: string;
}

export const useExerciseSwap = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [userSwaps, setUserSwaps] = useState<ExerciseSwap[]>([]);

  const loadUserSwaps = useCallback(async (assessmentId?: string) => {
    if (!user) return;

    try {
      let query = supabase
        .from('exercise_swaps')
        .select('*')
        .eq('user_id', user.id);

      if (assessmentId) {
        query = query.eq('assessment_id', assessmentId);
      }

      const { data, error } = await query;

      if (error) throw error;
      setUserSwaps(data || []);
    } catch (error) {
      console.error('Error loading user swaps:', error);
    }
  }, [user]);

  const swapExercise = useCallback(async (
    originalVideoId: string,
    replacementVideoId: string,
    assessmentId?: string
  ) => {
    if (!user) {
      toast.error(t('exerciseSwap.swapError'));
      return false;
    }

    setLoading(true);
    try {
      // Check if swap already exists for this exercise
      const existingSwap = userSwaps.find(
        swap => swap.original_video_id === originalVideoId &&
                (assessmentId ? swap.assessment_id === assessmentId : !swap.assessment_id)
      );

      if (existingSwap) {
        // Update existing swap
        const { error } = await supabase
          .from('exercise_swaps')
          .update({
            replacement_video_id: replacementVideoId,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingSwap.id);

        if (error) throw error;
      } else {
        // Create new swap
        const { error } = await supabase
          .from('exercise_swaps')
          .insert({
            user_id: user.id,
            assessment_id: assessmentId,
            original_video_id: originalVideoId,
            replacement_video_id: replacementVideoId
          });

        if (error) throw error;
      }

      // Reload swaps
      await loadUserSwaps(assessmentId);
      toast.success(t('exerciseSwap.swapSuccess'));
      return true;
    } catch (error) {
      console.error('Error swapping exercise:', error);
      toast.error(t('exerciseSwap.swapError'));
      return false;
    } finally {
      setLoading(false);
    }
  }, [user, userSwaps, loadUserSwaps, t]);

  const getSwappedVideoId = useCallback((originalVideoId: string, assessmentId?: string) => {
    const swap = userSwaps.find(
      swap => swap.original_video_id === originalVideoId &&
              (assessmentId ? swap.assessment_id === assessmentId : !swap.assessment_id)
    );
    return swap?.replacement_video_id || originalVideoId;
  }, [userSwaps]);

  const hasBeenSwapped = useCallback((originalVideoId: string, assessmentId?: string) => {
    return userSwaps.some(
      swap => swap.original_video_id === originalVideoId &&
              (assessmentId ? swap.assessment_id === assessmentId : !swap.assessment_id)
    );
  }, [userSwaps]);

  return {
    loading,
    userSwaps,
    loadUserSwaps,
    swapExercise,
    getSwappedVideoId,
    hasBeenSwapped
  };
};