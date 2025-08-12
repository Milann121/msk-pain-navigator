
import React, { Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LazyOnView from '@/components/utils/LazyOnView';

// Lazy-load the heavy 3D viewer to reduce initial JS payload
const ThreeBodyViewerLazy = React.lazy(() => import('@/components/ThreeBodyViewer'));

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
            <LazyOnView rootMargin="250px">
              <Suspense
                fallback={
                  <div className="w-full h-[420px] rounded-md bg-muted animate-pulse flex items-center justify-center text-muted-foreground">
                    Načítavam 3D model...
                  </div>
                }
              >
                <ThreeBodyViewerLazy />
              </Suspense>
            </LazyOnView>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
