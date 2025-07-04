
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

interface ExternalGoals {
  weeklyExerciseGoal: number | null;
  weeklyBlogGoal: number | null;
}

interface UseGoalsLogicProps {
  onBlogGoalChange?: (goal: number | null) => void;
  onExerciseGoalChange?: (goal: number | null) => void;
  externalGoals?: ExternalGoals;
}

export const useGoalsLogic = ({
  onBlogGoalChange,
  onExerciseGoalChange,
  externalGoals
}: UseGoalsLogicProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { t } = useTranslation();
  const [weeklyExerciseGoal, setWeeklyExerciseGoal] = useState<number | null>(null);
  const [weeklyBlogGoal, setWeeklyBlogGoal] = useState<number | null>(null);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Load goals from database
  useEffect(() => {
    const loadGoals = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('user_goals')
          .select('*')
          .eq('user_id', user.id);

        if (error) throw error;

        if (data) {
          data.forEach(goal => {
            if (goal.goal_type === 'weekly_exercise') {
              setWeeklyExerciseGoal(goal.weekly_exercises_goal);
            } else if (goal.goal_type === 'weekly_blog') {
              setWeeklyBlogGoal(goal.weekly_exercises_goal);
            }
          });
        }
      } catch (error) {
        console.error('Error loading goals:', error);
      }
    };

    if (!externalGoals) {
      loadGoals();
    }
  }, [user, externalGoals]);

  // Update goals when external goals change (from popup)
  useEffect(() => {
    if (externalGoals) {
      setWeeklyExerciseGoal(externalGoals.weeklyExerciseGoal);
      setWeeklyBlogGoal(externalGoals.weeklyBlogGoal);
    }
  }, [externalGoals]);

  // Notify parent component when blog goal changes
  useEffect(() => {
    if (onBlogGoalChange) {
      onBlogGoalChange(weeklyBlogGoal);
    }
  }, [weeklyBlogGoal, onBlogGoalChange]);

  // Notify parent component when exercise goal changes
  useEffect(() => {
    if (onExerciseGoalChange) {
      onExerciseGoalChange(weeklyExerciseGoal);
    }
  }, [weeklyExerciseGoal, onExerciseGoalChange]);

  const saveGoalToDatabase = async (goalType: 'weekly_exercise' | 'weekly_blog', value: number) => {
    if (!user) return;

    try {
      // First, check if a goal of this type already exists for the user
      const { data: existingGoal, error: selectError } = await supabase
        .from('user_goals')
        .select('id')
        .eq('user_id', user.id)
        .eq('goal_type', goalType)
        .maybeSingle();

      if (selectError) throw selectError;

      if (existingGoal) {
        // Update existing goal
        const { error: updateError } = await supabase
          .from('user_goals')
          .update({
            weekly_exercises_goal: value,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingGoal.id);

        if (updateError) throw updateError;
      } else {
        // Insert new goal
        const { error: insertError } = await supabase
          .from('user_goals')
          .insert({
            user_id: user.id,
            goal_type: goalType,
            weekly_exercises_goal: value
          });

        if (insertError) throw insertError;
      }
    } catch (error) {
      console.error('Error saving goal:', error);
      throw error;
    }
  };

  const handleEdit = (field: string, currentValue: number | null) => {
    setEditingField(field);
    setTempValue(currentValue);
  };

  const handleSave = async (field: string) => {
    if (!user || loading || tempValue === null) return;

    setLoading(true);
    try {
      if (field === 'weeklyExerciseGoal') {
        await saveGoalToDatabase('weekly_exercise', tempValue);
        setWeeklyExerciseGoal(tempValue);
        toast({
          title: t('profile.goals.goalsUpdated'),
          description: t('profile.goals.goalsUpdated'),
        });
      } else if (field === 'weeklyBlogGoal') {
        await saveGoalToDatabase('weekly_blog', tempValue);
        setWeeklyBlogGoal(tempValue);
        toast({
          title: t('profile.goals.goalsUpdated'),
          description: t('profile.goals.goalsUpdated'),
        });
      }
    } catch (error) {
      console.error('Error saving goal:', error);
      toast({
        title: 'Error',
        description: 'Failed to save goal',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
      setEditingField(null);
      setTempValue(null);
    }
  };

  const handleCancel = () => {
    setEditingField(null);
    setTempValue(null);
  };

  return {
    weeklyExerciseGoal,
    weeklyBlogGoal,
    editingField,
    tempValue,
    loading,
    setWeeklyExerciseGoal,
    setWeeklyBlogGoal,
    setTempValue,
    handleEdit,
    handleSave,
    handleCancel
  };
};
