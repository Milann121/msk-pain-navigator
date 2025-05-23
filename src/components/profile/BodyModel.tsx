
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ThreeBodyViewer from './ThreeBodyViewer';

export const BodyModel = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Model tela</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <ThreeBodyViewer />
      </CardContent>
    </Card>
  );
};
