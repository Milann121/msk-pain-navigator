
import { supabase } from '@/integrations/supabase/client';
import { getTodayStart } from './dateUtils';

export const fetchCompletionStatus = async (
  userId: string,
  assessmentId: string,
  exerciseTitle: string
) => {
  const todayStart = getTodayStart();
  
  const { data, error } = await supabase
    .from('exercise_completion_clicks')
    .select('*')
    .eq('user_id', userId)
    .eq('assessment_id', assessmentId)
    .eq('exercise_title', exerciseTitle)
    .eq('is_active', true)
    .gte('clicked_at', todayStart.toISOString())
    .order('clicked_at', { ascending: false });
    
  if (error) {
    console.error('Error checking completion status:', error);
    return null;
  }
  
  return data;
};

export const deactivateCompletion = async (clickId: string) => {
  const { error } = await supabase
    .from('exercise_completion_clicks')
    .update({ is_active: false })
    .eq('id', clickId);
    
  if (error) {
    console.error('Error deactivating completion:', error);
    throw error;
  }
};

export const addCompletionClick = async (
  userId: string,
  assessmentId: string,
  exerciseTitle: string
) => {
  const now = new Date();
  
  const { data, error } = await supabase
    .from('exercise_completion_clicks')
    .insert({
      user_id: userId,
      assessment_id: assessmentId,
      exercise_title: exerciseTitle,
      clicked_at: now.toISOString(),
      is_active: true
    })
    .select()
    .single();
  
  if (error) {
    console.error('Error recording exercise completion:', error);
    throw error;
  }
  
  return data;
};

export const emitExerciseCompletedEvent = (assessmentId: string, exerciseTitle: string) => {
  const event = new CustomEvent('exercise-completed', {
    detail: { assessmentId, exerciseTitle }
  });
  window.dispatchEvent(event);
};
