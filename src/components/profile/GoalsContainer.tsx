
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Target, Edit } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface GoalsContainerProps {
  onBlogGoalChange?: (goal: number | null) => void;
  onExerciseGoalChange?: (goal: number | null) => void;
  externalGoals?: {
    weeklyExerciseGoal: number | null;
    weeklyBlogGoal: number | null;
  };
}

export const GoalsContainer = ({ onBlogGoalChange, onExerciseGoalChange, externalGoals }: GoalsContainerProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
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
              setWeeklyExerciseGoal(goal.goal_value);
            } else if (goal.goal_type === 'weekly_blog') {
              setWeeklyBlogGoal(goal.goal_value);
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

  // Generate options for dropdowns
  const exerciseOptions = Array.from({ length: 14 }, (_, i) => i + 1);
  const blogOptions = Array.from({ length: 10 }, (_, i) => i + 1);

  // Function to get the correct word form for blogs
  const getBlogWord = (count: number | null) => {
    if (count === 1) return 'blog';
    if (count && count >= 2 && count <= 4) return 'blogy';
    return 'blogov';
  };

  const handleEdit = (field: string, currentValue: number | null) => {
    setEditingField(field);
    setTempValue(currentValue);
  };

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
            goal_value: value,
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
            goal_value: value
          });

        if (insertError) throw insertError;
      }
    } catch (error) {
      console.error('Error saving goal:', error);
      throw error;
    }
  };

  const handleSave = async (field: string) => {
    if (!user || loading || tempValue === null) return;

    setLoading(true);
    try {
      if (field === 'weeklyExerciseGoal') {
        await saveGoalToDatabase('weekly_exercise', tempValue);
        setWeeklyExerciseGoal(tempValue);
        toast({
          title: 'Úspech',
          description: 'Cieľ pre cvičenie bol úspešne uložený.',
        });
      } else if (field === 'weeklyBlogGoal') {
        await saveGoalToDatabase('weekly_blog', tempValue);
        setWeeklyBlogGoal(tempValue);
        toast({
          title: 'Úspech',
          description: 'Cieľ pre čítanie bol úspešne uložený.',
        });
      }
    } catch (error) {
      console.error('Error saving goal:', error);
      toast({
        title: 'Chyba',
        description: 'Nepodarilo sa uložiť cieľ.',
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

  const GoalRow = ({ 
    text, 
    field,
    goalValue, 
    onGoalChange, 
    options
  }: {
    text: string;
    field: string;
    goalValue: number | null;
    onGoalChange: (value: string) => void;
    options: number[];
  }) => {
    const isEditing = editingField === field;

    // Handle dynamic text for blog reading goal
    const getDisplayText = () => {
      if (field === 'weeklyBlogGoal') {
        const blogWord = isEditing ? getBlogWord(tempValue) : getBlogWord(goalValue);
        return `Týždenne chcem prečítať {dropdown} ${blogWord}`;
      }
      return text;
    };

    const displayText = getDisplayText();

    if (isEditing) {
      return (
        <div className="py-3 border-b border-gray-100 last:border-b-0">
          <div className="flex flex-col gap-3">
            {/* Text and dropdown row */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-base">
                {displayText.split('{dropdown}')[0]}
              </span>
              <Select value={tempValue?.toString() || ""} onValueChange={(value) => setTempValue(parseInt(value))}>
                <SelectTrigger className="w-20 h-8">
                  <SelectValue placeholder="-" />
                </SelectTrigger>
                <SelectContent>
                  {options.map((option) => (
                    <SelectItem key={option} value={option.toString()}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className="text-base">
                {displayText.split('{dropdown}')[1]}
              </span>
            </div>
            
            {/* Buttons row - stacked on mobile */}
            <div className="flex gap-2 flex-col sm:flex-row">
              <Button 
                size="sm" 
                onClick={() => handleSave(field)} 
                className="px-4 h-8 flex-1 sm:flex-none"
                disabled={loading}
              >
                Uložiť
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={handleCancel} 
                className="px-4 h-8 flex-1 sm:flex-none"
                disabled={loading}
              >
                Zrušiť
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="flex items-center py-3 border-b border-gray-100 last:border-b-0">
        <div className="flex items-center gap-2 flex-1">
          <span className="text-base">
            {displayText.split('{dropdown}')[0]}
          </span>
          <div className="w-20 h-8 px-3 py-2 border rounded-md bg-muted text-sm flex items-center justify-center">
            {goalValue || '-'}
          </div>
          <span className="text-base">
            {displayText.split('{dropdown}')[1]}
          </span>
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => handleEdit(field, goalValue)}
          className="h-8 w-8 p-0"
          disabled={loading}
        >
          <Edit className="h-4 w-4" />
        </Button>
      </div>
    );
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Moje ciele
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Weekly Goals Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-blue-800">Týždenné ciele</h3>
            <div className="space-y-1">
              <GoalRow
                text="Týždenne chcem cvičiť {dropdown} krát"
                field="weeklyExerciseGoal"
                goalValue={weeklyExerciseGoal}
                onGoalChange={(value) => setWeeklyExerciseGoal(parseInt(value))}
                options={exerciseOptions}
              />
              <GoalRow
                text="Týždenne chcem prečítať {dropdown} blogov"
                field="weeklyBlogGoal"
                goalValue={weeklyBlogGoal}
                onGoalChange={(value) => setWeeklyBlogGoal(parseInt(value))}
                options={blogOptions}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
