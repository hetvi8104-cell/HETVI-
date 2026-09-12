import React, { useState } from 'react';
import { EXHIBITION_PROJECTS, ExhibitionProject } from '../data/exhibitionData';
import { TextileLabSection } from './TextileLabSection';
import { SustainableJourneySection } from './SustainableJourneySection';
import { Eye, Box, Scissors, RefreshCw, Sparkles } from 'lucide-react';
import { getEffectiveImageUrl } from '../utils/imageStore';

interface EthnicTextileSectionProps {
  onSelectProject: (project: ExhibitionProject) => void;
  onOpen3DGarment: (garmentDataId: string) => void;
  isDarkTheme: boolean;
}

export const EthnicTextileSection: React.FC<EthnicTextileSectionProps> = ({
  onSelectProject,
  onOpen3DGarment,
  isDarkTheme
}) => {
  const [subView, setSubView] = useState<'ethnic' | 'textile-lab' | 'sustainable'>('ethnic');

  const ethnicProjects = EXHIBITION_PROJECTS.filter(p => p.category === 'ethnic');

  return (
    <div className="relative w-full h-full overflow-y-auto select-none">
      {/* Sub-Navigation Switcher */}
      <div className="pt-20 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black/10 dark:border-white/10 pb-6">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center space-x-2">
              <span className="w-5 h-[1px] bg-[#9A6670]" />
              <span className="text-[10px] font-sans-modern tracking-[0.35em] uppercase font-bold text-[#9A6670]">
                Craft Revival & Material Research
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-luxury font-bold tracking-tight">
              ETHNIC WEAR & TEXTILE LAB
            </h2>
            <p className="text-xs sm:text-sm font-sans-modern opacity-70 leading-relaxed">
              Gujarati craft heritage, double-ikat Patan Patola, Bandhani cording, and tactile 3D material engineering.
            </p>
          </div>

          {/* Sub Navigation Segment Pills */}
          <div className="flex items-center space-x-1.5 p-1 rounded-full border border-black/10 dark:border-white/15 bg-black/[0.02] dark:bg-white/[0.03] self-start md:self-auto shrink-0">
            <button
              onClick={() => setSubView('ethnic')}
              className={`px-3.5 py-1.5 rounded-full text-[10px] font-sans-modern tracking-[0.18em] uppercase transition-all duration-300 ${
                subView === 'ethnic'
                  ? isDarkTheme
                    ? 'bg-white/20 text-white font-semibold shadow-sm'
                    : 'bg-[#5A1F2B] text-white font-semibold shadow-sm'
                  : isDarkTheme
                    ? 'text-stone-400 hover:text-white'
                    : 'text-stone-600 hover:text-black'
              }`}
            >
              Ethnic Couture ({ethnicProjects.length})
            </button>

            <button
              onClick={() => setSubView('textile-lab')}
              className={`px-3.5 py-1.5 rounded-full text-[10px] font-sans-modern tracking-[0.18em] uppercase transition-all duration-300 flex items-center space-x-1.5 ${
                subView === 'textile-lab'
                  ? isDarkTheme
                    ? 'bg-white/20 text-white font-semibold shadow-sm'
                    : 'bg-[#5A1F2B] text-white font-semibold shadow-sm'
                  : isDarkTheme
                    ? 'text-stone-400 hover:text-white'
                    : 'text-stone-600 hover:text-black'
              }`}
            >
              <Scissors className="w-3 h-3 text-[#9A6670]" />
              <span>3D Textile Lab</span>
            </button>

            <button
              onClick={() => setSubView('sustainable')}
              className={`px-3.5 py-1.5 rounded-full text-[10px] font-sans-modern tracking-[0.18em] uppercase transition-all duration-300 flex items-center space-x-1.5 ${
                subView === 'sustainable'
                  ? isDarkTheme
                    ? 'bg-white/20 text-white font-semibold shadow-sm'
                    : 'bg-[#5A1F2B] text-white font-semibold shadow-sm'
                  : isDarkTheme
                    ? 'text-stone-400 hover:text-white'
                    : 'text-stone-600 hover:text-black'
              }`}
            >
              <RefreshCw className="w-3 h-3 text-[#9A6670]" />
              <span>Scrap to System</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sub-view Content */}
      <div className="pb-16">
        {subView === 'ethnic' && (
          <div className="pt-8 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ethnicProjects.map((project) => {
                const heroUrl = getEffectiveImageUrl(`proj_${project.id}_hero`, project.heroImage);
                return (
                  <div
                    key={project.id}
                    className={`group rounded-2xl overflow-hidden border transition-all duration-500 hover:shadow-2xl flex flex-col justify-between ${
                      isDarkTheme 
                        ? 'bg-[#151317]/80 border-white/[0.08] text-white hover:border-white/20' 
                        : 'bg-[#FCFAF7] border-stone-200 text-[#262223] hover:border-stone-300'
                    }`}
                  >
                    {/* Image Container with Hover Zoom */}
                    <div 
                      onClick={() => onSelectProject(project)}
                      className="relative aspect-[3/4] w-full overflow-hidden bg-black/30 cursor-pointer"
                    >
                      <img 
                        src={heroUrl} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-75 transition-opacity" />

                      {/* Top Floating Badge */}
                      <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-white">
                        <span className="px-3 py-1 rounded-full backdrop-blur-md bg-black/40 border border-white/20 text-[9px] font-sans-modern tracking-widest uppercase font-bold">
                          Gujarati Revival
                        </span>
                        <span className="text-[10px] font-mono opacity-80">{project.year}</span>
                      </div>

                      {/* Bottom Image Caption */}
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h3 className="text-lg font-serif-luxury font-bold leading-tight">
                          {project.title}
                        </h3>
                        <p className="text-xs opacity-75 font-sans-modern line-clamp-1 pt-0.5">
                          {project.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Card Content & Action Bar */}
                    <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                      <p className="text-xs font-sans-modern opacity-75 leading-relaxed line-clamp-3">
                        {project.concept}
                      </p>

                      {/* Color Swatch Dots */}
                      <div className="flex items-center space-x-2 pt-1">
                        <span className="text-[9px] uppercase font-bold opacity-50 tracking-wider">Palette:</span>
                        <div className="flex items-center space-x-1.5">
                          {project.colors.map((c, i) => (
                            <span 
                              key={i} 
                              className="w-3.5 h-3.5 rounded-full border border-black/10 dark:border-white/20" 
                              style={{ backgroundColor: c.hex }} 
                              title={c.name}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Buttons */}
                      <div className="flex items-center space-x-2 pt-3 border-t border-black/5 dark:border-white/[0.08]">
                        <button
                          onClick={() => onSelectProject(project)}
                          className="flex-1 py-2.5 rounded-full bg-[#5A1F2B] hover:bg-[#722F37] text-white text-[10px] tracking-[0.2em] uppercase font-semibold flex items-center justify-center space-x-1.5 shadow-sm transition-all"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Inspect Project</span>
                        </button>

                        {project.garmentDataId && (
                          <button
                            onClick={() => onOpen3DGarment(project.garmentDataId!)}
                            className="p-2.5 rounded-full border border-black/10 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/10 text-current transition-colors"
                            title="View in 3D Atelier"
                          >
                            <Box className="w-3.5 h-3.5 text-[#9A6670]" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {subView === 'textile-lab' && (
          <div className="pt-2">
            <TextileLabSection isDarkTheme={isDarkTheme} />
          </div>
        )}

        {subView === 'sustainable' && (
          <div className="pt-2">
            <SustainableJourneySection isDarkTheme={isDarkTheme} />
          </div>
        )}
      </div>
    </div>
  );
};
