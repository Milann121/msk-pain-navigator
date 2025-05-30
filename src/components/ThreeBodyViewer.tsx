
import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { ThreeCanvas } from './three-body/ThreeCanvas';
import { RotationControls } from './three-body/RotationControls';

export default function ThreeBodyViewer() {
  const [xRotation, setXRotation] = useState(0); // X-axis rotation in degrees
  const [yRotation, setYRotation] = useState(0); // Y-axis rotation in degrees
  const isMobile = useIsMobile();

  const handleXRotationChange = (value: number[]) => {
    setXRotation(value[0]);
  };

  const handleYRotationChange = (value: number[]) => {
    setYRotation(value[0]);
  };

  const resetRotation = () => {
    setXRotation(0);
    setYRotation(0);
  };

  return (
    <div className="w-full">
      {/* Desktop: Side-by-side layout */}
      {!isMobile ? (
        <div className="flex gap-8 items-start">
          <ThreeCanvas 
            xRotation={xRotation} 
            yRotation={yRotation} 
            height="600px" 
            width="65%" 
          />
          
          {/* Controls on the right side for desktop */}
          <div className="w-80 flex-shrink-0">
            <RotationControls
              xRotation={xRotation}
              yRotation={yRotation}
              onXRotationChange={handleXRotationChange}
              onYRotationChange={handleYRotationChange}
              onReset={resetRotation}
            />
          </div>
        </div>
      ) : (
        /* Mobile: Stacked layout */
        <div className="space-y-6">
          <ThreeCanvas 
            xRotation={xRotation} 
            yRotation={yRotation} 
            height="500px" 
          />
          
          {/* Controls below the canvas for mobile */}
          <RotationControls
            xRotation={xRotation}
            yRotation={yRotation}
            onXRotationChange={handleXRotationChange}
            onYRotationChange={handleYRotationChange}
            onReset={resetRotation}
          />
        </div>
      )}
    </div>
  );
}
