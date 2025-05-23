
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function HumanModel() {
  const { scene } = useGLTF('/lovable-uploads/MaleBaseMesh.glb');
  return <primitive object={scene} />;
}

export default function ThreeBodyViewer() {
  return (
    <div className="rounded-md overflow-hidden" style={{ height: '350px', width: '100%' }}>
      <Canvas camera={{ position: [0, 1.5, 4] }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
        <Suspense fallback={null}>
          <HumanModel />
        </Suspense>
        <OrbitControls enablePan={false} minDistance={2} maxDistance={8} />
      </Canvas>
    </div>
  );
}
