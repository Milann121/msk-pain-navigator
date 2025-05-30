
import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useModelSetup } from './hooks/useModelSetup';
import { useMeshSelection } from './hooks/useMeshSelection';
import { useSmoothAnimation } from './hooks/useSmoothAnimation';

interface HumanModelProps {
  xRotation: number;
  yRotation: number;
  zoom: number;
  verticalPosition: number;
}

export function HumanModel({ xRotation, yRotation, zoom, verticalPosition }: HumanModelProps) {
  const { scene } = useGLTF('/lovable-uploads/MaleBaseMesh-bodyPartsDone.glb');
  const modelRef = useRef<THREE.Group>(null);
  const { gl } = useThree();
  
  // Use custom hooks for different concerns
  const { meshes, bodyPartMeshes, clonedScene } = useModelSetup(scene);
  const { handleClick } = useMeshSelection(meshes, bodyPartMeshes);
  
  // Setup smooth animation
  useSmoothAnimation({
    xRotation,
    yRotation,
    zoom,
    verticalPosition,
    scene,
    modelRef
  });

  // Add the cloned scene to the model ref when it's ready
  useEffect(() => {
    if (clonedScene && modelRef.current) {
      modelRef.current.clear();
      modelRef.current.add(clonedScene);
    }
  }, [clonedScene]);
  
  return (
    <group 
      ref={modelRef} 
      onClick={handleClick}
      onPointerOver={() => gl.domElement.style.cursor = 'pointer'}
      onPointerOut={() => gl.domElement.style.cursor = 'default'}
    />
  );
}
