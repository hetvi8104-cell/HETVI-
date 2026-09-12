import React, { useState } from 'react';
import { ThreeExhibitionScene } from './ThreeExhibitionScene';
import { RevolvingGarments3D } from './RevolvingGarments3D';
import { ExhibitionProject } from '../data/exhibitionData';
import { Sparkles, Box, RotateCw } from 'lucide-react';

interface ThreeRealmSectionProps {
  onSelectProject: (project: ExhibitionProject) => void;
  isDarkTheme: boolean;
}

export const ThreeRealmSection: React.FC<ThreeRealmSectionProps> = ({
  onSelectProject,
  isDarkTheme
}) => {
  const [subView, setSubView] = useState<'exhibition' | 'garments'>('exhibition');
  const [selectedGarmentId, setSelectedGarmentId] = useState<string | undefined>(undefined);

  const handleOpen3DGarment = (garmentId?: string) => {
    setSelectedGarmentId(garmentId);
    setSubView('garments');
  };

  return (
    <div className="relative w-full h-full overflow-hidden select-none">
      {/* Refined Minimalist Top Sub-Switcher */}
      <div className="absolute top-20 left-0 right-0 z-30 flex justify-center pointer-events-none">
        <div className="pointer-events-auto p-1 rounded-full border border-black/10 dark:border-white/15 backdrop-blur-xl bg-white/70 dark:bg-black/60 shadow-xl flex items-center space-x-1">
          <button
            onClick={() => setSubView('exhibition')}
            className={`px-4 py-1.5 rounded-full text-[10px] md:text-[11px] font-sans-modern tracking-[0.18em] uppercase transition-all duration-300 flex items-center space-x-2 ${
              subView === 'exhibition'
                ? isDarkTheme 
                  ? 'bg-white/20 text-white font-semibold shadow-sm' 
                  : 'bg-[#5A1F2B] text-white font-semibold shadow-sm'
                : isDarkTheme
                  ? 'text-white/60 hover:text-white hover:bg-white/5'
                  : 'text-stone-600 hover:text-[#262223] hover:bg-stone-200/50'
            }`}
          >
            <RotateCw className="w-3 h-3 text-[#9A6670]" />
            <span>Exhibition 3D Orbit</span>
          </button>

          <button
            onClick={() => setSubView('garments')}
            className={`px-4 py-1.5 rounded-full text-[10px] md:text-[11px] font-sans-modern tracking-[0.18em] uppercase transition-all duration-300 flex items-center space-x-2 ${
              subView === 'garments'
                ? isDarkTheme 
                  ? 'bg-white/20 text-white font-semibold shadow-sm' 
                  : 'bg-[#5A1F2B] text-white font-semibold shadow-sm'
                : isDarkTheme
                  ? 'text-white/60 hover:text-white hover:bg-white/5'
                  : 'text-stone-600 hover:text-[#262223] hover:bg-stone-200/50'
            }`}
          >
            <Box className="w-3 h-3 text-[#9A6670]" />
            <span>3D Garments Showcase (6 Looks)</span>
          </button>
        </div>
      </div>

      {/* Main 3D Viewport Content */}
      {subView === 'exhibition' ? (
        <ThreeExhibitionScene
          onSelectProject={onSelectProject}
          onSelectRealm={(realm) => {
            if (realm === 'garments-3d') {
              setSubView('garments');
            }
          }}
          isDarkTheme={isDarkTheme}
        />
      ) : (
        <RevolvingGarments3D
          onOpenProjectDeepDive={onSelectProject}
          isDarkTheme={isDarkTheme}
          onClose={() => setSubView('exhibition')}
        />
      )}
    </div>
  );
};
