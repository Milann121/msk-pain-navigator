
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Target, Edit } from 'lucide-react';

export const GoalsContainer = () => {
  const [weeklyExerciseGoal, setWeeklyExerciseGoal] = useState<number | null>(null);
  const [weeklyBlogGoal, setWeeklyBlogGoal] = useState<number | null>(null);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState<number | null>(null);

  // Generate options for dropdowns
  const exerciseOptions = Array.from({ length: 14 }, (_, i) => i + 1);
  const blogOptions = Array.from({ length: 10 }, (_, i) => i + 1);

  const handleEdit = (field: string, currentValue: number | null) => {
    setEditingField(field);
    setTempValue(currentValue);
  };

  const handleSave = (field: string) => {
    if (field === 'weeklyExerciseGoal') {
      setWeeklyExerciseGoal(tempValue);
    } else if (field === 'weeklyBlogGoal') {
      setWeeklyBlogGoal(tempValue);
    }
    setEditingField(null);
    setTempValue(null);
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

    if (isEditing) {
      return (
        <div className="flex items-center py-3 border-b border-gray-100 last:border-b-0">
          <div className="flex items-center gap-2 flex-1">
            <span className="text-base">
              {text.split('{dropdown}')[0]}
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
              {text.split('{dropdown}')[1]}
            </span>
            <Button size="sm" onClick={() => handleSave(field)} className="ml-2 px-4 h-8">
              Uložiť
            </Button>
            <Button size="sm" variant="outline" onClick={handleCancel} className="px-4 h-8">
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
            {text.split('{dropdown}')[0]}
          </span>
          <div className="w-20 h-8 px-3 py-2 border rounded-md bg-muted text-sm flex items-center justify-center">
            {goalValue || '-'}
          </div>
          <span className="text-base">
            {text.split('{dropdown}')[1]}
          </span>
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => handleEdit(field, goalValue)}
          className="h-8 w-8 p-0"
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
