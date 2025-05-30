import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { RotateCcw, RotateCw } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import * as THREE from 'three';

interface HumanModelProps {
  xRotation: number;
  yRotation: number;
}

function HumanModel({ xRotation, yRotation }: HumanModelProps) {
  // Try MaleBaseMesh3.glb as requested
  const { scene } = useGLTF('/lovable-uploads/MaleBaseMesh3.glb');
  
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
      
      // Apply rotation from sliders (convert degrees to radians) with smooth transition
      scene.rotation.x = (xRotation * Math.PI) / 180;
      scene.rotation.y = (yRotation * Math.PI) / 180;
      
      // Ensure the model has proper materials and is visible
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          // Type assertion to ensure we can access material properties
          const mesh = child as THREE.Mesh;
          
          // Make sure the material is visible and not just a silhouette
          if (mesh.material) {
            if (Array.isArray(mesh.material)) {
              // Handle multiple materials
              mesh.material.forEach((mat) => {
                mat.side = THREE.DoubleSide;
                mat.transparent = false;
                if (mat instanceof THREE.MeshStandardMaterial) {
                  mat.color.setHex(0xfdbcb4); // Skin tone color
                  mat.roughness = 0.7;
                  mat.metalness = 0.1;
                }
              });
            } else {
              // Handle single material
              mesh.material.side = THREE.DoubleSide;
              mesh.material.transparent = false;
              if (mesh.material instanceof THREE.MeshStandardMaterial) {
                mesh.material.color.setHex(0xfdbcb4); // Skin tone color
                mesh.material.roughness = 0.7;
                mesh.material.metalness = 0.1;
              }
            }
          }
          mesh.castShadow = true;
          mesh.receiveShadow = true;
        }
      });
    }
  }, [scene, xRotation, yRotation]);
  
  return <primitive object={scene} />;
}

export default function ThreeBodyViewer() {
  const [xRotation, setXRotation] = useState(0); // X-axis rotation in degrees
  const [yRotation, setYRotation] = useState(0); // Y-axis rotation in degrees
  const isMobile = useIsMobile();

  const handleXRotationChange = (value: number[]) => {
    setXRotation(value[0]);
  };

  const handleYRotationChange = (value: number[]) => {
    setYRotation(value[0]);
  };

  const resetRotation = () => {
    setXRotation(0);
    setYRotation(0);
  };

  const RotationControls = () => (
    <div className="space-y-6 p-6 bg-white/95 backdrop-blur-sm rounded-lg border shadow-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-700">Model Rotation</h3>
        <button 
          onClick={resetRotation}
          className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
          title="Reset to neutral position"
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </button>
      </div>
      
      {/* Y-axis rotation (horizontal rotation) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-xs text-gray-600 font-medium">Horizontal Rotation</Label>
          <span className="text-xs text-gray-500 font-mono min-w-[3rem] text-right">{yRotation}°</span>
        </div>
        <div className="flex items-center gap-3">
          <RotateCcw className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <Slider
            value={[yRotation]}
            onValueChange={handleYRotationChange}
            min={-180}
            max={180}
            step={1}
            className="flex-1 [&_.slider-track]:transition-all [&_.slider-track]:duration-75 [&_.slider-thumb]:transition-all [&_.slider-thumb]:duration-75"
          />
          <RotateCw className="w-4 h-4 text-gray-400 flex-shrink-0" />
        </div>
      </div>

      {/* X-axis rotation (vertical rotation) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-xs text-gray-600 font-medium">Vertical Rotation</Label>
          <span className="text-xs text-gray-500 font-mono min-w-[3rem] text-right">{xRotation}°</span>
        </div>
        <div className="flex items-center gap-3">
          <RotateCcw className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <Slider
            value={[xRotation]}
            onValueChange={handleXRotationChange}
            min={-90}
            max={90}
            step={1}
            className="flex-1 [&_.slider-track]:transition-all [&_.slider-track]:duration-75 [&_.slider-thumb]:transition-all [&_.slider-thumb]:duration-75"
          />
          <RotateCw className="w-4 h-4 text-gray-400 flex-shrink-0" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      {/* Desktop: Side-by-side layout */}
      {!isMobile ? (
        <div className="flex gap-8 items-start">
          <div style={{ height: '600px', width: '65%' }} className="relative">
            <Canvas 
              camera={{ position: [-1, 1, 4], fov: 50 }}
              shadows
              onError={(error) => {
                console.error('Canvas error:', error);
              }}
            >
              <ambientLight intensity={0.7} />
              <directionalLight 
                position={[5, 5, 5]} 
                intensity={0.8}
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
              />
              <directionalLight position={[-5, 5, 5]} intensity={0.6} />
              <directionalLight position={[0, 5, -5]} intensity={0.4} />
              <pointLight position={[0, 5, 0]} intensity={0.3} />
              <Suspense fallback={null}>
                <HumanModel xRotation={xRotation} yRotation={yRotation} />
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
          
          {/* Controls on the right side for desktop */}
          <div className="w-80 flex-shrink-0">
            <RotationControls />
          </div>
        </div>
      ) : (
        /* Mobile: Stacked layout */
        <div className="space-y-6">
          <div style={{ height: '500px', width: '100%' }} className="relative">
            <Canvas 
              camera={{ position: [-1, 1, 4], fov: 50 }}
              shadows
              onError={(error) => {
                console.error('Canvas error:', error);
              }}
            >
              <ambientLight intensity={0.7} />
              <directionalLight 
                position={[5, 5, 5]} 
                intensity={0.8}
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
              />
              <directionalLight position={[-5, 5, 5]} intensity={0.6} />
              <directionalLight position={[0, 5, -5]} intensity={0.4} />
              <pointLight position={[0, 5, 0]} intensity={0.3} />
              <Suspense fallback={null}>
                <HumanModel xRotation={xRotation} yRotation={yRotation} />
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
          
          {/* Controls below the canvas for mobile */}
          <RotationControls />
        </div>
      )}
    </div>
  );
}
