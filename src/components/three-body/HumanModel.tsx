
import React from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface HumanModelProps {
  xRotation: number;
  yRotation: number;
}

export function HumanModel({ xRotation, yRotation }: HumanModelProps) {
  const { scene } = useGLTF('/lovable-uploads/MaleBaseMesh3.glb');
  
  React.useEffect(() => {
    if (scene) {
      // Clone the scene to avoid modifying the original
      const clonedScene = scene.clone();
      
      // Center the model properly
      const box = new THREE.Box3().setFromObject(clonedScene);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      
      // Center the model at origin
      clonedScene.position.sub(center);
      
      // Scale the model to fit well in the viewport
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 2.5 / maxDim;
      clonedScene.scale.setScalar(scale);
      
      // Position the model slightly lower to center it better visually
      clonedScene.position.y = -0.2;
      
      // Apply rotations around the center (origin)
      clonedScene.rotation.x = (xRotation * Math.PI) / 180;
      clonedScene.rotation.y = (yRotation * Math.PI) / 180;
      
      // Ensure the model has proper materials and is visible
      clonedScene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          const mesh = child as THREE.Mesh;
          
          if (mesh.material) {
            if (Array.isArray(mesh.material)) {
              mesh.material.forEach((mat) => {
                mat.side = THREE.DoubleSide;
                mat.transparent = false;
                if (mat instanceof THREE.MeshStandardMaterial) {
                  mat.color.setHex(0xfdbcb4);
                  mat.roughness = 0.7;
                  mat.metalness = 0.1;
                }
              });
            } else {
              mesh.material.side = THREE.DoubleSide;
              mesh.material.transparent = false;
              if (mesh.material instanceof THREE.MeshStandardMaterial) {
                mesh.material.color.setHex(0xfdbcb4);
                mesh.material.roughness = 0.7;
                mesh.material.metalness = 0.1;
              }
            }
          }
          mesh.castShadow = true;
          mesh.receiveShadow = true;
        }
      });
      
      // Replace the scene content
      scene.clear();
      scene.add(clonedScene);
    }
  }, [scene, xRotation, yRotation]);
  
  return <primitive object={scene} />;
}
