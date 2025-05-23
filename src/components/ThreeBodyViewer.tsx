
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function HumanModel() {
  const { scene } = useGLTF('/malebasemesh.glb'); // Using the available model
  return <primitive object={scene} />;
}

export default function ThreeBodyViewer() {
  return (
    <div style={{ height: '350px', width: '100%' }} className="rounded-md overflow-hidden">
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
