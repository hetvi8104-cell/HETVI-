import React from 'react';
import { EXHIBITION_PROJECTS, ExhibitionProject } from '../data/exhibitionData';
import { sounds } from '../utils/soundEffects';
import { ArrowRight, Box, Sparkles, Layers, Eye } from 'lucide-react';
import { getEffectiveImageUrl } from '../utils/imageStore';

interface CuratedGallerySectionProps {
  category: 'western' | 'ethnic' | 'avant-garde';
  onSelectProject: (project: ExhibitionProject) => void;
  onOpen3DGarment?: (garmentDataId: string) => void;
  isDarkTheme: boolean;
}

export const CuratedGallerySection: React.FC<CuratedGallerySectionProps> = ({
  category,
  onSelectProject,
  onOpen3DGarment,
  isDarkTheme
}) => {
  const projects = EXHIBITION_PROJECTS.filter(p => p.category === category);

  const categoryTitles = {
    western: {
      title: 'WESTERN WEAR COLLECTION',
      subtitle: 'Architectural Tailoring, Brutalist Deconstruction & Kinetic Motion',
      tagline: 'Precision-tailored trench exoskeletons, bias-draped column monoliths, and origami accordion pleating.'
    },
    ethnic: {
      title: 'CONTEMPORARY ETHNIC COLLECTION',
      subtitle: 'Gujarati Craft Revival: Bandhani, Patan Patola & Mughal Royal Court Silhouettes',
      tagline: '32-kali parabolic kalidars, upcycled double-ikat concept sarees, and hand-embroidered velvet Angrakhas.'
    },
    'avant-garde': {
      title: 'AVANT-GARDE & SCULPTURAL EXPLORATIONS',
      subtitle: 'Biomimetic Carapaces, Memory Wire Armatures & Suspended Fluid Tensors',
      tagline: 'Pushing spatial bodily boundaries with molded felt plates, kinetic titanium skeletons, and anti-gravity silk.'
    }
  };

  const info = categoryTitles[category];

  return (
    <div className="relative w-full h-full pt-20 pb-16 px-6 md:px-12 overflow-y-auto select-none">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <span className="w-6 h-[1px] bg-[#9A6670]" />
            <span className="text-[10px] font-sans-modern tracking-[0.35em] uppercase font-bold text-[#9A6670]">
              Hetvi Kapadia Capsule Archive • 2026
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-luxury font-bold tracking-tight">
            {info.title}
          </h2>
          <p className="text-xs sm:text-sm font-sans-modern opacity-75 max-w-2xl leading-relaxed">
            {info.subtitle} — {info.tagline}
          </p>
        </div>

        {/* Large Editorial Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => {
            const heroUrl = getEffectiveImageUrl(`proj_${project.id}_hero`, project.heroImage);
            return (
              <div
                key={project.id}
                className={`group rounded-3xl overflow-hidden border transition-all duration-500 hover:shadow-2xl flex flex-col justify-between ${
                  isDarkTheme 
                    ? 'bg-[#280D1A]/90 border-[#6E1A29]/35 text-white hover:border-[#D48B96]/70' 
                    : 'bg-[#fcfaf7] border-[#262223]/15 text-[#262223] hover:border-[#262223]/30'
                }`}
              >
                {/* Image Container with Hover Zoom */}
                <div 
                  onClick={() => {
                    sounds.play3DInteract();
                    onSelectProject(project);
                  }}
                  className="relative aspect-[3/4] w-full overflow-hidden bg-black/40 cursor-pointer"
                >
                  <img 
                    src={heroUrl} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                  {/* Top Floating Badge */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-white">
                    <span className="px-3 py-1 rounded-full backdrop-blur-md bg-black/40 border border-white/20 text-[9px] font-sans-modern tracking-widest uppercase font-bold">
                      {project.category}
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
                  <p className="text-xs font-sans-modern opacity-80 leading-relaxed line-clamp-3">
                    {project.concept}
                  </p>

                  {/* Color Swatch Dots */}
                  <div className="flex items-center space-x-2 pt-1">
                    <span className="text-[9px] uppercase font-bold opacity-60 tracking-wider">Palette:</span>
                    <div className="flex items-center space-x-1.5">
                      {project.colors.map((c, i) => (
                        <span 
                          key={i} 
                          className="w-3.5 h-3.5 rounded-full border border-black/20" 
                          style={{ backgroundColor: c.hex }} 
                          title={c.name}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center space-x-2 pt-2 border-t border-white/10">
                    <button
                      onClick={() => {
                        sounds.play3DInteract();
                        onSelectProject(project);
                      }}
                      className="flex-1 py-2.5 rounded-full bg-[#5A1F2B] hover:bg-[#722F37] text-white text-[10px] tracking-[0.2em] uppercase font-semibold flex items-center justify-center space-x-1.5 shadow-md transition-all group"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect Project</span>
                    </button>

                    {project.garmentDataId && onOpen3DGarment && (
                      <button
                        onClick={() => {
                          sounds.playClick();
                          onOpen3DGarment(project.garmentDataId!);
                        }}
                        className="p-2.5 rounded-full border border-white/20 hover:bg-white/10 text-current transition-colors"
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
    </div>
  );
};
