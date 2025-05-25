
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function HumanModel() {
  const { scene } = useGLTF('/lovable-uploads/MaleBaseMesh.glb');
  return <primitive object={scene} />;
}

export default function ThreeBodyViewer() {
  return (
    <div style={{ height: '600px', width: '100%' }}>
      <Canvas camera={{ position: [0, 1.5, 4] }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        <Suspense fallback={null}>
          <HumanModel />
        </Suspense>
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          maxDistance={10}
          minDistance={2}
        />
      </Canvas>
    </div>
  );
}
