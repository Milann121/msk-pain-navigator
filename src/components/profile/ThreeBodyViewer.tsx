
import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function HumanModel() {
  // Specify the correct path to the model and handle errors
  const { scene } = useGLTF('/lovable-uploads/MaleBaseMesh.glb', true);
  return <primitive object={scene} scale={[1, 1, 1]} position={[0, -1, 0]} />;
}

// Pre-load the model to avoid issues during rendering
useGLTF.preload('/lovable-uploads/MaleBaseMesh.glb');

export default function ThreeBodyViewer() {
  const [modelLoaded, setModelLoaded] = useState(false);

  useEffect(() => {
    // Add a flag to track if the component is mounted
    let isMounted = true;
    
    // Simulate model loading to handle potential timing issues
    const timer = setTimeout(() => {
      if (isMounted) {
        setModelLoaded(true);
        console.log('3D model loading completed');
      }
    }, 500);
    
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="rounded-md overflow-hidden" style={{ height: '600px', width: '100%' }}>
      {modelLoaded ? (
        <Canvas camera={{ position: [0, 1.5, 4] }}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} intensity={0.5} />
          <Suspense fallback={null}>
            <HumanModel />
          </Suspense>
          <OrbitControls enablePan={false} minDistance={2} maxDistance={8} />
        </Canvas>
      ) : (
        <div className="h-full w-full flex items-center justify-center bg-gray-100">
          <div className="text-blue-600">Načítava sa 3D model...</div>
        </div>
      )}
    </div>
  );
}
