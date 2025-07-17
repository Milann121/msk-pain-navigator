import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export const useWeeklyGoalStatus = () => {
  const { user } = useAuth();
  const [isGoalMet, setIsGoalMet] = useState(false);
  const [hasActivePrograms, setHasActivePrograms] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkGoalStatus = async () => {
      if (!user) return;

      try {
        // Check if user has active programs
        const { data: activePrograms } = await supabase
          .from('user_program_tracking')
          .select('id')
          .eq('user_id', user.id)
          .eq('program_status', 'active');

        const hasActive = activePrograms && activePrograms.length > 0;
        setHasActivePrograms(hasActive);

        if (!hasActive) {
          setIsGoalMet(false);
          setLoading(false);
          return;
        }

        // Get user's weekly goal
        const { data: goalData } = await supabase
          .from('user_goals')
          .select('weekly_exercises_goal')
          .eq('user_id', user.id)
          .eq('goal_type', 'weekly_exercise')
          .order('created_at', { ascending: false })
          .limit(1);

        if (!goalData || goalData.length === 0) {
          setIsGoalMet(false);
          setLoading(false);
          return;
        }

        const weeklyGoal = goalData[0].weekly_exercises_goal;

        // Calculate current week start (Monday)
        const now = new Date();
        const currentDay = now.getDay();
        const daysToMonday = currentDay === 0 ? 6 : currentDay - 1;
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - daysToMonday);
        weekStart.setHours(0, 0, 0, 0);

        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        weekEnd.setHours(23, 59, 59, 999);

        // Count unique days with exercise completions this week
        const { data: completions } = await supabase
          .from('exercise_completion_clicks')
          .select('clicked_at')
          .eq('user_id', user.id)
          .eq('is_active', true)
          .gte('clicked_at', weekStart.toISOString())
          .lte('clicked_at', weekEnd.toISOString());

        // Count unique days
        const uniqueDays = new Set(
          completions?.map(c => 
            new Date(c.clicked_at).toDateString()
          ) || []
        ).size;

        setIsGoalMet(uniqueDays >= weeklyGoal);
      } catch (error) {
        console.error('Error checking goal status:', error);
        setIsGoalMet(false);
      } finally {
        setLoading(false);
      }
    };

    checkGoalStatus();
  }, [user]);

  return { isGoalMet, hasActivePrograms, loading };
};