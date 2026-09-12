import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GARMENTS_DATA } from '../data/garmentsData';
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
  ChevronLeft, 
  ChevronRight,
  ArrowRight,
  Compass
} from 'lucide-react';
import { ExhibitionProject, EXHIBITION_PROJECTS } from '../data/exhibitionData';

interface RevolvingGarments3DProps {
  onOpenProjectDeepDive?: (project: ExhibitionProject) => void;
  isDarkTheme: boolean;
  onClose?: () => void;
}

export const RevolvingGarments3D: React.FC<RevolvingGarments3DProps> = ({
  onOpenProjectDeepDive,
  isDarkTheme,
  onClose
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedGarmentIndex, setSelectedGarmentIndex] = useState<number>(0);
  const [lightingMode, setLightingMode] = useState<'runway' | 'studio' | 'noir' | 'golden'>('runway');
  const [renderMode, setRenderMode] = useState<'textured' | 'wireframe' | 'structure'>('textured');
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const [infoOpen, setInfoOpen] = useState<boolean>(true);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const meshGroupRef = useRef<THREE.Group | null>(null);
  const lightsGroupRef = useRef<THREE.Group | null>(null);
  const reqAnimRef = useRef<number | null>(null);

  const isDraggingRef = useRef<boolean>(false);
  const prevMouseX = useRef<number>(0);
  const prevMouseY = useRef<number>(0);
  const targetRotationYRef = useRef<number>(0);
  const currentRotationYRef = useRef<number>(0);

  const activeGarment: GarmentLook = GARMENTS_DATA[selectedGarmentIndex];

  // Initialize Three.js Revolving Scene
  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    const bgHex = isDarkTheme ? 0x0e0d10 : 0xfcfaf7;
    scene.background = new THREE.Color(bgHex);
    scene.fog = new THREE.FogExp2(bgHex, 0.038);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.5, 4.3);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = isDarkTheme ? 1.2 : 1.05;
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

    // Circular Exhibition Pedestal Platform
    const pedestalGeo = new THREE.CylinderGeometry(1.6, 1.8, 0.15, 64);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: isDarkTheme ? 0x221e24 : 0xe8ddd0,
      roughness: 0.6,
      metalness: 0.3
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
      color: isDarkTheme ? 0xc5a880 : 0x722f37,
      size: 0.03,
      transparent: true,
      opacity: 0.4
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Initial setup
    updateLights(lightingMode, isDarkTheme);
    buildGarmentGeometry(selectedGarmentIndex, renderMode, isDarkTheme);

    // Render loop
    let clock = new THREE.Clock();
    const animate = () => {
      reqAnimRef.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Gentle floating animation & rotation
      if (meshGroupRef.current) {
        if (isAutoRotating && !isDraggingRef.current) {
          targetRotationYRef.current += 0.005;
        }

        currentRotationYRef.current += (targetRotationYRef.current - currentRotationYRef.current) * 0.1;
        meshGroupRef.current.rotation.y = currentRotationYRef.current;
        meshGroupRef.current.position.y = Math.sin(elapsedTime * 1.5) * 0.04;

        // Wave deformation for fabric realism
        meshGroupRef.current.traverse((child) => {
          if (child instanceof THREE.Mesh && child.geometry && child.geometry.attributes.position) {
            const posAttr = child.geometry.attributes.position;
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
  }, [isDarkTheme]);

  // Update lighting rig
  const updateLights = (mode: 'runway' | 'studio' | 'noir' | 'golden', isDark: boolean) => {
    if (!lightsGroupRef.current) return;
    const group = lightsGroupRef.current;
    group.clear();

    if (mode === 'runway') {
      const ambLight = new THREE.AmbientLight(0x722f37, 1.0);
      const spotLight = new THREE.SpotLight(0xfff8f0, 4.8, 12, Math.PI / 4, 0.4, 1);
      spotLight.position.set(2, 4, 3);
      spotLight.castShadow = true;

      const rimLight = new THREE.DirectionalLight(0xd8c7b5, 2.8);
      rimLight.position.set(-3, 2, -2);

      const floorFill = new THREE.PointLight(0x5a1f2b, 2.2, 6);
      floorFill.position.set(0, -1, 1);

      group.add(ambLight, spotLight, rimLight, floorFill);
    } else if (mode === 'studio') {
      const ambLight = new THREE.AmbientLight(0xf7f3ec, 2.0);
      const mainLight = new THREE.DirectionalLight(0xffffff, 3.5);
      mainLight.position.set(3, 4, 3);
      const softFill = new THREE.DirectionalLight(0xe8ddd0, 2.2);
      softFill.position.set(-3, 2, 2);
      group.add(ambLight, mainLight, softFill);
    } else if (mode === 'noir') {
      const ambLight = new THREE.AmbientLight(0x262223, 0.5);
      const rimLight1 = new THREE.DirectionalLight(0xd8c7b5, 4.0);
      rimLight1.position.set(-2, 3, -2);
      const rimLight2 = new THREE.DirectionalLight(0x722f37, 3.2);
      rimLight2.position.set(2, 1, -2);
      const lowKey = new THREE.SpotLight(0xffffff, 1.8, 10, Math.PI / 6);
      lowKey.position.set(0, 4, 2);
      group.add(ambLight, rimLight1, rimLight2, lowKey);
    } else {
      // Golden Hour Atelier
      const ambLight = new THREE.AmbientLight(0xc5a880, 1.6);
      const sun = new THREE.DirectionalLight(0xffeedd, 4.2);
      sun.position.set(4, 5, 2);
      sun.castShadow = true;
      const warmRim = new THREE.DirectionalLight(0x9a6670, 2.2);
      warmRim.position.set(-3, 2, -2);
      group.add(ambLight, sun, warmRim);
    }
  };

  // Re-build 3D Geometry for selected look
  const buildGarmentGeometry = (lookIndex: number, currentRenderMode: 'textured' | 'wireframe' | 'structure', isDark: boolean) => {
    if (!meshGroupRef.current) return;
    const group = meshGroupRef.current;
    group.clear();

    const isWire = currentRenderMode === 'wireframe';
    const isStruct = currentRenderMode === 'structure';

    // Stand
    const standGeo = new THREE.CylinderGeometry(0.04, 0.04, 3.2, 16);
    const standMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x3d2b29 : 0x262223,
      metalness: 0.8,
      roughness: 0.3
    });
    const stand = new THREE.Mesh(standGeo, standMat);
    stand.position.y = -0.4;
    group.add(stand);

    // Torso Core Form
    const torsoGeo = new THREE.CylinderGeometry(0.32, 0.24, 0.9, 32, 16);
    const torsoMat = new THREE.MeshStandardMaterial({
      color: isStruct ? 0x9a6670 : isDark ? 0x1e1c20 : 0xd8c7b5,
      wireframe: isWire,
      roughness: 0.7,
      transparent: isStruct,
      opacity: isStruct ? 0.6 : 1
    });
    const torso = new THREE.Mesh(torsoGeo, torsoMat);
    torso.position.y = 0.25;
    group.add(torso);

    // Neck Finial
    const neckGeo = new THREE.CylinderGeometry(0.12, 0.14, 0.25, 16);
    const neck = new THREE.Mesh(neckGeo, standMat);
    neck.position.y = 0.8;
    group.add(neck);

    // Dynamic 3D parametric representations for each look
    if (lookIndex === 0) {
      // W-01: The Structured Sovereign (Sculptural Trench & Boned Bodice)
      const flapGeo = new THREE.ConeGeometry(0.65, 0.45, 4);
      const flapMat = new THREE.MeshStandardMaterial({
        color: 0x5a1f2b,
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

      const coatSkirtGeo = new THREE.CylinderGeometry(0.26, 0.75, 1.4, 32, 16, true);
      const coatMat = new THREE.MeshStandardMaterial({
        color: 0xd8c7b5,
        roughness: 0.65,
        wireframe: isWire,
        side: THREE.DoubleSide
      });
      const coatSkirt = new THREE.Mesh(coatSkirtGeo, coatMat);
      coatSkirt.position.y = -0.7;
      group.add(coatSkirt);

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
      // W-02: The Fluid Monolith (Asymmetric Column Gown)
      const drapeGeo = new THREE.TorusGeometry(0.38, 0.12, 16, 32, Math.PI);
      const drapeMat = new THREE.MeshStandardMaterial({
        color: 0x722f37,
        roughness: 0.35,
        wireframe: isWire,
        side: THREE.DoubleSide
      });
      const drape = new THREE.Mesh(drapeGeo, drapeMat);
      drape.rotation.x = Math.PI / 4;
      drape.rotation.y = -Math.PI / 6;
      drape.position.set(0.1, 0.55, 0.1);
      group.add(drape);

      const columnSkirtGeo = new THREE.CylinderGeometry(0.24, 0.38, 1.9, 32, 16, true);
      const columnMat = new THREE.MeshStandardMaterial({
        color: 0x5a1f2b,
        roughness: 0.3,
        wireframe: isWire,
        side: THREE.DoubleSide
      });
      const columnSkirt = new THREE.Mesh(columnSkirtGeo, columnMat);
      columnSkirt.position.y = -0.85;
      group.add(columnSkirt);

      const trainGeo = new THREE.PlaneGeometry(0.8, 1.6, 16, 16);
      const trainMat = new THREE.MeshStandardMaterial({
        color: 0x9a6670,
        roughness: 0.4,
        wireframe: isWire,
        side: THREE.DoubleSide
      });
      const train = new THREE.Mesh(trainGeo, trainMat);
      train.rotation.x = Math.PI / 6;
      train.rotation.y = Math.PI / 4;
      train.position.set(0.4, -0.6, -0.2);
      group.add(train);
    } else if (lookIndex === 2) {
      // W-03: The Neo-Kinetic Chroma (3D CLO Digital Trousers & Cropped Mock-Neck)
      // Cropped fitted bodice
      const cropGeo = new THREE.CylinderGeometry(0.32, 0.28, 0.42, 32);
      const cropMat = new THREE.MeshStandardMaterial({
        color: 0xb89fad, // Lavender Mauve
        roughness: 0.45,
        wireframe: isWire
      });
      const cropTop = new THREE.Mesh(cropGeo, cropMat);
      cropTop.position.y = 0.38;
      group.add(cropTop);

      // Contrast obsidian under-bust band
      const bandGeo = new THREE.CylinderGeometry(0.285, 0.285, 0.08, 32);
      const bandMat = new THREE.MeshStandardMaterial({
        color: 0x141216,
        metalness: 0.4,
        roughness: 0.3
      });
      const band = new THREE.Mesh(bandGeo, bandMat);
      band.position.y = 0.17;
      group.add(band);

      // High-waisted iridescent tapered track trousers (Left & Right legs)
      const pantLeftGeo = new THREE.CylinderGeometry(0.18, 0.12, 1.45, 24, 16, true);
      const pantMat = new THREE.MeshStandardMaterial({
        color: 0xd9b3ce, // Iridescent Silver-Pink
        roughness: 0.28,
        metalness: 0.45,
        wireframe: isWire,
        side: THREE.DoubleSide
      });
      const pantLeft = new THREE.Mesh(pantLeftGeo, pantMat);
      pantLeft.position.set(-0.16, -0.65, 0);
      group.add(pantLeft);

      const pantRight = new THREE.Mesh(pantLeftGeo, pantMat);
      pantRight.position.set(0.16, -0.65, 0);
      group.add(pantRight);

      // High-vis neon lime racing side stripes
      const stripeGeo = new THREE.BoxGeometry(0.015, 1.4, 0.02);
      const stripeMat = new THREE.MeshStandardMaterial({
        color: 0xdfff00, // Neon Lime
        emissive: 0xdfff00,
        emissiveIntensity: 0.3,
        roughness: 0.2
      });
      const stripeLeft = new THREE.Mesh(stripeGeo, stripeMat);
      stripeLeft.position.set(-0.28, -0.65, 0);
      group.add(stripeLeft);

      const stripeRight = new THREE.Mesh(stripeGeo, stripeMat);
      stripeRight.position.set(0.28, -0.65, 0);
      group.add(stripeRight);
    } else if (lookIndex === 3) {
      // E-01: The Heritage Weaver (Bandhani & Structural Cording Kalidar)
      const anarkaliGeo = new THREE.ConeGeometry(1.25, 1.7, 32, 16, true);
      const anarkaliMat = new THREE.MeshStandardMaterial({
        color: 0xf7f3ec,
        roughness: 0.5,
        wireframe: isWire,
        side: THREE.DoubleSide
      });
      const anarkali = new THREE.Mesh(anarkaliGeo, anarkaliMat);
      anarkali.position.y = -0.75;
      group.add(anarkali);

      // Cording Lattice around Bodice
      for (let i = 0; i < 8; i++) {
        const ringGeo = new THREE.TorusGeometry(0.3 + i * 0.015, 0.012, 8, 32);
        const ringMat = new THREE.MeshStandardMaterial({
          color: 0x5a1f2b,
          metalness: 0.5,
          roughness: 0.3
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2;
        ring.position.y = 0.5 - i * 0.06;
        group.add(ring);
      }
    } else if (lookIndex === 4) {
      // E-02: The Patola Rebirth (Upcycled Patola Saree & Wing Blouse)
      const sareeGeo = new THREE.CylinderGeometry(0.28, 0.55, 1.7, 32, 16, true);
      const sareeMat = new THREE.MeshStandardMaterial({
        color: 0x722f37,
        roughness: 0.45,
        wireframe: isWire,
        side: THREE.DoubleSide
      });
      const saree = new THREE.Mesh(sareeGeo, sareeMat);
      saree.position.y = -0.8;
      group.add(saree);

      // Pallu Drape
      const palluGeo = new THREE.TorusKnotGeometry(0.42, 0.08, 64, 8, 2, 3);
      const palluMat = new THREE.MeshStandardMaterial({
        color: 0xd8c7b5,
        roughness: 0.6,
        wireframe: isWire
      });
      const pallu = new THREE.Mesh(palluGeo, palluMat);
      pallu.position.set(0, 0.4, 0.1);
      group.add(pallu);
    } else if (lookIndex === 5) {
      // E-03: The Royal Alchemist (Velvet Angrakha & Tiered Farshi)
      const angrakhaGeo = new THREE.ConeGeometry(0.75, 1.2, 16, 8, true);
      const angrakhaMat = new THREE.MeshStandardMaterial({
        color: 0x421820,
        roughness: 0.25,
        metalness: 0.3,
        wireframe: isWire,
        side: THREE.DoubleSide
      });
      const angrakha = new THREE.Mesh(angrakhaGeo, angrakhaMat);
      angrakha.position.y = -0.3;
      group.add(angrakha);

      // Tiered Farshi Pajama Base
      for (let t = 0; t < 3; t++) {
        const tierGeo = new THREE.CylinderGeometry(0.3 + t * 0.22, 0.55 + t * 0.35, 0.4, 24, 4, true);
        const tierMat = new THREE.MeshStandardMaterial({
          color: 0xf7f3ec,
          roughness: 0.5,
          wireframe: isWire,
          side: THREE.DoubleSide
        });
        const tier = new THREE.Mesh(tierGeo, tierMat);
        tier.position.y = -0.8 - t * 0.35;
        group.add(tier);
      }
    } else {
      // E-04: The Ashavali Architect (Architectural Capelet & 48-Kali Pleated Lehenga)
      // Sculptural High-Stand Ashavali Brocade Capelet
      const capeGeo = new THREE.ConeGeometry(0.6, 0.42, 24, 2, true);
      const capeMat = new THREE.MeshStandardMaterial({
        color: 0xd4af37,
        roughness: 0.35,
        metalness: 0.65,
        wireframe: isWire,
        side: THREE.DoubleSide
      });
      const cape = new THREE.Mesh(capeGeo, capeMat);
      cape.position.y = 0.55;
      group.add(cape);

      // Sculpted Wine Corset Band
      const corsetGeo = new THREE.CylinderGeometry(0.24, 0.22, 0.32, 24);
      const corsetMat = new THREE.MeshStandardMaterial({
        color: 0x5a1f2b,
        roughness: 0.4,
        metalness: 0.2,
        wireframe: isWire
      });
      const corset = new THREE.Mesh(corsetGeo, corsetMat);
      corset.position.y = 0.2;
      group.add(corset);

      // Voluminous 48-Kali Knife-Pleated Lehenga Cone
      const lehengaGeo = new THREE.ConeGeometry(0.95, 1.5, 48, 8, true);
      const lehengaMat = new THREE.MeshStandardMaterial({
        color: 0xd8c7b5,
        roughness: 0.6,
        wireframe: isWire,
        side: THREE.DoubleSide
      });
      const lehenga = new THREE.Mesh(lehengaGeo, lehengaMat);
      lehenga.rotation.x = Math.PI;
      lehenga.position.y = -0.75;
      group.add(lehenga);

      // Gold Mukaish & Zari Hem Border Ring
      const hemRingGeo = new THREE.TorusGeometry(0.92, 0.025, 8, 48);
      const hemRingMat = new THREE.MeshStandardMaterial({
        color: 0xd4af37,
        metalness: 0.75,
        roughness: 0.25
      });
      const hemRing = new THREE.Mesh(hemRingGeo, hemRingMat);
      hemRing.rotation.x = Math.PI / 2;
      hemRing.position.y = -1.5;
      group.add(hemRing);
    }
  };

  // Switch garment
  const handleSelectGarment = (idx: number) => {
    sounds.playSlideTransition();
    setSelectedGarmentIndex(idx);
    buildGarmentGeometry(idx, renderMode, isDarkTheme);
  };

  // Switch lighting
  const handleSelectLighting = (mode: 'runway' | 'studio' | 'noir' | 'golden') => {
    sounds.playClick();
    setLightingMode(mode);
    updateLights(mode, isDarkTheme);
  };

  // Switch render mode
  const handleSelectRenderMode = (mode: 'textured' | 'wireframe' | 'structure') => {
    sounds.playClick();
    setRenderMode(mode);
    buildGarmentGeometry(selectedGarmentIndex, mode, isDarkTheme);
  };

  // Match corresponding exhibition project
  const currentProject = EXHIBITION_PROJECTS.find(p => p.garmentDataId === activeGarment.id) || EXHIBITION_PROJECTS[0];

  return (
    <div className="relative w-full h-full select-none overflow-hidden flex flex-col justify-between">
      {/* 3D WebGL Canvas */}
      <div 
        ref={mountRef} 
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing z-0"
        onMouseDown={(e) => {
          isDraggingRef.current = true;
          prevMouseX.current = e.clientX;
        }}
        onMouseMove={(e) => {
          if (!isDraggingRef.current) return;
          const deltaX = e.clientX - prevMouseX.current;
          prevMouseX.current = e.clientX;
          targetRotationYRef.current += deltaX * 0.008;
        }}
        onMouseUp={() => {
          isDraggingRef.current = false;
        }}
      />

      {/* Top Floating Controls Bar */}
      <div className="relative z-10 pt-20 px-6 md:px-12 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center space-x-3">
          <span className="text-[10px] font-sans-modern tracking-[0.3em] uppercase font-bold text-[#9A6670]">
            3D REVOLVING EXHIBITION • {activeGarment.code}
          </span>
          <span className="w-1 h-1 rounded-full bg-current opacity-40" />
          <span className="text-xs font-serif-luxury tracking-wider text-current opacity-70">
            {activeGarment.name}
          </span>
        </div>

        {/* Studio Lighting & Wireframe Controls */}
        <div className="flex items-center space-x-2">
          {/* Lighting Mode Buttons */}
          <div className="hidden sm:flex items-center space-x-1 p-1 rounded-full backdrop-blur-xl border border-white/15 bg-white/10 text-[10px] uppercase font-semibold">
            {(['runway', 'studio', 'noir', 'golden'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => handleSelectLighting(mode)}
                className={`px-2.5 py-1 rounded-full tracking-wider transition-all ${
                  lightingMode === mode 
                    ? 'bg-[#5A1F2B] text-white' 
                    : 'text-current opacity-60 hover:opacity-100'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          {/* Render Mode */}
          <div className="flex items-center space-x-1 p-1 rounded-full backdrop-blur-xl border border-white/15 bg-white/10 text-[10px] uppercase font-semibold">
            {(['textured', 'wireframe', 'structure'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => handleSelectRenderMode(mode)}
                className={`px-2.5 py-1 rounded-full tracking-wider transition-all ${
                  renderMode === mode 
                    ? 'bg-[#9A6670] text-white' 
                    : 'text-current opacity-60 hover:opacity-100'
                }`}
              >
                {mode === 'textured' ? 'Solid' : mode === 'wireframe' ? 'Wire' : 'Skeleton'}
              </button>
            ))}
          </div>

          {/* Auto-Rotation Toggle */}
          <button
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            className={`p-2 rounded-full border backdrop-blur-xl transition-all ${
              isAutoRotating 
                ? 'border-[#9A6670] text-[#9A6670] bg-[#9A6670]/10' 
                : 'border-white/15 text-current opacity-60'
            }`}
            title="Toggle 360° Auto-Rotation"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Floating Info Drawer (Left Overlay) */}
      <div className={`relative z-10 px-6 md:px-12 max-w-md w-full pointer-events-auto transition-all duration-500 ${
        infoOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
      }`}>
        <div className={`p-6 rounded-2xl backdrop-blur-2xl border shadow-2xl space-y-4 ${
          isDarkTheme 
            ? 'bg-[#151317]/90 border-white/15 text-white' 
            : 'bg-[#fcfaf7]/90 border-[#262223]/15 text-[#262223]'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-sans-modern tracking-[0.3em] uppercase font-bold text-[#9A6670]">
              {activeGarment.category.toUpperCase()} WEAR • LOOK 0{activeGarment.lookNumber}
            </span>
            <span className="text-xs font-serif-luxury font-bold text-[#9A6670]">
              {activeGarment.code}
            </span>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-serif-luxury font-bold leading-tight">
              {activeGarment.name}
            </h2>
            <p className="text-xs font-sans-modern opacity-75 pt-1">
              {activeGarment.tagline}
            </p>
          </div>

          <p className="text-xs font-sans-modern leading-relaxed opacity-80 border-l-2 border-[#5A1F2B] pl-3 line-clamp-3">
            {activeGarment.concept}
          </p>

          {/* Key Fabrics Swatches */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[9px] font-sans-modern tracking-[0.2em] uppercase font-bold opacity-60">
              Primary Materials & Weights
            </span>
            <div className="flex flex-wrap gap-2">
              {activeGarment.fabrics.map((f, i) => (
                <div 
                  key={i} 
                  className="flex items-center space-x-1.5 px-2.5 py-1 rounded-md border border-white/10 bg-white/5 text-[11px]"
                >
                  <span className="w-2.5 h-2.5 rounded-full border border-black/20" style={{ backgroundColor: f.hex }} />
                  <span className="font-medium text-[10px]">{f.name}</span>
                  <span className="opacity-50 text-[9px]">({f.weight})</span>
                </div>
              ))}
            </div>
          </div>

          {/* Deep-Dive Inspection Button */}
          <button
            onClick={() => {
              sounds.play3DInteract();
              if (onOpenProjectDeepDive) onOpenProjectDeepDive(currentProject);
            }}
            className="w-full py-3 rounded-full bg-[#5A1F2B] hover:bg-[#722F37] text-white text-[10px] tracking-[0.25em] uppercase font-semibold flex items-center justify-center space-x-2 shadow-lg transition-all group"
          >
            <span>Explore Moodboard, Flats & Sketches</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Bottom 7 Garments Carousel Selector */}
      <div className="relative z-10 pb-8 px-6 md:px-12 flex flex-col items-center gap-3 pointer-events-auto">
        <div className="flex items-center space-x-3 text-[10px] tracking-[0.25em] uppercase font-semibold opacity-60">
          <span>7 Masterpieces Revolving Showcase</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto max-w-full pb-2 scrollbar-none">
          {GARMENTS_DATA.map((garment, idx) => {
            const isSelected = selectedGarmentIndex === idx;
            return (
              <button
                key={garment.id}
                onClick={() => handleSelectGarment(idx)}
                className={`px-4 sm:px-5 py-2 rounded-full border backdrop-blur-xl text-[10px] tracking-[0.2em] uppercase font-semibold transition-all shrink-0 flex items-center space-x-2 ${
                  isSelected
                    ? 'bg-[#5A1F2B] border-[#5A1F2B] text-white shadow-lg scale-105'
                    : isDarkTheme
                      ? 'border-white/15 bg-white/10 text-white/70 hover:text-white hover:bg-white/20'
                      : 'border-[#262223]/15 bg-white/50 text-[#262223] hover:bg-stone-200'
                }`}
              >
                <span className="font-bold opacity-60">{garment.code}</span>
                <span className="truncate max-w-[130px] sm:max-w-[160px]">{garment.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
