import React, { useState } from 'react';
import { X, Sparkles, Scissors, Eye, Layers, CheckCircle2 } from 'lucide-react';
import { TEXTILE_SAMPLES } from '../data/garmentsData';
import { TextileSample } from '../types/portfolio';
import { ThreeClothPreview } from './ThreeClothPreview';
import { sounds } from '../utils/soundEffects';

interface TextileLabModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TextileLabModal: React.FC<TextileLabModalProps> = ({ isOpen, onClose }) => {
  const [selectedSampleIndex, setSelectedSampleIndex] = useState(0);
  const [is3DActive, setIs3DActive] = useState(true);

  if (!isOpen) return null;

  const currentSample: TextileSample = TEXTILE_SAMPLES[selectedSampleIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-[#FCFAF7] border border-[#D8C7B5] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-8 py-5 bg-[#F7F3EC] border-b border-[#D8C7B5]/60 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-[#722F37] text-white flex items-center justify-center">
              <Scissors className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-sans-modern tracking-[0.25em] uppercase text-[#722F37] font-bold">
                Experimental Laboratory
              </span>
              <h3 className="font-serif-luxury text-xl text-[#262223] font-bold">
                Textile Lab: 3D Surface & Manipulation Archive
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

        {/* Sample Tabs */}
        <div className="px-8 py-3 bg-[#E8DDD0]/30 border-b border-[#D8C7B5]/40 flex items-center space-x-2 overflow-x-auto">
          {TEXTILE_SAMPLES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => {
                sounds.playClick();
                setSelectedSampleIndex(idx);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-sans-modern whitespace-nowrap transition-all flex items-center space-x-1.5 ${
                selectedSampleIndex === idx
                  ? 'bg-[#722F37] text-white shadow-md'
                  : 'text-stone-600 hover:text-stone-900 bg-white/80'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: idx % 2 === 0 ? '#9A6670' : '#D8C7B5' }} />
              <span>Sample 0{idx + 1}</span>
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="p-8 overflow-y-auto space-y-6 flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Visual 3D and Macro Photo Area */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-sans-modern uppercase tracking-widest text-stone-500 font-semibold">
                  Interactive Specimen
                </span>
                <div className="flex items-center space-x-1 glass-panel p-1 rounded-lg text-xs">
                  <button
                    onClick={() => setIs3DActive(true)}
                    className={`px-2.5 py-1 rounded transition-all ${is3DActive ? 'bg-[#722F37] text-white' : 'text-stone-600'}`}
                  >
                    3D Simulation
                  </button>
                  <button
                    onClick={() => setIs3DActive(false)}
                    className={`px-2.5 py-1 rounded transition-all ${!is3DActive ? 'bg-[#722F37] text-white' : 'text-stone-600'}`}
                  >
                    Macro Photo
                  </button>
                </div>
              </div>

              {is3DActive ? (
                <div className="relative">
                  <ThreeClothPreview 
                    colorHex={selectedSampleIndex % 2 === 0 ? '#722F37' : '#5A1F2B'} 
                    height={280}
                  />
                  <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded bg-black/60 backdrop-blur-xs text-[10px] text-white font-sans-modern">
                    Interactive cloth physics: hover & wave deformation
                  </div>
                </div>
              ) : (
                <div className="relative h-[280px] rounded-lg overflow-hidden border border-[#D8C7B5]">
                  <img
                    src={currentSample.image}
                    alt={currentSample.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            {/* Specimen Notes & Recipe */}
            <div className="lg:col-span-6 space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-sans-modern uppercase tracking-widest text-[#722F37] font-semibold">
                  {currentSample.technique}
                </span>
                <h2 className="text-2xl font-serif-luxury text-[#262223]">
                  {currentSample.title}
                </h2>
              </div>

              <div className="p-4 rounded-xl bg-[#F7F3EC] border border-[#D8C7B5] space-y-2">
                <p className="text-xs font-sans-modern uppercase tracking-wider text-stone-500 font-semibold">
                  Material Composition
                </p>
                <p className="text-sm font-serif-luxury text-[#262223]">
                  {currentSample.materials}
                </p>
              </div>

              <p className="text-stone-600 font-sans-modern text-xs leading-relaxed">
                {currentSample.description}
              </p>

              <div className="space-y-2">
                <h4 className="text-xs font-sans-modern uppercase tracking-widest text-stone-500 font-bold">
                  Lab Trial Observations
                </h4>
                <ul className="space-y-1.5">
                  {currentSample.detailNotes.map((note, nIdx) => (
                    <li key={nIdx} className="text-xs text-stone-700 font-sans-modern flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#5A1F2B] shrink-0" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-4 bg-[#F7F3EC] border-t border-[#D8C7B5]/60 flex items-center justify-between">
          <span className="text-xs text-stone-500 font-sans-modern">
            Sample {selectedSampleIndex + 1} of {TEXTILE_SAMPLES.length} — Indus University Surface Lab
          </span>
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="px-5 py-2 text-xs font-semibold rounded-lg bg-[#5A1F2B] hover:bg-[#722F37] text-white shadow-md transition-all font-sans-modern"
          >
            Close Lab Archive
          </button>
        </div>
      </div>
    </div>
  );
};
