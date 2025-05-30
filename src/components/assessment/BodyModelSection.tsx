
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ThreeBodyViewer from '@/components/ThreeBodyViewer';

export const BodyModelSection = () => {
  return (
    <Card className="w-full mb-6">
      <CardHeader>
        <CardTitle className="text-xl text-blue-800">Model tela</CardTitle>
        <p className="text-sm text-blue-600">
          Interaktívny 3D model pre vizualizáciu oblastí bolesti
        </p>
      </CardHeader>
      <CardContent className="p-8">
        <div className="flex justify-center">
          <div className="w-full max-w-4xl">
            <ThreeBodyViewer />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
