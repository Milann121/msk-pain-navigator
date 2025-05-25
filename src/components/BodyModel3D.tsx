
import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface BodyModel3DProps {
  onAreaClick: (area: 'neck' | 'middle back' | 'lower back') => void;
  selectedArea: 'neck' | 'middle back' | 'lower back';
}

const BodyModel = ({ onAreaClick, selectedArea }: Pick<BodyModel3DProps, 'onAreaClick' | 'selectedArea'>) => {
  const { scene } = useGLTF('/lovable-uploads/MaleBaseMesh.glb');
  const meshRef = useRef<THREE.Group>(null);

  const handleClick = (event: THREE.Event) => {
    event.stopPropagation();
    
    // Get the intersection point to determine which body area was clicked
    const intersect = event.intersections?.[0];
    if (intersect && intersect.point) {
      const y = intersect.point.y;
      
      // Determine body area based on Y coordinate (approximate values)
      if (y > 1.5) {
        onAreaClick('neck');
      } else if (y > 0.5) {
        onAreaClick('middle back');
      } else {
        onAreaClick('lower back');
      }
    }
  };

  return (
    <group ref={meshRef}>
      <primitive 
        object={scene} 
        scale={[2, 2, 2]} 
        position={[0, -1, 0]}
        onClick={handleClick}
      />
    </group>
  );
};

const BodyModel3D = ({ onAreaClick, selectedArea }: BodyModel3DProps) => {
  return (
    <div className="w-full h-96 border rounded-lg bg-gray-50">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <BodyModel onAreaClick={onAreaClick} selectedArea={selectedArea} />
        <OrbitControls 
          enablePan={false} 
          enableZoom={true} 
          enableRotate={true}
          maxDistance={10}
          minDistance={2}
        />
      </Canvas>
      
      {/* Area selection indicator */}
      <div className="p-4 text-center">
        <p className="text-sm text-gray-600">
          Vybratá oblasť: <span className="font-semibold">
            {selectedArea === 'neck' && 'Krčná chrbtica'}
            {selectedArea === 'middle back' && 'Hrudná chrbtica'}
            {selectedArea === 'lower back' && 'Drieková chrbtica'}
          </span>
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Kliknite na model alebo použite tlačidlá nižšie
        </p>
      </div>
    </div>
  );
};

// Preload the model
useGLTF.preload('/lovable-uploads/MaleBaseMesh.glb');

export default BodyModel3D;
