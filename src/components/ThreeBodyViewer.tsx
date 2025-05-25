
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

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
      
      // Ensure the model has proper materials and is visible
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          // Make sure the material is visible and not just a silhouette
          if (child.material) {
            child.material.side = THREE.DoubleSide;
            child.material.transparent = false;
            if (child.material instanceof THREE.MeshStandardMaterial) {
              child.material.color.setHex(0xfdbcb4); // Skin tone color
              child.material.roughness = 0.7;
              child.material.metalness = 0.1;
            }
          }
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [scene]);
  
  return <primitive object={scene} />;
}

export default function ThreeBodyViewer() {
  return (
    <div style={{ height: '600px', width: '100%' }}>
      <Canvas 
        camera={{ position: [2, 1, 3], fov: 50 }}
        shadows
      >
        <ambientLight intensity={0.6} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={0.8}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <directionalLight position={[-5, 5, 5]} intensity={0.4} />
        <pointLight position={[0, 5, 0]} intensity={0.3} />
        <Suspense fallback={null}>
          <HumanModel />
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
