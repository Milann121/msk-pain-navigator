
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import { BlogReadingStats } from './BlogReadingStats';

export const ProgressContainer = () => {
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
          <BlogReadingStats />
          {/* Future progress statistics can be added here */}
        </div>
      </CardContent>
    </Card>
  );
};
