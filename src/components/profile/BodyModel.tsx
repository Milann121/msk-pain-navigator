
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ThreeBodyViewer from '@/components/ThreeBodyViewer';

export const BodyModel = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Model tela</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <div className="h-64 w-48 relative">
          <ThreeBodyViewer />
        </div>
      </CardContent>
    </Card>
  );
};
