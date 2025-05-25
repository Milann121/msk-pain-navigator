
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function HumanModel() {
  const { scene } = useGLTF('/lovable-uploads/MaleBaseMesh.glb');
  return <primitive object={scene} />;
}

export default function ModelViewer() {
  return (
    <div style={{ height: '500px', width: '100%' }}>
      <Canvas camera={{ position: [0, 1.5, 3] }}>
        <ambientLight />
        <directionalLight position={[0, 5, 5]} />
        <Suspense fallback={null}>
          <HumanModel />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
}
