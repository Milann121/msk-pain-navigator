
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
}

export const ExerciseCompletionCheckbox = ({ exerciseTitle, assessmentId }: ExerciseCompletionCheckboxProps) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [lastCompletedAt, setLastCompletedAt] = useState<Date | null>(null);
  const [cooldownActive, setCooldownActive] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  // Reduced cooldown to make the button more quickly clickable again
  const COOLDOWN_SECONDS = 2; 

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
          .order('completed_at', { ascending: false })
          .limit(1);
          
        if (error) {
          console.error('Error checking completion status:', error);
        }
        
        if (data && data.length > 0) {
          const lastCompleted = new Date(data[0].completed_at);
          setLastCompletedAt(lastCompleted);
          
          // Check if the cooldown is still active
          const now = new Date();
          const timeDiffSeconds = (now.getTime() - lastCompleted.getTime()) / 1000;
          setCooldownActive(timeDiffSeconds < COOLDOWN_SECONDS);
        }
        
        setIsCompleted(!!data && data.length > 0);
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
        setCooldownActive(timeDiffSeconds < COOLDOWN_SECONDS);
      }
    }, 500); // Check more frequently to update the button state
    
    return () => clearInterval(interval);
  }, [user, exerciseTitle, assessmentId, lastCompletedAt]);

  const handleButtonClick = async () => {
    if (!user) return;
    
    // If cooldown is active, show toast and return
    if (cooldownActive) {
      const now = new Date();
      const timeDiffSeconds = (now.getTime() - lastCompletedAt!.getTime()) / 1000;
      const secondsLeft = Math.ceil(COOLDOWN_SECONDS - timeDiffSeconds);
      
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
      
      // Show celebration animation
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000); // Hide after 3 seconds
      
      toast({
        title: "Cvičenie označené ako odcvičené",
        description: "Váš pokrok bol úspešne uložený.",
      });
      
      // Manually emit a custom event to signal the update
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

  // Format remaining cooldown time
  const getCooldownText = () => {
    if (!lastCompletedAt || !cooldownActive) return '';
    
    const now = new Date();
    const timeDiffSeconds = (now.getTime() - lastCompletedAt.getTime()) / 1000;
    const secondsLeft = Math.ceil(COOLDOWN_SECONDS - timeDiffSeconds);
    
    return `Dostupné za ${secondsLeft} s`;
  };

  return (
    <>
      <Button 
        onClick={handleButtonClick}
        className={`mt-4 relative ${
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
          getCooldownText()
        ) : isCompleted ? (
          <>
            <Check className="mr-2 h-4 w-4" /> Odcvičené znovu
          </>
        ) : (
          'Označiť ako odcvičené'
        )}
      </Button>
      {showCelebration && (
        <CelebrationAnimation isActive={showCelebration} onComplete={() => setShowCelebration(false)} />
      )}
    </>
  );
};
