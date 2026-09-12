import React from 'react';
import { X, ArrowRight, CheckCircle2, Layers } from 'lucide-react';
import { PORTFOLIO_PAGES } from '../data/portfolioData';
import { SECTIONS_META } from '../data/garmentsData';
import { sounds } from '../utils/soundEffects';

interface SectionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: number;
  onNavigateToSlide: (pageNumber: number) => void;
}

export const SectionDrawer: React.FC<SectionDrawerProps> = ({
  isOpen,
  onClose,
  currentPage,
  onNavigateToSlide
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl h-full bg-[#FCFAF7] border-l border-[#D8C7B5] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="px-6 py-5 bg-[#F7F3EC] border-b border-[#D8C7B5]/60 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <Layers className="w-5 h-5 text-[#5A1F2B]" />
            <div>
              <span className="text-[10px] font-sans-modern tracking-[0.2em] text-[#9A6670] uppercase font-bold">
                Portfolio Index Directory
              </span>
              <h3 className="font-serif-luxury text-lg text-[#262223] font-bold">
                42-Page Slide Archive
              </h3>
            </div>
          </div>
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-800 hover:bg-stone-200/60 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 8-Section Quick Jump Ribbon */}
        <div className="px-6 py-3 bg-[#E8DDD0]/30 border-b border-[#D8C7B5]/40 flex items-center space-x-2 overflow-x-auto">
          {SECTIONS_META.map((sec) => (
            <button
              key={sec.id}
              onClick={() => {
                sounds.playSlideTransition();
                onNavigateToSlide(sec.startPage);
                onClose();
              }}
              className="px-3 py-1 rounded-full text-xs font-sans-modern whitespace-nowrap bg-white hover:bg-[#5A1F2B] hover:text-white border border-[#D8C7B5]/60 text-stone-700 transition-all shadow-2xs"
            >
              <span className="font-bold">{sec.number}</span> {sec.title.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* 42 Pages List */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {SECTIONS_META.map((section) => {
            const sectionPages = PORTFOLIO_PAGES.filter(
              (p) => p.pageNumber >= section.startPage && p.pageNumber <= section.endPage
            );

            return (
              <div key={section.id} className="space-y-3">
                {/* Section Subhead */}
                <div className="flex items-center space-x-2 pb-1 border-b border-[#D8C7B5]/40">
                  <span 
                    className="w-2.5 h-2.5 rounded-full" 
                    style={{ backgroundColor: section.themeColor }}
                  />
                  <h4 className="font-serif-luxury font-bold text-sm text-[#262223] tracking-wide">
                    {section.number} — {section.title}
                  </h4>
                  <span className="text-[10px] font-sans-modern text-stone-400">
                    (p. {section.startPage}–{section.endPage})
                  </span>
                </div>

                {/* Page Grid inside section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {sectionPages.map((page) => {
                    const isCurrent = currentPage === page.pageNumber;
                    return (
                      <button
                        key={page.pageNumber}
                        onClick={() => {
                          sounds.playSlideTransition();
                          onNavigateToSlide(page.pageNumber);
                          onClose();
                        }}
                        className={`p-3 rounded-xl text-left border transition-all flex items-start space-x-3 group ${
                          isCurrent
                            ? 'bg-[#5A1F2B] text-white border-[#5A1F2B] shadow-md'
                            : 'bg-white text-[#262223] border-[#D8C7B5]/60 hover:bg-[#F7F3EC] hover:border-[#722F37]/40'
                        }`}
                      >
                        <span className={`text-xs font-serif-luxury font-bold px-2 py-0.5 rounded ${
                          isCurrent ? 'bg-white/20 text-white' : 'bg-[#E8DDD0]/50 text-[#5A1F2B]'
                        }`}>
                          {page.pageNumber < 10 ? `0${page.pageNumber}` : page.pageNumber}
                        </span>

                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-serif-luxury font-semibold truncate group-hover:text-[#722F37] transition-colors">
                            {page.title}
                          </p>
                          <p className={`text-[10px] truncate mt-0.5 ${
                            isCurrent ? 'text-white/80' : 'text-stone-500'
                          }`}>
                            {page.subtitle || page.sectionTitle}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#F7F3EC] border-t border-[#D8C7B5]/60 flex items-center justify-between text-xs font-sans-modern text-stone-500">
          <span>Hetvi Kapadia • 42 Total Slides</span>
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="px-4 py-1.5 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-700 transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
