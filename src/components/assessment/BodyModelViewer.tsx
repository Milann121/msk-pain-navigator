
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';

const BodyModel = () => {
  const { scene } = useGLTF('/lovable-uploads/MaleBaseMesh.glb');
  return <primitive object={scene} scale={1.5} position={[0, -1.5, 0]} />;
};

interface BodyModelViewerProps {
  className?: string;
}

const BodyModelViewer = ({ className = '' }: BodyModelViewerProps) => {
  return (
    <div className={`w-full h-[400px] ${className}`}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <BodyModel />
          <Environment preset="city" />
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default BodyModelViewer;
