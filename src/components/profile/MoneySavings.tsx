
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PiggyBank } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export const MoneySavings = () => {
  const { user } = useAuth();
  const [totalSavings, setTotalSavings] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const calculateSavings = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // Count exercise completions (35€ each)
        const { data: exerciseCompletions, error: exerciseError } = await supabase
          .from('exercise_completion_clicks')
          .select('id')
          .eq('user_id', user.id)
          .eq('is_active', true);

        if (exerciseError) throw exerciseError;

        // Count completed assessments (50€ each)
        const { data: assessments, error: assessmentError } = await supabase
          .from('user_assessments')
          .select('id')
          .eq('user_id', user.id);

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

    calculateSavings();

    // Listen for exercise completion events to update savings
    const handleExerciseCompleted = () => {
      calculateSavings();
    };

    window.addEventListener('exercise-completed', handleExerciseCompleted);

    // Set up real-time subscription for exercise completions
    const exerciseChannel = supabase
      .channel('money_savings_exercise_updates')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'exercise_completion_clicks',
          filter: `user_id=eq.${user?.id}`
        }, 
        () => {
          calculateSavings();
        }
      )
      .subscribe();

    // Set up real-time subscription for new assessments
    const assessmentChannel = supabase
      .channel('money_savings_assessment_updates')
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'user_assessments',
          filter: `user_id=eq.${user?.id}`
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
  }, [user]);

  if (loading) {
    return (
      <div className="mb-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
        <div className="flex items-center gap-2 mb-2">
          <PiggyBank className="h-5 w-5 text-green-600" />
          <span className="font-semibold text-green-800">Ušetrené peniaze</span>
        </div>
        <div className="animate-pulse bg-green-200 h-8 w-24 rounded"></div>
      </div>
    );
  }

  return (
    <div className="mb-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
      <div className="flex items-center gap-2 mb-2">
        <PiggyBank className="h-5 w-5 text-green-600" />
        <span className="font-semibold text-green-800">Ušetrené peniaze</span>
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
