
import React from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface HumanModelProps {
  xRotation: number;
  yRotation: number;
}

export function HumanModel({ xRotation, yRotation }: HumanModelProps) {
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
