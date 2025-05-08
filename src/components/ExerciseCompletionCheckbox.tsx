
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface ExerciseCompletionCheckboxProps {
  exerciseTitle: string;
  assessmentId: string;
}

export const ExerciseCompletionCheckbox = ({ exerciseTitle, assessmentId }: ExerciseCompletionCheckboxProps) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

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
          .single();
          
        if (error && error.code !== 'PGRST116') {
          console.error('Error checking completion status:', error);
        }
        
        setIsCompleted(!!data);
      } catch (error) {
        console.error('Error checking completion status:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkCompletionStatus();
  }, [user, exerciseTitle, assessmentId]);

  const handleButtonClick = async () => {
    if (!user) return;
    
    const newCompletionStatus = !isCompleted;
    setIsCompleted(newCompletionStatus);
    
    try {
      if (newCompletionStatus) {
        // Add completion record
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
        
        toast({
          title: "Cvičenie označené ako odcvičené",
          description: "Váš pokrok bol úspešne uložený.",
        });
      } else {
        // Remove completion record
        const { error } = await supabase
          .from('completed_exercises')
          .delete()
          .eq('user_id', user.id)
          .eq('assessment_id', assessmentId)
          .eq('exercise_title', exerciseTitle);
          
        if (error) {
          throw error;
        }
        
        toast({
          title: "Cvičenie odznačené",
          description: "Záznam o dokončení bol odstránený.",
        });
      }
    } catch (error) {
      console.error('Error updating completion status:', error);
      setIsCompleted(!newCompletionStatus); // Revert UI state on error
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
    <Button 
      onClick={handleButtonClick}
      className={`mt-4 ${isCompleted ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
      size="lg"
    >
      {isCompleted ? (
        <>
          <Check className="mr-2 h-4 w-4" /> Odcvičené
        </>
      ) : (
        'Označiť ako odcvičené'
      )}
    </Button>
  );
};
