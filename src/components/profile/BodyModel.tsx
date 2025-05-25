
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ModelViewer } from '@/components/ModelViewer';

export const BodyModel = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Model tela</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <div className="h-64 w-48 relative">
          <ModelViewer 
            modelUrl="/lovable-uploads/MaleBaseMesh.glb"
            className="w-full h-full rounded-md overflow-hidden"
          />
        </div>
      </CardContent>
    </Card>
  );
};
