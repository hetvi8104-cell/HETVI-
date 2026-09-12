import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeClothPreviewProps {
  colorHex?: string;
  wireframe?: boolean;
  roughness?: number;
  metalness?: number;
  height?: number;
}

export const ThreeClothPreview: React.FC<ThreeClothPreviewProps> = ({
  colorHex = '#722F37',
  wireframe = false,
  roughness = 0.5,
  metalness = 0.2,
  height = 220
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const prevMouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth;
    const h = height;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / h, 0.1, 50);
    camera.position.set(0, 0, 2.8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Dynamic wave cloth mesh
    const clothGeo = new THREE.PlaneGeometry(1.8, 1.8, 28, 28);
    const clothMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(colorHex),
      roughness,
      metalness,
      wireframe,
      side: THREE.DoubleSide
    });
    const clothMesh = new THREE.Mesh(clothGeo, clothMat);
    scene.add(clothMesh);

    // Studio Lights
    const ambient = new THREE.AmbientLight(0xffffff, 1.5);
    const dirLight = new THREE.DirectionalLight(0xfff8f0, 3.0);
    dirLight.position.set(2, 3, 2);
    const rimLight = new THREE.DirectionalLight(0xd8c7b5, 2.0);
    rimLight.position.set(-2, -2, -1);
    scene.add(ambient, dirLight, rimLight);

    let clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Ripple wave simulation
      const pos = clothGeo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const vx = pos.getX(i);
        const vy = pos.getY(i);
        pos.setZ(i, Math.sin(vx * 3 + t * 2.5) * 0.12 + Math.cos(vy * 3 + t * 2) * 0.08);
      }
      pos.needsUpdate = true;

      if (!isDraggingRef.current) {
        clothMesh.rotation.y = Math.sin(t * 0.5) * 0.2;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      container.innerHTML = '';
    };
  }, [colorHex, wireframe, roughness, metalness, height]);

  return (
    <div 
      ref={mountRef} 
      className="w-full relative rounded-lg overflow-hidden cursor-grab active:cursor-grabbing border border-[#D8C7B5]/30 bg-[#262223]/10"
      style={{ height: `${height}px` }}
    />
  );
};
