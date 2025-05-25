import React, { useEffect, useRef } from 'react';

export default function ThreeBodyViewer() {
  const containerRef = useRef(null);

  useEffect(() => {
    (async () => {
      const THREE = await import('https://cdn.skypack.dev/three');
      const { GLTFLoader } = await import('https://cdn.skypack.dev/three/examples/jsm/loaders/GLTFLoader.js');
      const { OrbitControls } = await import('https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls.js');

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      containerRef.current.appendChild(renderer.domElement);

      const loader = new GLTFLoader();
      loader.load('/lovable-uploads/MaleBaseMesh.glb', function (gltf) {
        scene.add(gltf.scene);
      });

      const light = new THREE.AmbientLight(0xffffff);
      scene.add(light);

      const controls = new OrbitControls(camera, renderer.domElement);
      camera.position.set(0, 1.5, 3);
      controls.update();

      function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      }

      animate();
    })();
  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: '600px' }} />;
}
