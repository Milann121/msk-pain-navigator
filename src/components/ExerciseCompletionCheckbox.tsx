
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';

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

  const handleCheckboxChange = async (checked: boolean) => {
    if (!user) return;
    
    setIsCompleted(checked);
    
    try {
      if (checked) {
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
      setIsCompleted(!checked); // Revert UI state on error
      toast({
        title: "Chyba pri ukladaní",
        description: "Nepodarilo sa uložiť zmenu stavu cvičenia.",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return <div className="h-5 w-5 animate-pulse bg-gray-200 rounded" />;
  }

  return (
    <div className="flex items-center space-x-2 mt-2">
      <Checkbox 
        id={`exercise-${exerciseTitle}`}
        checked={isCompleted}
        onCheckedChange={handleCheckboxChange}
      />
      <label 
        htmlFor={`exercise-${exerciseTitle}`}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Odcvičené
      </label>
    </div>
  );
};
