
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { getTodayStart } from '@/components/exercise-completion/dateUtils';

interface AssessmentExerciseStatsProps {
  assessmentId: string;
}

export const AssessmentExerciseStats = ({ assessmentId }: AssessmentExerciseStatsProps) => {
  const [exerciseStats, setExerciseStats] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchExerciseStats = async () => {
      if (!user) return;
      
      try {
        const todayStart = getTodayStart();
        
        const { data, error } = await supabase
          .from('exercise_completion_clicks')
          .select('exercise_title')
          .eq('user_id', user.id)
          .eq('assessment_id', assessmentId)
          .eq('is_active', true)
          .gte('clicked_at', todayStart.toISOString());
          
        if (error) {
          console.error('Error fetching exercise stats:', error);
          return;
        }
        
        // Count clicks per exercise
        const stats: Record<string, number> = {};
        (data || []).forEach(item => {
          stats[item.exercise_title] = (stats[item.exercise_title] || 0) + 1;
        });
        
        setExerciseStats(stats);
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

  const totalExercises = Object.values(exerciseStats).reduce((sum, count) => sum + count, 0);
  
  if (totalExercises === 0) {
    return <div className="text-sm text-gray-500">Žiadne cvičenia dnes</div>;
  }

  return (
    <div className="space-y-1">
      <div className="text-sm font-medium text-gray-700">
        Odcvičené: {totalExercises}x dnes
      </div>
      {Object.entries(exerciseStats).map(([exerciseTitle, count]) => (
        <div key={exerciseTitle} className="text-xs text-gray-600 ml-2">
          • {exerciseTitle}: {count}x
        </div>
      ))}
    </div>
  );
};
