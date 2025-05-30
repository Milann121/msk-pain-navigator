
import { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';

export const useModelSetup = (scene: THREE.Object3D | null) => {
  const [meshes, setMeshes] = useState<THREE.Mesh[]>([]);
  const [bodyPartMeshes, setBodyPartMeshes] = useState<THREE.Mesh[]>([]);
  const clonedSceneRef = useRef<THREE.Object3D | null>(null);

  useEffect(() => {
    if (scene && !clonedSceneRef.current) {
      // Clone the scene to avoid modifying the original
      const clonedScene = scene.clone();
      clonedSceneRef.current = clonedScene;
      
      // Center the model
      const box = new THREE.Box3().setFromObject(clonedScene);
      const center = box.getCenter(new THREE.Vector3());
      clonedScene.position.sub(center);
      
      // Collect all meshes and setup materials
      const foundMeshes: THREE.Mesh[] = [];
      const foundBodyPartMeshes: THREE.Mesh[] = [];
      
      clonedScene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          foundMeshes.push(child);
          
          // Exclude the main body mesh from selectable parts
          if (child.name !== 'MaleBaseMesh') {
            foundBodyPartMeshes.push(child);
          }
          
          console.log('Found mesh:', child.name, child.name === 'MaleBaseMesh' ? '(excluded from selection)' : '(selectable)');
          
          // Setup material with default skin color
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach((mat) => {
                mat.side = THREE.DoubleSide;
                mat.transparent = false;
                if (mat instanceof THREE.MeshStandardMaterial) {
                  mat.color.setHex(0xfdbcb4); // Default skin color
                  mat.roughness = 0.7;
                  mat.metalness = 0.1;
                }
              });
            } else {
              child.material.side = THREE.DoubleSide;
              child.material.transparent = false;
              if (child.material instanceof THREE.MeshStandardMaterial) {
                child.material.color.setHex(0xfdbcb4); // Default skin color
                child.material.roughness = 0.7;
                child.material.metalness = 0.1;
              }
            }
          }
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      
      console.log('Total meshes found:', foundMeshes.length);
      console.log('Selectable body part meshes:', foundBodyPartMeshes.length);
      console.log('Body part mesh names:', foundBodyPartMeshes.map(m => m.name));
      setMeshes(foundMeshes);
      setBodyPartMeshes(foundBodyPartMeshes);
    }
  }, [scene]);

  return {
    meshes,
    bodyPartMeshes,
    clonedScene: clonedSceneRef.current
  };
};
