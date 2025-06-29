
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { GoalRow } from './goals/GoalRow';
import { useGoalsLogic } from './goals/useGoalsLogic';
import { EXERCISE_OPTIONS, BLOG_OPTIONS } from './goals/constants';

interface GoalsContainerProps {
  onBlogGoalChange?: (goal: number | null) => void;
  onExerciseGoalChange?: (goal: number | null) => void;
  externalGoals?: {
    weeklyExerciseGoal: number | null;
    weeklyBlogGoal: number | null;
  };
}

export const GoalsContainer = ({ onBlogGoalChange, onExerciseGoalChange, externalGoals }: GoalsContainerProps) => {
  const { t } = useTranslation();
  
  const {
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
  } = useGoalsLogic({
    onBlogGoalChange,
    onExerciseGoalChange,
    externalGoals
  });

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          {t('profile.goals.title')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Weekly Goals Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-blue-800">{t('profile.goals.weeklyGoals')}</h3>
            <div className="space-y-1">
              <GoalRow
                text={t('profile.goals.exerciseGoal')}
                field="weeklyExerciseGoal"
                goalValue={weeklyExerciseGoal}
                onGoalChange={(value) => setWeeklyExerciseGoal(parseInt(value))}
                options={EXERCISE_OPTIONS}
                isEditing={editingField === 'weeklyExerciseGoal'}
                tempValue={tempValue}
                onEdit={handleEdit}
                onSave={handleSave}
                onCancel={handleCancel}
                onTempValueChange={setTempValue}
                loading={loading}
              />
              <GoalRow
                text={t('profile.goals.blogGoal')}
                field="weeklyBlogGoal"
                goalValue={weeklyBlogGoal}
                onGoalChange={(value) => setWeeklyBlogGoal(parseInt(value))}
                options={BLOG_OPTIONS}
                isEditing={editingField === 'weeklyBlogGoal'}
                tempValue={tempValue}
                onEdit={handleEdit}
                onSave={handleSave}
                onCancel={handleCancel}
                onTempValueChange={setTempValue}
                loading={loading}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
