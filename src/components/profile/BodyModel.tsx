
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ThreeBodyViewer from '@/components/ThreeBodyViewer';
import { Skeleton } from '@/components/ui/skeleton';

export const BodyModel = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Model tela</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <React.Suspense fallback={<Skeleton className="h-[350px] w-full rounded-md" />}>
          <ThreeBodyViewer />
        </React.Suspense>
      </CardContent>
    </Card>
  );
};
