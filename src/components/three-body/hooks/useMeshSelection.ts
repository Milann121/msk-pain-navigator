
import { useState, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

export const useMeshSelection = (meshes: THREE.Mesh[], bodyPartMeshes: THREE.Mesh[]) => {
  const [selectedMesh, setSelectedMesh] = useState<string | null>(null);
  const { camera, gl } = useThree();

  // Handle mesh visibility and highlighting based on selection
  useEffect(() => {
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

  return {
    selectedMesh,
    handleClick
  };
};
