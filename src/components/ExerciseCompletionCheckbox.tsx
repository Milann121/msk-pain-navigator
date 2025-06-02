
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
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [lastCompletedAt, setLastCompletedAt] = useState<Date | null>(null);
  const [cooldownActive, setCooldownActive] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [completionCount, setCompletionCount] = useState(0);
  const { user } = useAuth();
  const { toast } = useToast();

  // Set cooldown to 60 seconds (1 minute)
  const COOLDOWN_SECONDS = 60; 

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
        }
        
        if (data && data.length > 0) {
          const lastCompleted = new Date(data[0].completed_at);
          setLastCompletedAt(lastCompleted);
          setCompletionCount(data.length);
          
          // Check if the cooldown is still active
          const now = new Date();
          const timeDiffSeconds = (now.getTime() - lastCompleted.getTime()) / 1000;
          const cooldownRemaining = Math.max(0, COOLDOWN_SECONDS - timeDiffSeconds);
          
          setCooldownActive(cooldownRemaining > 0);
          setSecondsLeft(Math.ceil(cooldownRemaining));
        } else {
          // Reset states if no completion records found
          setLastCompletedAt(null);
          setCooldownActive(false);
          setSecondsLeft(0);
          setCompletionCount(0);
        }
        
        setIsCompleted(!!data && data.length > 0);
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
      
      // Always insert a new record without constraints
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
      
      setIsCompleted(true);
      setLastCompletedAt(now);
      setCooldownActive(true);
      setSecondsLeft(COOLDOWN_SECONDS);
      setCompletionCount(prev => prev + 1);
      
      // Show celebration animation
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000); // Hide after 3 seconds
      
      toast({
        title: "Cvičenie označené ako odcvičené",
        description: `Celkovo odcvičené: ${completionCount + 1}x`,
      });
      
      // Manually emit a custom event to signal the update
      const event = new CustomEvent('exercise-completed', {
        detail: { assessmentId, exerciseTitle, newCount: completionCount + 1 }
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

  return (
    <>
      <div className="flex flex-col items-center gap-2">
        {completionCount > 0 && (
          <div className="text-sm text-green-600 font-medium">
            Odcvičené: {completionCount}x
          </div>
        )}
        <Button 
          onClick={handleButtonClick}
          className={`relative ${
            isCompleted 
              ? cooldownActive 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-green-600 hover:bg-green-700' 
              : 'bg-green-600 hover:bg-green-700'
          }`}
          disabled={cooldownActive}
          size="lg"
        >
          {cooldownActive ? (
            <div className="flex items-center gap-2">
              <Timer className="h-4 w-4" />
              <span>Dostupné za {secondsLeft} s</span>
            </div>
          ) : isCompleted ? (
            <>
              <Check className="mr-2 h-4 w-4" /> Odcvičené znovu
            </>
          ) : (
            'Označiť ako odcvičené'
          )}
        </Button>
      </div>
      {showCelebration && (
        <CelebrationAnimation isActive={showCelebration} onComplete={() => setShowCelebration(false)} />
      )}
    </>
  );
};
