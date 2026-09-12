import React, { useState, useRef } from 'react';
import { EXHIBITION_PROJECTS, ExhibitionProject } from '../data/exhibitionData';
import { Eye, Layers, Palette, Compass, Film } from 'lucide-react';
import { getEffectiveImageUrl } from '../utils/imageStore';

interface WorkSectionProps {
  onSelectProject: (project: ExhibitionProject) => void;
  isDarkTheme: boolean;
}

export const WorkSection: React.FC<WorkSectionProps> = ({ onSelectProject, isDarkTheme }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'western' | 'ethnic'>('all');
  const videoRef = useRef<HTMLVideoElement>(null);

  // Filter projects by category
  const projects = EXHIBITION_PROJECTS.filter((proj) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'western') return proj.category === 'western';
    if (activeCategory === 'ethnic') return proj.category === 'ethnic';
    return true;
  });

  // Featured 3D Video Project (The Neo-Kinetic Chroma - Look 03)
  const featuredDigitalProject = EXHIBITION_PROJECTS.find(p => p.id === 'proj-w03') || EXHIBITION_PROJECTS[0];

  return (
    <section id="work" className="relative w-full py-24 sm:py-28 px-6 md:px-12 lg:px-20 border-b border-[#D4C5B0]/70 dark:border-white/[0.06]">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header & Subtitle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#D4C5B0]/70 dark:border-white/10 pb-8">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center space-x-3">
              <span className="w-8 h-[1px] bg-[#6E1A29] dark:bg-[#D48B96]" />
              <span className="text-[10px] font-sans-modern tracking-[0.35em] uppercase font-bold text-[#6E1A29] dark:text-[#D48B96]">
                02 • CURATED WORK ARCHIVE
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-bold tracking-tight text-[#5C1322] dark:text-[#FAF6F0]">
              COLLECTIONS & EDITORIAL ARCHIVE
            </h2>
            <p className="text-xs sm:text-sm font-sans-modern text-[#221B1C]/75 dark:text-[#F3EBE6]/75 leading-relaxed">
              Systematic curation of 3 Western architectural looks and 4 Ethnic heritage looks with ancestral craft upcycling.
            </p>
          </div>

          {/* Right Action Bar: Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-3">
            <div className={`flex items-center p-1 rounded-full border ${
              isDarkTheme ? 'border-white/15 bg-white/[0.03]' : 'border-[#D4C5B0] bg-[#EFE8DE]/80'
            }`}>
              {[
                { id: 'all', label: 'All Archive (7)' },
                { id: 'western', label: 'Western (3 Looks)' },
                { id: 'ethnic', label: 'Ethnic (4 Looks)' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id as any)}
                  data-cursor="link"
                  className={`px-3.5 py-1.5 rounded-full text-[10px] font-sans-modern tracking-[0.18em] uppercase transition-all duration-300 ${
                    activeCategory === tab.id
                      ? 'bg-[#6E1A29] text-[#FAF6F0] font-bold shadow-sm'
                      : isDarkTheme
                        ? 'text-stone-400 hover:text-white'
                        : 'text-[#221B1C]/70 hover:text-[#6E1A29]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Vertical Editorial Motion Presentation (hetvi123.mp4) */}
        {(activeCategory === 'all' || activeCategory === 'western') && (
          <div className={`relative w-full rounded-3xl p-6 sm:p-10 lg:p-14 border transition-all duration-500 overflow-hidden ${
            isDarkTheme
              ? 'bg-[#280D1A]/90 border-[#6E1A29]/40 shadow-2xl'
              : 'bg-[#FCFAF7] border-[#DCD0BF] shadow-sm'
          }`}>
            {/* Ambient subtle decorative glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#6E1A29]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Vertical Portrait Video (3:5 Aspect Ratio) */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-[320px] sm:max-w-[360px] md:max-w-[380px] lg:max-w-[400px]">
                  {/* Portrait 3:5 Aspect Ratio Container with refined frame */}
                  <div className="relative aspect-[3/5] w-full rounded-2xl overflow-hidden bg-black/80 border border-[#DCD0BF] dark:border-[#6E1A29]/40 shadow-xl transition-all duration-500 flex items-center justify-center">
                    <video
                      ref={videoRef}
                      src="/hetvi123.mp4"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      className="w-full h-full object-contain transition-transform duration-700 hover:scale-[1.02]"
                      aria-label="hetvi123.mp4 3D Garment Simulation Video"
                    >
                      <source src="/hetvi123.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>

                    {/* Subtle Top & Bottom Minimal Editorial Overlays */}
                    <div className="absolute top-3 left-3 right-3 flex justify-between items-center pointer-events-none">
                      <span className="px-2.5 py-1 rounded-full backdrop-blur-md bg-black/60 border border-white/20 text-[8px] font-mono tracking-widest uppercase font-bold text-white">
                        MP4 VIDEO SPECIMEN
                      </span>
                      <span className="px-2 py-0.5 rounded-full backdrop-blur-md bg-[#6E1A29]/90 text-[8px] font-sans-modern tracking-wider text-white">
                        3:5 PORTRAIT
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center pointer-events-none">
                      <span className="text-[9px] font-sans-modern tracking-widest text-white/80 uppercase font-light">
                        CLO3D MOTION ARCHIVE
                      </span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Live Video Loop" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Editorial Typography & Garment Context */}
              <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="w-5 h-[1px] bg-[#6E1A29] dark:bg-[#D48B96]" />
                    <span className="text-[10px] font-sans-modern tracking-[0.25em] uppercase font-bold text-[#6E1A29] dark:text-[#D48B96]">
                      DIGITAL MOTION SPECIMEN • LOOK 03
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif-luxury font-bold tracking-tight text-[#5C1322] dark:text-[#FAF6F0]">
                    THE NEO-KINETIC CHROMA
                  </h3>
                  <p className="text-xs sm:text-sm font-sans-modern text-[#6E1A29] dark:text-[#D48B96] tracking-wide font-medium">
                    3D CLO Digital Garment • Iridescent Track Trousers & Cropped Mock-Neck
                  </p>
                </div>

                <p className="text-xs sm:text-sm font-sans-modern opacity-80 leading-relaxed font-light text-[#221B1C] dark:text-[#F3EBE6]">
                  A cyber-couture digital simulation exploring the dynamic tension between athletic utility and prism-optic chromatic textiles. High-waisted jogger trousers with neon-lime and obsidian chevron racing bands are simulated with high-luster iridescent nylon taffeta physics, paired with a minimalist lavender compression cropped bodice.
                </p>

                {/* Editorial Metadata Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className={`p-3.5 rounded-xl border ${
                    isDarkTheme ? 'border-white/10 bg-white/[0.02]' : 'border-[#D4C5B0] bg-[#EFE8DE]/50'
                  }`}>
                    <span className="text-[9px] font-sans-modern uppercase tracking-wider opacity-60 block">Aspect Ratio</span>
                    <span className="text-xs font-mono font-semibold pt-0.5 block text-[#6E1A29] dark:text-[#D48B96]">3:5 Vertical</span>
                  </div>
                  <div className={`p-3.5 rounded-xl border ${
                    isDarkTheme ? 'border-white/10 bg-white/[0.02]' : 'border-[#D4C5B0] bg-[#EFE8DE]/50'
                  }`}>
                    <span className="text-[9px] font-sans-modern uppercase tracking-wider opacity-60 block">Material Base</span>
                    <span className="text-xs font-mono font-semibold pt-0.5 block">Iridescent Nylon 110 GSM</span>
                  </div>
                  <div className={`p-3.5 rounded-xl border ${
                    isDarkTheme ? 'border-white/10 bg-white/[0.02]' : 'border-[#D4C5B0] bg-[#EFE8DE]/50'
                  }`}>
                    <span className="text-[9px] font-sans-modern uppercase tracking-wider opacity-60 block">Pattern Physics</span>
                    <span className="text-xs font-mono font-semibold pt-0.5 block">3D Parametric CAD</span>
                  </div>
                </div>

                {/* Palette Swatches & CTA */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#D4C5B0]/70 dark:border-white/10">
                  <div className="flex items-center space-x-2">
                    <span className="text-[9px] uppercase font-bold opacity-60 tracking-wider">Chromatic Palette:</span>
                    <div className="flex items-center space-x-1.5">
                      {featuredDigitalProject.colors.map((c, i) => (
                        <span 
                          key={i} 
                          className="w-4 h-4 rounded-full border border-[#D4C5B0] shadow-2xs" 
                          style={{ backgroundColor: c.hex }} 
                          title={`${c.name} (${c.hex})`}
                        />
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectProject(featuredDigitalProject)}
                    data-cursor="link"
                    className="px-6 py-2.5 rounded-full bg-[#6E1A29] hover:bg-[#802031] text-[#FAF6F0] text-[10px] tracking-[0.2em] uppercase font-bold flex items-center space-x-2 shadow-sm transition-all active:scale-95"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Inspect Full Dossier</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Editorial Fashion Lookbook Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => {
            const heroUrl = getEffectiveImageUrl(`proj_${project.id}_hero`, project.heroImage);
            return (
              <div
                key={project.id}
                className={`group rounded-2xl overflow-hidden border transition-all duration-500 hover:shadow-2xl flex flex-col justify-between ${
                  isDarkTheme 
                    ? 'bg-[#280D1A]/90 border-[#6E1A29]/35 text-white hover:border-[#D48B96]/70' 
                    : 'bg-[#FCFAF7] border-[#DCD0BF] text-[#221B1C] hover:border-[#6E1A29]/60'
                }`}
              >
                {/* Large Editorial Image / Video with Custom View Cursor */}
                <div 
                  onClick={() => onSelectProject(project)}
                  data-cursor="view"
                  className="relative aspect-[3/4] w-full overflow-hidden bg-black/30 cursor-pointer flex items-center justify-center"
                >
                    <img 
                      src={heroUrl} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity pointer-events-none" />

                  {/* Top Floating Badge */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-white">
                    <div className="flex items-center space-x-1.5">
                      <span className="px-3 py-1 rounded-full backdrop-blur-md bg-black/50 border border-white/20 text-[9px] font-sans-modern tracking-widest uppercase font-bold">
                        {project.category}
                      </span>
                      {project.id === 'proj-w03' && (
                        <span className="px-2.5 py-1 rounded-full backdrop-blur-md bg-[#6E1A29]/90 border border-white/20 text-[8px] font-mono tracking-widest uppercase font-bold text-white">
                          3D CLO SIM
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-mono opacity-70">#0{idx + 1}</span>
                  </div>

                  {/* Bottom Image Caption */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-lg font-serif-luxury font-bold leading-tight text-[#FAF6F0]">
                      {project.title}
                    </h3>
                    <p className="text-xs opacity-75 font-sans-modern line-clamp-1 pt-0.5 font-light">
                      {project.subtitle}
                    </p>
                  </div>
                </div>

                {/* Card Content & Detailed Specifications */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <p className="text-xs font-sans-modern text-[#221B1C]/75 dark:text-[#F3EBE6]/75 leading-relaxed line-clamp-3">
                    {project.concept}
                  </p>

                  {/* Color Swatch Dots */}
                  <div className="flex items-center space-x-2 pt-1">
                    <span className="text-[9px] uppercase font-bold opacity-60 tracking-wider">Palette:</span>
                    <div className="flex items-center space-x-1.5">
                      {project.colors.map((c, i) => (
                        <span 
                          key={i} 
                          className="w-3.5 h-3.5 rounded-full border border-[#D4C5B0]" 
                          style={{ backgroundColor: c.hex }} 
                          title={c.name}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Action Bar */}
                  <div className="flex items-center space-x-2 pt-3 border-t border-[#D4C5B0]/50 dark:border-white/[0.08]">
                    <button
                      onClick={() => onSelectProject(project)}
                      data-cursor="link"
                      className="w-full py-2.5 rounded-full bg-[#6E1A29] hover:bg-[#802031] text-[#FAF6F0] text-[10px] tracking-[0.2em] uppercase font-bold flex items-center justify-center space-x-1.5 shadow-sm transition-all active:scale-95"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect Dossier</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
