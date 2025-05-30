
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
  const [bodyPartMeshes, setBodyPartMeshes] = useState<THREE.Mesh[]>([]);
  const clonedSceneRef = useRef<THREE.Object3D | null>(null);
  
  // Target values for smooth interpolation
  const targetRotation = useRef({ x: 0, y: 0 });
  const targetScale = useRef(1);
  const targetPosition = useRef({ y: 0 });
  
  // Center the model and setup click interactions
  React.useEffect(() => {
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
      
      // Clear and add the cloned scene
      if (modelRef.current) {
        modelRef.current.clear();
        modelRef.current.add(clonedScene);
      }
    }
  }, [scene]);

  // Handle mesh visibility and highlighting based on selection
  React.useEffect(() => {
    console.log('Updating mesh visibility. Selected:', selectedMesh);
    
    // Handle the main body mesh separately - always hide it when a body part is selected
    const mainBodyMesh = meshes.find(mesh => mesh.name === 'MaleBaseMesh');
    if (mainBodyMesh) {
      mainBodyMesh.visible = selectedMesh === null;
    }
    
    // Handle body part meshes
    bodyPartMeshes.forEach((mesh) => {
      if (selectedMesh === null) {
        // Show all body part meshes with default color
        mesh.visible = true;
        if (mesh.material) {
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((mat) => {
              if (mat instanceof THREE.MeshStandardMaterial) {
                mat.color.setHex(0xfdbcb4); // Default skin color
                mat.emissive.setHex(0x000000); // No emission
              }
            });
          } else if (mesh.material instanceof THREE.MeshStandardMaterial) {
            mesh.material.color.setHex(0xfdbcb4); // Default skin color
            mesh.material.emissive.setHex(0x000000); // No emission
          }
        }
      } else if (mesh.name === selectedMesh) {
        // Show selected mesh with highlight
        mesh.visible = true;
        if (mesh.material) {
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((mat) => {
              if (mat instanceof THREE.MeshStandardMaterial) {
                mat.color.setHex(0xff6b6b); // Highlighted color (red)
                mat.emissive.setHex(0x220000); // Slight red emission
              }
            });
          } else if (mesh.material instanceof THREE.MeshStandardMaterial) {
            mesh.material.color.setHex(0xff6b6b); // Highlighted color (red)
            mesh.material.emissive.setHex(0x220000); // Slight red emission
          }
        }
        console.log('Showing and highlighting mesh:', mesh.name);
      } else {
        // Hide other body part meshes
        mesh.visible = false;
        console.log('Hiding mesh:', mesh.name);
      }
    });
  }, [selectedMesh, meshes, bodyPartMeshes]);

  // Handle mesh selection with raycasting
  const handleClick = (event: any) => {
    event.stopPropagation();
    
    console.log('Handling mesh selection');
    
    // Raycaster for detecting clicks
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    
    // Calculate mouse position in normalized device coordinates
    const rect = gl.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
    raycaster.setFromCamera(mouse, camera);
    
    // Check for intersections with visible body part meshes only (exclude MaleBaseMesh)
    const visibleBodyPartMeshes = bodyPartMeshes.filter(mesh => mesh.visible);
    console.log('Checking intersections with', visibleBodyPartMeshes.length, 'visible body part meshes');
    
    const intersects = raycaster.intersectObjects(visibleBodyPartMeshes, true);
    
    if (intersects.length > 0) {
      const clickedObject = intersects[0].object as THREE.Mesh;
      const meshName = clickedObject.name;
      
      console.log('Clicked body part mesh:', meshName);
      console.log('Current selected mesh:', selectedMesh);
      
      // Toggle selection: if same mesh clicked, show all; otherwise show only clicked mesh
      if (selectedMesh === meshName) {
        console.log('Deselecting mesh, showing all');
        setSelectedMesh(null); // Show all meshes
      } else {
        console.log('Selecting mesh:', meshName);
        setSelectedMesh(meshName); // Show only clicked mesh
      }
    } else {
      console.log('No intersections found, showing all meshes');
      setSelectedMesh(null); // Show all meshes when clicking empty space
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
