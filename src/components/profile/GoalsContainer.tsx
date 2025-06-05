
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Target } from 'lucide-react';

export const GoalsContainer = () => {
  const [weeklyExerciseGoal, setWeeklyExerciseGoal] = useState<number | null>(null);
  const [weeklyBlogGoal, setWeeklyBlogGoal] = useState<number | null>(null);

  // Generate options for dropdowns
  const exerciseOptions = Array.from({ length: 14 }, (_, i) => i + 1);
  const blogOptions = Array.from({ length: 10 }, (_, i) => i + 1);

  const GoalRow = ({ 
    text, 
    goalValue, 
    onGoalChange, 
    options
  }: {
    text: string;
    goalValue: number | null;
    onGoalChange: (value: string) => void;
    options: number[];
  }) => (
    <div className="flex items-center py-3 border-b border-gray-100 last:border-b-0">
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
          {/* Weekly Goals Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-blue-800">Týždenné ciele</h3>
            <div className="space-y-1">
              <GoalRow
                text="Týždenne chcem cvičiť {dropdown} krát"
                goalValue={weeklyExerciseGoal}
                onGoalChange={(value) => setWeeklyExerciseGoal(parseInt(value))}
                options={exerciseOptions}
              />
              <GoalRow
                text="Týždenne chcem prečítať {dropdown} blogov"
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
