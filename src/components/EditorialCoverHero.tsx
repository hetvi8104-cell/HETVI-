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
}

export const EditorialCoverHero: React.FC<EditorialCoverHeroProps> = ({
  onSelectProject,
  onExploreClick,
  isDarkTheme
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'western' | 'ethnic'>('all');
  const [selectedLookId, setSelectedLookId] = useState<string>('panel-w01'); // Default to Look 01 — user's editorial photo
  const [isStageHovered, setIsStageHovered] = useState<boolean>(false);

  // Identify the exact 6 garments: 3 Western & 3 Ethnic
  const w01 = EXHIBITION_PROJECTS.find((p) => p.id === 'proj-w01') || EXHIBITION_PROJECTS[0];
  const w02 = EXHIBITION_PROJECTS.find((p) => p.id === 'proj-w02') || EXHIBITION_PROJECTS[1];
  const w03 = EXHIBITION_PROJECTS.find((p) => p.id === 'proj-w03') || EXHIBITION_PROJECTS[2]; // Neo-Kinetic Chroma with live 3D CLO video
  const e01 = EXHIBITION_PROJECTS.find((p) => p.id === 'proj-e01') || EXHIBITION_PROJECTS[3];
  const e02 = EXHIBITION_PROJECTS.find((p) => p.id === 'proj-e02') || EXHIBITION_PROJECTS[4];
  const e03 = EXHIBITION_PROJECTS.find((p) => p.id === 'proj-e03') || EXHIBITION_PROJECTS[5];

  // Curated Garment Configs
  const moodboardPanels: MoodboardPanelConfig[] = [
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
      depth: 26,
      baseRotate: -1.8,
      tapePosition: 'top-center'
    },
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
      depth: 20,
      baseRotate: 1.5,
      tapePosition: 'top-left'
    },
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
      depth: 34,
      baseRotate: -1.2,
      tapePosition: 'top-right'
    },
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
      depth: 24,
      baseRotate: 1.6,
      tapePosition: 'top-right'
    },
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
      depth: 28,
      baseRotate: -1.5,
      tapePosition: 'top-center'
    },
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
      depth: 30,
      baseRotate: 1.4,
      tapePosition: 'top-left'
    }
  ];

  // Active Panel Reference
  const activePanel = moodboardPanels.find((p) => p.id === selectedLookId) || moodboardPanels[2];
  const heroImageUrl = getEffectiveImageUrl(`proj_${activePanel.project.id}_hero`, activePanel.project.heroImage);

  // Parallax Tilt Physics on the Virtual Stage
  const stageRef = useRef<HTMLDivElement>(null);
  const mouseTargetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const mouseCurrentRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const animIdRef = useRef<number | null>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    const { innerWidth, innerHeight } = window;
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

      if (stageRef.current) {
        const tiltX = -my * 4;
        const tiltY = mx * 4;
        const shiftX = mx * 8;
        const shiftY = my * 8;
        const hoverLift = isStageHovered ? 12 : 0;

        stageRef.current.style.transform = `translate3d(${shiftX}px, ${shiftY}px, ${hoverLift}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) rotateZ(${activePanel.baseRotate}deg)`;
      }

      animIdRef.current = requestAnimationFrame(renderLoop);
    };

    animIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
    };
  }, [handleMouseMove, isStageHovered, activePanel.baseRotate]);

  // Filtered panels for navigation
  const filteredPanels = moodboardPanels.filter((panel) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'western') return panel.categoryLabel === 'WESTERN';
    if (activeFilter === 'ethnic') return panel.categoryLabel === 'ETHNIC';
    return true;
  });

  return (
    <section 
      id="hero" 
      ref={containerRef}
      className={`relative w-full min-h-screen lg:h-screen lg:max-h-screen select-none overflow-hidden flex flex-col justify-between transition-colors duration-700 ${
        isDarkTheme ? 'bg-[#220814] text-[#FAF4EF]' : 'bg-[#F5F0EB] text-[#221B1C]'
      }`}
      style={{ perspective: '1400px' }}
    >
      {/* High-Fashion Watermark Typography */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center opacity-[0.03] overflow-hidden select-none">
        <span className="text-[28vw] font-serif-luxury font-black tracking-tighter uppercase whitespace-nowrap text-[#6E1A29]">
          HAUTE
        </span>
      </div>

      {/* Atmospheric Subtle Studio Grid & Architectural Ticks */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className={`w-full h-full ${isDarkTheme ? 'opacity-[0.04]' : 'opacity-[0.035]'} bg-editorial-dots`} />
        <div className="absolute top-24 left-12 text-[8px] font-mono tracking-widest opacity-30 text-current">
          + 23°02′N // 72°35′E • AHMEDABAD ATELIER
        </div>
        <div className="absolute bottom-20 right-12 text-[8px] font-mono tracking-widest opacity-30 text-current">
          + THESIS_SPECIMEN_MATRIX_AW26
        </div>
      </div>

      {/* TOP MINIMAL EDITORIAL RIBBON */}
      <div className="relative z-30 pt-20 md:pt-24 px-6 md:px-12 lg:px-16 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pointer-events-auto">
        <div className="flex items-center space-x-3">
          <span className="w-2 h-2 rounded-full bg-[#6E1A29] animate-pulse" />
          <div className="flex flex-col">
            <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.3em] uppercase font-bold text-[#6E1A29] dark:text-[#D48B96]">
              AUTUMN / WINTER 2026 CAPSULE
            </span>
            <span className="text-[9px] font-sans-modern tracking-[0.2em] uppercase opacity-70 text-[#221B1C] dark:text-[#F3EBE6]">
              HETVI KAPADIA • INDUS UNIVERSITY
            </span>
          </div>
        </div>

        {/* Minimal Category Filter Tabs */}
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

      {/* MAIN SPLIT HORIZON ATELIER STAGE (100VH COMPOSITION) */}
      <div className="relative z-20 flex-1 px-6 md:px-12 lg:px-16 flex items-center justify-center my-auto py-4">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* LEFT STAGE: HAUTE ARCHITECTURE TYPOGRAPHY & RUNWAY INDEX (7 COLS) */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            
            {/* Editorial Eyebrow with Geometric Line Accent */}
            <div className="flex items-center space-x-3">
              <span className="w-6 h-[1px] bg-[#6E1A29] dark:bg-[#D48B96]" />
              <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.35em] uppercase font-bold text-[#6E1A29] dark:text-[#D48B96]">
                HAUTE COUTURE & TEXTILE ARCHIVE
              </span>
            </div>

            {/* Monumental Title */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-serif-luxury font-bold tracking-tight leading-[0.95] text-[#5C1322] dark:text-[#FAF6F0]">
                DUALITY
              </h1>
              <p className="text-[11px] sm:text-xs font-sans-modern tracking-[0.22em] uppercase font-semibold text-[#221B1C]/75 dark:text-[#F3EBE6]/75 pt-2 max-w-xl">
                Six Curated Master Garments • Western Structural Forms & Ancestral Gujarati Silhouettes
              </p>
            </div>

            {/* Curatorial Thesis Excerpt */}
            <p className="text-xs sm:text-sm font-serif-luxury italic leading-relaxed text-[#221B1C]/85 dark:text-[#F3EBE6]/85 border-l-2 border-[#6E1A29]/50 pl-4 max-w-xl py-0.5">
              "An architectural fashion thesis investigating the dialogue between structural Western tailoring and ancestral Gujarati textile mastery. Exploring volumetric gravity, internal corset boning, and zero-waste double-ikat assembly."
            </p>

            {/* INTERACTIVE 6-GARMENT RUNWAY INDEX */}
            <div className="space-y-1.5 pt-2 max-w-xl">
              <div className="flex items-center justify-between text-[8px] font-mono tracking-widest uppercase opacity-50 pb-1 border-b border-current/10">
                <span>INDEXED SPECIMENS</span>
                <span>SELECT TO PREVIEW SPECIMEN</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {filteredPanels.map((p) => {
                  const isSelected = selectedLookId === p.id;
                  const is3D = p.id === 'panel-w03';

                  return (
                    <button
                      key={p.id}
                      onClick={() => setSelectedLookId(p.id)}
                      onMouseEnter={() => setSelectedLookId(p.id)}
                      data-cursor="story"
                      className={`text-left p-2.5 rounded-xl border transition-all flex items-center justify-between group active:scale-95 ${
                        isSelected
                          ? isDarkTheme
                            ? 'bg-[#381123] border-[#D48B96] shadow-md'
                            : 'bg-white border-[#6E1A29] shadow-sm'
                          : isDarkTheme
                            ? 'bg-white/[0.02] border-white/5 hover:border-white/20'
                            : 'bg-white/40 border-[#D4C5B0]/60 hover:border-stone-400'
                      }`}
                    >
                      <div className="space-y-0.5 min-w-0 pr-2">
                        <div className="flex items-center space-x-1.5">
                          <span className={`text-[8px] font-mono font-bold tracking-wider ${
                            isSelected ? 'text-[#6E1A29] dark:text-[#D48B96]' : 'opacity-60'
                          }`}>
                            {p.code}
                          </span>
                          {is3D && (
                            <span className="px-1 py-0.2 rounded-xs bg-[#DFFF00] text-black text-[7px] font-bold tracking-tighter shrink-0 animate-pulse">
                              LIVE 3D
                            </span>
                          )}
                        </div>
                        <h4 className="text-xs font-serif-luxury font-bold tracking-wide truncate group-hover:text-[#6E1A29] dark:group-hover:text-[#D48B96] transition-colors">
                          {p.project.title}
                        </h4>
                        <p className="text-[7.5px] font-sans-modern opacity-65 truncate">
                          {p.fabricSpec}
                        </p>
                      </div>

                      <div 
                        className="w-2.5 h-2.5 rounded-full border border-black/20 shrink-0 shadow-2xs"
                        style={{ backgroundColor: p.project.colors[0]?.hex || '#6E1A29' }}
                        title={p.project.colors[0]?.name}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onSelectProject(activePanel.project)}
                data-cursor="story"
                className="px-6 py-3 rounded-full bg-[#6E1A29] hover:bg-[#802031] text-[#FAF6F0] text-[10px] font-sans-modern tracking-[0.2em] uppercase font-bold shadow-md hover:shadow-lg transition-all flex items-center space-x-2 active:scale-95 group"
              >
                <span>OPEN DESIGN DOSSIER</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <button
                onClick={onExploreClick}
                data-cursor="link"
                className={`px-5 py-3 rounded-full border text-[10px] font-sans-modern tracking-[0.2em] uppercase font-bold transition-all flex items-center space-x-2 ${
                  isDarkTheme 
                    ? 'border-white/20 hover:border-white text-stone-200' 
                    : 'border-[#D4C5B0] hover:border-[#6E1A29] text-stone-800'
                }`}
              >
                <span>EXPLORE ARCHIVE</span>
                <ArrowDown className="w-3 h-3" />
              </button>
            </div>

          </div>

          {/* RIGHT STAGE: 3D VIRTUAL MANNEQUIN & SPECIMEN SPOTLIGHT (5 COLS) */}
          <div className="lg:col-span-5 flex items-center justify-center pointer-events-auto">
            <div
              ref={stageRef}
              onClick={() => onSelectProject(activePanel.project)}
              onMouseEnter={() => setIsStageHovered(true)}
              onMouseLeave={() => setIsStageHovered(false)}
              data-cursor="story"
              className="relative w-full max-w-[360px] sm:max-w-[400px] lg:max-w-[390px] cursor-pointer transition-transform duration-300 ease-out group"
              style={{
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Luxury Ambient Glow Behind Card */}
              <div className="absolute -inset-4 rounded-3xl bg-radial from-[#6E1A29]/30 to-transparent blur-2xl opacity-60 group-hover:opacity-90 transition-opacity pointer-events-none" />

              {/* Physical Card Envelope */}
              <div className={`relative rounded-3xl border p-4 sm:p-5 transition-all duration-500 shadow-2xl backdrop-blur-md ${
                isDarkTheme 
                  ? 'bg-[#2C0D1B]/95 border-[#6E1A29]/60 group-hover:border-[#D48B96]' 
                  : 'bg-[#FCFAF7] border-[#DCD0BF] group-hover:border-[#6E1A29]'
              }`}>
                {/* Physical Masking Tape Motif */}
                <div className={`absolute -top-3 w-16 h-5 rounded-xs bg-[#E8DFD1]/90 dark:bg-white/15 backdrop-blur-md border border-[#D4C5B0]/70 shadow-xs pointer-events-none ${
                  activePanel.tapePosition === 'top-left' ? 'left-8' : activePanel.tapePosition === 'top-right' ? 'right-8' : 'left-1/2 -translate-x-1/2'
                }`} />

                {/* Studio Crosshairs */}
                <span className="absolute top-2.5 left-2.5 text-[8px] font-mono text-current opacity-30 select-none pointer-events-none">+</span>
                <span className="absolute top-2.5 right-2.5 text-[8px] font-mono text-current opacity-30 select-none pointer-events-none">+</span>
                <span className="absolute bottom-2.5 left-2.5 text-[8px] font-mono text-current opacity-30 select-none pointer-events-none">+</span>
                <span className="absolute bottom-2.5 right-2.5 text-[8px] font-mono text-current opacity-30 select-none pointer-events-none">+</span>

                {/* Specimen Header Row */}
                <div className="flex items-center justify-between pb-2.5 border-b border-current/10 mb-3 px-1">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-[#6E1A29]" />
                    <span className="text-[9px] font-mono tracking-[0.25em] uppercase font-bold text-[#6E1A29] dark:text-[#D48B96]">
                      {activePanel.code}
                    </span>
                  </div>
                  <span className="text-[8px] font-sans-modern tracking-wider uppercase opacity-70 font-semibold">
                    {activePanel.categoryLabel}
                  </span>
                </div>

                {/* Tall Media Specimen Frame (Video for W-03, High-Res Image for Others) */}
                <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-black/40 border border-current/5 shadow-inner flex items-center justify-center">
                  <img
                    key={heroImageUrl}
                    src={heroImageUrl}
                    alt={activePanel.project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="eager"
                  />

                  {/* Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-60 group-hover:opacity-75 transition-opacity pointer-events-none" />

                  {/* Floating Classification Tag */}
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <span className="px-2.5 py-1 rounded-full backdrop-blur-md bg-black/75 border border-white/20 text-[8px] font-mono tracking-widest text-white uppercase font-bold flex items-center space-x-1.5 shadow-md">
                      {activePanel.project.videoUrl ? (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#DFFF00] animate-pulse" />
                          <span>LIVE 3D CLO SIMULATION</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-2.5 h-2.5 text-[#D48B96]" />
                          <span>ARCHIVAL SPECIMEN</span>
                        </>
                      )}
                    </span>
                  </div>

                  {/* Fabric Swatch Pin (Top Right Corner) */}
                  <div className="absolute top-3 right-3 pointer-events-none flex items-center space-x-1.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20">
                    <span 
                      className="w-2.5 h-2.5 rounded-full border border-white/80 shadow-sm" 
                      style={{ backgroundColor: activePanel.project.colors[0]?.hex || '#6E1A29' }} 
                    />
                    <span className="text-[7px] font-mono text-white tracking-widest uppercase">
                      SWATCH
                    </span>
                  </div>

                  {/* Bottom Overlay Info on Media Frame */}
                  <div className="absolute bottom-3 left-3 right-3 pointer-events-none space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] font-mono tracking-widest uppercase text-white/90 font-bold bg-[#6E1A29]/90 px-2 py-0.5 rounded-full">
                        {activePanel.lookNumber}
                      </span>
                      <span className="text-[8px] font-mono tracking-widest text-white/80 uppercase">
                        {activePanel.silhouetteType}
                      </span>
                    </div>
                  </div>

                  {/* Hover Floating Action Prompt */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <span className="px-4 py-2 rounded-full backdrop-blur-xl bg-[#6E1A29]/95 text-white border border-white/30 text-[9px] font-sans-modern tracking-[0.2em] uppercase font-bold shadow-2xl flex items-center space-x-2">
                      <span>OPEN DESIGN STORY</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>

                {/* Card Meta & Color Swatches Footer */}
                <div className="pt-3.5 space-y-2 px-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-serif-luxury font-bold tracking-wide group-hover:text-[#6E1A29] dark:group-hover:text-[#D48B96] transition-colors">
                      {activePanel.project.title}
                    </h3>
                    <span className="text-[8px] font-mono tracking-widest uppercase opacity-70">
                      {activePanel.techniqueTag}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-current/10 text-[8px] font-sans-modern opacity-80">
                    <span className="font-semibold">{activePanel.fabricSpec}</span>

                    {/* Color Swatch Dots */}
                    <div className="flex items-center space-x-1">
                      {activePanel.project.colors.slice(0, 3).map((c, i) => (
                        <span 
                          key={i} 
                          className="w-2.5 h-2.5 rounded-full border border-black/20 shadow-2xs" 
                          style={{ backgroundColor: c.hex }} 
                          title={`${c.name} (${c.hex})`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

      {/* BOTTOM EDITORIAL GUIDANCE & TACTILE MINI FILMSTRIP */}
      <div className="relative z-20 pb-6 md:pb-8 px-6 md:px-12 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-4 pointer-events-auto border-t border-current/5 pt-4">
        <div className="flex items-center space-x-3 text-[9px] sm:text-[10px] tracking-[0.25em] uppercase opacity-65 font-semibold text-[#221B1C] dark:text-[#F3EBE6]">
          <span>6 CURATED MASTER SPECIMENS</span>
          <span className="w-1 h-1 rounded-full bg-current opacity-40" />
          <span>3 WESTERN & 3 ETHNIC</span>
        </div>

        {/* Tactile Mini Switcher Strip */}
        <div className="flex items-center gap-1.5 flex-wrap justify-center">
          {moodboardPanels.map((p) => {
            const isSelected = selectedLookId === p.id;
            const is3D = p.id === 'panel-w03';
            return (
              <button
                key={p.id}
                onClick={() => setSelectedLookId(p.id)}
                data-cursor="story"
                title={`${p.code}: ${p.project.title}`}
                className={`px-3 py-1 rounded-full text-[8px] sm:text-[9px] font-mono uppercase tracking-wider transition-all flex items-center space-x-1.5 border active:scale-95 ${
                  isSelected
                    ? 'bg-[#6E1A29] text-white border-[#6E1A29] shadow-md font-bold'
                    : isDarkTheme
                      ? 'bg-white/5 border-white/10 text-stone-300 hover:text-white hover:border-white/30'
                      : 'bg-white/80 border-[#D4C5B0] text-stone-700 hover:text-black hover:border-stone-400'
                }`}
              >
                <span>{p.code}</span>
                {is3D && (
                  <span className="px-1 py-0.2 rounded-xs bg-[#DFFF00] text-black text-[7px] font-bold tracking-tighter">
                    3D
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
