
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import { BlogReadingStats } from './BlogReadingStats';
import { ExerciseStats } from './ExerciseStats';

interface ProgressContainerProps {
  weeklyExerciseGoal?: number | null;
  weeklyBlogGoal?: number | null;
}

export const ProgressContainer = ({ weeklyExerciseGoal, weeklyBlogGoal }: ProgressContainerProps) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Môj pokrok
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ExerciseStats weeklyExerciseGoal={weeklyExerciseGoal} />
          <BlogReadingStats weeklyBlogGoal={weeklyBlogGoal} />
        </div>
      </CardContent>
    </Card>
  );
};
