
import React, { useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface HumanModelProps {
  xRotation: number;
  yRotation: number;
  zoom: number;
  verticalPosition: number;
}

export function HumanModel({ xRotation, yRotation, zoom, verticalPosition }: HumanModelProps) {
  const { scene } = useGLTF('/lovable-uploads/MaleBaseMesh-bodyPartsDone.glb');
  const modelRef = useRef<THREE.Group>(null);
  const { camera, gl } = useThree();
  const [selectedMesh, setSelectedMesh] = useState<string | null>(null);
  const [meshes, setMeshes] = useState<THREE.Mesh[]>([]);
  
  // Target values for smooth interpolation
  const targetRotation = useRef({ x: 0, y: 0 });
  const targetScale = useRef(1);
  const targetPosition = useRef({ y: 0 });
  
  // Center the model and setup click interactions
  React.useEffect(() => {
    if (scene) {
      // Clone the scene to avoid modifying the original
      const clonedScene = scene.clone();
      
      // Center the model
      const box = new THREE.Box3().setFromObject(clonedScene);
      const center = box.getCenter(new THREE.Vector3());
      clonedScene.position.sub(center);
      
      // Collect all meshes and setup materials
      const foundMeshes: THREE.Mesh[] = [];
      clonedScene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          foundMeshes.push(child);
          
          // Setup material
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach((mat) => {
                mat.side = THREE.DoubleSide;
                mat.transparent = false;
                if (mat instanceof THREE.MeshStandardMaterial) {
                  mat.color.setHex(0xfdbcb4);
                  mat.roughness = 0.7;
                  mat.metalness = 0.1;
                }
              });
            } else {
              child.material.side = THREE.DoubleSide;
              child.material.transparent = false;
              if (child.material instanceof THREE.MeshStandardMaterial) {
                child.material.color.setHex(0xfdbcb4);
                child.material.roughness = 0.7;
                child.material.metalness = 0.1;
              }
            }
          }
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      
      setMeshes(foundMeshes);
      
      // Clear and add the cloned scene
      if (modelRef.current) {
        modelRef.current.clear();
        modelRef.current.add(clonedScene);
      }
    }
  }, [scene]);

  // Handle mesh visibility based on selection
  React.useEffect(() => {
    meshes.forEach((mesh) => {
      if (selectedMesh === null) {
        // Show all meshes
        mesh.visible = true;
      } else if (mesh.name === selectedMesh) {
        // Show only selected mesh
        mesh.visible = true;
      } else {
        // Hide other meshes
        mesh.visible = false;
      }
    });
  }, [selectedMesh, meshes]);

  // Handle click events
  const handleClick = (event: any) => {
    event.stopPropagation();
    
    // Raycaster for detecting clicks
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    
    // Calculate mouse position in normalized device coordinates
    const rect = gl.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
    raycaster.setFromCamera(mouse, camera);
    
    // Check for intersections with visible meshes
    const visibleMeshes = meshes.filter(mesh => mesh.visible);
    const intersects = raycaster.intersectObjects(visibleMeshes);
    
    if (intersects.length > 0) {
      const clickedMesh = intersects[0].object as THREE.Mesh;
      const meshName = clickedMesh.name;
      
      console.log('Clicked mesh:', meshName);
      
      // Toggle selection: if same mesh clicked, show all; otherwise show only clicked mesh
      if (selectedMesh === meshName) {
        setSelectedMesh(null); // Show all meshes
      } else {
        setSelectedMesh(meshName); // Show only clicked mesh
      }
    }
  };

  // Update target values when props change
  React.useEffect(() => {
    targetRotation.current.x = (xRotation * Math.PI) / 180;
    targetRotation.current.y = (yRotation * Math.PI) / 180;
    
    // Calculate scale based on zoom
    if (scene) {
      const box = new THREE.Box3().setFromObject(scene);
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const baseScale = 2 / maxDim;
      targetScale.current = baseScale * zoom;
    }
    
    // Set vertical position target
    targetPosition.current.y = verticalPosition;
  }, [xRotation, yRotation, zoom, verticalPosition, scene]);

  // Smooth interpolation using useFrame
  useFrame((state, delta) => {
    if (modelRef.current) {
      // Smooth rotation interpolation
      const lerpFactor = Math.min(delta * 8, 1);
      
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
  
  return (
    <group 
      ref={modelRef} 
      onClick={handleClick}
      onPointerOver={() => gl.domElement.style.cursor = 'pointer'}
      onPointerOut={() => gl.domElement.style.cursor = 'default'}
    />
  );
}
