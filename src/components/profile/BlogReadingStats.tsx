
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BookOpen } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface BlogReadingStatsProps {
  weeklyBlogGoal?: number | null;
}

export const BlogReadingStats = ({ weeklyBlogGoal }: BlogReadingStatsProps) => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [blogCount, setBlogCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!user) return;

      try {
        setLoading(true);

        // Calculate start of current week (Monday)
        const now = new Date();
        const currentDay = now.getDay();
        const daysFromMonday = currentDay === 0 ? 6 : currentDay - 1;
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - daysFromMonday);
        startOfWeek.setHours(0, 0, 0, 0);

        // Get read blogs for this week from blog_read_activity table
        const { data, error } = await supabase
          .from('blog_read_activity')
          .select('read_at')
          .eq('user_id', user.id)
          .gte('read_at', startOfWeek.toISOString());

        if (error) throw error;

        setBlogCount(data?.length || 0);
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
          <div className="text-gray-500">{t('loading')}</div>
        </CardContent>
      </Card>
    );
  }

  const progressPercentage = weeklyBlogGoal ? Math.min((blogCount / weeklyBlogGoal) * 100, 100) : 0;

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
          {/* Large number display */}
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {blogCount}
              {weeklyBlogGoal && (
                <span className="text-2xl text-gray-400 ml-1">/ {weeklyBlogGoal}</span>
              )}
            </div>
            <p className="text-sm text-gray-600">
              {weeklyBlogGoal 
                ? "blogov prečítaných tento týždeň"
                : "blogov prečítaných tento týždeň"
              }
            </p>
          </div>

          {/* Progress bar */}
          {weeklyBlogGoal && (
            <>
              <Progress value={progressPercentage} className="h-2" />
              <div className="text-center">
                {blogCount >= weeklyBlogGoal ? (
                  <p className="text-sm text-green-600 font-medium">
                    🎉 Gratulujeme! Splnili ste svoj týždenný cieľ.
                  </p>
                ) : (
                  <p className="text-sm text-gray-500">
                    Zostáva {weeklyBlogGoal - blogCount} blogov do splnenia cieľa.
                  </p>
                )}
              </div>
            </>
          )}

          {!weeklyBlogGoal && (
            <p className="text-xs text-gray-500 text-center">
              Nastavte si týždenný cieľ v sekcii "Moje ciele" na stránke profilu.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
