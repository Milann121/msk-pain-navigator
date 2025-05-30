
import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { ThreeCanvas } from './three-body/ThreeCanvas';
import { RotationControls } from './three-body/RotationControls';

export default function ThreeBodyViewer() {
  const [xRotation, setXRotation] = useState(0); // X-axis rotation in degrees
  const [yRotation, setYRotation] = useState(0); // Y-axis rotation in degrees
  const [zoom, setZoom] = useState(1); // Zoom level (0.5 to 10, where 1 is default)
  const [verticalPosition, setVerticalPosition] = useState(0); // Vertical position (-2 to 2, where 0 is center)
  const isMobile = useIsMobile();

  const handleXRotationChange = (value: number[]) => {
    setXRotation(value[0]);
  };

  const handleYRotationChange = (value: number[]) => {
    setYRotation(value[0]);
  };

  const handleZoomChange = (value: number[]) => {
    setZoom(value[0]);
  };

  const handleVerticalPositionChange = (value: number[]) => {
    setVerticalPosition(value[0]);
  };

  const resetRotation = () => {
    setXRotation(0);
    setYRotation(0);
    setZoom(1);
    setVerticalPosition(0);
  };

  return (
    <div className="w-full">
      {/* Desktop: Side-by-side layout */}
      {!isMobile ? (
        <div className="flex gap-8 items-start">
          <ThreeCanvas 
            xRotation={xRotation} 
            yRotation={yRotation} 
            zoom={zoom}
            verticalPosition={verticalPosition}
            height="600px" 
            width="65%" 
          />
          
          {/* Controls on the right side for desktop */}
          <div className="w-80 flex-shrink-0">
            <RotationControls
              xRotation={xRotation}
              yRotation={yRotation}
              zoom={zoom}
              verticalPosition={verticalPosition}
              onXRotationChange={handleXRotationChange}
              onYRotationChange={handleYRotationChange}
              onZoomChange={handleZoomChange}
              onVerticalPositionChange={handleVerticalPositionChange}
              onReset={resetRotation}
            />
          </div>
        </div>
      ) : (
        /* Mobile: Stacked layout with full width */
        <div className="space-y-6 -mx-4 px-0">
          <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
            <ThreeCanvas 
              xRotation={xRotation} 
              yRotation={yRotation} 
              zoom={zoom}
              verticalPosition={verticalPosition}
              height="500px" 
              width="100vw"
            />
          </div>
          
          {/* Controls below the canvas for mobile */}
          <div className="mx-4">
            <RotationControls
              xRotation={xRotation}
              yRotation={yRotation}
              zoom={zoom}
              verticalPosition={verticalPosition}
              onXRotationChange={handleXRotationChange}
              onYRotationChange={handleYRotationChange}
              onZoomChange={handleZoomChange}
              onVerticalPositionChange={handleVerticalPositionChange}
              onReset={resetRotation}
            />
          </div>
        </div>
      )}
    </div>
  );
}
