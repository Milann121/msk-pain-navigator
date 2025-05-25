
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

interface ModelProps {
  url: string;
}

const Model: React.FC<ModelProps> = ({ url }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
};

interface ModelViewerProps {
  modelUrl: string;
  className?: string;
}

export const ModelViewer: React.FC<ModelViewerProps> = ({ modelUrl, className = "" }) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        <Suspense fallback={null}>
          <Model url={modelUrl} />
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            maxDistance={10}
            minDistance={2}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
