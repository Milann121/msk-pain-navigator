
import { useState, useEffect } from 'react';
import { sk } from 'date-fns/locale';
import { format } from 'date-fns';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatsBarProps {
  assessmentId: string | undefined;
}

export const StatsBar = ({ assessmentId }: StatsBarProps) => {
  const [completedCount, setCompletedCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  
  // Get current month in Slovak
  const currentMonth = format(new Date(), 'LLLL yyyy', { locale: sk });
  const capitalizedMonth = currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1);
  
  // Calculate days in current month
  const now = new Date();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const targetExercises = Math.ceil(daysInMonth / 2); // Half of the days in the month
  
  // Calculate progress percentage
  const progressPercentage = Math.min((completedCount / targetExercises) * 100, 100);
  
  useEffect(() => {
    const fetchCompletedExercises = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        
        // Get current month's first and last day
        const now = new Date();
        const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
        const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
        
        // Get completed exercises for this month
        const { data, error } = await supabase
          .from('completed_exercises')
          .select('completed_at')
          .eq('user_id', user.id)
          .gte('completed_at', firstDay.toISOString())
          .lte('completed_at', lastDay.toISOString());
          
        if (error) throw error;
        
        setCompletedCount(data?.length || 0);
      } catch (error) {
        console.error('Error fetching completed exercises:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCompletedExercises();
    
    // Set up a listener for realtime updates
    const channel = supabase
      .channel('stats_completed_exercises_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'completed_exercises',
          filter: `user_id=eq.${user?.id}`
        },
        (payload) => {
          console.log('Stats bar received update:', payload);
          // Refetch data when completions change
          fetchCompletedExercises();
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-blue-800">{capitalizedMonth}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-gray-600">
          Zacvičte si cvičenia aspoň každý druhý deň. Dodržujte tento interval a vyplňte kontajner farbou.
        </p>
        
        <div className="mb-2 flex justify-between items-center">
          <span className="text-sm text-gray-600">Pokrok</span>
          <span className="text-sm font-medium">{completedCount} / {targetExercises} cvičení</span>
        </div>
        
        <Progress value={progressPercentage} className="h-4" />
      </CardContent>
    </Card>
  );
};
