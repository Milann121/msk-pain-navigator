
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Euro } from 'lucide-react';
import { format } from 'date-fns';

export const MoneySavings = () => {
  const { user } = useAuth();
  const [totalSavings, setTotalSavings] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      calculateSavings();
      
      // Listen for exercise completion events
      const handleExerciseCompleted = () => {
        calculateSavings();
      };
      
      window.addEventListener('exercise-completed', handleExerciseCompleted);
      
      // Set up real-time subscription for exercise completions
      const exerciseChannel = supabase
        .channel('exercise_completion_clicks')
        .on('postgres_changes', 
          { 
            event: '*', 
            schema: 'public', 
            table: 'exercise_completion_clicks',
            filter: `user_id=eq.${user.id}`
          }, 
          () => {
            calculateSavings();
          }
        )
        .subscribe();

      // Set up real-time subscription for assessment completions
      const assessmentChannel = supabase
        .channel('user_assessments')
        .on('postgres_changes', 
          { 
            event: '*', 
            schema: 'public', 
            table: 'user_assessments',
            filter: `user_id=eq.${user.id}`
          }, 
          () => {
            calculateSavings();
          }
        )
        .subscribe();
      
      return () => {
        window.removeEventListener('exercise-completed', handleExerciseCompleted);
        supabase.removeChannel(exerciseChannel);
        supabase.removeChannel(assessmentChannel);
      };
    }
  }, [user]);

  const calculateSavings = async () => {
    if (!user) return;
    
    setLoading(true);
    
    try {
      // Get active exercise completions
      const { data: exerciseCompletions, error: exerciseError } = await supabase
        .from('exercise_completion_clicks')
        .select('clicked_at')
        .eq('user_id', user.id)
        .eq('is_active', true);

      if (exerciseError) throw exerciseError;

      // Group exercise completions by date (only count once per day)
      const uniqueDays = new Set();
      if (exerciseCompletions) {
        exerciseCompletions.forEach(completion => {
          const date = format(new Date(completion.clicked_at), 'yyyy-MM-dd');
          uniqueDays.add(date);
        });
      }

      // Count completed assessments (50€ each)
      const { data: assessments, error: assessmentError } = await supabase
        .from('user_assessments')
        .select('id')
        .eq('user_id', user.id);

      if (assessmentError) throw assessmentError;

      // Calculate total: 35€ per unique day of exercise + 50€ per assessment
      const exerciseSavings = uniqueDays.size * 35;
      const assessmentSavings = (assessments?.length || 0) * 50;
      const total = exerciseSavings + assessmentSavings;

      setTotalSavings(total);
    } catch (error) {
      console.error('Error calculating savings:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Euro className="h-6 w-6 text-green-600" />
          <h3 className="text-xl font-semibold text-green-800">Ušetrené peniaze</h3>
        </div>
        <div className="text-green-600">Načítava sa...</div>
      </div>
    );
  }

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <div className="flex items-center justify-center gap-2 mb-6">
        <Euro className="h-8 w-8 text-green-600" />
        <h3 className="text-2xl font-semibold text-green-800">Ušetrené peniaze</h3>
      </div>
      <div className="text-8xl font-bold text-green-700 mb-6">
        {totalSavings}€
      </div>
      <p className="text-base text-green-600 text-center px-4">
        *vypočítané na základe priemerných cien na Slovensku
      </p>
    </div>
  );
};
