
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface AssessmentExerciseStatsProps {
  assessmentId: string;
}

export const AssessmentExerciseStats = ({ assessmentId }: AssessmentExerciseStatsProps) => {
  const [totalCompletions, setTotalCompletions] = useState(0);
  const [lastCompletionDate, setLastCompletionDate] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchExerciseStats = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('exercise_completion_clicks')
          .select('clicked_at')
          .eq('user_id', user.id)
          .eq('assessment_id', assessmentId)
          .eq('is_active', true)
          .order('clicked_at', { ascending: false });
          
        if (error) {
          console.error('Error fetching exercise stats:', error);
          return;
        }
        
        setTotalCompletions(data?.length || 0);
        setLastCompletionDate(data && data.length > 0 ? data[0].clicked_at : null);
      } catch (error) {
        console.error('Error fetching exercise stats:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchExerciseStats();
    
    // Listen for exercise completion events
    const handleExerciseCompleted = (event: CustomEvent) => {
      if (event.detail.assessmentId === assessmentId) {
        fetchExerciseStats();
      }
    };
    
    window.addEventListener('exercise-completed', handleExerciseCompleted as EventListener);
    
    return () => {
      window.removeEventListener('exercise-completed', handleExerciseCompleted as EventListener);
    };
  }, [user, assessmentId]);

  if (loading) {
    return <div className="text-sm text-gray-500">Načítava sa...</div>;
  }

  if (totalCompletions === 0) {
    return <div className="text-sm text-gray-500">Žiadne cvičenia dnes</div>;
  }

  return (
    <div className="space-y-1">
      <div className="text-sm font-medium text-gray-700">
        Odcvičené: {totalCompletions}x
      </div>
      {lastCompletionDate && (
        <div className="text-sm text-gray-600">
          Posledné cvičenie: {new Date(lastCompletionDate).toLocaleDateString('sk-SK')}
        </div>
      )}
    </div>
  );
};
