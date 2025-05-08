
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
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

  const COOLDOWN_MINUTES = 30; // 30-minute cooldown

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
          
        if (error && error.code !== 'PGRST116') {
          console.error('Error checking completion status:', error);
        }
        
        if (data && data.length > 0) {
          const lastCompleted = new Date(data[0].completed_at);
          setLastCompletedAt(lastCompleted);
          
          // Check if the cooldown is still active
          const now = new Date();
          const timeDiffMinutes = (now.getTime() - lastCompleted.getTime()) / (1000 * 60);
          setCooldownActive(timeDiffMinutes < COOLDOWN_MINUTES);
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
        const timeDiffMinutes = (now.getTime() - lastCompletedAt.getTime()) / (1000 * 60);
        setCooldownActive(timeDiffMinutes < COOLDOWN_MINUTES);
      }
    }, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, [user, exerciseTitle, assessmentId, lastCompletedAt]);

  const handleButtonClick = async () => {
    if (!user) return;
    
    // If cooldown is active, show toast and return
    if (cooldownActive) {
      const now = new Date();
      const timeDiffMinutes = (now.getTime() - lastCompletedAt!.getTime()) / (1000 * 60);
      const minutesLeft = Math.ceil(COOLDOWN_MINUTES - timeDiffMinutes);
      
      toast({
        title: "Cvičenie už bolo označené",
        description: `Cvičenie môžete označiť znova za ${minutesLeft} minút.`,
        variant: "destructive"
      });
      return;
    }
    
    try {
      const now = new Date();
      
      // Add new completion record
      const { error } = await supabase
        .from('completed_exercises')
        .insert({
          user_id: user.id,
          assessment_id: assessmentId,
          exercise_title: exerciseTitle
        });
        
      if (error) {
        throw error;
      }
      
      setIsCompleted(true);
      setLastCompletedAt(now);
      setCooldownActive(true);
      
      // Show celebration animation
      setShowCelebration(true);
      
      toast({
        title: "Cvičenie označené ako odcvičené",
        description: "Váš pokrok bol úspešne uložený.",
      });
    } catch (error) {
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
    const timeDiffMinutes = (now.getTime() - lastCompletedAt.getTime()) / (1000 * 60);
    const minutesLeft = Math.ceil(COOLDOWN_MINUTES - timeDiffMinutes);
    
    return `Dostupné za ${minutesLeft} min`;
  };

  return (
    <>
      <Button 
        onClick={handleButtonClick}
        className={`mt-4 ${
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
      <CelebrationAnimation isActive={showCelebration} onComplete={() => setShowCelebration(false)} />
    </>
  );
};
