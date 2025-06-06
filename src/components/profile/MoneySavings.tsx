
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Euro } from 'lucide-react';

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
        .channel('assessments')
        .on('postgres_changes', 
          { 
            event: '*', 
            schema: 'public', 
            table: 'assessments',
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
      // Count active exercise completions (35€ each)
      const { data: exerciseCompletions, error: exerciseError } = await supabase
        .from('exercise_completion_clicks')
        .select('id')
        .eq('user_id', user.id)
        .eq('is_active', true);

      if (exerciseError) throw exerciseError;

      // Count completed assessments (50€ each)
      const { data: assessments, error: assessmentError } = await supabase
        .from('assessments')
        .select('id')
        .eq('user_id', user.id)
        .eq('status', 'completed');

      if (assessmentError) throw assessmentError;

      const exerciseSavings = (exerciseCompletions?.length || 0) * 35;
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
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Euro className="h-5 w-5 text-green-600" />
          <h3 className="font-semibold text-green-800">Ušetrené peniaze</h3>
        </div>
        <div className="text-green-600">Načítava sa...</div>
      </div>
    );
  }

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
      <div className="flex items-center gap-2 mb-2">
        <Euro className="h-5 w-5 text-green-600" />
        <h3 className="font-semibold text-green-800">Ušetrené peniaze</h3>
      </div>
      <div className="text-2xl font-bold text-green-700 mb-1">
        {totalSavings}€
      </div>
      <p className="text-xs text-green-600">
        *vypočítané na základe priemerných cien na Slovensku
      </p>
    </div>
  );
};
