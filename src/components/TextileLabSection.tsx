import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { TEXTILE_SAMPLES } from '../data/garmentsData';
import { TextileSample } from '../types/portfolio';
import { 
  RotateCw, 
  Eye
} from 'lucide-react';

interface TextileLabSectionProps {
  isDarkTheme: boolean;
}

export const TextileLabSection: React.FC<TextileLabSectionProps> = ({ isDarkTheme }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedSampleIndex, setSelectedSampleIndex] = useState<number>(0);
  const [tension, setTension] = useState<number>(50);
  const [waveSpeed, setWaveSpeed] = useState<number>(50);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isSimRotating, setIsSimRotating] = useState<boolean>(true);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const clothMeshRef = useRef<THREE.Mesh | null>(null);
  const reqAnimRef = useRef<number | null>(null);

  const samples = TEXTILE_SAMPLES;
  const currentSample: TextileSample = samples[selectedSampleIndex] || samples[0];

  // 3D Live Cloth Simulation Canvas
  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const bgHex = isDarkTheme ? 0x220814 : 0xF5F0EB;
    scene.background = new THREE.Color(bgHex);
    scene.fog = new THREE.FogExp2(bgHex, 0.05);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 3.2);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    rendererRef.current = renderer;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lights
    const ambLight = new THREE.AmbientLight(0xffffff, isDarkTheme ? 1.4 : 1.9);
    scene.add(ambLight);

    const dirLight1 = new THREE.DirectionalLight(0x6E1A29, 3.2);
    dirLight1.position.set(3, 4, 3);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x54111D, 2.8);
    dirLight2.position.set(-3, -2, 2);
    scene.add(dirLight2);

    // Dynamic 3D Textile Plane with High Vertex Resolution
    const geo = new THREE.PlaneGeometry(1.6, 1.6, 48, 48);
    const mat = new THREE.MeshStandardMaterial({
      color: 0x6E1A29,
      roughness: 0.35,
      metalness: 0.25,
      side: THREE.DoubleSide,
      wireframe: false
    });
    const cloth = new THREE.Mesh(geo, mat);
    scene.add(cloth);
    clothMeshRef.current = cloth;

    let clock = new THREE.Clock();
    const animate = () => {
      reqAnimRef.current = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (clothMeshRef.current && clothMeshRef.current.geometry) {
        if (isSimRotating) {
          clothMeshRef.current.rotation.y = Math.sin(elapsed * 0.4) * 0.25;
          clothMeshRef.current.rotation.x = Math.sin(elapsed * 0.3) * 0.15;
        }

        const pos = clothMeshRef.current.geometry.attributes.position;
        const speedFactor = (waveSpeed / 50) * 3;
        const ampFactor = (100 - tension) / 400;

        for (let i = 0; i < pos.count; i++) {
          const u = pos.getX(i);
          const v = pos.getY(i);
          const wave = Math.sin(elapsed * speedFactor + u * 5 + v * 4) * ampFactor;
          pos.setZ(i, wave);
        }
        pos.needsUpdate = true;
      }

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
    };
  }, [isDarkTheme, tension, waveSpeed, isSimRotating]);

  return (
    <section id="textiles" className="relative w-full py-28 px-6 md:px-12 lg:px-20 border-b border-[#D4C5B0]/70 dark:border-white/[0.06]">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#D4C5B0]/70 dark:border-white/10 pb-8">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center space-x-3">
              <span className="w-8 h-[1px] bg-[#6E1A29] dark:bg-[#D48B96]" />
              <span className="text-[10px] font-sans-modern tracking-[0.35em] uppercase font-bold text-[#6E1A29] dark:text-[#D48B96]">
                03 • MATERIAL SPECIMEN ARCHIVE
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-bold tracking-tight text-[#5C1322] dark:text-[#FAF6F0]">
              TEXTILE SCIENCE & TACTILE PROTOTYPING
            </h2>
            <p className="text-xs sm:text-sm font-sans-modern text-[#221B1C]/75 dark:text-[#F3EBE6]/75 leading-relaxed">
              Interactive physics simulation comparing Chanderi Silk drape elasticity against rigid 340 GSM wool gabardine structures.
            </p>
          </div>

          {/* Filter Bar */}
          <div className={`flex items-center p-1 rounded-full border ${
            isDarkTheme ? 'border-white/15 bg-white/[0.03]' : 'border-[#D4C5B0] bg-[#EFE8DE]/80'
          }`}>
            {['all', 'Western Weaves', 'Traditional Craft', 'Experimental Surface'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                data-cursor="link"
                className={`px-3 py-1.5 rounded-full text-[9px] font-sans-modern tracking-[0.2em] uppercase font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-[#6E1A29] text-[#FAF6F0] shadow-sm'
                    : isDarkTheme ? 'text-stone-400 hover:text-white' : 'text-[#221B1C]/70 hover:text-[#6E1A29]'
                }`}
              >
                {cat === 'all' ? 'All Samples' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Main Display: 3D Simulation + Macro Photo Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 3D Cloth Physics Canvas */}
          <div className="lg:col-span-7 space-y-4">
            <div 
              data-cursor="drag"
              className="relative aspect-square sm:aspect-[4/3] rounded-3xl overflow-hidden border border-[#DCD0BF] dark:border-white/15 shadow-2xl bg-black/40"
            >
              <div ref={mountRef} className="w-full h-full" />
              
              {/* Simulation HUD Overlay */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <span className="px-3 py-1 rounded-full backdrop-blur-md bg-black/50 text-[9px] font-mono tracking-widest text-white/90 border border-white/15 uppercase font-bold">
                  Live 3D Fabric Simulation
                </span>
                <button
                  onClick={() => setIsSimRotating(!isSimRotating)}
                  data-cursor="link"
                  className="pointer-events-auto p-2 rounded-full bg-black/50 hover:bg-black/75 text-white backdrop-blur-md border border-white/15 transition-colors"
                  title="Toggle Auto Rotation"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Real-time Parameter Sliders */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl backdrop-blur-xl bg-black/60 border border-white/15 flex flex-col sm:flex-row gap-4 justify-between items-center text-white">
                <div className="w-full sm:w-1/2 space-y-1">
                  <div className="flex justify-between text-[10px] font-sans-modern tracking-wider uppercase font-semibold">
                    <span>Fabric Tension</span>
                    <span>{tension}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="90" 
                    value={tension}
                    onChange={(e) => setTension(Number(e.target.value))}
                    className="w-full accent-[#6E1A29] h-1.5 bg-white/20 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="w-full sm:w-1/2 space-y-1">
                  <div className="flex justify-between text-[10px] font-sans-modern tracking-wider uppercase font-semibold">
                    <span>Dynamic Fluidity</span>
                    <span>{waveSpeed}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="100" 
                    value={waveSpeed}
                    onChange={(e) => setWaveSpeed(Number(e.target.value))}
                    className="w-full accent-[#6E1A29] h-1.5 bg-white/20 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Macro Sample Spec Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className={`p-8 rounded-3xl border shadow-xl space-y-5 ${
              isDarkTheme ? 'bg-[#280D1A]/90 border-[#6E1A29]/40' : 'bg-[#FCFAF7] border-[#DCD0BF]'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-sans-modern tracking-[0.3em] uppercase font-bold text-[#6E1A29] dark:text-[#D48B96]">
                  SAMPLE 0{selectedSampleIndex + 1} • {currentSample.category.toUpperCase()}
                </span>
                <span className="text-xs font-mono opacity-50">#TL-0{selectedSampleIndex + 1}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-serif-luxury font-bold leading-tight text-[#5C1322] dark:text-[#FAF6F0]">
                {currentSample.title}
              </h3>

              <div className="space-y-1 text-xs font-sans-modern">
                <p><span className="opacity-60 uppercase font-semibold text-[10px] tracking-wider">Technique:</span> {currentSample.technique}</p>
                <p><span className="opacity-60 uppercase font-semibold text-[10px] tracking-wider">Materials:</span> {currentSample.materials}</p>
              </div>

              <p className="text-xs font-sans-modern leading-relaxed opacity-85 border-l-2 border-[#6E1A29] dark:border-[#D48B96] pl-3">
                {currentSample.description}
              </p>

              {/* Detail Notes */}
              <div className="space-y-2 border-t border-current/10 pt-4">
                <span className="text-[10px] font-sans-modern tracking-[0.2em] uppercase font-bold text-[#6E1A29] dark:text-[#D48B96]">
                  Engineering Specifications
                </span>
                <ul className="space-y-1.5">
                  {currentSample.detailNotes.map((note, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-xs font-sans-modern opacity-80">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#6E1A29] dark:bg-[#D48B96] mt-1.5 shrink-0" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Rotating Macro Gallery */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center space-x-2">
            <Eye className="w-4 h-4 text-[#6E1A29] dark:text-[#D48B96]" />
            <h3 className="text-xs font-sans-modern tracking-[0.25em] uppercase font-bold text-[#6E1A29] dark:text-[#D48B96]">
              Tactile Macro Archive
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {samples.map((sample, idx) => {
              const isSelected = selectedSampleIndex === idx;
              return (
                <button
                  key={sample.id}
                  onClick={() => setSelectedSampleIndex(idx)}
                  data-cursor="view"
                  className={`group relative aspect-square rounded-2xl overflow-hidden border-2 text-left transition-all ${
                    isSelected 
                      ? 'border-[#6E1A29] dark:border-[#D48B96] shadow-xl scale-105' 
                      : 'border-transparent opacity-70 hover:opacity-100 hover:border-[#D4C5B0]'
                  }`}
                >
                  <img 
                    src={sample.image} 
                    alt={sample.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-3 flex flex-col justify-end text-white">
                    <span className="text-[9px] font-mono tracking-wider opacity-75">0{idx + 1}</span>
                    <h5 className="text-xs font-serif-luxury font-bold line-clamp-1">
                      {sample.technique}
                    </h5>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
