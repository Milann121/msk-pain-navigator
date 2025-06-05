
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { BookOpen, CheckCircle } from 'lucide-react';

interface BlogReadingStatsProps {
  className?: string;
}

interface BlogStats {
  totalBlogs: number;
  readBlogs: number;
  unreadBlogs: number;
}

export const BlogReadingStats = ({ className }: BlogReadingStatsProps) => {
  const { user } = useAuth();
  const [stats, setStats] = useState<BlogStats>({
    totalBlogs: 0,
    readBlogs: 0,
    unreadBlogs: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBlogStats = async () => {
      if (!user) return;

      try {
        // Get total number of favorite blogs (this represents available blogs to read)
        const { data: favoriteBlogs, error: favoriteBlogsError } = await supabase
          .from('favorite_blogs')
          .select('blog_id')
          .eq('user_id', user.id);

        if (favoriteBlogsError) {
          console.error('Error loading favorite blogs:', favoriteBlogsError);
          return;
        }

        // Get reading activity
        const { data: readingActivity, error: readingError } = await supabase
          .from('blog_read_activity')
          .select('blog_id')
          .eq('user_id', user.id);

        if (readingError) {
          console.error('Error loading reading activity:', readingError);
          return;
        }

        const totalBlogs = favoriteBlogs?.length || 0;
        const readBlogs = readingActivity?.length || 0;
        const unreadBlogs = Math.max(0, totalBlogs - readBlogs);

        setStats({
          totalBlogs,
          readBlogs,
          unreadBlogs
        });
      } catch (error) {
        console.error('Error loading blog statistics:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBlogStats();
  }, [user]);

  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="text-lg">Štatistiky čítania</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-500">Načítava sa...</div>
        </CardContent>
      </Card>
    );
  }

  const chartData = [
    { name: 'Prečítané', value: stats.readBlogs, color: '#10b981' },
    { name: 'Neprečítané', value: stats.unreadBlogs, color: '#f59e0b' }
  ];

  const chartConfig = {
    read: {
      label: "Prečítané",
      color: "#10b981",
    },
    unread: {
      label: "Neprečítané", 
      color: "#f59e0b",
    },
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Štatistiky čítania
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Summary Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-2xl font-bold text-green-600">{stats.readBlogs}</span>
              </div>
              <p className="text-sm text-gray-600">Prečítané</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <BookOpen className="h-4 w-4 text-amber-500" />
                <span className="text-2xl font-bold text-amber-600">{stats.unreadBlogs}</span>
              </div>
              <p className="text-sm text-gray-600">Neprečítané</p>
            </div>
          </div>

          {/* Chart */}
          {stats.totalBlogs > 0 ? (
            <div className="h-32">
              <ChartContainer config={chartConfig} className="h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={20}
                      outerRadius={50}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          ) : (
            <div className="text-center text-gray-500 text-sm py-4">
              Žiadne obľúbené blogy na sledovanie
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
