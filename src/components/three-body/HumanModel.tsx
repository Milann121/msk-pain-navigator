
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface HumanModelProps {
  xRotation: number;
  yRotation: number;
  zoom: number;
  verticalPosition: number;
}

export function HumanModel({ xRotation, yRotation, zoom, verticalPosition }: HumanModelProps) {
  // Try MaleBaseMesh3.glb as requested
  const { scene } = useGLTF('/lovable-uploads/MaleBaseMesh3.glb');
  const modelRef = useRef<THREE.Group>(null);
  
  // Target values for smooth interpolation
  const targetRotation = useRef({ x: 0, y: 0 });
  const targetScale = useRef(1);
  const targetPosition = useRef({ y: 0 });
  
  // Center the model and ensure it's properly scaled
  React.useEffect(() => {
    if (scene) {
      // Center the model
      const box = new THREE.Box3().setFromObject(scene);
      const center = box.getCenter(new THREE.Vector3());
      scene.position.sub(center);
      
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
  }, [scene]);

  // Update target values when props change
  React.useEffect(() => {
    targetRotation.current.x = (xRotation * Math.PI) / 180;
    targetRotation.current.y = (yRotation * Math.PI) / 180;
    
    // Calculate scale based on zoom
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const baseScale = 2 / maxDim;
    targetScale.current = baseScale * zoom;
    
    // Set vertical position target
    targetPosition.current.y = verticalPosition;
  }, [xRotation, yRotation, zoom, verticalPosition, scene]);

  // Smooth interpolation using useFrame
  useFrame((state, delta) => {
    if (modelRef.current && scene) {
      // Smooth rotation interpolation
      const lerpFactor = Math.min(delta * 8, 1); // Adjust speed here (8 = fast, 4 = medium, 2 = slow)
      
      modelRef.current.rotation.x = THREE.MathUtils.lerp(
        modelRef.current.rotation.x,
        targetRotation.current.x,
        lerpFactor
      );
      
      modelRef.current.rotation.y = THREE.MathUtils.lerp(
        modelRef.current.rotation.y,
        targetRotation.current.y,
        lerpFactor
      );
      
      // Smooth scale interpolation
      const currentScale = modelRef.current.scale.x;
      const newScale = THREE.MathUtils.lerp(currentScale, targetScale.current, lerpFactor);
      modelRef.current.scale.setScalar(newScale);
      
      // Smooth vertical position interpolation
      modelRef.current.position.y = THREE.MathUtils.lerp(
        modelRef.current.position.y,
        targetPosition.current.y,
        lerpFactor
      );
    }
  });
  
  return <primitive ref={modelRef} object={scene} />;
}
