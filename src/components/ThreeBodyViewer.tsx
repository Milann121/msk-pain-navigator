
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function HumanModel() {
  const { scene } = useGLTF('/lovable-uploads/MaleBaseMesh.glb'); // Updated to use the correct model path
  return <primitive object={scene} />;
}

export default function ThreeBodyViewer() {
  return (
    <div style={{ height: '600px', width: '100%' }}>
      <Canvas camera={{ position: [0, 1.5, 4] }}>
        <ambientLight />
        <Suspense fallback={null}>
          <HumanModel />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
}
