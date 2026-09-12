import React, { useState } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Box, 
  Grid, 
  Sliders, 
  Maximize, 
  Minimize, 
  Sparkles, 
  Scissors, 
  RefreshCw, 
  Image as ImageIcon,
  Compass,
  Home
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import { SECTIONS_META } from '../data/garmentsData';

interface NavigationHeaderProps {
  currentPage: number;
  viewMode: 'slides' | 'atelier' | 'grid';
  onViewModeChange: (mode: 'slides' | 'atelier' | 'grid') => void;
  onNavigateToSlide: (pageNumber: number) => void;
  onOpenTextileLab: () => void;
  onOpenSustainable: () => void;
  onOpenImageManager: () => void;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  currentPage,
  viewMode,
  onViewModeChange,
  onNavigateToSlide,
  onOpenTextileLab,
  onOpenSustainable,
  onOpenImageManager
}) => {
  const [isMuted, setIsMuted] = useState(sounds.getMuted());
  const [isFullscreen, setIsFullscreen] = useState(false);

  const currentSection = SECTIONS_META.find(
    (s) => currentPage >= s.startPage && currentPage <= s.endPage
  ) || SECTIONS_META[0];

  const handleToggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    sounds.setMuted(nextMute);
    if (!nextMute) {
      sounds.playClick();
    }
  };

  const handleToggleFullscreen = () => {
    sounds.playClick();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-[#262223]/10 px-4 md:px-10 py-4 flex items-center justify-between transition-all duration-300">
      {/* Brand Identity / Home */}
      <div className="flex items-center space-x-3 md:space-x-6">
        <button
          onClick={() => {
            sounds.playClick();
            onNavigateToSlide(1);
            onViewModeChange('slides');
          }}
          className="group text-left focus:outline-none flex flex-col"
        >
          <span className="text-[10px] tracking-[0.3em] font-semibold uppercase opacity-60 text-[#262223]">
            Portfolio — 2026
          </span>
          <span className="text-xs md:text-sm tracking-[0.25em] font-light text-[#262223] group-hover:text-[#5A1F2B] transition-colors uppercase">
            HETVI KAPADIA
          </span>
        </button>

        {/* Section Indicator Badge */}
        <div className="hidden lg:flex items-center space-x-2 pl-4 border-l border-[#262223]/15">
          <div className="w-1.5 h-1.5 rounded-full bg-[#5A1F2B]" />
          <span className="text-[11px] font-sans-modern tracking-[0.15em] uppercase text-stone-500 font-medium truncate max-w-[240px]">
            {currentSection.number} • {currentSection.title}
          </span>
        </div>
      </div>

      {/* Center Nav / Feature Pills */}
      <div className="flex items-center space-x-2 md:space-x-3">
        {/* Navigation Direct Links */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 mr-2 text-[11px] uppercase tracking-[0.2em] font-medium">
          <button
            onClick={() => {
              sounds.playClick();
              onViewModeChange(viewMode === 'atelier' ? 'slides' : 'atelier');
            }}
            className={`transition-all py-1 px-2.5 rounded-full border ${
              viewMode === 'atelier'
                ? 'bg-[#5A1F2B] text-white border-[#5A1F2B]'
                : 'text-[#262223] border-transparent hover:border-[#262223]/20 opacity-60 hover:opacity-100'
            }`}
          >
            Atelier 3D
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              onViewModeChange(viewMode === 'grid' ? 'slides' : 'grid');
            }}
            className={`transition-all py-1 px-2.5 rounded-full border ${
              viewMode === 'grid'
                ? 'bg-[#5A1F2B] text-white border-[#5A1F2B]'
                : 'text-[#262223] border-transparent hover:border-[#262223]/20 opacity-60 hover:opacity-100'
            }`}
          >
            Index (42)
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              onOpenTextileLab();
            }}
            className="text-[#262223] opacity-60 hover:opacity-100 transition-opacity"
          >
            Textile Lab
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              onOpenSustainable();
            }}
            className="hidden xl:inline-block text-[#262223] opacity-60 hover:opacity-100 transition-opacity"
          >
            Circular System
          </button>
        </nav>

        {/* Image Manager modal */}
        <button
          onClick={() => {
            sounds.playClick();
            onOpenImageManager();
          }}
          className="w-9 h-9 md:w-10 md:h-10 border border-[#262223]/20 rounded-full flex items-center justify-center text-[#262223] hover:bg-[#5A1F2B] hover:text-white transition-all"
          title="Asset Replacement & Placeholder Manager"
        >
          <ImageIcon className="w-3.5 h-3.5" />
        </button>

        {/* Sound FX Toggle */}
        <button
          onClick={handleToggleMute}
          className={`w-9 h-9 md:w-10 md:h-10 rounded-full border flex items-center justify-center transition-all ${
            isMuted 
              ? 'border-[#262223]/15 text-stone-400 hover:text-stone-700 hover:border-[#262223]/30' 
              : 'border-[#5A1F2B]/40 text-[#5A1F2B] bg-[#5A1F2B]/5'
          }`}
          title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>

        {/* Fullscreen Toggle */}
        <button
          onClick={handleToggleFullscreen}
          className="hidden sm:flex w-9 h-9 md:w-10 md:h-10 border border-[#262223]/20 rounded-full items-center justify-center text-[#262223] hover:bg-[#5A1F2B] hover:text-white transition-all"
          title="Toggle Fullscreen"
        >
          {isFullscreen ? <Minimize className="w-3.5 h-3.5" /> : <Maximize className="w-3.5 h-3.5" />}
        </button>
      </div>
    </header>
  );
};
