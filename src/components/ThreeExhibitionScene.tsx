import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { EXHIBITION_PROJECTS, ExhibitionProject } from '../data/exhibitionData';
import { 
  Sparkles, 
  ArrowRight, 
  RotateCw, 
  Box, 
  Scissors, 
  RefreshCw, 
  Maximize2, 
  Eye
} from 'lucide-react';
import { getEffectiveImageUrl } from '../utils/imageStore';

interface ThreeExhibitionSceneProps {
  onSelectProject: (project: ExhibitionProject) => void;
  onSelectRealm?: (realm: string) => void;
  isDarkTheme: boolean;
}

export const ThreeExhibitionScene: React.FC<ThreeExhibitionSceneProps> = ({
  onSelectProject,
  onSelectRealm,
  isDarkTheme
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hoveredProject, setHoveredProject] = useState<ExhibitionProject | null>(null);
  const [isOrbitPaused, setIsOrbitPaused] = useState<boolean>(false);
  const [activeSpeed, setActiveSpeed] = useState<number>(1);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const orbitalGroupRef = useRef<THREE.Group | null>(null);
  const mannequinGroupRef = useRef<THREE.Group | null>(null);
  const clothMeshRef = useRef<THREE.Mesh | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const reqAnimRef = useRef<number | null>(null);

  // Drag interaction states
  const isDraggingRef = useRef<boolean>(false);
  const prevMouseX = useRef<number>(0);
  const prevMouseY = useRef<number>(0);
  const velocityRef = useRef<number>(0.002);
  const targetRotationYRef = useRef<number>(0);
  const currentRotationYRef = useRef<number>(0);

  // Initialize Three.js Exhibition Scene
  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    const bgColor = isDarkTheme ? 0x0c0b0d : 0xfcfaf7;
    scene.background = new THREE.Color(bgColor);
    scene.fog = new THREE.FogExp2(bgColor, 0.045);
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 4.8);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = isDarkTheme ? 1.25 : 1.05;
    rendererRef.current = renderer;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. Lighting Rig
    const ambientLight = new THREE.AmbientLight(
      isDarkTheme ? 0x5a1f2b : 0xf7f3ec, 
      isDarkTheme ? 1.6 : 2.2
    );
    scene.add(ambientLight);

    const mainSpot = new THREE.SpotLight(0xfff5ea, isDarkTheme ? 5.5 : 4.0, 15, Math.PI / 3.5, 0.5, 1);
    mainSpot.position.set(0, 5, 3.5);
    mainSpot.castShadow = true;
    scene.add(mainSpot);

    const wineRimLight = new THREE.DirectionalLight(0x722f37, isDarkTheme ? 3.5 : 2.0);
    wineRimLight.position.set(-4, 3, -3);
    scene.add(wineRimLight);

    const goldFill = new THREE.PointLight(0xc5a880, isDarkTheme ? 2.5 : 1.5, 8);
    goldFill.position.set(3, -1, 2);
    scene.add(goldFill);

    // 5. Glossy Reflective Exhibition Floor Podium
    const floorGeo = new THREE.CylinderGeometry(4.5, 4.8, 0.12, 64);
    const floorMat = new THREE.MeshStandardMaterial({
      color: isDarkTheme ? 0x161418 : 0xe8ddd0,
      roughness: 0.35,
      metalness: 0.4
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.position.y = -1.8;
    floor.receiveShadow = true;
    scene.add(floor);

    // Subtle inner illuminated pedestal ring
    const ringGeo = new THREE.TorusGeometry(2.8, 0.02, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x9a6670,
      transparent: true,
      opacity: 0.6
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = -1.73;
    scene.add(ring);

    // 6. Central 3D High-Fashion Mannequin & Dynamic Silk Cloth
    const mannequinGroup = new THREE.Group();
    scene.add(mannequinGroup);
    mannequinGroupRef.current = mannequinGroup;

    // Mannequin core stand
    const standGeo = new THREE.CylinderGeometry(0.03, 0.03, 3.2, 16);
    const standMat = new THREE.MeshStandardMaterial({
      color: isDarkTheme ? 0x3d2b29 : 0x262223,
      metalness: 0.9,
      roughness: 0.2
    });
    const stand = new THREE.Mesh(standGeo, standMat);
    stand.position.y = -0.3;
    mannequinGroup.add(stand);

    // Mannequin Torso
    const torsoGeo = new THREE.CylinderGeometry(0.3, 0.22, 0.95, 32, 16);
    const torsoMat = new THREE.MeshStandardMaterial({
      color: isDarkTheme ? 0x1c1a1d : 0xd8c7b5,
      roughness: 0.6,
      metalness: 0.1
    });
    const torso = new THREE.Mesh(torsoGeo, torsoMat);
    torso.position.y = 0.3;
    mannequinGroup.add(torso);

    // Mannequin Neck Finial
    const neckGeo = new THREE.CylinderGeometry(0.1, 0.12, 0.25, 16);
    const neck = new THREE.Mesh(neckGeo, standMat);
    neck.position.y = 0.88;
    mannequinGroup.add(neck);

    // Dynamic Undulating Silk / Velvet Wrap around mannequin
    const clothGeo = new THREE.PlaneGeometry(1.4, 1.8, 32, 32);
    const clothMat = new THREE.MeshStandardMaterial({
      color: 0x5a1f2b, // Deep Wine signature
      roughness: 0.35,
      metalness: 0.25,
      side: THREE.DoubleSide
    });
    const cloth = new THREE.Mesh(clothGeo, clothMat);
    cloth.rotation.y = Math.PI / 4;
    cloth.position.set(0.1, 0.2, 0.15);
    mannequinGroup.add(cloth);
    clothMeshRef.current = cloth;

    // Additional floating sculptural fabric ribbons
    const ribbonGeo = new THREE.TorusKnotGeometry(0.55, 0.06, 64, 16, 2, 3);
    const ribbonMat = new THREE.MeshStandardMaterial({
      color: 0x722f37,
      roughness: 0.25,
      metalness: 0.5
    });
    const ribbon = new THREE.Mesh(ribbonGeo, ribbonMat);
    ribbon.position.set(0, 0.3, 0);
    mannequinGroup.add(ribbon);

    // 7. Surrounding Orbital Ring of 3D Floating Project Portals
    const orbitalGroup = new THREE.Group();
    scene.add(orbitalGroup);
    orbitalGroupRef.current = orbitalGroup;

    const textureLoader = new THREE.TextureLoader();
    const projects = EXHIBITION_PROJECTS;
    const radius = 2.7;
    const projectMeshMap: { mesh: THREE.Mesh; project: ExhibitionProject }[] = [];

    projects.forEach((proj, idx) => {
      const angle = (idx / projects.length) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = Math.sin(idx * 1.5) * 0.25;

      // Card Geometry with bevel-like plane
      const cardGeo = new THREE.PlaneGeometry(0.75, 1.05);
      
      // Load texture with fallback color
      const effectiveUrl = getEffectiveImageUrl(`proj_${proj.id}_hero`, proj.heroImage);
      const texture = textureLoader.load(
        effectiveUrl,
        () => renderer.render(scene, camera),
        undefined,
        () => console.warn(`Could not load texture for ${proj.id}`)
      );
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;

      const cardMat = new THREE.MeshStandardMaterial({
        map: texture,
        side: THREE.DoubleSide,
        roughness: 0.4,
        metalness: 0.1
      });

      const cardMesh = new THREE.Mesh(cardGeo, cardMat);
      cardMesh.position.set(x, y, z);
      
      // Orient card outwards towards orbit perimeter
      cardMesh.lookAt(x * 2, y, z * 2);
      
      // Attach metadata
      cardMesh.userData = { project: proj, initialY: y };
      orbitalGroup.add(cardMesh);
      projectMeshMap.push({ mesh: cardMesh, project: proj });

      // Elegant hairline border around the floating image
      const wireGeo = new THREE.EdgesGeometry(cardGeo);
      const wireMat = new THREE.LineBasicMaterial({
        color: isDarkTheme ? 0x9a6670 : 0xd8c7b5,
        transparent: true,
        opacity: 0.7
      });
      const wire = new THREE.LineSegments(wireGeo, wireMat);
      cardMesh.add(wire);
    });

    // 8. Floating Ambient Golden Silk Fiber Particles
    const particleCount = 160;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 10;
      positions[i + 1] = (Math.random() - 0.5) * 7;
      positions[i + 2] = (Math.random() - 0.5) * 10;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: isDarkTheme ? 0xc5a880 : 0x722f37,
      size: 0.035,
      transparent: true,
      opacity: isDarkTheme ? 0.65 : 0.4
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    particlesRef.current = particles;

    // 9. Render Loop with Cloth Physics & Smooth Orbital Inertia
    let clock = new THREE.Clock();

    const animate = () => {
      reqAnimRef.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth Orbital Rotation with Lerp Physics
      if (orbitalGroupRef.current) {
        if (!isDraggingRef.current && !isOrbitPaused) {
          targetRotationYRef.current += 0.0025 * activeSpeed;
        }

        // Lerp rotation
        currentRotationYRef.current += (targetRotationYRef.current - currentRotationYRef.current) * 0.08;
        orbitalGroupRef.current.rotation.y = currentRotationYRef.current;

        // Animate floating bobbing motion for cards
        projectMeshMap.forEach(({ mesh }, i) => {
          mesh.position.y = mesh.userData.initialY + Math.sin(elapsedTime * 1.5 + i) * 0.06;
          mesh.rotation.z = Math.sin(elapsedTime * 0.8 + i) * 0.04;
        });
      }

      // Mannequin gentle float & wave
      if (mannequinGroupRef.current) {
        mannequinGroupRef.current.position.y = Math.sin(elapsedTime * 1.2) * 0.04;
        mannequinGroupRef.current.rotation.y = Math.sin(elapsedTime * 0.5) * 0.15;
      }

      // Cloth wave deformation (Live Fabric Simulation)
      if (clothMeshRef.current && clothMeshRef.current.geometry) {
        const pos = clothMeshRef.current.geometry.attributes.position;
        for (let i = 0; i < pos.count; i++) {
          const u = pos.getX(i);
          const v = pos.getY(i);
          const wave = Math.sin(elapsedTime * 2.5 + u * 4 + v * 3) * 0.08;
          pos.setZ(i, wave);
        }
        pos.needsUpdate = true;
      }

      // Particles drift
      if (particlesRef.current) {
        particlesRef.current.rotation.y = elapsedTime * 0.015;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 10. Pointer Interactions (Raycasting for Hover & Click)
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(orbitalGroup.children, true);

      if (intersects.length > 0) {
        const topObj = intersects[0].object;
        const rootCard = topObj.userData?.project ? topObj : topObj.parent;
        if (rootCard?.userData?.project) {
          container.style.cursor = 'pointer';
          setHoveredProject(rootCard.userData.project);
          return;
        }
      }
      container.style.cursor = isDraggingRef.current ? 'grabbing' : 'grab';
      setHoveredProject(null);
    };

    const handlePointerDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      prevMouseX.current = e.clientX;
      prevMouseY.current = e.clientY;
      container.style.cursor = 'grabbing';
    };

    const handlePointerUp = (e: MouseEvent) => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        container.style.cursor = 'grab';
      }
    };

    const handlePointerDrag = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - prevMouseX.current;
      prevMouseX.current = e.clientX;
      prevMouseY.current = e.clientY;

      targetRotationYRef.current += deltaX * 0.006;
    };

    const handleClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(orbitalGroup.children, true);

      if (intersects.length > 0) {
        const topObj = intersects[0].object;
        const rootCard = topObj.userData?.project ? topObj : topObj.parent;
        if (rootCard?.userData?.project) {
          onSelectProject(rootCard.userData.project);
        }
      }
    };

    // Touch handlers for mobile
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        prevMouseX.current = e.touches[0].clientX;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMouseX.current;
      prevMouseX.current = e.touches[0].clientX;
      targetRotationYRef.current += deltaX * 0.008;
    };

    const handleTouchEnd = () => {
      isDraggingRef.current = false;
    };

    container.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mouseup', handlePointerUp);
    window.addEventListener('mousemove', handlePointerDrag);
    container.addEventListener('click', handleClick);

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    // Resize
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
      container.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('mousemove', handlePointerDrag);
      container.removeEventListener('click', handleClick);

      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);

      if (reqAnimRef.current) cancelAnimationFrame(reqAnimRef.current);
      renderer.dispose();
      container.innerHTML = '';
    };
  }, [isDarkTheme, onSelectProject, activeSpeed, isOrbitPaused]);

  return (
    <div className="relative w-full h-full select-none overflow-hidden">
      {/* 3D WebGL Canvas Mount */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Central Editorial Typography Overlay (Floating in ambient space) */}
      <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-between py-24 md:py-28 px-6 z-10">
        {/* Top Minimalist Tagline */}
        <div className="flex flex-col items-center space-y-2 text-center max-w-xl animate-fade-in">
          <div className="flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#9A6670]" />
            <span className="text-[10px] md:text-[11px] font-sans-modern tracking-[0.4em] uppercase font-bold text-[#9A6670]">
              Futuristic Luxury Fashion Exhibition
            </span>
            <span className="w-8 h-[1px] bg-[#9A6670]" />
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif-luxury font-bold tracking-tight text-current leading-none drop-shadow-sm">
            HETVI KAPADIA
          </h2>

          <p className="text-xs sm:text-sm font-sans-modern tracking-[0.3em] uppercase opacity-75 pt-1 text-[#9A6670] font-semibold">
            Fashion Designer • Indus University
          </p>

          <p className="text-[12px] sm:text-[13px] font-display-luxury italic opacity-70 max-w-md pt-1">
            "Where architectural tailoring meets the ancestral soul of Gujarati craft and circular systems."
          </p>
        </div>

        {/* Dynamic Project Hover Overlay Card */}
        {hoveredProject && (
          <div className="pointer-events-auto max-w-md w-full px-6 py-4 rounded-2xl backdrop-blur-2xl border transition-all duration-300 transform translate-y-0 shadow-2xl flex items-center justify-between gap-4 animate-fade-in ${
            isDarkTheme 
              ? 'bg-[#1c1a1d]/85 border-white/20 text-white' 
              : 'bg-[#fcfaf7]/90 border-[#262223]/15 text-[#262223]'
          }">
            <div className="space-y-1">
              <span className="text-[9px] font-sans-modern tracking-[0.25em] uppercase font-bold text-[#9A6670] block">
                {hoveredProject.category.toUpperCase()} • {hoveredProject.year}
              </span>
              <h3 className="text-base font-serif-luxury font-bold tracking-wide">
                {hoveredProject.title}
              </h3>
              <p className="text-xs opacity-70 font-sans-modern line-clamp-1">
                {hoveredProject.subtitle}
              </p>
            </div>

            <button
              onClick={() => onSelectProject(hoveredProject)}
              className="px-4 py-2.5 rounded-full bg-[#5A1F2B] hover:bg-[#722F37] text-white text-[10px] tracking-[0.2em] uppercase font-semibold flex items-center space-x-1.5 shrink-0 shadow-md transition-all group"
            >
              <span>Explore Look</span>
              <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        )}

        {/* Bottom Interactive Guidance & Quick Gateway */}
        <div className="pointer-events-auto flex flex-col items-center gap-3 w-full max-w-xl">
          <div className="flex items-center space-x-3 text-[10px] tracking-[0.25em] uppercase opacity-50 font-semibold">
            <span>Drag Orbit to Rotate</span>
            <span className="w-1 h-1 rounded-full bg-current opacity-40" />
            <span>Click Look to Inspect</span>
          </div>

          <div className="flex items-center justify-center space-x-3">
            <button
              onClick={() => onSelectRealm('garments-3d' as any)}
              className="px-5 py-2.5 rounded-full backdrop-blur-xl border border-black/10 dark:border-white/15 bg-black/[0.03] dark:bg-white/10 hover:bg-[#5A1F2B] hover:border-[#5A1F2B] text-current hover:text-white text-[10px] tracking-[0.2em] uppercase font-semibold transition-all flex items-center space-x-2 shadow-sm"
            >
              <Box className="w-3.5 h-3.5 text-[#9A6670]" />
              <span>Inspect 3D Garments Showcase (6 Looks)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
