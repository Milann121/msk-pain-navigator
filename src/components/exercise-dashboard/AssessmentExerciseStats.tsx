
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface AssessmentExerciseStatsProps {
  assessmentId: string;
}

export const AssessmentExerciseStats = ({ assessmentId }: AssessmentExerciseStatsProps) => {
  const [uniqueDaysCount, setUniqueDaysCount] = useState(0);
  const [lastCompletionDate, setLastCompletionDate] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
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
        
        if (data && data.length > 0) {
          // Extract unique dates from clicked_at timestamps
          const uniqueDates = new Set();
          data.forEach(item => {
            const date = new Date(item.clicked_at).toDateString();
            uniqueDates.add(date);
          });
          
          setUniqueDaysCount(uniqueDates.size);
          setLastCompletionDate(data[0].clicked_at);
        } else {
          setUniqueDaysCount(0);
          setLastCompletionDate(null);
        }
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
    return <div className="text-sm text-gray-500">{t('loading')}</div>;
  }

  if (uniqueDaysCount === 0) {
    return <div className="text-sm text-gray-500">Žiadne cvičenia dnes</div>;
  }

  return (
    <div className="space-y-1">
      <div className="text-sm font-medium text-gray-700">
        Odcvičené: {uniqueDaysCount}x
      </div>
      {lastCompletionDate && (
        <div className="text-sm text-gray-600">
          Posledné cvičenie: {new Date(lastCompletionDate).toLocaleDateString('sk-SK')}
        </div>
      )}
    </div>
  );
};
