import React, { useEffect, useRef, useState, useCallback } from 'react';
import { EXHIBITION_PROJECTS, ExhibitionProject } from '../data/exhibitionData';
import { ArrowDown, ArrowUpRight, Sparkles, Compass } from 'lucide-react';
import { getEffectiveImageUrl } from '../utils/imageStore';

interface EditorialCoverHeroProps {
  onSelectProject: (project: ExhibitionProject) => void;
  onExploreClick: () => void;
  isDarkTheme: boolean;
}

interface MoodboardPanelConfig {
  id: string;
  project: ExhibitionProject;
  code: string;
  lookNumber: string;
  categoryLabel: 'WESTERN' | 'ETHNIC';
  specimenLabel: string;
  fabricSpec: string;
  techniqueTag: string;
  silhouetteType: string;
  depth: number; // Z-parallax factor for depth layering
  baseRotate: number; // Natural physical moodboard tilt angle in degrees
  tapePosition: 'top-center' | 'top-left' | 'top-right';
  zIndex: number;
  desktopStyle: {
    left?: string;
    right?: string;
    top: string;
    width: string;
  };
}

export const EditorialCoverHero: React.FC<EditorialCoverHeroProps> = ({
  onSelectProject,
  onExploreClick,
  isDarkTheme
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'western' | 'ethnic'>('all');
  const [hoveredPanelId, setHoveredPanelId] = useState<string | null>(null);

  // Identify the exact 6 garments: 3 Western & 3 Ethnic
  const w01 = EXHIBITION_PROJECTS.find((p) => p.id === 'proj-w01') || EXHIBITION_PROJECTS[0];
  const w02 = EXHIBITION_PROJECTS.find((p) => p.id === 'proj-w02') || EXHIBITION_PROJECTS[1];
  const w03 = EXHIBITION_PROJECTS.find((p) => p.id === 'proj-w03') || EXHIBITION_PROJECTS[2]; // Neo-Kinetic Chroma with live 3D CLO video
  const e01 = EXHIBITION_PROJECTS.find((p) => p.id === 'proj-e01') || EXHIBITION_PROJECTS[3];
  const e02 = EXHIBITION_PROJECTS.find((p) => p.id === 'proj-e02') || EXHIBITION_PROJECTS[4];
  const e03 = EXHIBITION_PROJECTS.find((p) => p.id === 'proj-e03') || EXHIBITION_PROJECTS[5];

  // Six Physical Fashion Moodboard Cards placed at varying depths, angles, and asymmetrical positions
  const moodboardPanels: MoodboardPanelConfig[] = [
    // 01. Western 01: Top Left
    {
      id: 'panel-w01',
      project: w01,
      code: 'W-01',
      lookNumber: 'LOOK 01',
      categoryLabel: 'WESTERN',
      specimenLabel: 'SPECIMEN W-01 // COUTURE TRENCH',
      fabricSpec: '340 GSM Wool Gabardine',
      techniqueTag: 'EXPOSED CORSET BONING',
      silhouetteType: 'Architectural Hourglass',
      depth: 34,
      baseRotate: -3.2,
      tapePosition: 'top-center',
      zIndex: 14,
      desktopStyle: {
        left: '3.5%',
        top: '12%',
        width: '245px'
      }
    },
    // 02. Ethnic 01: Top Right
    {
      id: 'panel-e01',
      project: e01,
      code: 'E-01',
      lookNumber: 'LOOK 04',
      categoryLabel: 'ETHNIC',
      specimenLabel: 'SPECIMEN E-01 // 32-KALI ANARKALI',
      fabricSpec: 'Chanderi Silk & Mashru',
      techniqueTag: 'MICRO BANDHANI RESIST',
      silhouetteType: '32-Kali Volumetric Flare',
      depth: 28,
      baseRotate: 2.8,
      tapePosition: 'top-right',
      zIndex: 13,
      desktopStyle: {
        right: '3.5%',
        top: '10%',
        width: '250px'
      }
    },
    // 03. Western 03: Center-Right (Eye-Level Prominence with Live 3D CLO Video)
    {
      id: 'panel-w03',
      project: w03,
      code: 'W-03 // 3D',
      lookNumber: 'LOOK 03',
      categoryLabel: 'WESTERN',
      specimenLabel: 'SPECIMEN W-03 // DIGITAL ATELIER',
      fabricSpec: '110 GSM Holographic Nylon',
      techniqueTag: '3D CLO CLOTH SIMULATION',
      silhouetteType: 'Kinetic Cutaway Tailoring',
      depth: 44,
      baseRotate: -1.6,
      tapePosition: 'top-left',
      zIndex: 35,
      desktopStyle: {
        right: '3.5%',
        top: '38%',
        width: '275px'
      }
    },
    // 04. Ethnic 02: Center-Left
    {
      id: 'panel-e02',
      project: e02,
      code: 'E-02',
      lookNumber: 'LOOK 05',
      categoryLabel: 'ETHNIC',
      specimenLabel: 'SPECIMEN E-02 // PATOLA CONCEPT SAREE',
      fabricSpec: 'Upcycled Double-Ikat Silk',
      techniqueTag: 'ZERO-WASTE REASSEMBLY',
      silhouetteType: 'Asymmetrical Molded Drape',
      depth: 30,
      baseRotate: 2.4,
      tapePosition: 'top-center',
      zIndex: 15,
      desktopStyle: {
        left: '4%',
        top: '42%',
        width: '245px'
      }
    },
    // 05. Western 02: Lower-Left
    {
      id: 'panel-w02',
      project: w02,
      code: 'W-02',
      lookNumber: 'LOOK 02',
      categoryLabel: 'WESTERN',
      specimenLabel: 'SPECIMEN W-02 // DRAPED COLUMN',
      fabricSpec: '180 GSM Mulberry Silk',
      techniqueTag: 'DIRECT BIAS GRAVITY DRAPE',
      silhouetteType: 'Liquid Column Line',
      depth: 22,
      baseRotate: -2.4,
      tapePosition: 'top-left',
      zIndex: 12,
      desktopStyle: {
        left: '7%',
        top: '68%',
        width: '240px'
      }
    },
    // 06. Ethnic 03: Lower-Right
    {
      id: 'panel-e03',
      project: e03,
      code: 'E-03',
      lookNumber: 'LOOK 06',
      categoryLabel: 'ETHNIC',
      specimenLabel: 'SPECIMEN E-03 // ANGRAKHA & FARSHI',
      fabricSpec: '240 GSM Micro Silk Velvet',
      techniqueTag: '120 ARTISAN HRS ZARDOZI',
      silhouetteType: 'Flared Farshi & Angrakha',
      depth: 36,
      baseRotate: 2.2,
      tapePosition: 'top-right',
      zIndex: 16,
      desktopStyle: {
        right: '6.5%',
        top: '66%',
        width: '255px'
      }
    }
  ];

  // Mouse Parallax Physics with Smooth Lerp & Directional Shadow Dynamics
  const panelRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const mouseTargetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const mouseCurrentRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const animIdRef = useRef<number | null>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    const { innerWidth, innerHeight } = window;
    // Normalized coordinates from -1.0 to +1.0
    const normX = (e.clientX - innerWidth / 2) / (innerWidth / 2);
    const normY = (e.clientY - innerHeight / 2) / (innerHeight / 2);
    mouseTargetRef.current = { x: normX, y: normY };
  }, []);

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (!isTouch) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    const renderLoop = () => {
      const ease = 0.08;
      mouseCurrentRef.current.x += (mouseTargetRef.current.x - mouseCurrentRef.current.x) * ease;
      mouseCurrentRef.current.y += (mouseTargetRef.current.y - mouseCurrentRef.current.y) * ease;

      const mx = mouseCurrentRef.current.x;
      const my = mouseCurrentRef.current.y;

      moodboardPanels.forEach((panel) => {
        const el = panelRefs.current.get(panel.id);
        if (el) {
          const isHovered = hoveredPanelId === panel.id;
          const shiftX = mx * panel.depth;
          const shiftY = my * panel.depth;
          const tiltX = -my * (panel.depth * 0.14);
          const tiltY = mx * (panel.depth * 0.14);
          const hoverLiftZ = isHovered ? 46 : 0;
          const hoverTiltOffset = isHovered ? 0 : panel.baseRotate;

          // Realistic physical drop shadow that reacts opposite to cursor (simulating a physical overhead key light)
          const shadowOffsetX = -shiftX * 0.75;
          const shadowOffsetY = -shiftY * 0.75 + (isHovered ? 26 : 14);
          const shadowBlur = isHovered ? 36 : 20 + Math.abs(shiftX) * 0.3;
          const shadowAlpha = isHovered ? 0.28 : 0.18;

          el.style.transform = `translate3d(${shiftX}px, ${shiftY}px, ${hoverLiftZ}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) rotateZ(${hoverTiltOffset}deg)`;
          el.style.boxShadow = `${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px rgba(0,0,0,${shadowAlpha})`;
        }
      });

      animIdRef.current = requestAnimationFrame(renderLoop);
    };

    animIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
    };
  }, [handleMouseMove, hoveredPanelId, moodboardPanels]);

  return (
    <section 
      id="hero" 
      ref={containerRef}
      className={`relative w-full min-h-screen lg:min-h-[880px] select-none overflow-hidden flex flex-col justify-between transition-colors duration-700 ${
        isDarkTheme ? 'bg-[#220814] text-[#FAF4EF]' : 'bg-[#F5F0EB] text-[#221B1C]'
      }`}
      style={{ perspective: '1400px' }}
    >
      {/* Background Architectural Grid & High-Fashion Coordinates */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center opacity-[0.035] overflow-hidden select-none">
        <span className="text-[26vw] font-serif-luxury font-black tracking-tighter uppercase whitespace-nowrap text-[#6E1A29]">
          ATELIER
        </span>
      </div>

      {/* Delicate Studio Alignment Crosshairs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className={`w-full h-full ${isDarkTheme ? 'opacity-[0.04]' : 'opacity-[0.035]'} bg-editorial-dots`} />
        {/* Subtle Architectural Tick Marks at Four Quadrants */}
        <div className="absolute top-24 left-1/4 text-[8px] font-mono tracking-widest opacity-25 text-current">
          + 23°02′N // 72°35′E
        </div>
        <div className="absolute bottom-28 right-1/4 text-[8px] font-mono tracking-widest opacity-25 text-current">
          + SILHOUETTE_MATRIX_AW26
        </div>
      </div>

      {/* Top Minimalist Editorial Ribbon */}
      <div className="relative z-30 pt-24 md:pt-28 px-6 md:px-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pointer-events-auto">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#6E1A29] animate-pulse" />
            <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.35em] uppercase font-bold text-[#6E1A29] dark:text-[#D48B96]">
              AUTUMN / WINTER 2026 CAPSULE
            </span>
          </div>
          <h2 className="text-xs sm:text-sm font-sans-modern tracking-[0.25em] uppercase opacity-75 text-[#221B1C] dark:text-[#F3EBE6]">
            HETVI KAPADIA • INDUS UNIVERSITY
          </h2>
        </div>

        {/* Minimal Curated Category Filter Tabs */}
        <div className={`flex items-center space-x-1 p-1 rounded-full border backdrop-blur-xl transition-all shadow-xs ${
          isDarkTheme ? 'bg-white/[0.04] border-white/10' : 'bg-[#EFE8DE]/80 border-[#D4C5B0]'
        }`}>
          <button
            onClick={() => setActiveFilter('all')}
            data-cursor="link"
            className={`px-3 py-1 rounded-full text-[9px] font-sans-modern tracking-[0.2em] uppercase font-bold transition-all ${
              activeFilter === 'all'
                ? 'bg-[#6E1A29] text-[#FAF6F0] shadow-sm'
                : 'opacity-65 hover:opacity-100 text-[#221B1C] dark:text-[#F3EBE6]'
            }`}
          >
            ALL (06)
          </button>
          <button
            onClick={() => setActiveFilter('western')}
            data-cursor="link"
            className={`px-3 py-1 rounded-full text-[9px] font-sans-modern tracking-[0.2em] uppercase font-bold transition-all ${
              activeFilter === 'western'
                ? 'bg-[#6E1A29] text-[#FAF6F0] shadow-sm'
                : 'opacity-65 hover:opacity-100 text-[#221B1C] dark:text-[#F3EBE6]'
            }`}
          >
            3 WESTERN
          </button>
          <button
            onClick={() => setActiveFilter('ethnic')}
            data-cursor="link"
            className={`px-3 py-1 rounded-full text-[9px] font-sans-modern tracking-[0.2em] uppercase font-bold transition-all ${
              activeFilter === 'ethnic'
                ? 'bg-[#6E1A29] text-[#FAF6F0] shadow-sm'
                : 'opacity-65 hover:opacity-100 text-[#221B1C] dark:text-[#F3EBE6]'
            }`}
          >
            3 ETHNIC
          </button>
        </div>
      </div>

      {/* CENTRAL EDITORIAL MASTHEAD WITH GENEROUS NEGATIVE SPACE */}
      <div className="relative z-25 flex flex-col items-center justify-center text-center px-4 sm:px-6 my-auto py-8 sm:py-12 pointer-events-auto">
        <div className={`relative max-w-2xl sm:max-w-3xl w-full rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12 transition-all duration-700 backdrop-blur-md shadow-xl ${
          isDarkTheme
            ? 'bg-[#2C0D1B]/92 border border-[#6E1A29]/50 shadow-[0_24px_60px_rgba(15,2,8,0.7)]'
            : 'bg-[#F5F0EB]/92 border border-[#D4C5B0] shadow-[0_24px_64px_rgba(110,26,41,0.06)]'
        }`}>
          {/* Subtle Top Wine Registration Mark */}
          <div className="flex items-center justify-center space-x-3 mb-4">
            <span className="w-8 h-[1px] bg-[#6E1A29]/60 dark:bg-[#D48B96]/60" />
            <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.38em] uppercase font-bold text-[#6E1A29] dark:text-[#D48B96]">
              Haute Couture & Textile Archive
            </span>
            <span className="w-8 h-[1px] bg-[#6E1A29]/60 dark:bg-[#D48B96]/60" />
          </div>

          {/* Main Collection Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif-luxury font-bold tracking-tight leading-[1.05] text-[#5C1322] dark:text-[#FAF6F0]">
            HAUTE ARCHITECTURE
          </h1>

          {/* Subtitle Framing the 6 Garments */}
          <p className="mt-3 text-[10px] sm:text-xs font-sans-modern tracking-[0.24em] uppercase font-semibold text-[#221B1C]/75 dark:text-[#F3EBE6]/75 max-w-xl mx-auto">
            Six Curated Master Garments • 3 Western Structural Forms & 3 Ancestral Gujarati Silhouettes
          </p>

          {/* Curatorial Introductory Write-Up */}
          <div className="my-5 py-4 border-y border-[#D4C5B0]/70 dark:border-white/10 max-w-2xl mx-auto">
            <p className="text-xs sm:text-sm md:text-[15px] font-serif-luxury italic leading-relaxed text-[#221B1C]/90 dark:text-[#F3EBE6]/90">
              "An architectural fashion thesis investigating the dialogue between structural Western tailoring and ancestral Gujarati textile mastery. Exploring volumetric gravity, internal corset boning, algorithmic pattern drafting, and circular zero-waste double-ikat assembly."
            </p>
          </div>

          {/* Micro-Interactions & Tactical Guidance */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-1">
            <button
              onClick={onExploreClick}
              data-cursor="link"
              className="px-6 py-2.5 rounded-full bg-[#6E1A29] hover:bg-[#802031] text-[#FAF6F0] text-[10px] font-sans-modern tracking-[0.22em] uppercase font-bold shadow-md hover:shadow-lg transition-all flex items-center space-x-2 active:scale-95"
            >
              <span>EXPLORE COMPLETE ARCHIVE</span>
              <ArrowDown className="w-3 h-3 text-[#FAF6F0]" />
            </button>

            <div className="flex items-center space-x-2 text-[9px] font-mono tracking-widest uppercase opacity-70 text-[#221B1C] dark:text-[#F3EBE6]">
              <span>PARALLAX MOODBOARD FIELD</span>
              <span className="w-1 h-1 rounded-full bg-current opacity-40" />
              <span>CLICK CARD FOR DESIGN STORY</span>
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP ASYMMETRICAL 3D FLOATING MOODBOARD PANELS (EXACTLY 6 GARMENTS) */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none z-15 overflow-hidden">
        {moodboardPanels.map((panel) => {
          const isMatch = activeFilter === 'all' || 
            (activeFilter === 'western' && panel.categoryLabel === 'WESTERN') || 
            (activeFilter === 'ethnic' && panel.categoryLabel === 'ETHNIC');
          
          const heroUrl = getEffectiveImageUrl(`proj_${panel.project.id}_hero`, panel.project.heroImage);
          const isHovered = hoveredPanelId === panel.id;

          return (
            <div
              key={panel.id}
              ref={(el) => {
                if (el) panelRefs.current.set(panel.id, el);
              }}
              onClick={() => onSelectProject(panel.project)}
              onMouseEnter={() => setHoveredPanelId(panel.id)}
              onMouseLeave={() => setHoveredPanelId(null)}
              data-cursor="story"
              className={`absolute pointer-events-auto cursor-pointer transition-all duration-500 ease-out will-change-transform group ${
                isMatch ? 'opacity-100 scale-100' : 'opacity-15 pointer-events-none scale-95'
              }`}
              style={{
                left: panel.desktopStyle.left,
                right: panel.desktopStyle.right,
                top: panel.desktopStyle.top,
                width: panel.desktopStyle.width,
                zIndex: isHovered ? 40 : panel.zIndex,
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Physical Moodboard Card Envelope with Real Cardstock Aesthetics */}
              <div className={`relative rounded-2xl border p-3.5 transition-all duration-500 shadow-xl backdrop-blur-md ${
                isDarkTheme 
                  ? 'bg-[#2C0D1B]/95 border-[#6E1A29]/40 group-hover:border-[#D48B96] group-hover:bg-[#381123]' 
                  : 'bg-[#FCFAF7] border-[#DCD0BF] group-hover:border-[#6E1A29]/80 group-hover:bg-white'
              }`}>
                {/* Physical Pinned Frosted Tape Motif at Configured Position */}
                <div className={`absolute -top-2.5 w-14 h-4 rounded-xs bg-[#E8DFD1]/80 dark:bg-white/10 backdrop-blur-md border border-[#D4C5B0]/60 shadow-2xs pointer-events-none ${
                  panel.tapePosition === 'top-left' ? 'left-6' : panel.tapePosition === 'top-right' ? 'right-6' : 'left-1/2 -translate-x-1/2'
                }`} />

                {/* Studio Architectural Corner Registration Crosshairs */}
                <span className="absolute top-2 left-2 text-[8px] font-mono text-current opacity-30 select-none pointer-events-none">+</span>
                <span className="absolute top-2 right-2 text-[8px] font-mono text-current opacity-30 select-none pointer-events-none">+</span>
                <span className="absolute bottom-2 left-2 text-[8px] font-mono text-current opacity-30 select-none pointer-events-none">+</span>
                <span className="absolute bottom-2 right-2 text-[8px] font-mono text-current opacity-30 select-none pointer-events-none">+</span>

                {/* Moodboard Header Tag with Archival Code */}
                <div className="flex items-center justify-between pb-2 border-b border-current/10 mb-2.5 px-0.5">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6E1A29]" />
                    <span className="text-[8px] font-mono tracking-[0.25em] uppercase font-bold text-[#6E1A29] dark:text-[#D48B96]">
                      {panel.code}
                    </span>
                  </div>
                  <span className="text-[8px] font-sans-modern tracking-wider uppercase opacity-65 font-semibold text-[#221B1C] dark:text-[#F3EBE6]">
                    {panel.categoryLabel}
                  </span>
                </div>

                {/* Media Specimen Frame (Live 3D MP4 Video for Look W-03, High-Res Editorial Photo for Others) */}
                <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-black/40 border border-current/5 shadow-inner flex items-center justify-center">
                  {panel.project.videoUrl ? (
                    <video
                      src={panel.project.videoUrl}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      className="w-full h-full object-contain bg-black/80 transition-transform duration-700 group-hover:scale-105"
                      aria-label="3D Video Specimen"
                    >
                      <source src={panel.project.videoUrl} type="video/mp4" />
                    </video>
                  ) : (
                    <img
                      src={heroUrl}
                      alt={panel.project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="eager"
                    />
                  )}

                  {/* High-Fashion Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity pointer-events-none" />

                  {/* Floating Corner Specimen Classification Tag */}
                  <div className="absolute top-2.5 left-2.5 pointer-events-none">
                    <span className="px-2 py-0.5 rounded-full backdrop-blur-md bg-black/65 border border-white/20 text-[7px] font-mono tracking-widest text-white uppercase font-bold">
                      {panel.project.videoUrl ? '3D CLO SIMULATION' : 'ARCHIVAL LOOK'}
                    </span>
                  </div>

                  {/* Physical Fabric Swatch Pin (Top Right Corner) */}
                  <div className="absolute top-2.5 right-2.5 pointer-events-none flex items-center space-x-1">
                    <span className="w-2.5 h-2.5 rounded-full border border-white/60 shadow-sm" style={{ backgroundColor: panel.project.colors[0]?.hex || '#6E1A29' }} />
                  </div>

                  {/* Hover Floating Action Prompt */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <span className="px-3.5 py-1.5 rounded-full backdrop-blur-xl bg-[#6E1A29]/95 text-white border border-white/30 text-[9px] font-sans-modern tracking-[0.2em] uppercase font-bold shadow-xl flex items-center space-x-1.5">
                      <span>OPEN DESIGN STORY</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>

                {/* Card Meta & Color Swatches Footer */}
                <div className="pt-3 space-y-1.5 px-0.5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-serif-luxury font-bold tracking-wide line-clamp-1 group-hover:text-[#6E1A29] dark:group-hover:text-[#D48B96] transition-colors">
                      {panel.project.title}
                    </h3>
                    <span className="text-[7px] font-mono tracking-wider opacity-60 uppercase shrink-0">
                      {panel.lookNumber}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-[8px] font-sans-modern opacity-75">
                    <span className="line-clamp-1">{panel.fabricSpec}</span>
                  </div>

                  {/* Color Palette Micro Swatch Row with Technique Notation */}
                  <div className="flex items-center justify-between pt-1.5 border-t border-current/10">
                    <div className="flex items-center space-x-1">
                      {panel.project.colors.slice(0, 3).map((c, i) => (
                        <span 
                          key={i} 
                          className="w-2.5 h-2.5 rounded-full border border-black/15 shadow-2xs" 
                          style={{ backgroundColor: c.hex }} 
                          title={`${c.name} (${c.hex})`}
                        />
                      ))}
                    </div>
                    <span className="text-[8px] font-mono tracking-widest uppercase opacity-60 font-semibold">
                      {panel.techniqueTag}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* MOBILE / TABLET RESPONSIVE EDITORIAL MOODBOARD GRID */}
      <div className="block lg:hidden relative z-10 px-6 py-8 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {moodboardPanels.map((panel, idx) => {
            const isMatch = activeFilter === 'all' || 
              (activeFilter === 'western' && panel.categoryLabel === 'WESTERN') || 
              (activeFilter === 'ethnic' && panel.categoryLabel === 'ETHNIC');

            if (!isMatch) return null;

            const heroUrl = getEffectiveImageUrl(`proj_${panel.project.id}_hero`, panel.project.heroImage);
            const alternatingTilt = idx % 2 === 0 ? '-1.5deg' : '1.5deg';

            return (
              <div
                key={panel.id}
                onClick={() => onSelectProject(panel.project)}
                data-cursor="story"
                className="relative rounded-2xl border p-3.5 transition-all duration-300 shadow-lg cursor-pointer active:scale-95"
                style={{
                  transform: `rotate(${alternatingTilt})`,
                  backgroundColor: isDarkTheme ? '#2C0D1B' : '#FCFAF7',
                  borderColor: isDarkTheme ? 'rgba(110,26,41,0.6)' : '#DCD0BF'
                }}
              >
                <div className="flex items-center justify-between pb-2 border-b border-current/10 mb-2">
                  <span className="text-[8px] font-mono tracking-[0.25em] uppercase font-bold text-[#6E1A29] dark:text-[#D48B96]">
                    {panel.code}
                  </span>
                  <span className="text-[8px] font-sans-modern tracking-wider uppercase opacity-60">
                    {panel.categoryLabel}
                  </span>
                </div>

                <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-black/40 mb-2.5 flex items-center justify-center">
                  {panel.project.videoUrl ? (
                    <video
                      src={panel.project.videoUrl}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      className="w-full h-full object-contain bg-black/80"
                    >
                      <source src={panel.project.videoUrl} type="video/mp4" />
                    </video>
                  ) : (
                    <img src={heroUrl} alt={panel.project.title} className="w-full h-full object-cover" />
                  )}
                  <div className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-[#6E1A29] text-[8px] font-mono font-bold text-white uppercase shadow-sm flex items-center space-x-1">
                    <span>STORY</span>
                    <ArrowUpRight className="w-2.5 h-2.5" />
                  </div>
                </div>

                <h3 className="text-xs font-serif-luxury font-bold tracking-wide line-clamp-1">
                  {panel.project.title}
                </h3>
                <p className="text-[8px] font-sans-modern opacity-70 line-clamp-1">
                  {panel.fabricSpec}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* BOTTOM MINIMAL EDITORIAL GUIDANCE & TACTILE NAVIGATOR */}
      <div className="relative z-20 pb-8 px-6 md:px-12 flex flex-col lg:flex-row items-center justify-between gap-4 pointer-events-auto">
        <div className="flex items-center space-x-3 text-[9px] sm:text-[10px] tracking-[0.25em] uppercase opacity-65 font-semibold text-[#221B1C] dark:text-[#F3EBE6]">
          <span>6 CURATED MASTER SPECIMENS</span>
          <span className="w-1 h-1 rounded-full bg-current opacity-40" />
          <span>3 WESTERN & 3 ETHNIC</span>
        </div>

        {/* Minimalist 6-Specimen Interactive Navigator Strip */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-center">
          {moodboardPanels.map((p) => {
            const isHovered = hoveredPanelId === p.id;
            const is3D = p.id === 'panel-w03';
            return (
              <button
                key={p.id}
                onClick={() => onSelectProject(p.project)}
                onMouseEnter={() => setHoveredPanelId(p.id)}
                onMouseLeave={() => setHoveredPanelId(null)}
                data-cursor="story"
                title={`${p.code}: ${p.project.title}`}
                className={`px-2.5 py-1 rounded-full text-[8px] sm:text-[9px] font-mono uppercase tracking-wider transition-all flex items-center space-x-1.5 border active:scale-95 ${
                  is3D
                    ? 'bg-[#6E1A29] text-white border-[#6E1A29] shadow-md font-bold'
                    : isHovered
                      ? 'bg-[#6E1A29] text-white border-[#6E1A29]'
                      : isDarkTheme
                        ? 'bg-white/5 border-white/10 text-stone-300 hover:text-white hover:border-white/30'
                        : 'bg-white/80 border-[#D4C5B0] text-stone-700 hover:text-black hover:border-stone-400'
                }`}
              >
                <span>{p.code}</span>
                {is3D && (
                  <span className="px-1 py-0.2 rounded-xs bg-[#DFFF00] text-black text-[7px] font-bold tracking-tighter">
                    LIVE 3D
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <button
          onClick={onExploreClick}
          data-cursor="link"
          className="flex items-center space-x-2 text-[10px] font-sans-modern tracking-[0.25em] uppercase font-bold text-[#6E1A29] dark:text-[#D48B96] hover:text-[#54111D] dark:hover:text-white transition-colors group"
        >
          <span>Scroll to Read Archive</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#6E1A29] dark:text-[#D48B96]" />
        </button>
      </div>
    </section>
  );
};
