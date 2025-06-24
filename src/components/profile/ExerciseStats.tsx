
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Dumbbell } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { startOfWeek, endOfWeek, format } from 'date-fns';

interface ExerciseStatsProps {
  weeklyExerciseGoal?: number | null;
  onGoalUpdate?: () => void;
}

export const ExerciseStats = ({ weeklyExerciseGoal, onGoalUpdate }: ExerciseStatsProps) => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [exerciseCount, setExerciseCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!user) return;

      try {
        setLoading(true);

        // Calculate start and end of current week (Monday to Sunday)
        const now = new Date();
        const weekStart = startOfWeek(now, { weekStartsOn: 1 });
        const weekEnd = endOfWeek(now, { weekStartsOn: 1 });

        // Get exercise completion clicks for this week
        const { data, error } = await supabase
          .from('exercise_completion_clicks')
          .select('clicked_at')
          .eq('user_id', user.id)
          .eq('is_active', true)
          .gte('clicked_at', weekStart.toISOString())
          .lte('clicked_at', weekEnd.toISOString());

        if (error) throw error;

        // Count unique days with exercises this week
        const uniqueDays = new Set();
        data?.forEach(exercise => {
          const exerciseDate = new Date(exercise.clicked_at);
          const dateKey = format(exerciseDate, 'yyyy-MM-dd');
          uniqueDays.add(dateKey);
        });

        setExerciseCount(uniqueDays.size);
      } catch (error) {
        console.error('Error loading exercise stats:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();

    // Set up real-time subscription to exercise completion clicks changes
    const channel = supabase
      .channel('exercise_stats_completion_clicks')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'exercise_completion_clicks',
          filter: `user_id=eq.${user?.id}`
        }, 
        () => {
          loadData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Dumbbell className="h-5 w-5" />
            {t('home.exerciseStats.title')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-gray-500">{t('loading')}</div>
        </CardContent>
      </Card>
    );
  }

  const progressPercentage = weeklyExerciseGoal ? Math.min((exerciseCount / weeklyExerciseGoal) * 100, 100) : 0;

  return (
    <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Dumbbell className="h-5 w-5" />
            {t('home.exerciseStats.title')}
          </CardTitle>
        </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Large number display */}
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {exerciseCount}
              {weeklyExerciseGoal && (
                <span className="text-2xl text-gray-400 ml-1">/ {weeklyExerciseGoal}</span>
              )}
            </div>
            <p className="text-sm text-gray-600">
              {t('home.exerciseStats.weekLabel')}
            </p>
          </div>

          {/* Progress bar */}
          {weeklyExerciseGoal && (
            <>
              <Progress value={progressPercentage} className="h-2" />
              <div className="text-center">
                {exerciseCount >= weeklyExerciseGoal ? (
                  <p className="text-sm text-green-600 font-medium">
                    {t('home.exerciseStats.goalDone')}
                  </p>
                ) : (
                  <p className="text-sm text-gray-500">
                    {t('home.exerciseStats.goalRemaining', { count: weeklyExerciseGoal - exerciseCount })}
                  </p>
                )}
              </div>
            </>
          )}

          {!weeklyExerciseGoal && (
            <p className="text-xs text-gray-500 text-center">
              {t('home.exerciseStats.noGoal')}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
