
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { CelebrationAnimation } from './CelebrationAnimation';

interface ExerciseCompletionCheckboxProps {
  exerciseTitle: string;
  assessmentId: string;
  videoId?: string;
}

export const ExerciseCompletionCheckbox = ({ exerciseTitle, assessmentId, videoId }: ExerciseCompletionCheckboxProps) => {
  const [completionCount, setCompletionCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [lastCompletedAt, setLastCompletedAt] = useState<Date | null>(null);
  const [cooldownActive, setCooldownActive] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  // Set cooldown to 1 minute (60 seconds)
  const COOLDOWN_SECONDS = 60; 

  // Helper function to check if it's a new day
  const isNewDay = (lastDate: Date, currentDate: Date) => {
    return lastDate.toDateString() !== currentDate.toDateString();
  };

  // Helper function to get today's start time (00:00)
  const getTodayStart = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  };

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
  }, [user, exerciseTitle, assessmentId, lastCompletedAt]);

  const handleButtonClick = async () => {
    if (!user) return;
    
    // If cooldown is active, reset the state (unclick)
    if (cooldownActive) {
      try {
        // Delete the most recent completion for today
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
      return;
    }
    
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
      
      // Show celebration animation
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
      
      toast({
        title: "Cvičenie označené ako odcvičené",
        description: "Váš pokrok bol úspešne uložený.",
      });
      
      // Emit custom event to signal the update
      const event = new CustomEvent('exercise-completed', {
        detail: { assessmentId, exerciseTitle }
      });
      window.dispatchEvent(event);
      
    } catch (error: any) {
      console.error('Error updating completion status:', error);
      toast({
        title: "Chyba pri ukladaní",
        description: "Nepodarilo sa uložiť zmenu stavu cvičenia.",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return <div className="h-10 w-48 animate-pulse bg-gray-200 rounded" />;
  }

  // Determine button text and styling based on state
  const getButtonContent = () => {
    if (completionCount > 0) {
      return (
        <div className="flex items-center gap-2">
          <Check className="h-4 w-4" />
          <span>Odcvičené dnes ({completionCount})</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-2">
          <Check className="h-4 w-4" />
          <span>Odcvičené dnes</span>
        </div>
      );
    }
  };

  const getButtonStyle = () => {
    if (completionCount > 0) {
      return 'bg-green-600 hover:bg-green-700 text-white';
    } else {
      return 'bg-blue-600 hover:bg-blue-700 text-white';
    }
  };

  return (
    <>
      <Button 
        onClick={handleButtonClick}
        className={`${getButtonStyle()} flex items-center gap-2`}
        variant="outline"
      >
        {getButtonContent()}
      </Button>
      {showCelebration && (
        <CelebrationAnimation isActive={showCelebration} onComplete={() => setShowCelebration(false)} />
      )}
    </>
  );
};
