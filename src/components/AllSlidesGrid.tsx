import React, { useState } from 'react';
import { PORTFOLIO_PAGES } from '../data/portfolioData';
import { SECTIONS_META } from '../data/garmentsData';
import { sounds } from '../utils/soundEffects';
import { Grid, Eye, Layers, ExternalLink, Printer } from 'lucide-react';

interface AllSlidesGridProps {
  currentPage: number;
  onSelectSlide: (pageNumber: number) => void;
  onClose: () => void;
}

export const AllSlidesGrid: React.FC<AllSlidesGridProps> = ({
  currentPage,
  onSelectSlide,
  onClose
}) => {
  const [selectedSection, setSelectedSection] = useState<string>('all');

  const filteredPages = PORTFOLIO_PAGES.filter((p) => {
    if (selectedSection === 'all') return true;
    return p.sectionId === selectedSection;
  });

  return (
    <div className="w-full h-full bg-[#FCFAF7] overflow-y-auto p-6 md:p-12 space-y-8 select-none">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#D8C7B5]">
        <div>
          <span className="text-xs font-sans-modern uppercase tracking-[0.25em] text-[#722F37] font-semibold">
            Jury & Exhibition Sheet
          </span>
          <h2 className="text-3xl md:text-4xl font-serif-luxury font-bold text-[#262223]">
            42-PAGE DIGITAL ARCHIVE
          </h2>
        </div>

        {/* Section Filter Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0">
          <button
            onClick={() => {
              sounds.playClick();
              setSelectedSection('all');
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-sans-modern whitespace-nowrap transition-all ${
              selectedSection === 'all'
                ? 'bg-[#5A1F2B] text-white shadow-md'
                : 'bg-[#F7F3EC] text-stone-700 hover:bg-[#E8DDD0]'
            }`}
          >
            All 42 Slides
          </button>
          {SECTIONS_META.map((sec) => (
            <button
              key={sec.id}
              onClick={() => {
                sounds.playClick();
                setSelectedSection(sec.id);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-sans-modern whitespace-nowrap transition-all ${
                selectedSection === sec.id
                  ? 'bg-[#5A1F2B] text-white shadow-md'
                  : 'bg-[#F7F3EC] text-stone-700 hover:bg-[#E8DDD0]'
              }`}
            >
              {sec.number} {sec.title.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Slides */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {filteredPages.map((page) => {
          const isCurrent = currentPage === page.pageNumber;
          const previewImg = page.visualSlots?.[0]?.defaultUrl;

          return (
            <div
              key={page.pageNumber}
              onClick={() => {
                sounds.playSlideTransition();
                onSelectSlide(page.pageNumber);
              }}
              className={`group bg-white rounded-xl border overflow-hidden p-3 flex flex-col justify-between shadow-2xs hover:shadow-xl transition-all cursor-pointer ${
                isCurrent
                  ? 'ring-2 ring-[#5A1F2B] border-[#5A1F2B]'
                  : 'border-[#D8C7B5]/70 hover:border-[#722F37]'
              }`}
            >
              <div className="relative aspect-[16/10] bg-stone-100 rounded-lg overflow-hidden mb-2.5">
                {previewImg ? (
                  <img
                    src={previewImg}
                    alt={page.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-[#E8DDD0]/40 flex items-center justify-center text-[10px] font-serif-luxury text-stone-500 p-2 text-center">
                    {page.subtitle || 'Editorial Document'}
                  </div>
                )}

                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 text-[10px] font-serif-luxury font-bold text-white">
                  {page.pageNumber < 10 ? `0${page.pageNumber}` : page.pageNumber}
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[9px] font-sans-modern uppercase tracking-widest text-[#722F37] truncate block">
                  {page.sectionTitle}
                </span>
                <h4 className="text-xs font-serif-luxury font-bold text-[#262223] truncate group-hover:text-[#5A1F2B]">
                  {page.title}
                </h4>
              </div>

              <div className="pt-2 mt-2 border-t border-stone-100 flex items-center justify-between text-[10px] font-sans-modern text-stone-400 group-hover:text-[#5A1F2B]">
                <span>Slide {page.pageNumber} / 42</span>
                <ExternalLink className="w-3 h-3" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
