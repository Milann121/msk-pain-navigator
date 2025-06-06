
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BookOpen } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export const BlogReadingStats = () => {
  const { user } = useAuth();
  const [blogReadCount, setBlogReadCount] = useState(0);
  const [weeklyBlogGoal, setWeeklyBlogGoal] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!user) return;

      try {
        setLoading(true);

        // Load weekly blog goal
        const { data: goalData } = await supabase
          .from('user_goals')
          .select('goal_value')
          .eq('user_id', user.id)
          .eq('goal_type', 'weekly_blog')
          .single();

        if (goalData) {
          setWeeklyBlogGoal(goalData.goal_value);
        }

        // Calculate start of current week (Monday)
        const now = new Date();
        const currentDay = now.getDay();
        const daysFromMonday = currentDay === 0 ? 6 : currentDay - 1; // Sunday is 0, adjust to make Monday the start
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - daysFromMonday);
        startOfWeek.setHours(0, 0, 0, 0);

        // Load blog reading activity for current week
        const { data: readData } = await supabase
          .from('blog_read_activity')
          .select('id')
          .eq('user_id', user.id)
          .gte('read_at', startOfWeek.toISOString());

        setBlogReadCount(readData?.length || 0);
      } catch (error) {
        console.error('Error loading blog stats:', error);
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
            <BookOpen className="h-5 w-5" />
            Čítanie blogov
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-gray-500">Načítava sa...</div>
        </CardContent>
      </Card>
    );
  }

  const progressPercentage = weeklyBlogGoal ? Math.min((blogReadCount / weeklyBlogGoal) * 100, 100) : 0;
  const goalText = weeklyBlogGoal ? `${blogReadCount} / ${weeklyBlogGoal}` : `${blogReadCount} / -`;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Čítanie blogov
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Týždenný pokrok</span>
            <span className="text-sm font-medium">{goalText}</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          {weeklyBlogGoal ? (
            <p className="text-xs text-gray-500">
              {blogReadCount >= weeklyBlogGoal 
                ? "Gratulujeme! Splnili ste svoj týždenný cieľ."
                : `Zostáva ${weeklyBlogGoal - blogReadCount} blogov do splnenia cieľa.`
              }
            </p>
          ) : (
            <p className="text-xs text-gray-500">
              Nastavte si týždenný cieľ v sekcii "Moje ciele" na stránke profilu.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
