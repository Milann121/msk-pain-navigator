
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Settings } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { BlogReadingStats } from './BlogReadingStats';
import { ExerciseStats } from './ExerciseStats';
import { useNavigate } from 'react-router-dom';

interface ProgressContainerProps {
  weeklyExerciseGoal?: number | null;
  weeklyBlogGoal?: number | null;
  onGoalUpdate?: () => void;
}

export const ProgressContainer = ({ weeklyExerciseGoal, weeklyBlogGoal, onGoalUpdate }: ProgressContainerProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleNavigateToGoals = () => {
    navigate('/profile');
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-teal-600" />
          {t('home.progressTitle')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ExerciseStats weeklyExerciseGoal={weeklyExerciseGoal} onGoalUpdate={onGoalUpdate} />
          <BlogReadingStats weeklyBlogGoal={weeklyBlogGoal} />
        </div>
        
        <div className="mt-6 flex justify-center">
          <Button 
            variant="outline" 
            onClick={handleNavigateToGoals}
            className="flex items-center gap-2"
          >
            <Settings className="h-4 w-4" />
            {t('home.setGoals')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
