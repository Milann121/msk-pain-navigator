
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function HumanModel() {
  const { scene } = useGLTF('/lovable-uploads/MaleBaseMesh.glb');
  
  // Center the model and ensure it's properly scaled
  React.useEffect(() => {
    if (scene) {
      // Center the model
      const box = new THREE.Box3().setFromObject(scene);
      const center = box.getCenter(new THREE.Vector3());
      scene.position.sub(center);
      
      // Scale the model if needed
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 2 / maxDim; // Adjust this value to make model bigger/smaller
      scene.scale.setScalar(scale);
    }
  }, [scene]);
  
  return <primitive object={scene} />;
}

export default function ThreeBodyViewer() {
  return (
    <div style={{ height: '600px', width: '100%' }}>
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={0.6} />
        <directionalLight position={[-10, -10, -5]} intensity={0.3} />
        <pointLight position={[0, 10, 0]} intensity={0.3} />
        <Suspense fallback={null}>
          <HumanModel />
        </Suspense>
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          maxDistance={10}
          minDistance={1}
          target={[0, 0, 0]}
        />
      </Canvas>
    </div>
  );
}
