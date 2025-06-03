
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Check, Timer } from 'lucide-react';
import { CelebrationAnimation } from './CelebrationAnimation';

interface ExerciseCompletionCheckboxProps {
  exerciseTitle: string;
  assessmentId: string;
}

export const ExerciseCompletionCheckbox = ({ exerciseTitle, assessmentId }: ExerciseCompletionCheckboxProps) => {
  const [completionCount, setCompletionCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [lastCompletedAt, setLastCompletedAt] = useState<Date | null>(null);
  const [cooldownActive, setCooldownActive] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const { user } = useAuth();
  const { toast } = useToast();

  // Set cooldown to 5 seconds
  const COOLDOWN_SECONDS = 5; 

  useEffect(() => {
    const checkCompletionStatus = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('completed_exercises')
          .select('*')
          .eq('user_id', user.id)
          .eq('assessment_id', assessmentId)
          .eq('exercise_title', exerciseTitle)
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
            setSecondsLeft(Math.ceil(cooldownRemaining));
          } else {
            setCooldownActive(false);
            setSecondsLeft(0);
          }
        } else {
          setLastCompletedAt(null);
          setCooldownActive(false);
          setSecondsLeft(0);
        }
      } catch (error) {
        console.error('Error checking completion status:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkCompletionStatus();
    
    // Set up interval to check cooldown status and update countdown
    const interval = setInterval(() => {
      if (lastCompletedAt) {
        const now = new Date();
        const timeDiffSeconds = (now.getTime() - lastCompletedAt.getTime()) / 1000;
        const cooldownRemaining = Math.max(0, COOLDOWN_SECONDS - timeDiffSeconds);
        
        setSecondsLeft(Math.ceil(cooldownRemaining));
        
        if (cooldownRemaining <= 0) {
          setCooldownActive(false);
          setSecondsLeft(0);
        } else {
          setCooldownActive(true);
        }
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [user, exerciseTitle, assessmentId, lastCompletedAt]);

  const handleButtonClick = async () => {
    if (!user) return;
    
    // If cooldown is active, show toast and return
    if (cooldownActive) {
      toast({
        title: "Prosím, počkajte",
        description: `Môžete odcvičiť znova za ${secondsLeft} sekúnd.`,
        variant: "default"
      });
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
      setSecondsLeft(COOLDOWN_SECONDS);
      
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
    return <div className="h-10 w-32 animate-pulse bg-gray-200 rounded" />;
  }

  // Determine button text and styling based on state
  const getButtonContent = () => {
    if (cooldownActive) {
      return (
        <div className="flex items-center gap-2">
          <Timer className="h-4 w-4" />
          <span>Dostupné za {secondsLeft} s</span>
        </div>
      );
    } else if (completionCount > 0) {
      return 'Odcvičiť znovu';
    } else {
      return 'Označiť ako odcvičené';
    }
  };

  const getButtonStyle = () => {
    if (cooldownActive) {
      return 'bg-gray-400 cursor-not-allowed hover:bg-gray-400';
    } else {
      return 'bg-green-600 hover:bg-green-700';
    }
  };

  return (
    <>
      <Button 
        onClick={handleButtonClick}
        className={`mt-4 relative ${getButtonStyle()}`}
        disabled={cooldownActive}
        size="lg"
      >
        {getButtonContent()}
      </Button>
      {showCelebration && (
        <CelebrationAnimation isActive={showCelebration} onComplete={() => setShowCelebration(false)} />
      )}
    </>
  );
};
