
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { getTodayStart } from './dateUtils';
import { COOLDOWN_SECONDS } from './constants';
import { isCooldownActive } from './cooldownUtils';
import { 
  fetchCompletionStatus, 
  deactivateCompletion, 
  addCompletionClick, 
  emitExerciseCompletedEvent 
} from './exerciseCompletionService';
import { UseExerciseCompletionProps, UseExerciseCompletionReturn } from './types';

export const useExerciseCompletion = ({ exerciseTitle, assessmentId }: UseExerciseCompletionProps): UseExerciseCompletionReturn => {
  const [completionCount, setCompletionCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [lastCompletedAt, setLastCompletedAt] = useState<Date | null>(null);
  const [cooldownActive, setCooldownActive] = useState(false);
  const [latestClickId, setLatestClickId] = useState<string | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const checkCompletionStatus = async () => {
      if (!user) return;
      
      try {
        const data = await fetchCompletionStatus(user.id, assessmentId, exerciseTitle);
        if (!data) return;
        
        const count = data.length;
        setCompletionCount(count);
        
        if (data.length > 0) {
          const lastClick = data[0];
          const lastCompleted = new Date(lastClick.clicked_at);
          setLastCompletedAt(lastCompleted);
          setLatestClickId(lastClick.id);
          
          setCooldownActive(isCooldownActive(lastCompleted));
        } else {
          setLastCompletedAt(null);
          setLatestClickId(null);
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
        setCooldownActive(isCooldownActive(lastCompletedAt));
      }
      
      // Check if it's a new day and reset if needed
      const now = new Date();
      const todayStart = getTodayStart();
      if (lastCompletedAt && lastCompletedAt < todayStart) {
        setCompletionCount(0);
        setLastCompletedAt(null);
        setLatestClickId(null);
        setCooldownActive(false);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [user, exerciseTitle, assessmentId, lastCompletedAt]);

  const resetCompletion = async () => {
    if (!user || !latestClickId) return;
    
    try {
      await deactivateCompletion(latestClickId);
      
      // Update local state
      setCompletionCount(prev => Math.max(0, prev - 1));
      setLastCompletedAt(null);
      setLatestClickId(null);
      setCooldownActive(false);
      
      toast({
        title: "Cvičenie zrušené",
        description: "Označenie cvičenia bolo zrušené.",
      });
      
      emitExerciseCompletedEvent(assessmentId, exerciseTitle);
      
    } catch (error: any) {
      console.error('Error resetting completion status:', error);
      toast({
        title: "Chyba pri zrušení",
        description: "Nepodarilo sa zrušiť označenie cvičenia.",
        variant: "destructive"
      });
    }
  };

  const addCompletion = async (): Promise<boolean> => {
    if (!user) return false;
    
    try {
      const data = await addCompletionClick(user.id, assessmentId, exerciseTitle);
      const now = new Date();
      
      // Update local state
      setCompletionCount(prev => prev + 1);
      setLastCompletedAt(now);
      setLatestClickId(data.id);
      setCooldownActive(true);
      
      toast({
        title: "Cvičenie označené ako odcvičené",
        description: "Váš pokrok bol úspešne uložený.",
      });
      
      emitExerciseCompletedEvent(assessmentId, exerciseTitle);
      
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
    lastCompletedAt,
    latestClickId,
    resetCompletion,
    addCompletion
  };
};
