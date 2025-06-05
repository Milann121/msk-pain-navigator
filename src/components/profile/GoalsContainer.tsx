
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, Circle } from 'lucide-react';
import { Target } from 'lucide-react';

export const GoalsContainer = () => {
  const [monthlyExerciseGoal, setMonthlyExerciseGoal] = useState<number | null>(null);
  const [monthlyBlogGoal, setMonthlyBlogGoal] = useState<number | null>(null);
  const [monthlyExerciseCompleted, setMonthlyExerciseCompleted] = useState(false);
  const [monthlyBlogCompleted, setMonthlyBlogCompleted] = useState(false);
  const [dailyExerciseCompleted, setDailyExerciseCompleted] = useState(false);

  // Generate options for dropdowns
  const exerciseOptions = Array.from({ length: 100 }, (_, i) => i + 1);
  const blogOptions = Array.from({ length: 30 }, (_, i) => i + 1);

  const handleGoalCompletionToggle = (goalType: 'monthlyExercise' | 'monthlyBlog' | 'dailyExercise') => {
    switch (goalType) {
      case 'monthlyExercise':
        setMonthlyExerciseCompleted(!monthlyExerciseCompleted);
        break;
      case 'monthlyBlog':
        setMonthlyBlogCompleted(!monthlyBlogCompleted);
        break;
      case 'dailyExercise':
        setDailyExerciseCompleted(!dailyExerciseCompleted);
        break;
    }
  };

  const GoalRow = ({ 
    text, 
    goalValue, 
    onGoalChange, 
    options, 
    completed, 
    onToggleCompleted, 
    goalType 
  }: {
    text: string;
    goalValue: number | null;
    onGoalChange: (value: string) => void;
    options: number[];
    completed: boolean;
    onToggleCompleted: () => void;
    goalType: string;
  }) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
      <div className="flex items-center gap-2 flex-1">
        <span className="text-base">
          {text.split('{dropdown}')[0]}
        </span>
        <Select value={goalValue?.toString() || ""} onValueChange={onGoalChange}>
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
          {text.split('{dropdown}')[1]}
        </span>
      </div>
      <button
        onClick={onToggleCompleted}
        className="ml-4 transition-colors"
        disabled={!goalValue}
      >
        {completed ? (
          <CheckCircle className="h-6 w-6 text-green-500" />
        ) : (
          <Circle className="h-6 w-6 text-gray-300" />
        )}
      </button>
    </div>
  );

  const SimpleGoalRow = ({ 
    text, 
    completed, 
    onToggleCompleted 
  }: {
    text: string;
    completed: boolean;
    onToggleCompleted: () => void;
  }) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
      <span className="text-base flex-1">{text}</span>
      <button
        onClick={onToggleCompleted}
        className="ml-4 transition-colors"
      >
        {completed ? (
          <CheckCircle className="h-6 w-6 text-green-500" />
        ) : (
          <Circle className="h-6 w-6 text-gray-300" />
        )}
      </button>
    </div>
  );

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
          {/* Monthly Goals Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-blue-800">Mesačné ciele</h3>
            <div className="space-y-1">
              <GoalRow
                text="Mesačne chcem cvičiť {dropdown} krát"
                goalValue={monthlyExerciseGoal}
                onGoalChange={(value) => setMonthlyExerciseGoal(parseInt(value))}
                options={exerciseOptions}
                completed={monthlyExerciseCompleted}
                onToggleCompleted={() => handleGoalCompletionToggle('monthlyExercise')}
                goalType="monthlyExercise"
              />
              <GoalRow
                text="Mesačne chcem prečítať {dropdown} blogov"
                goalValue={monthlyBlogGoal}
                onGoalChange={(value) => setMonthlyBlogGoal(parseInt(value))}
                options={blogOptions}
                completed={monthlyBlogCompleted}
                onToggleCompleted={() => handleGoalCompletionToggle('monthlyBlog')}
                goalType="monthlyBlog"
              />
            </div>
          </div>

          {/* Daily Goals Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-blue-800">Denné ciele</h3>
            <div className="space-y-1">
              <SimpleGoalRow
                text="Dnešné cvičenie"
                completed={dailyExerciseCompleted}
                onToggleCompleted={() => handleGoalCompletionToggle('dailyExercise')}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
