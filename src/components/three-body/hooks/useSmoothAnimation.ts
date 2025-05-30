
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SmoothAnimationProps {
  xRotation: number;
  yRotation: number;
  zoom: number;
  verticalPosition: number;
  scene: THREE.Object3D | null;
  modelRef: React.RefObject<THREE.Group>;
}

export const useSmoothAnimation = ({
  xRotation,
  yRotation,
  zoom,
  verticalPosition,
  scene,
  modelRef
}: SmoothAnimationProps) => {
  // Target values for smooth interpolation
  const targetRotation = useRef({ x: 0, y: 0 });
  const targetScale = useRef(1);
  const targetPosition = useRef({ y: 0 });

  // Update target values when props change
  useEffect(() => {
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
};
