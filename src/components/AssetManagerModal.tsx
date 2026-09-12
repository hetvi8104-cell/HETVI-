import React, { useState, useEffect } from 'react';
import { X, Upload, RotateCcw, Sparkles, Check, Image as ImageIcon, ExternalLink } from 'lucide-react';
import { PORTFOLIO_PAGES } from '../data/portfolioData';
import { getEffectiveImageUrl, resetAllCustomImages, saveCustomImage } from '../utils/imageStore';
import { ImageUploadModal } from './ImageUploadModal';
import { sounds } from '../utils/soundEffects';

interface AssetManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToSlide: (pageNumber: number) => void;
}

export const AssetManagerModal: React.FC<AssetManagerModalProps> = ({
  isOpen,
  onClose,
  onNavigateToSlide
}) => {
  const [selectedSlot, setSelectedSlot] = useState<{
    slotId: string;
    label: string;
    placeholderHint: string;
    defaultUrl: string;
    pageNumber: number;
  } | null>(null);

  const [activeCategory, setActiveCategory] = useState<'all' | 'western' | 'ethnic' | 'research' | 'photoshoot'>('all');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const handleUpdate = () => setRefreshTrigger((prev) => prev + 1);
    window.addEventListener('portfolio_images_updated', handleUpdate);
    return () => window.removeEventListener('portfolio_images_updated', handleUpdate);
  }, []);

  if (!isOpen) return null;

  // Collect all visual slots across all 42 pages
  const allSlots: {
    slotId: string;
    label: string;
    placeholderHint: string;
    defaultUrl: string;
    pageNumber: number;
    pageTitle: string;
    sectionId: string;
  }[] = [];

  PORTFOLIO_PAGES.forEach((page) => {
    if (page.visualSlots && page.visualSlots.length > 0) {
      page.visualSlots.forEach((slot) => {
        allSlots.push({
          ...slot,
          pageNumber: page.pageNumber,
          pageTitle: page.title,
          sectionId: page.sectionId
        });
      });
    }
  });

  const filteredSlots = allSlots.filter((s) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'western') return s.sectionId === 'western' || s.slotId.includes('western');
    if (activeCategory === 'ethnic') return s.sectionId === 'ethnic' || s.slotId.includes('ethnic');
    if (activeCategory === 'research') return s.sectionId === 'concept' || s.sectionId === 'design_language' || s.sectionId === 'development';
    if (activeCategory === 'photoshoot') return s.sectionId === 'final' || s.slotId.includes('photoshoot');
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-[#FCFAF7] border border-[#D8C7B5] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-8 py-5 bg-[#F7F3EC] border-b border-[#D8C7B5]/60 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-[#5A1F2B] text-white flex items-center justify-center">
              <ImageIcon className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-sans-modern tracking-[0.25em] text-[#5A1F2B] uppercase font-bold">
                Asset Control Center
              </span>
              <h3 className="font-serif-luxury text-xl text-[#262223] font-bold">
                Image Placeholder & Artwork Replacement Hub
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

        {/* Category Filters */}
        <div className="px-8 py-3 bg-[#E8DDD0]/30 border-b border-[#D8C7B5]/40 flex items-center justify-between overflow-x-auto space-x-2">
          <div className="flex items-center space-x-2">
            {[
              { id: 'all', label: 'All Placeholders' },
              { id: 'western', label: 'Western Collection (W-01 to W-03)' },
              { id: 'ethnic', label: 'Ethnic Collection (E-01 to E-03)' },
              { id: 'research', label: 'Research & Mood Boards' },
              { id: 'photoshoot', label: 'Final Photoshoots' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  sounds.playClick();
                  setActiveCategory(cat.id as any);
                }}
                className={`px-3 py-1 rounded-full text-xs font-sans-modern whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#5A1F2B] text-white shadow-md'
                    : 'text-stone-600 hover:text-stone-900 bg-white/80'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              if (window.confirm('Reset all custom uploaded images back to curated placeholder defaults?')) {
                sounds.playClick();
                resetAllCustomImages();
              }
            }}
            className="text-xs text-stone-500 hover:text-[#722F37] flex items-center space-x-1 font-sans-modern whitespace-nowrap ml-4"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All</span>
          </button>
        </div>

        {/* Slot Grid */}
        <div className="p-8 overflow-y-auto space-y-4 flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredSlots.map((slot) => {
              const currentImg = getEffectiveImageUrl(slot.slotId, slot.defaultUrl);
              return (
                <div
                  key={slot.slotId}
                  className="bg-white border border-[#D8C7B5]/60 rounded-xl overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col group"
                >
                  <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                    <img
                      src={currentImg}
                      alt={slot.label}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[10px] font-serif-luxury text-white">
                      Page {slot.pageNumber < 10 ? `0${slot.pageNumber}` : slot.pageNumber}
                    </div>
                  </div>

                  <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <p className="text-[10px] font-sans-modern tracking-wider text-[#722F37] uppercase font-semibold truncate">
                        {slot.pageTitle}
                      </p>
                      <h4 className="text-xs font-serif-luxury font-bold text-[#262223] mt-0.5 line-clamp-2">
                        {slot.label}
                      </h4>
                    </div>

                    <div className="flex items-center space-x-2 pt-2 border-t border-stone-100">
                      <button
                        onClick={() => {
                          sounds.playClick();
                          setSelectedSlot(slot);
                        }}
                        className="flex-1 px-2.5 py-1.5 rounded-lg bg-[#5A1F2B] hover:bg-[#722F37] text-white text-xs font-sans-modern flex items-center justify-center space-x-1 shadow-2xs transition-all"
                      >
                        <Upload className="w-3 h-3" />
                        <span>Replace</span>
                      </button>
                      <button
                        onClick={() => {
                          sounds.playSlideTransition();
                          onNavigateToSlide(slot.pageNumber);
                          onClose();
                        }}
                        className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-600 transition-all"
                        title="Jump to Slide"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-4 bg-[#F7F3EC] border-t border-[#D8C7B5]/60 flex items-center justify-between text-xs font-sans-modern text-stone-500">
          <span>{filteredSlots.length} Image Slots Active</span>
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="px-5 py-2 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-800 font-semibold transition-all"
          >
            Close Asset Studio
          </button>
        </div>
      </div>

      {selectedSlot && (
        <ImageUploadModal
          isOpen={!!selectedSlot}
          onClose={() => setSelectedSlot(null)}
          slotId={selectedSlot.slotId}
          label={selectedSlot.label}
          currentUrl={getEffectiveImageUrl(selectedSlot.slotId, selectedSlot.defaultUrl)}
          defaultUrl={selectedSlot.defaultUrl}
          placeholderHint={selectedSlot.placeholderHint}
          onImageChanged={() => {}}
        />
      )}
    </div>
  );
};
