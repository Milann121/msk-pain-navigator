
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Dumbbell } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export const ExerciseStats = () => {
  const { user } = useAuth();
  const [exerciseCount, setExerciseCount] = useState(0);
  const [weeklyExerciseGoal, setWeeklyExerciseGoal] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!user) return;

      try {
        setLoading(true);

        // Load weekly exercise goal
        const { data: goalData } = await supabase
          .from('user_goals')
          .select('goal_value')
          .eq('user_id', user.id)
          .eq('goal_type', 'weekly_exercise')
          .single();

        if (goalData) {
          setWeeklyExerciseGoal(goalData.goal_value);
        }

        // Calculate start of current week (Monday)
        const now = new Date();
        const currentDay = now.getDay();
        const daysFromMonday = currentDay === 0 ? 6 : currentDay - 1; // Sunday is 0, adjust to make Monday the start
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - daysFromMonday);
        startOfWeek.setHours(0, 0, 0, 0);

        // For now, we'll use a placeholder count of 0 since the actual exercise tracking database will be created later
        // TODO: Replace this with actual exercise completion data when database is implemented
        setExerciseCount(0);
      } catch (error) {
        console.error('Error loading exercise stats:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Dumbbell className="h-5 w-5" />
            Moje cvičenia
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-gray-500">Načítava sa...</div>
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
          Moje cvičenia
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
              {weeklyExerciseGoal 
                ? "dní odcvičených tento týždeň"
                : "dní odcvičených tento týždeň"
              }
            </p>
          </div>

          {/* Progress bar */}
          {weeklyExerciseGoal && (
            <>
              <Progress value={progressPercentage} className="h-2" />
              <div className="text-center">
                {exerciseCount >= weeklyExerciseGoal ? (
                  <p className="text-sm text-green-600 font-medium">
                    🎉 Gratulujeme! Splnili ste svoj týždenný cieľ.
                  </p>
                ) : (
                  <p className="text-sm text-gray-500">
                    Zostáva {weeklyExerciseGoal - exerciseCount} dní do splnenia cieľa.
                  </p>
                )}
              </div>
            </>
          )}

          {!weeklyExerciseGoal && (
            <p className="text-xs text-gray-500 text-center">
              Nastavte si týždenný cieľ v sekcii "Moje ciele" na stránke profilu.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
