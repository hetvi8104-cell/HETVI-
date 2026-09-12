import React, { useState, useEffect } from 'react';
import { EXHIBITION_PROJECTS, ExhibitionProject } from '../data/exhibitionData';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Palette, 
  Scissors, 
  Layers, 
  Sparkles, 
  BookOpen, 
  Image as ImageIcon, 
  Compass, 
  FileText, 
  Maximize2 
} from 'lucide-react';
import { getEffectiveImageUrl } from '../utils/imageStore';

interface ProjectDeepDiveModalProps {
  project: ExhibitionProject | null;
  isOpen: boolean;
  onClose: () => void;
  isDarkTheme: boolean;
  onSelectProject?: (proj: ExhibitionProject) => void;
}

type DesignStorySection = 
  | 'all'
  | 'final_look'
  | 'research_theme'
  | 'moodboard'
  | 'palette'
  | 'materials'
  | 'silhouette'
  | 'sketches'
  | 'development'
  | 'technical';

export const ProjectDeepDiveModal: React.FC<ProjectDeepDiveModalProps> = ({
  project: initialProject,
  isOpen,
  onClose,
  isDarkTheme,
  onSelectProject
}) => {
  const [currentProject, setCurrentProject] = useState<ExhibitionProject | null>(initialProject);
  const [activeSection, setActiveSection] = useState<DesignStorySection>('final_look');
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);

  useEffect(() => {
    if (initialProject) {
      setCurrentProject(initialProject);
    }
  }, [initialProject]);

  useEffect(() => {
    if (isOpen) {
      setActiveSection('final_look');
      setActivePhotoIndex(0);
    }
  }, [isOpen]);

  if (!isOpen || !currentProject) return null;

  const project = currentProject;
  const projectList = EXHIBITION_PROJECTS;
  const currentIndex = projectList.findIndex((p) => p.id === project.id);

  const handlePrevProject = () => {
    const prevIdx = currentIndex > 0 ? currentIndex - 1 : projectList.length - 1;
    const nextProj = projectList[prevIdx];
    setCurrentProject(nextProj);
    if (onSelectProject) onSelectProject(nextProj);
    setActivePhotoIndex(0);
  };

  const handleNextProject = () => {
    const nextIdx = currentIndex < projectList.length - 1 ? currentIndex + 1 : 0;
    const nextProj = projectList[nextIdx];
    setCurrentProject(nextProj);
    if (onSelectProject) onSelectProject(nextProj);
    setActivePhotoIndex(0);
  };

  const currentPhoto = project.galleryImages[activePhotoIndex] || project.heroImage;
  const effectiveCurrentPhoto = getEffectiveImageUrl(`proj_${project.id}_photo_${activePhotoIndex}`, currentPhoto);

  const storySections: { id: DesignStorySection; label: string; icon: any }[] = [
    { id: 'final_look', label: 'Final Look', icon: Sparkles },
    { id: 'research_theme', label: 'Research & Theme', icon: BookOpen },
    { id: 'moodboard', label: 'Mood Board', icon: ImageIcon },
    { id: 'palette', label: 'Colour Palette', icon: Palette },
    { id: 'materials', label: 'Materials & Textiles', icon: Scissors },
    { id: 'silhouette', label: 'Silhouette & Form', icon: Compass },
    { id: 'sketches', label: 'Sketches & Ideation', icon: Layers },
    { id: 'development', label: 'Development', icon: FileText },
    { id: 'technical', label: 'Technical Details', icon: Maximize2 },
    { id: 'all', label: 'Complete Dossier', icon: Sparkles }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-2 sm:p-4 md:p-8 animate-fade-in select-none">
      {/* Cinematic Dark Ambient Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-2xl transition-opacity"
      />

      {/* Main Luxury Editorial Dossier */}
      <div className={`relative z-10 w-full max-w-6xl max-h-[92vh] overflow-y-auto rounded-3xl border shadow-2xl transition-all flex flex-col ${
        isDarkTheme 
          ? 'bg-[#220814] border-[#6E1A29]/50 text-[#FAF4EF]' 
          : 'bg-[#F5F0EB] border-[#D4C5B0] text-[#221B1C]'
      }`}>
        
        {/* Top Editorial Ribbon: Specimen Header & Navigation */}
        <div className={`sticky top-0 z-30 px-6 sm:px-10 py-4 border-b backdrop-blur-2xl flex items-center justify-between transition-colors ${
          isDarkTheme ? 'bg-[#220814]/95 border-[#6E1A29]/30' : 'bg-[#F5F0EB]/95 border-[#D4C5B0]'
        }`}>
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6E1A29]" />
              <span className="text-[9px] font-mono tracking-[0.35em] uppercase font-bold text-[#6E1A29] dark:text-[#D48B96]">
                {project.category.toUpperCase()} SPECIMEN // {project.year}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-serif-luxury font-bold tracking-tight text-[#5C1322] dark:text-[#FAF6F0]">
              {project.title}
            </h2>
            <p className="text-xs font-sans-modern opacity-75 tracking-wider">
              {project.subtitle}
            </p>
          </div>

          <div className="flex items-center space-x-3">
            {/* Quick Cycle Prev / Next Look */}
            <div className="hidden sm:flex items-center space-x-1 border border-current/15 rounded-full p-1">
              <button
                onClick={handlePrevProject}
                title="Previous Garment"
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-current/10 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-[9px] font-mono tracking-widest px-2">
                {currentIndex + 1} / {projectList.length}
              </span>
              <button
                onClick={handleNextProject}
                title="Next Garment"
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-current/10 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              data-cursor="link"
              className="w-10 h-10 rounded-full border border-current/20 flex items-center justify-center hover:bg-current/10 transition-colors text-current"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 10-Point Design Story Navigation Bar */}
        <div className={`px-6 sm:px-10 py-3 border-b flex items-center space-x-2 overflow-x-auto text-[10px] font-sans-modern tracking-[0.2em] uppercase font-semibold scrollbar-none sticky top-[77px] z-20 backdrop-blur-xl ${
          isDarkTheme ? 'bg-[#181114]/95 border-[#6E1A29]/20' : 'bg-[#EFE8DE]/95 border-[#D4C5B0]'
        }`}>
          {storySections.map((sec) => {
            const Icon = sec.icon;
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`px-3.5 py-1.5 rounded-full flex items-center space-x-1.5 shrink-0 transition-all ${
                  isActive
                    ? 'bg-[#6E1A29] text-[#FAF6F0] shadow-sm font-bold'
                    : 'opacity-70 hover:opacity-100 hover:bg-current/5'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{sec.label}</span>
              </button>
            );
          })}
        </div>

        {/* Story Section Contents */}
        <div className="p-6 sm:p-10 flex-1 overflow-y-auto space-y-12">

          {/* 1. FINAL LOOK & CAMPAIGN */}
          {(activeSection === 'final_look' || activeSection === 'all') && (
            <section className="space-y-6">
              <div className="flex items-center justify-between border-b border-current/10 pb-3">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-[#6E1A29] dark:text-[#D48B96]" />
                  <h3 className="text-xs font-mono tracking-[0.3em] uppercase font-bold text-[#6E1A29] dark:text-[#D48B96]">
                    01 // FINAL LOOK & EDITORIAL CAMPAIGN
                  </h3>
                </div>
                <span className="text-[10px] font-sans-modern opacity-60">
                  {project.videoUrl ? '3D Motion Specimen Included' : 'Runway & Campaign Archival Photography'}
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Main Featured Photo or MP4 Video */}
                <div className="lg:col-span-8 flex flex-col space-y-4">
                  <div className="relative aspect-[3/4] max-h-[640px] w-full rounded-2xl overflow-hidden shadow-2xl border border-current/10 bg-black/60 group flex items-center justify-center">
                    {project.videoUrl && activePhotoIndex === 0 ? (
                      <video
                        src={project.videoUrl}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        className="w-full h-full object-contain"
                        aria-label="3D Video Specimen"
                      >
                        <source src={project.videoUrl} type="video/mp4" />
                      </video>
                    ) : (
                      <img 
                        src={effectiveCurrentPhoto} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-50 pointer-events-none" />

                    {/* Navigation Arrows */}
                    <button
                      onClick={() => setActivePhotoIndex((prev) => (prev > 0 ? prev - 1 : project.galleryImages.length - 1))}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setActivePhotoIndex((prev) => (prev < project.galleryImages.length - 1 ? prev + 1 : 0))}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Thumbnail Selector */}
                  <div className="flex items-center space-x-3 overflow-x-auto pb-2">
                    {project.galleryImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActivePhotoIndex(idx)}
                        className={`relative w-20 h-24 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                          activePhotoIndex === idx 
                            ? 'border-[#6E1A29] dark:border-[#D48B96] scale-105 shadow-md' 
                            : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Editorial Summary Box */}
                <div className="lg:col-span-4 space-y-6">
                  <div className={`p-6 rounded-2xl border ${
                    isDarkTheme ? 'bg-[#1C1417] border-[#6E1A29]/30' : 'bg-[#FCFAF7] border-[#DCD0BF]'
                  } space-y-3`}>
                    <span className="text-[9px] font-mono tracking-[0.25em] uppercase font-bold text-[#6E1A29] dark:text-[#D48B96] block">
                      CREATIVE THESIS
                    </span>
                    <p className="text-sm font-serif-luxury italic leading-relaxed text-[#5C1322] dark:text-[#FAF6F0]">
                      "{project.tagline}"
                    </p>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] font-sans-modern tracking-[0.25em] uppercase font-bold text-[#6E1A29] dark:text-[#D48B96] block">
                      Silhouette Overview
                    </span>
                    <p className="text-xs sm:text-sm font-sans-modern leading-relaxed opacity-85">
                      {project.silhouette}
                    </p>
                  </div>

                  <div className="space-y-2 border-t border-current/10 pt-4">
                    <span className="text-[10px] font-sans-modern tracking-[0.25em] uppercase font-bold text-[#6E1A29] dark:text-[#D48B96] block">
                      Artisanal Techniques
                    </span>
                    <ul className="space-y-1.5">
                      {project.textileTechniques.map((tech, i) => (
                        <li key={i} className="flex items-start space-x-2 text-xs font-sans-modern opacity-80">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#6E1A29] dark:bg-[#D48B96] mt-1.5 shrink-0" />
                          <span>{tech}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* 2. RESEARCH & THEME */}
          {(activeSection === 'research_theme' || activeSection === 'all') && (
            <section className="space-y-6 pt-4">
              <div className="flex items-center space-x-2 border-b border-current/10 pb-3">
                <BookOpen className="w-4 h-4 text-[#6E1A29] dark:text-[#D48B96]" />
                <h3 className="text-xs font-mono tracking-[0.3em] uppercase font-bold text-[#6E1A29] dark:text-[#D48B96]">
                  02 // RESEARCH & CONCEPTUAL THEME
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <span className="text-[10px] font-sans-modern tracking-[0.25em] uppercase font-bold opacity-60 block">
                      ARCHITECTURAL DISCOURSE
                    </span>
                    <h4 className="text-base sm:text-lg font-serif-luxury font-bold text-[#5C1322] dark:text-[#FAF6F0]">
                      {project.title}: A Structural Study
                    </h4>
                    <p className="text-xs sm:text-sm font-sans-modern leading-relaxed opacity-85">
                      {project.concept}
                    </p>
                  </div>
                </div>

                <div className={`space-y-4 p-6 rounded-2xl border ${
                  isDarkTheme ? 'bg-[#1C1417] border-[#6E1A29]/30' : 'bg-[#FCFAF7] border-[#DCD0BF]'
                }`}>
                  <span className="text-[10px] font-sans-modern tracking-[0.25em] uppercase font-bold text-[#6E1A29] dark:text-[#D48B96] block">
                    ANCESTRAL & HISTORICAL INSPIRATION
                  </span>
                  <p className="text-xs sm:text-sm font-sans-modern leading-relaxed opacity-85">
                    {project.inspiration}
                  </p>
                  <div className="pt-2 border-t border-current/10 flex items-center space-x-2 text-[10px] font-mono opacity-60">
                    <span>ARCHIVAL SOURCE:</span>
                    <span className="font-semibold">GUJARAT CRAFT HERITAGE & MODERNIST FORMS</span>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* 3. MOOD BOARD */}
          {(activeSection === 'moodboard' || activeSection === 'all') && (
            <section className="space-y-6 pt-4">
              <div className="flex items-center space-x-2 border-b border-current/10 pb-3">
                <ImageIcon className="w-4 h-4 text-[#6E1A29] dark:text-[#D48B96]" />
                <h3 className="text-xs font-mono tracking-[0.3em] uppercase font-bold text-[#6E1A29] dark:text-[#D48B96]">
                  03 // MOOD BOARD & AESTHETIC VISUALS
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-7 aspect-[4/3] rounded-2xl overflow-hidden border border-[#DCD0BF] dark:border-white/10 shadow-xl bg-black/40">
                  <img 
                    src={project.moodboard.image} 
                    alt={project.moodboard.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="md:col-span-5 space-y-5">
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono tracking-[0.25em] uppercase font-bold text-[#6E1A29] dark:text-[#D48B96] block">
                      CURATED MOODBOARD DIRECTION
                    </span>
                    <h4 className="text-lg font-serif-luxury font-bold text-[#5C1322] dark:text-[#FAF6F0]">
                      {project.moodboard.title}
                    </h4>
                    <p className="text-xs font-sans-modern opacity-80 leading-relaxed">
                      {project.moodboard.description}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] font-sans-modern tracking-[0.2em] uppercase font-bold opacity-60 block">
                      Sensory & Texture Keywords
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {project.moodboard.keywords.map((kw, i) => (
                        <span 
                          key={i}
                          className={`px-3 py-1 rounded-full border text-[10px] font-sans-modern tracking-wider uppercase font-semibold ${
                            isDarkTheme ? 'bg-white/5 border-white/10' : 'bg-[#EFE8DE] border-[#D4C5B0]'
                          }`}
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* 4. COLOUR PALETTE */}
          {(activeSection === 'palette' || activeSection === 'all') && (
            <section className="space-y-6 pt-4">
              <div className="flex items-center space-x-2 border-b border-current/10 pb-3">
                <Palette className="w-4 h-4 text-[#6E1A29] dark:text-[#D48B96]" />
                <h3 className="text-xs font-mono tracking-[0.3em] uppercase font-bold text-[#6E1A29] dark:text-[#D48B96]">
                  04 // COLOUR PALETTE & CHROMATIC HARMONY
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {project.colors.map((c, i) => (
                  <div key={i} className={`p-4 rounded-2xl border ${
                    isDarkTheme ? 'bg-[#1C1417] border-[#6E1A29]/30' : 'bg-[#FCFAF7] border-[#DCD0BF]'
                  } space-y-3 shadow-sm`}>
                    <div className="w-full h-16 rounded-xl border border-black/20 shadow-inner" style={{ backgroundColor: c.hex }} />
                    <div>
                      <div className="flex justify-between items-baseline">
                        <h4 className="text-xs font-serif-luxury font-bold text-[#221B1C] dark:text-[#FAF6F0]">{c.name}</h4>
                        <span className="text-[10px] font-mono opacity-60">{c.proportion}%</span>
                      </div>
                      <span className="text-[10px] font-mono opacity-50 block">{c.hex} • {c.rgb}</span>
                      <p className="text-[11px] font-sans-modern opacity-75 pt-1.5 leading-snug">
                        {c.usage}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 5. MATERIALS & TEXTILES */}
          {(activeSection === 'materials' || activeSection === 'all') && (
            <section className="space-y-6 pt-4">
              <div className="flex items-center space-x-2 border-b border-current/10 pb-3">
                <Scissors className="w-4 h-4 text-[#6E1A29] dark:text-[#D48B96]" />
                <h3 className="text-xs font-mono tracking-[0.3em] uppercase font-bold text-[#6E1A29] dark:text-[#D48B96]">
                  05 // MATERIALS, TEXTILE LIBRARY & GSM WEIGHTS
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {project.materials.map((m, i) => (
                  <div key={i} className={`p-5 rounded-2xl border ${
                    isDarkTheme ? 'bg-[#1C1417] border-[#6E1A29]/30' : 'bg-[#FCFAF7] border-[#DCD0BF]'
                  } space-y-3`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="w-4 h-4 rounded-full border border-black/20 shadow-xs" style={{ backgroundColor: m.hex }} />
                        <h4 className="text-xs font-serif-luxury font-bold text-[#221B1C] dark:text-[#FAF6F0]">{m.name}</h4>
                      </div>
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#6E1A29]/10 text-[#6E1A29] dark:text-[#D48B96] font-mono font-bold">
                        {m.weight}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-[11px] font-sans-modern opacity-80 pt-1">
                      <p><span className="opacity-50">Composition:</span> {m.composition}</p>
                      <p><span className="opacity-50">Hand / Texture:</span> {m.texture}</p>
                      <p><span className="opacity-50">Drape Behavior:</span> {m.drape}</p>
                      <p><span className="opacity-50">Color Hand:</span> {m.color}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 6. SILHOUETTE & FORM */}
          {(activeSection === 'silhouette' || activeSection === 'all') && (
            <section className="space-y-6 pt-4">
              <div className="flex items-center space-x-2 border-b border-current/10 pb-3">
                <Compass className="w-4 h-4 text-[#6E1A29] dark:text-[#D48B96]" />
                <h3 className="text-xs font-mono tracking-[0.3em] uppercase font-bold text-[#6E1A29] dark:text-[#D48B96]">
                  06 // SILHOUETTE ARCHITECTURE & ANATOMY
                </h3>
              </div>

              <div className={`p-6 rounded-2xl border ${
                isDarkTheme ? 'bg-[#1C1417] border-[#6E1A29]/30' : 'bg-[#FCFAF7] border-[#DCD0BF]'
              } space-y-4`}>
                <span className="text-[10px] font-mono tracking-[0.25em] uppercase font-bold text-[#6E1A29] dark:text-[#D48B96] block">
                  VOLUMETRIC & GRAVITY MAPPING
                </span>
                <p className="text-sm md:text-base font-sans-modern leading-relaxed opacity-90 max-w-3xl">
                  {project.silhouette}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-current/10 text-xs font-sans-modern">
                  <div>
                    <span className="opacity-50 block text-[10px] uppercase font-mono">Category</span>
                    <span className="font-bold uppercase tracking-wider">{project.category} Couture</span>
                  </div>
                  <div>
                    <span className="opacity-50 block text-[10px] uppercase font-mono">Construction Type</span>
                    <span className="font-bold">Architectural Precision</span>
                  </div>
                  <div>
                    <span className="opacity-50 block text-[10px] uppercase font-mono">Collection Capsule</span>
                    <span className="font-bold">{project.year} Indus Showcase</span>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* 7. SKETCHES & IDEATION */}
          {(activeSection === 'sketches' || activeSection === 'all') && (
            <section className="space-y-6 pt-4">
              <div className="flex items-center space-x-2 border-b border-current/10 pb-3">
                <Layers className="w-4 h-4 text-[#6E1A29] dark:text-[#D48B96]" />
                <h3 className="text-xs font-mono tracking-[0.3em] uppercase font-bold text-[#6E1A29] dark:text-[#D48B96]">
                  07 // SKETCHES & LINE DRAWINGS
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {project.sketches.map((sk, idx) => (
                  <div key={idx} className="aspect-[3/4] rounded-2xl overflow-hidden border border-[#DCD0BF] dark:border-white/10 shadow-md bg-black/40 group">
                    <img 
                      src={sk} 
                      alt="Design Sketch" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 8. DEVELOPMENT & PROTOTYPING */}
          {(activeSection === 'development' || activeSection === 'all') && (
            <section className="space-y-6 pt-4">
              <div className="flex items-center space-x-2 border-b border-current/10 pb-3">
                <FileText className="w-4 h-4 text-[#6E1A29] dark:text-[#D48B96]" />
                <h3 className="text-xs font-mono tracking-[0.3em] uppercase font-bold text-[#6E1A29] dark:text-[#D48B96]">
                  08 // ATELIER DEVELOPMENT & TOILING LOG
                </h3>
              </div>

              <div className={`p-6 rounded-2xl border ${
                isDarkTheme ? 'bg-[#1C1417] border-[#6E1A29]/30' : 'bg-[#FCFAF7] border-[#DCD0BF]'
              } space-y-3`}>
                <span className="text-[10px] font-mono tracking-[0.25em] uppercase font-bold text-[#6E1A29] dark:text-[#D48B96] block">
                  ITERATIVE SAMPLE TESTING
                </span>
                <ul className="space-y-2">
                  {project.developmentNotes.map((note, i) => (
                    <li key={i} className="flex items-start space-x-3 text-xs sm:text-sm font-sans-modern opacity-85">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#6E1A29] dark:bg-[#D48B96] mt-2 shrink-0" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* 9. TECHNICAL DETAILS & FLATS */}
          {(activeSection === 'technical' || activeSection === 'all') && (
            <section className="space-y-6 pt-4">
              <div className="flex items-center space-x-2 border-b border-current/10 pb-3">
                <Maximize2 className="w-4 h-4 text-[#6E1A29] dark:text-[#D48B96]" />
                <h3 className="text-xs font-mono tracking-[0.3em] uppercase font-bold text-[#6E1A29] dark:text-[#D48B96]">
                  09 // TECHNICAL DETAILS & FLAT SPECIFICATIONS (1:1)
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="space-y-3">
                  <span className="text-[10px] font-sans-modern tracking-[0.25em] uppercase font-bold opacity-60 block">
                    TECHNICAL FLAT FRONT
                  </span>
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-[#DCD0BF] bg-white shadow-md p-4">
                    <img 
                      src={project.techFlats.front} 
                      alt="Technical Flat Front" 
                      className="w-full h-full object-contain filter contrast-125"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <span className="text-[10px] font-sans-modern tracking-[0.25em] uppercase font-bold opacity-60 block">
                      TECHNICAL FLAT BACK
                    </span>
                    <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-[#DCD0BF] bg-white shadow-md p-4 max-h-[300px]">
                      <img 
                        src={project.techFlats.back} 
                        alt="Technical Flat Back" 
                        className="w-full h-full object-contain filter contrast-125"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 border-t border-current/10 pt-4">
                    <span className="text-[10px] font-sans-modern tracking-[0.25em] uppercase font-bold text-[#6E1A29] dark:text-[#D48B96] block">
                      CONSTRUCTION ANNOTATIONS
                    </span>
                    <ul className="space-y-2">
                      {project.techFlats.annotations.map((ann, i) => (
                        <li key={i} className="flex items-start space-x-2 text-xs font-sans-modern opacity-80">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#6E1A29] mt-1.5 shrink-0" />
                          <span>{ann}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          )}

        </div>
      </div>
    </div>
  );
};
