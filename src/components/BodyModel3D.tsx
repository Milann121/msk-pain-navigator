
import { Suspense, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BodyModel3DProps {
  onAreaClick?: (area: 'neck' | 'middle back' | 'lower back') => void;
  selectedArea?: 'neck' | 'middle back' | 'lower back';
}

const BodyModel = ({ onAreaClick, selectedArea }: { onAreaClick?: (area: 'neck' | 'middle back' | 'lower back') => void; selectedArea?: string }) => {
  const { scene } = useGLTF('/malebasemesh.glb');
  const meshRef = useRef<THREE.Group>(null);
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);

  const handleClick = (event: any) => {
    event.stopPropagation();
    
    if (!onAreaClick) return;
    
    // Get the intersection point
    const point = event.point;
    
    // Determine which body area was clicked based on Y coordinate
    if (point.y > 1.5) {
      onAreaClick('neck');
    } else if (point.y > 0.5) {
      onAreaClick('middle back');
    } else {
      onAreaClick('lower back');
    }
  };

  const getAreaColor = (area: string) => {
    if (selectedArea === area) return '#3b82f6'; // Blue for selected
    if (hoveredArea === area) return '#60a5fa'; // Light blue for hover
    return '#94a3b8'; // Gray for default
  };

  return (
    <group ref={meshRef}>
      <primitive 
        object={scene} 
        scale={[2, 2, 2]} 
        position={[0, -1, 0]}
        onClick={handleClick}
        onPointerOver={(e) => {
          e.stopPropagation();
          const point = e.point;
          if (point.y > 1.5) setHoveredArea('neck');
          else if (point.y > 0.5) setHoveredArea('middle back');
          else setHoveredArea('lower back');
        }}
        onPointerOut={() => setHoveredArea(null)}
      />
      
      {/* Highlight areas */}
      <mesh 
        position={[0, 1.8, 0.1]} 
        onClick={() => onAreaClick?.('neck')}
        onPointerOver={() => setHoveredArea('neck')}
        onPointerOut={() => setHoveredArea(null)}
      >
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial 
          color={getAreaColor('neck')} 
          transparent 
          opacity={selectedArea === 'neck' || hoveredArea === 'neck' ? 0.3 : 0.1} 
        />
      </mesh>
      
      <mesh 
        position={[0, 1.0, 0.1]} 
        onClick={() => onAreaClick?.('middle back')}
        onPointerOver={() => setHoveredArea('middle back')}
        onPointerOut={() => setHoveredArea(null)}
      >
        <boxGeometry args={[0.6, 0.8, 0.3]} />
        <meshBasicMaterial 
          color={getAreaColor('middle back')} 
          transparent 
          opacity={selectedArea === 'middle back' || hoveredArea === 'middle back' ? 0.3 : 0.1} 
        />
      </mesh>
      
      <mesh 
        position={[0, 0.2, 0.1]} 
        onClick={() => onAreaClick?.('lower back')}
        onPointerOver={() => setHoveredArea('lower back')}
        onPointerOut={() => setHoveredArea(null)}
      >
        <boxGeometry args={[0.6, 0.6, 0.3]} />
        <meshBasicMaterial 
          color={getAreaColor('lower back')} 
          transparent 
          opacity={selectedArea === 'lower back' || hoveredArea === 'lower back' ? 0.3 : 0.1} 
        />
      </mesh>
    </group>
  );
};

const BodyModel3D = ({ onAreaClick, selectedArea }: BodyModel3DProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center text-lg">Vyberte oblasť bolesti na modeli</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-96 w-full">
          <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <Suspense fallback={null}>
              <BodyModel onAreaClick={onAreaClick} selectedArea={selectedArea} />
            </Suspense>
            <OrbitControls 
              enableZoom={true} 
              enablePan={false}
              maxDistance={6}
              minDistance={2}
            />
          </Canvas>
        </div>
        <p className="text-sm text-gray-500 text-center mt-2">
          Kliknite na model alebo použite ovládacie prvky nižšie
        </p>
      </CardContent>
    </Card>
  );
};

// Preload the GLTF model
useGLTF.preload('/malebasemesh.glb');

export default BodyModel3D;
