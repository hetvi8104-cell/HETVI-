import React, { useState, useEffect } from 'react';
import { Camera, Maximize2, Sparkles, UploadCloud } from 'lucide-react';
import { ImageUploadModal } from './ImageUploadModal';
import { getEffectiveImageUrl } from '../utils/imageStore';
import { sounds } from '../utils/soundEffects';

interface ImagePlaceholderProps {
  slotId: string;
  label: string;
  placeholderHint: string;
  defaultUrl: string;
  className?: string;
  aspectRatio?: string;
  caption?: string;
  showCaption?: boolean;
  priority?: boolean;
}

export const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  slotId,
  label,
  placeholderHint,
  defaultUrl,
  className = '',
  aspectRatio = 'aspect-[3/4]',
  caption,
  showCaption = true,
}) => {
  const [imageUrl, setImageUrl] = useState<string>(() => getEffectiveImageUrl(slotId, defaultUrl));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    const handleUpdate = (e: any) => {
      if (e.detail?.all || e.detail?.slotId === slotId) {
        setImageUrl(getEffectiveImageUrl(slotId, defaultUrl));
      }
    };
    window.addEventListener('portfolio_images_updated', handleUpdate);
    return () => window.removeEventListener('portfolio_images_updated', handleUpdate);
  }, [slotId, defaultUrl]);

  return (
    <div className={`relative flex flex-col ${className}`}>
      {/* Visual Frame Container */}
      <div 
        className={`group relative w-full ${aspectRatio} overflow-hidden rounded-xl bg-[#E8DDD0]/40 border border-[#D8C7B5]/60 shadow-sm hover:shadow-xl transition-all duration-700 ease-out`}
      >
        {/* Layered Background Texture */}
        <div className="absolute inset-0 bg-grain opacity-40 pointer-events-none" />

        {/* Fashion Image */}
        <img
          src={imageUrl}
          alt={label}
          loading="lazy"
          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-1000 ease-out"
          onError={() => setImageUrl(defaultUrl)}
        />

        {/* Subtle Vignette & Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-500" />

        {/* Top-Right Replace Badge Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            sounds.playClick();
            setIsModalOpen(true);
          }}
          className="absolute top-3 right-3 opacity-90 group-hover:opacity-100 transition-all duration-300 px-3 py-1.5 rounded-full bg-[#FCFAF7]/90 hover:bg-[#5A1F2B] text-[#262223] hover:text-white backdrop-blur-md shadow-md text-[10px] font-sans-modern font-semibold uppercase tracking-wider flex items-center space-x-1.5 border border-[#D8C7B5]/40"
          title={`Replace ${label}`}
        >
          <UploadCloud className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Replace Image</span>
        </button>

        {/* Top-Left Lightbox Zoom */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            sounds.playClick();
            setIsLightboxOpen(true);
          }}
          className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300 p-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md"
          title="Inspect Full Image"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>

        {/* Bottom Editorial Hover Callout (Fulfills exact requirement for clearly labelled placeholder) */}
        <div 
          onClick={() => {
            sounds.playClick();
            setIsModalOpen(true);
          }}
          className="absolute inset-x-3 bottom-3 p-3 rounded-lg bg-[#262223]/80 hover:bg-[#5A1F2B]/95 text-white backdrop-blur-md border border-white/15 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer flex flex-col justify-center"
        >
          <div className="flex items-center space-x-1.5 text-[9px] font-sans-modern uppercase tracking-widest text-[#D8C7B5]">
            <Sparkles className="w-2.5 h-2.5 text-[#9A6670]" />
            <span>Editable Portfolio Asset</span>
          </div>
          <p className="text-xs font-serif-luxury font-medium truncate mt-0.5">
            {label}
          </p>
        </div>
      </div>

      {/* Sub-caption below image */}
      {showCaption && (
        <div className="mt-2 flex items-center justify-between text-[11px] text-stone-500 font-sans-modern px-1">
          <span className="truncate italic">{caption || label}</span>
          <span className="text-[9px] text-[#9A6670] uppercase tracking-widest ml-2 shrink-0">
            Hetvi Atelier
          </span>
        </div>
      )}

      {/* Asset Replacement Modal */}
      <ImageUploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        slotId={slotId}
        label={label}
        currentUrl={imageUrl}
        defaultUrl={defaultUrl}
        placeholderHint={placeholderHint}
        onImageChanged={(newUrl) => setImageUrl(newUrl)}
      />

      {/* Lightbox Fullscreen Preview */}
      {isLightboxOpen && (
        <div 
          onClick={() => setIsLightboxOpen(false)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out animate-in fade-in duration-300"
        >
          <div className="relative max-w-5xl max-h-[92vh] flex flex-col items-center">
            <img
              src={imageUrl}
              alt={label}
              className="max-h-[85vh] max-w-full object-contain rounded-lg shadow-2xl border border-white/20"
            />
            <div className="mt-3 px-4 py-2 rounded-full bg-stone-900/80 text-xs font-serif-luxury text-[#FCFAF7] border border-white/10">
              {label} — {caption || 'Editorial Archival View'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
