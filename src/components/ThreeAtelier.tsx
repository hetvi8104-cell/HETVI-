import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GARMENTS_DATA, TEXTILE_SAMPLES } from '../data/garmentsData';
import { GarmentLook } from '../types/portfolio';
import { sounds } from '../utils/soundEffects';
import { 
  RotateCw, 
  Sun, 
  Layers, 
  Sparkles, 
  Info, 
  Maximize2, 
  Eye, 
  X, 
  Palette, 
  Scissors, 
  Compass, 
  ArrowRight 
} from 'lucide-react';

interface ThreeAtelierProps {
  onNavigateToSlide?: (pageNumber: number) => void;
  onClose?: () => void;
}

export const ThreeAtelier: React.FC<ThreeAtelierProps> = ({ onNavigateToSlide, onClose }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedGarmentIndex, setSelectedGarmentIndex] = useState<number>(0);
  const [selectedTextileIndex, setSelectedTextileIndex] = useState<number | null>(null);
  const [lightingMode, setLightingMode] = useState<'runway' | 'studio' | 'noir' | 'sunlight'>('runway');
  const [renderMode, setRenderMode] = useState<'textured' | 'wireframe' | 'structure'>('textured');
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const [infoDrawerOpen, setInfoDrawerOpen] = useState<boolean>(true);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const meshGroupRef = useRef<THREE.Group | null>(null);
  const lightsGroupRef = useRef<THREE.Group | null>(null);
  const reqAnimRef = useRef<number | null>(null);

  const isDraggingRef = useRef<boolean>(false);
  const previousMousePositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const activeGarment: GarmentLook = GARMENTS_DATA[selectedGarmentIndex];

  // Initialize Three.js Scene
  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x191617);
    scene.fog = new THREE.FogExp2(0x191617, 0.035);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.5, 4.2);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    rendererRef.current = renderer;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Groups
    const meshGroup = new THREE.Group();
    scene.add(meshGroup);
    meshGroupRef.current = meshGroup;

    const lightsGroup = new THREE.Group();
    scene.add(lightsGroup);
    lightsGroupRef.current = lightsGroup;

    // Circular pedestal platform
    const pedestalGeo = new THREE.CylinderGeometry(1.6, 1.8, 0.15, 64);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0x262223,
      roughness: 0.8,
      metalness: 0.2
    });
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestal.position.y = -1.6;
    pedestal.receiveShadow = true;
    scene.add(pedestal);

    // Ambient floating dust particles
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 8;
      positions[i + 1] = (Math.random() - 0.5) * 6;
      positions[i + 2] = (Math.random() - 0.5) * 8;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xd8c7b5,
      size: 0.03,
      transparent: true,
      opacity: 0.4
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Initial build
    updateLights(lightingMode);
    buildGarmentGeometry(selectedGarmentIndex, renderMode);

    // Render loop
    let clock = new THREE.Clock();
    const animate = () => {
      reqAnimRef.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Gentle floating animation
      if (meshGroupRef.current) {
        if (isAutoRotating && !isDraggingRef.current) {
          meshGroupRef.current.rotation.y += 0.006;
        }
        meshGroupRef.current.position.y = Math.sin(elapsedTime * 1.5) * 0.05;

        // Wave deformation for fabric dynamic realism
        meshGroupRef.current.traverse((child) => {
          if (child instanceof THREE.Mesh && child.geometry && child.geometry.attributes.position) {
            const posAttr = child.geometry.attributes.position;
            // subtle wave
            for (let i = 0; i < posAttr.count; i++) {
              if (i % 6 === 0) {
                const u = posAttr.getY(i);
                posAttr.setZ(i, Math.sin(elapsedTime * 2 + u * 3) * 0.02);
              }
            }
            posAttr.needsUpdate = true;
          }
        });
      }

      particles.rotation.y = elapsedTime * 0.02;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (reqAnimRef.current) cancelAnimationFrame(reqAnimRef.current);
      renderer.dispose();
      container.innerHTML = '';
    };
  }, []);

  // Update lighting setup
  const updateLights = (mode: 'runway' | 'studio' | 'noir' | 'sunlight') => {
    if (!lightsGroupRef.current) return;
    const group = lightsGroupRef.current;
    group.clear();

    if (mode === 'runway') {
      const ambLight = new THREE.AmbientLight(0x722f37, 0.9);
      const spotLight = new THREE.SpotLight(0xfff8f0, 4.5, 12, Math.PI / 4, 0.4, 1);
      spotLight.position.set(2, 4, 3);
      spotLight.castShadow = true;

      const rimLight = new THREE.DirectionalLight(0xd8c7b5, 2.5);
      rimLight.position.set(-3, 2, -2);

      const floorFill = new THREE.PointLight(0x5a1f2b, 2, 6);
      floorFill.position.set(0, -1, 1);

      group.add(ambLight, spotLight, rimLight, floorFill);
    } else if (mode === 'studio') {
      const ambLight = new THREE.AmbientLight(0xf7f3ec, 1.8);
      const mainLight = new THREE.DirectionalLight(0xffffff, 3.2);
      mainLight.position.set(3, 4, 3);
      const softFill = new THREE.DirectionalLight(0xe8ddd0, 2);
      softFill.position.set(-3, 2, 2);
      group.add(ambLight, mainLight, softFill);
    } else if (mode === 'noir') {
      const ambLight = new THREE.AmbientLight(0x262223, 0.4);
      const rimLight1 = new THREE.DirectionalLight(0xd8c7b5, 3.5);
      rimLight1.position.set(-2, 3, -2);
      const rimLight2 = new THREE.DirectionalLight(0x722f37, 3.0);
      rimLight2.position.set(2, 1, -2);
      const lowKey = new THREE.SpotLight(0xffffff, 1.5, 10, Math.PI / 6);
      lowKey.position.set(0, 4, 2);
      group.add(ambLight, rimLight1, rimLight2, lowKey);
    } else {
      // Sunlight
      const ambLight = new THREE.AmbientLight(0xfcfaf7, 1.4);
      const sun = new THREE.DirectionalLight(0xfffaed, 3.8);
      sun.position.set(4, 5, 2);
      sun.castShadow = true;
      group.add(ambLight, sun);
    }
  };

  // Build Procedural 3D Garment Geometry tailored for each of Hetvi's 6 designs
  const buildGarmentGeometry = (lookIndex: number, currentRenderMode: 'textured' | 'wireframe' | 'structure') => {
    if (!meshGroupRef.current) return;
    const group = meshGroupRef.current;
    group.clear();

    const isWire = currentRenderMode === 'wireframe';
    const isStruct = currentRenderMode === 'structure';

    // Mannequin core stand
    const standGeo = new THREE.CylinderGeometry(0.04, 0.04, 3.2, 16);
    const standMat = new THREE.MeshStandardMaterial({
      color: 0x262223,
      metalness: 0.8,
      roughness: 0.3
    });
    const stand = new THREE.Mesh(standGeo, standMat);
    stand.position.y = -0.4;
    group.add(stand);

    // Torso Core Form
    const torsoGeo = new THREE.CylinderGeometry(0.32, 0.24, 0.9, 32, 16);
    const torsoMat = new THREE.MeshStandardMaterial({
      color: isStruct ? 0x9a6670 : 0x262223,
      wireframe: isWire,
      roughness: 0.7,
      transparent: isStruct,
      opacity: isStruct ? 0.6 : 1
    });
    const torso = new THREE.Mesh(torsoGeo, torsoMat);
    torso.position.y = 0.25;
    group.add(torso);

    // Neck & Head abstract finial
    const neckGeo = new THREE.CylinderGeometry(0.12, 0.14, 0.25, 16);
    const neck = new THREE.Mesh(neckGeo, standMat);
    neck.position.y = 0.8;
    group.add(neck);

    // Create distinctive garment silhouettes based on lookIndex (0 to 5)
    if (lookIndex === 0) {
      // WESTERN LOOK 01: The Structured Sovereign (Sculptural Trench & Peplum Corset)
      // Shoulder wings / storm flaps
      const flapGeo = new THREE.ConeGeometry(0.65, 0.45, 4);
      const flapMat = new THREE.MeshStandardMaterial({
        color: 0x5a1f2b, // Deep Wine
        roughness: 0.5,
        wireframe: isWire,
        side: THREE.DoubleSide
      });
      const flapLeft = new THREE.Mesh(flapGeo, flapMat);
      flapLeft.rotation.z = Math.PI / 3;
      flapLeft.position.set(-0.35, 0.6, 0);
      group.add(flapLeft);

      const flapRight = new THREE.Mesh(flapGeo, flapMat);
      flapRight.rotation.z = -Math.PI / 3;
      flapRight.position.set(0.35, 0.6, 0);
      group.add(flapRight);

      // Trench flared coat skirt
      const coatSkirtGeo = new THREE.CylinderGeometry(0.26, 0.75, 1.4, 32, 16, true);
      const coatMat = new THREE.MeshStandardMaterial({
        color: 0xd8c7b5, // Warm Beige
        roughness: 0.65,
        wireframe: isWire,
        side: THREE.DoubleSide
      });
      const coatSkirt = new THREE.Mesh(coatSkirtGeo, coatMat);
      coatSkirt.position.y = -0.7;
      group.add(coatSkirt);

      // Corset boning ribs
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        const ribGeo = new THREE.TorusGeometry(0.28, 0.015, 8, 32, Math.PI / 2);
        const ribMat = new THREE.MeshStandardMaterial({
          color: 0x722f37,
          metalness: 0.6,
          roughness: 0.2
        });
        const rib = new THREE.Mesh(ribGeo, ribMat);
        rib.rotation.y = angle;
        rib.position.y = 0.2 - i * 0.06;
        group.add(rib);
      }
    } else if (lookIndex === 1) {
      // WESTERN LOOK 02: The Fluid Monolith (Asymmetric Draped Column Gown)
      // Asymmetric one-shoulder strap & cowl
      const drapeGeo = new THREE.TorusGeometry(0.38, 0.12, 16, 32, Math.PI);
      const drapeMat = new THREE.MeshStandardMaterial({
        color: 0x722f37, // Burgundy
        roughness: 0.35,
        wireframe: isWire,
        side: THREE.DoubleSide
      });
      const drape = new THREE.Mesh(drapeGeo, drapeMat);
      drape.rotation.x = Math.PI / 4;
      drape.rotation.y = -Math.PI / 6;
      drape.position.set(0.1, 0.55, 0.1);
      group.add(drape);

      // Column skirt with dramatic side train
      const colGeo = new THREE.CylinderGeometry(0.25, 0.45, 1.8, 32, 24, true);
      const colMat = new THREE.MeshStandardMaterial({
        color: 0x9a6670, // Dusty Rose
        roughness: 0.4,
        wireframe: isWire,
        side: THREE.DoubleSide
      });
      const column = new THREE.Mesh(colGeo, colMat);
      column.position.y = -0.85;
      group.add(column);

      // Cascading train wing
      const trainGeo = new THREE.PlaneGeometry(0.5, 1.6, 16, 16);
      const train = new THREE.Mesh(trainGeo, drapeMat);
      train.position.set(0.35, -0.9, -0.2);
      train.rotation.y = Math.PI / 4;
      group.add(train);
    } else if (lookIndex === 2) {
      // WESTERN LOOK 03: The Kinetic Tailored Suite (Cutaway Blazer & Culottes)
      // Boxy cropped blazer
      const blazerGeo = new THREE.BoxGeometry(0.72, 0.48, 0.45);
      const blazerMat = new THREE.MeshStandardMaterial({
        color: 0xe8ddd0, // Soft Beige
        roughness: 0.7,
        wireframe: isWire
      });
      const blazer = new THREE.Mesh(blazerGeo, blazerMat);
      blazer.position.y = 0.35;
      group.add(blazer);

      // Wide flared culotte legs (Left & Right)
      const legGeo = new THREE.CylinderGeometry(0.16, 0.48, 1.3, 24, 16, true);
      const culotteMat = new THREE.MeshStandardMaterial({
        color: 0xd8c7b5,
        roughness: 0.6,
        wireframe: isWire,
        side: THREE.DoubleSide
      });
      const legLeft = new THREE.Mesh(legGeo, culotteMat);
      legLeft.position.set(-0.24, -0.65, 0);
      const legRight = new THREE.Mesh(legGeo, culotteMat);
      legRight.position.set(0.24, -0.65, 0);
      group.add(legLeft, legRight);
    } else if (lookIndex === 3) {
      // ETHNIC LOOK 01: The Heritage Weaver (32-Panel Bandhani Kalidar Anarkali)
      // Voluminous 32-panel Kalidar Ghera
      const anarkaliGeo = new THREE.ConeGeometry(1.25, 1.7, 32, 16, true);
      const anarkaliMat = new THREE.MeshStandardMaterial({
        color: 0xf7f3ec, // Ivory
        roughness: 0.5,
        wireframe: isWire,
        side: THREE.DoubleSide
      });
      const anarkali = new THREE.Mesh(anarkaliGeo, anarkaliMat);
      anarkali.position.y = -0.75;
      group.add(anarkali);

      // Corded lattice bodice
      const bodiceRingGeo = new THREE.TorusGeometry(0.3, 0.04, 16, 32);
      const bodiceRingMat = new THREE.MeshStandardMaterial({
        color: 0x5a1f2b, // Deep Wine
        roughness: 0.3
      });
      const bodiceRing = new THREE.Mesh(bodiceRingGeo, bodiceRingMat);
      bodiceRing.rotation.x = Math.PI / 2;
      bodiceRing.position.y = 0.28;
      group.add(bodiceRing);

      // Organza sheer dupatta drape
      const dupattaGeo = new THREE.TorusKnotGeometry(0.42, 0.06, 64, 16, 2, 3);
      const dupattaMat = new THREE.MeshStandardMaterial({
        color: 0x9a6670,
        transparent: true,
        opacity: 0.65,
        roughness: 0.2,
        wireframe: isWire
      });
      const dupatta = new THREE.Mesh(dupattaGeo, dupattaMat);
      dupatta.position.set(0, 0.3, 0);
      group.add(dupatta);
    } else if (lookIndex === 4) {
      // ETHNIC LOOK 02: The Patola Rebirth (Concept Saree & Molded Blouse)
      // Pre-pleated front apron
      const pleatGeo = new THREE.CylinderGeometry(0.25, 0.65, 1.6, 24, 16, true);
      const sareeMat = new THREE.MeshStandardMaterial({
        color: 0x722f37, // Patola Burgundy
        roughness: 0.45,
        wireframe: isWire,
        side: THREE.DoubleSide
      });
      const saree = new THREE.Mesh(pleatGeo, sareeMat);
      saree.position.y = -0.75;
      group.add(saree);

      // Pallu diagonal diagonal cascade
      const palluGeo = new THREE.PlaneGeometry(0.65, 2.2, 16, 16);
      const palluMat = new THREE.MeshStandardMaterial({
        color: 0xd8c7b5,
        wireframe: isWire,
        side: THREE.DoubleSide
      });
      const pallu = new THREE.Mesh(palluGeo, palluMat);
      pallu.position.set(-0.25, -0.4, 0.2);
      pallu.rotation.y = Math.PI / 6;
      pallu.rotation.z = -Math.PI / 12;
      group.add(pallu);

      // Sculptural wing shoulders
      const wingGeo = new THREE.ConeGeometry(0.5, 0.35, 4);
      const wingMat = new THREE.MeshStandardMaterial({ color: 0x5a1f2b, roughness: 0.4 });
      const wingL = new THREE.Mesh(wingGeo, wingMat);
      wingL.position.set(-0.4, 0.55, 0);
      wingL.rotation.z = Math.PI / 4;
      const wingR = new THREE.Mesh(wingGeo, wingMat);
      wingR.position.set(0.4, 0.55, 0);
      wingR.rotation.z = -Math.PI / 4;
      group.add(wingL, wingR);
    } else {
      // ETHNIC LOOK 03: The Royal Alchemist (Velvet Angrakha & Farshi Pajama)
      // Tiered Farshi Pajama Wide Flare
      const farshiGeo = new THREE.CylinderGeometry(0.28, 1.1, 1.5, 32, 16, true);
      const farshiMat = new THREE.MeshStandardMaterial({
        color: 0xf7f3ec, // Ivory organza tiers
        roughness: 0.4,
        transparent: true,
        opacity: 0.85,
        wireframe: isWire,
        side: THREE.DoubleSide
      });
      const farshi = new THREE.Mesh(farshiGeo, farshiMat);
      farshi.position.y = -0.8;
      group.add(farshi);

      // Velvet Angrakha wrap tunic
      const angrakhaGeo = new THREE.CylinderGeometry(0.34, 0.48, 0.9, 32, 16, true);
      const velvetMat = new THREE.MeshStandardMaterial({
        color: 0x421820, // Dark Wine Velvet
        roughness: 0.35,
        wireframe: isWire,
        side: THREE.DoubleSide
      });
      const angrakha = new THREE.Mesh(angrakhaGeo, velvetMat);
      angrakha.position.y = 0.1;
      group.add(angrakha);

      // Gold bullion Zardozi latkan tassels
      const tasselGeo = new THREE.SphereGeometry(0.06, 12, 12);
      const tasselMat = new THREE.MeshStandardMaterial({
        color: 0xd8c7b5,
        metalness: 0.9,
        roughness: 0.2
      });
      const tassel = new THREE.Mesh(tasselGeo, tasselMat);
      tassel.position.set(0.28, 0.05, 0.25);
      group.add(tassel);
    }
  };

  // Mouse / Touch Interaction for 3D orbital rotation
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !meshGroupRef.current) return;
    const deltaX = e.clientX - previousMousePositionRef.current.x;
    const deltaY = e.clientY - previousMousePositionRef.current.y;

    meshGroupRef.current.rotation.y += deltaX * 0.01;
    meshGroupRef.current.rotation.x = Math.max(-0.4, Math.min(0.4, meshGroupRef.current.rotation.x + deltaY * 0.005));

    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || !meshGroupRef.current || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
    const deltaY = e.touches[0].clientY - previousMousePositionRef.current.y;

    meshGroupRef.current.rotation.y += deltaX * 0.01;
    meshGroupRef.current.rotation.x = Math.max(-0.4, Math.min(0.4, meshGroupRef.current.rotation.x + deltaY * 0.005));

    previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  const handleSelectGarment = (idx: number) => {
    sounds.play3DInteract();
    setSelectedGarmentIndex(idx);
    setSelectedTextileIndex(null);
    buildGarmentGeometry(idx, renderMode);
  };

  const handleSelectLighting = (mode: 'runway' | 'studio' | 'noir' | 'sunlight') => {
    sounds.playClick();
    setLightingMode(mode);
    updateLights(mode);
  };

  const handleSelectRenderMode = (mode: 'textured' | 'wireframe' | 'structure') => {
    sounds.playClick();
    setRenderMode(mode);
    buildGarmentGeometry(selectedGarmentIndex, mode);
  };

  return (
    <div className="relative w-full h-full flex flex-col md:flex-row bg-[#191617] text-[#FCFAF7] overflow-hidden select-none">
      {/* 3D WebGL Canvas Area */}
      <div 
        className="relative flex-1 h-[55vh] md:h-full cursor-grab active:cursor-grabbing overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div ref={mountRef} className="w-full h-full" />

        {/* Top Atelier Title Overlay */}
        <div className="absolute top-6 left-6 pointer-events-none z-10">
          <div className="flex items-center space-x-3 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#722F37] animate-pulse" />
            <p className="text-[11px] font-sans-modern tracking-[0.3em] uppercase text-[#D8C7B5]">
              Virtual 3D Atelier & Sculpture Museum
            </p>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif-luxury text-[#FCFAF7] tracking-wide">
            {activeGarment.name}
          </h2>
          <p className="text-xs md:text-sm font-editorial italic text-[#9A6670] mt-1">
            {activeGarment.code} — {activeGarment.tagline}
          </p>
        </div>

        {/* Floating Atelier Control Pills */}
        <div className="absolute top-6 right-6 flex items-center space-x-2 z-10">
          {/* Lighting Mode Selector */}
          <div className="glass-dark-panel rounded-full p-1.5 flex items-center space-x-1 text-xs">
            <button
              onClick={() => handleSelectLighting('runway')}
              className={`px-3 py-1 rounded-full transition-all flex items-center space-x-1.5 ${
                lightingMode === 'runway' ? 'bg-[#722F37] text-white' : 'text-[#D8C7B5] hover:text-white'
              }`}
              title="Warm Runway Spotlight"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Runway</span>
            </button>
            <button
              onClick={() => handleSelectLighting('studio')}
              className={`px-3 py-1 rounded-full transition-all flex items-center space-x-1.5 ${
                lightingMode === 'studio' ? 'bg-[#722F37] text-white' : 'text-[#D8C7B5] hover:text-white'
              }`}
              title="Studio High-Key"
            >
              <Sun className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Studio</span>
            </button>
            <button
              onClick={() => handleSelectLighting('noir')}
              className={`px-3 py-1 rounded-full transition-all flex items-center space-x-1.5 ${
                lightingMode === 'noir' ? 'bg-[#722F37] text-white' : 'text-[#D8C7B5] hover:text-white'
              }`}
              title="Editorial Noir"
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Noir</span>
            </button>
          </div>

          {/* Render Mode Selector */}
          <div className="glass-dark-panel rounded-full p-1.5 flex items-center space-x-1 text-xs">
            <button
              onClick={() => handleSelectRenderMode('textured')}
              className={`px-2.5 py-1 rounded-full transition-all ${
                renderMode === 'textured' ? 'bg-[#5A1F2B] text-white' : 'text-[#D8C7B5] hover:text-white'
              }`}
              title="Textured Silk Mode"
            >
              Silk
            </button>
            <button
              onClick={() => handleSelectRenderMode('wireframe')}
              className={`px-2.5 py-1 rounded-full transition-all ${
                renderMode === 'wireframe' ? 'bg-[#5A1F2B] text-white' : 'text-[#D8C7B5] hover:text-white'
              }`}
              title="CAD Pattern Wireframe"
            >
              CAD Flat
            </button>
            <button
              onClick={() => handleSelectRenderMode('structure')}
              className={`px-2.5 py-1 rounded-full transition-all ${
                renderMode === 'structure' ? 'bg-[#5A1F2B] text-white' : 'text-[#D8C7B5] hover:text-white'
              }`}
              title="Internal Boning Structure"
            >
              Boning
            </button>
          </div>

          {/* Auto-rotate Toggle */}
          <button
            onClick={() => {
              sounds.playClick();
              setIsAutoRotating(!isAutoRotating);
            }}
            className={`glass-dark-panel p-2 rounded-full transition-all ${
              isAutoRotating ? 'text-[#D8C7B5] ring-1 ring-[#722F37]' : 'text-stone-500'
            }`}
            title="Toggle Auto Rotation"
          >
            <RotateCw className={`w-4 h-4 ${isAutoRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
          </button>

          {/* Close Atelier Button */}
          {onClose && (
            <button
              onClick={onClose}
              className="glass-dark-panel p-2 rounded-full text-stone-300 hover:text-white hover:bg-[#5A1F2B] transition-all"
              title="Exit 3D Atelier"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Bottom Orbit Drag Hint */}
        <div className="absolute bottom-6 left-6 pointer-events-none flex items-center space-x-2 text-xs font-sans-modern text-[#D8C7B5]/80 glass-dark-panel px-3 py-1.5 rounded-full">
          <RotateCw className="w-3.5 h-3.5" />
          <span>Click & Drag to Rotate 3D Garment | Dynamic Wave Simulation Active</span>
        </div>

        {/* Bottom Garment Quick Switcher Bar */}
        <div className="absolute bottom-6 right-6 flex items-center space-x-2 z-10 overflow-x-auto max-w-[90vw] pb-1">
          {GARMENTS_DATA.map((g, idx) => (
            <button
              key={g.id}
              onClick={() => handleSelectGarment(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-sans-modern transition-all flex items-center space-x-2 whitespace-nowrap ${
                selectedGarmentIndex === idx
                  ? 'bg-[#722F37] text-white ring-1 ring-[#FCFAF7]/40 shadow-lg'
                  : 'glass-dark-panel text-[#D8C7B5] hover:text-white'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: idx < 3 ? '#9A6670' : '#D8C7B5' }} />
              <span className="font-semibold">{g.code}</span>
              <span className="hidden lg:inline font-light">{g.name.slice(0, 14)}...</span>
            </button>
          ))}
        </div>
      </div>

      {/* Right-Side Editorial Inspector Panel */}
      <div className="w-full md:w-[420px] lg:w-[480px] h-[45vh] md:h-full bg-[#262223] border-t md:border-t-0 md:border-l border-[#5A1F2B]/40 flex flex-col z-20">
        {/* Panel Header */}
        <div className="p-6 border-b border-[#5A1F2B]/30 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-sans-modern tracking-[0.25em] text-[#9A6670] uppercase">
              Garment Specimen #{selectedGarmentIndex + 1} of 6
            </span>
            <h3 className="text-xl font-serif-luxury text-[#FCFAF7]">
              Technical & Concept Dossier
            </h3>
          </div>
          {onNavigateToSlide && (
            <button
              onClick={() => {
                // Navigate directly to corresponding slide
                const slideNum = selectedGarmentIndex < 3 
                  ? 23 + selectedGarmentIndex * 2 
                  : 30 + (selectedGarmentIndex - 3) * 2;
                sounds.playClick();
                onNavigateToSlide(slideNum);
              }}
              className="px-3 py-1.5 rounded-md bg-[#5A1F2B] hover:bg-[#722F37] text-xs font-sans-modern text-white flex items-center space-x-1.5 transition-all"
            >
              <span>View Slide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Scrollable Dossier Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm">
          {/* Concept Statement */}
          <div className="space-y-2">
            <h4 className="text-xs font-sans-modern uppercase tracking-widest text-[#D8C7B5] flex items-center space-x-2">
              <Compass className="w-3.5 h-3.5 text-[#9A6670]" />
              <span>Design Concept</span>
            </h4>
            <p className="text-stone-300 font-sans-modern leading-relaxed text-xs">
              {activeGarment.concept}
            </p>
          </div>

          {/* Silhouette & Details */}
          <div className="space-y-2">
            <h4 className="text-xs font-sans-modern uppercase tracking-widest text-[#D8C7B5] flex items-center space-x-2">
              <Scissors className="w-3.5 h-3.5 text-[#9A6670]" />
              <span>Silhouette & Architecture</span>
            </h4>
            <p className="text-[#E8DDD0] font-serif-luxury italic text-xs">
              {activeGarment.silhouette}
            </p>
            <ul className="space-y-1 mt-2">
              {activeGarment.keyDetails.map((detail, dIdx) => (
                <li key={dIdx} className="text-xs text-stone-300 flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#722F37] mt-1.5 shrink-0" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Material Library & Swatches */}
          <div className="space-y-3">
            <h4 className="text-xs font-sans-modern uppercase tracking-widest text-[#D8C7B5] flex items-center space-x-2">
              <Palette className="w-3.5 h-3.5 text-[#9A6670]" />
              <span>Material Specifications</span>
            </h4>
            <div className="space-y-2">
              {activeGarment.fabrics.map((fab, fIdx) => (
                <div key={fIdx} className="p-3 rounded-lg bg-[#191617] border border-[#5A1F2B]/30 flex items-start space-x-3">
                  <div 
                    className="w-7 h-7 rounded-md shrink-0 border border-white/20 shadow-inner"
                    style={{ backgroundColor: fab.hex }}
                    title={fab.color}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-[#FCFAF7]">{fab.name}</span>
                      <span className="text-[10px] text-[#9A6670]">{fab.weight}</span>
                    </div>
                    <p className="text-[11px] text-stone-400 mt-0.5">{fab.composition}</p>
                    <p className="text-[10px] text-stone-500 italic mt-0.5">{fab.texture}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Construction & Tech Notes */}
          <div className="space-y-2">
            <h4 className="text-xs font-sans-modern uppercase tracking-widest text-[#D8C7B5]">
              Couture Construction Notes
            </h4>
            <div className="p-3.5 rounded-lg bg-[#191617]/70 border border-stone-800 space-y-1.5">
              {activeGarment.constructionNotes.map((note, nIdx) => (
                <p key={nIdx} className="text-[11px] text-stone-300 leading-normal">
                  • {note}
                </p>
              ))}
            </div>
          </div>

          {/* Trims & Haberdashery */}
          <div className="space-y-2 pb-4">
            <h4 className="text-xs font-sans-modern uppercase tracking-widest text-[#D8C7B5]">
              Hardware & Trims
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {activeGarment.trims.map((trim, tIdx) => (
                <div key={tIdx} className="p-2 rounded bg-[#191617] border border-stone-800">
                  <p className="text-[11px] font-semibold text-[#FCFAF7]">{trim.item}</p>
                  <p className="text-[10px] text-stone-400">{trim.spec}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
