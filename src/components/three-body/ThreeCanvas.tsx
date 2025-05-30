
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { HumanModel } from './HumanModel';

interface ThreeCanvasProps {
  xRotation: number;
  yRotation: number;
  height: string;
  width?: string;
}

export function ThreeCanvas({ xRotation, yRotation, height, width = '100%' }: ThreeCanvasProps) {
  return (
    <div style={{ height, width }} className="relative">
      <Canvas 
        camera={{ position: [-1, 1, 4], fov: 50 }}
        shadows
        onError={(error) => {
          console.error('Canvas error:', error);
        }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={0.8}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <directionalLight position={[-5, 5, 5]} intensity={0.6} />
        <directionalLight position={[0, 5, -5]} intensity={0.4} />
        <pointLight position={[0, 5, 0]} intensity={0.3} />
        <Suspense fallback={null}>
          <HumanModel xRotation={xRotation} yRotation={yRotation} />
        </Suspense>
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          maxDistance={8}
          minDistance={1}
          target={[0, 0, 0]}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
}
