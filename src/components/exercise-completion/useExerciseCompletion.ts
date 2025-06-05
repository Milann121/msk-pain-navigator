
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { getTodayStart } from './dateUtils';

interface UseExerciseCompletionProps {
  exerciseTitle: string;
  assessmentId: string;
}

export const useExerciseCompletion = ({ exerciseTitle, assessmentId }: UseExerciseCompletionProps) => {
  const [completionCount, setCompletionCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [lastCompletedAt, setLastCompletedAt] = useState<Date | null>(null);
  const [cooldownActive, setCooldownActive] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  // Set cooldown to 1 minute (60 seconds)
  const COOLDOWN_SECONDS = 60;

  useEffect(() => {
    const checkCompletionStatus = async () => {
      if (!user) return;
      
      try {
        const todayStart = getTodayStart();
        
        const { data, error } = await supabase
          .from('completed_exercises')
          .select('*')
          .eq('user_id', user.id)
          .eq('assessment_id', assessmentId)
          .eq('exercise_title', exerciseTitle)
          .gte('completed_at', todayStart.toISOString())
          .order('completed_at', { ascending: false });
          
        if (error) {
          console.error('Error checking completion status:', error);
          return;
        }
        
        const count = data ? data.length : 0;
        setCompletionCount(count);
        
        if (data && data.length > 0) {
          const lastCompleted = new Date(data[0].completed_at);
          setLastCompletedAt(lastCompleted);
          
          // Check if the cooldown is still active
          const now = new Date();
          const timeDiffSeconds = (now.getTime() - lastCompleted.getTime()) / 1000;
          const cooldownRemaining = Math.max(0, COOLDOWN_SECONDS - timeDiffSeconds);
          
          if (cooldownRemaining > 0) {
            setCooldownActive(true);
          } else {
            setCooldownActive(false);
          }
        } else {
          setLastCompletedAt(null);
          setCooldownActive(false);
        }
      } catch (error) {
        console.error('Error checking completion status:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkCompletionStatus();
    
    // Set up interval to check cooldown status
    const interval = setInterval(() => {
      if (lastCompletedAt) {
        const now = new Date();
        const timeDiffSeconds = (now.getTime() - lastCompletedAt.getTime()) / 1000;
        const cooldownRemaining = Math.max(0, COOLDOWN_SECONDS - timeDiffSeconds);
        
        if (cooldownRemaining <= 0) {
          setCooldownActive(false);
        } else {
          setCooldownActive(true);
        }
      }
      
      // Check if it's a new day and reset if needed
      const now = new Date();
      const todayStart = getTodayStart();
      if (lastCompletedAt && lastCompletedAt < todayStart) {
        setCompletionCount(0);
        setLastCompletedAt(null);
        setCooldownActive(false);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [user, exerciseTitle, assessmentId, lastCompletedAt, COOLDOWN_SECONDS]);

  const resetCompletion = async () => {
    if (!user) return;
    
    try {
      const todayStart = getTodayStart();
      
      const { data: recentCompletion, error: fetchError } = await supabase
        .from('completed_exercises')
        .select('id')
        .eq('user_id', user.id)
        .eq('assessment_id', assessmentId)
        .eq('exercise_title', exerciseTitle)
        .gte('completed_at', todayStart.toISOString())
        .order('completed_at', { ascending: false })
        .limit(1)
        .single();
        
      if (fetchError) {
        console.error('Error fetching recent completion:', fetchError);
        return;
      }
      
      if (recentCompletion) {
        const { error: deleteError } = await supabase
          .from('completed_exercises')
          .delete()
          .eq('id', recentCompletion.id);
          
        if (deleteError) {
          console.error('Error deleting completion:', deleteError);
          throw deleteError;
        }
        
        // Update local state
        setCompletionCount(prev => Math.max(0, prev - 1));
        setLastCompletedAt(null);
        setCooldownActive(false);
        
        toast({
          title: "Cvičenie zrušené",
          description: "Označenie cvičenia bolo zrušené.",
        });
        
        // Emit custom event to signal the update
        const event = new CustomEvent('exercise-completed', {
          detail: { assessmentId, exerciseTitle }
        });
        window.dispatchEvent(event);
      }
    } catch (error: any) {
      console.error('Error resetting completion status:', error);
      toast({
        title: "Chyba pri zrušení",
        description: "Nepodarilo sa zrušiť označenie cvičenia.",
        variant: "destructive"
      });
    }
  };

  const addCompletion = async () => {
    if (!user) return;
    
    try {
      const now = new Date();
      
      // Insert a new completion record
      const { error } = await supabase
        .from('completed_exercises')
        .insert({
          user_id: user.id,
          assessment_id: assessmentId,
          exercise_title: exerciseTitle,
          completed_at: now.toISOString()
        });
      
      if (error) {
        console.error('Error recording exercise completion:', error);
        throw error;
      }
      
      // Update local state
      setCompletionCount(prev => prev + 1);
      setLastCompletedAt(now);
      setCooldownActive(true);
      
      toast({
        title: "Cvičenie označené ako odcvičené",
        description: "Váš pokrok bol úspešne uložený.",
      });
      
      // Emit custom event to signal the update
      const event = new CustomEvent('exercise-completed', {
        detail: { assessmentId, exerciseTitle }
      });
      window.dispatchEvent(event);
      
      return true; // Indicate success for celebration
      
    } catch (error: any) {
      console.error('Error updating completion status:', error);
      toast({
        title: "Chyba pri ukladaní",
        description: "Nepodarilo sa uložiť zmenu stavu cvičenia.",
        variant: "destructive"
      });
      return false;
    }
  };

  return {
    completionCount,
    loading,
    cooldownActive,
    resetCompletion,
    addCompletion
  };
};
