
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { format } from 'date-fns';

export interface CompletionDay {
  date: Date;
  count: number;
  assessmentIds: string[];
}

export const useCompletionData = (assessmentId?: string) => {
  const [completionDays, setCompletionDays] = useState<CompletionDay[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchCompletionData = async () => {
    if (!user) return;
    
    setLoading(true);
    
    try {
      // Build query - filter by assessment if provided
      let query = supabase
        .from('completed_exercises')
        .select('completed_at, assessment_id')
        .eq('user_id', user.id)
        .order('completed_at', { ascending: false });
      
      if (assessmentId) {
        query = query.eq('assessment_id', assessmentId);
      }
      
      const { data, error } = await query;
        
      if (error) throw error;
      
      // Process the data to group by date
      const completions: Record<string, CompletionDay> = {};
      
      (data || []).forEach(completion => {
        const completionDate = new Date(completion.completed_at);
        const dateKey = format(completionDate, 'yyyy-MM-dd');
        
        if (!completions[dateKey]) {
          completions[dateKey] = {
            date: completionDate,
            count: 0,
            assessmentIds: []
          };
        }
        
        completions[dateKey].count += 1;
        
        if (!completions[dateKey].assessmentIds.includes(completion.assessment_id)) {
          completions[dateKey].assessmentIds.push(completion.assessment_id);
        }
      });
      
      setCompletionDays(Object.values(completions));
    } catch (error) {
      console.error('Error fetching completion data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompletionData();
    
    // Listen for exercise completion events to refresh the calendar
    const handleExerciseCompleted = () => {
      fetchCompletionData();
    };
    
    window.addEventListener('exercise-completed', handleExerciseCompleted);
    
    // Set up a real-time subscription to completed_exercises changes
    const channel = supabase
      .channel('exercise_completions')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'completed_exercises',
          filter: `user_id=eq.${user?.id}`
        }, 
        () => {
          fetchCompletionData();
        }
      )
      .subscribe();
    
    return () => {
      window.removeEventListener('exercise-completed', handleExerciseCompleted);
      supabase.removeChannel(channel);
    };
  }, [user, assessmentId]);

  return { 
    completionDays, 
    loading,
    refreshCompletionData: fetchCompletionData
  };
};
