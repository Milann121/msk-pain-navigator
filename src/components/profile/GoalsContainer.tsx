
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Target, Edit } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface GoalsContainerProps {
  onBlogGoalChange?: (goal: number | null) => void;
  onExerciseGoalChange?: (goal: number | null) => void;
}

export const GoalsContainer = ({ onBlogGoalChange, onExerciseGoalChange }: GoalsContainerProps) => {
  const { user } = useAuth();
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

    loadGoals();
  }, [user]);

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
      const { error } = await supabase
        .from('user_goals')
        .upsert({
          user_id: user.id,
          goal_type: goalType,
          goal_value: value
        });

      if (error) throw error;
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
      } else if (field === 'weeklyBlogGoal') {
        await saveGoalToDatabase('weekly_blog', tempValue);
        setWeeklyBlogGoal(tempValue);
      }
    } catch (error) {
      console.error('Error saving goal:', error);
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
        <div className="flex items-center py-3 border-b border-gray-100 last:border-b-0">
          <div className="flex items-center gap-2 flex-1">
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
            <Button 
              size="sm" 
              onClick={() => handleSave(field)} 
              className="ml-2 px-4 h-8"
              disabled={loading}
            >
              Uložiť
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={handleCancel} 
              className="px-4 h-8"
              disabled={loading}
            >
              Zrušiť
            </Button>
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
