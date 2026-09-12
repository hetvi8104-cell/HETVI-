import React from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Layers, 
  Compass, 
  Maximize2 
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import { SECTIONS_META } from '../data/garmentsData';

interface BottomSlideBarProps {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  onNavigateToSlide: (pageNumber: number) => void;
  onToggleDrawer?: () => void;
}

export const BottomSlideBar: React.FC<BottomSlideBarProps> = ({
  currentPage,
  totalPages,
  onPrev,
  onNext,
  onNavigateToSlide,
  onToggleDrawer
}) => {
  const progressPercent = ((currentPage) / totalPages) * 100;
  const formattedCurrent = currentPage < 10 ? `0${currentPage}` : `${currentPage}`;
  const formattedTotal = totalPages < 10 ? `0${totalPages}` : `${totalPages}`;

  const currentSection = SECTIONS_META.find(
    (s) => currentPage >= s.startPage && currentPage <= s.endPage
  ) || SECTIONS_META[0];

  return (
    <footer className="fixed bottom-0 inset-x-0 z-40 flex flex-col pointer-events-none select-none">
      {/* Main Glass Control Bar */}
      <div className="w-full glass-panel border-t border-[#262223]/10 px-6 md:px-12 py-3.5 md:py-4 flex flex-col gap-3 pointer-events-auto">
        <div className="flex justify-between items-end">
          {/* Left Large Serif Counter + Quick Jump Drawer */}
          <div className="flex items-baseline space-x-3 md:space-x-5">
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl md:text-4xl font-serif-luxury font-bold text-[#5A1F2B] leading-none">
                {formattedCurrent}
              </span>
              <span className="text-xs font-sans-modern tracking-widest text-[#262223] opacity-35 font-light">
                / {formattedTotal}
              </span>
            </div>

            <button
              onClick={() => {
                sounds.playClick();
                if (onToggleDrawer) onToggleDrawer();
              }}
              className="flex items-center space-x-1.5 px-3 py-1 rounded-full border border-[#262223]/15 hover:border-[#5A1F2B] hover:text-[#5A1F2B] text-[10px] tracking-[0.2em] uppercase font-semibold text-stone-600 transition-all"
              title="Open 42-Slide Drawer"
            >
              <Layers className="w-3 h-3 text-[#5A1F2B]" />
              <span className="hidden sm:inline">Chapter Index</span>
            </button>
          </div>

          {/* Center 8 Chapters Sequence Indicator */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8 text-[10px] tracking-[0.25em] uppercase opacity-50 font-semibold text-[#262223]">
            {SECTIONS_META.slice(0, 5).map((sec) => (
              <span
                key={sec.id}
                onClick={() => {
                  sounds.playSlideTransition();
                  onNavigateToSlide(sec.startPage);
                }}
                className={`cursor-pointer hover:opacity-100 hover:text-[#5A1F2B] transition-all ${
                  currentPage >= sec.startPage && currentPage <= sec.endPage
                    ? 'text-[#5A1F2B] opacity-100 font-bold border-b border-[#5A1F2B] pb-0.5'
                    : ''
                }`}
              >
                {sec.title.split(' ')[0]}
              </span>
            ))}
          </div>

          {/* Right Navigation Hairline Circular Arrows */}
          <div className="flex items-center space-x-2 md:space-x-3">
            {/* Previous Arrow */}
            <button
              disabled={currentPage <= 1}
              onClick={() => {
                sounds.playSlideTransition();
                onPrev();
              }}
              className="w-10 h-10 md:w-11 md:h-11 border border-[#262223]/20 flex items-center justify-center rounded-full text-[#262223] hover:bg-[#5A1F2B] hover:text-white hover:border-[#5A1F2B] disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#262223] transition-colors group"
              title="Previous Slide (Arrow Left)"
            >
              <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            </button>

            {/* Next Arrow */}
            <button
              disabled={currentPage >= totalPages}
              onClick={() => {
                sounds.playSlideTransition();
                onNext();
              }}
              className="w-10 h-10 md:w-11 md:h-11 border border-[#262223]/20 flex items-center justify-center rounded-full text-[#262223] hover:bg-[#5A1F2B] hover:text-white hover:border-[#5A1F2B] disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#262223] transition-colors group"
              title="Next Slide (Arrow Right)"
            >
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

        {/* Editorial Glowing Hairline Progress Bar */}
        <div className="w-full h-[1px] bg-[#262223]/10 relative overflow-visible">
          <div 
            className="absolute top-0 left-0 h-full bg-[#5A1F2B] shadow-[0_0_8px_rgba(90,31,43,0.5)] transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </footer>
  );
};
