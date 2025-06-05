
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import { BlogReadingStats } from './BlogReadingStats';

interface ProgressContainerProps {
  weeklyBlogGoal?: number | null;
}

export const ProgressContainer = ({ weeklyBlogGoal }: ProgressContainerProps) => {
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
          <BlogReadingStats weeklyBlogGoal={weeklyBlogGoal} />
          {/* Future progress statistics can be added here */}
        </div>
      </CardContent>
    </Card>
  );
};
