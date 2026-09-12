import React, { useState } from 'react';
import { X, RefreshCw, Layers, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, TreePine } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface SustainableJourneyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CIRCULAR_STEPS = [
  {
    step: '01',
    name: 'Textile Waste Generation',
    tagline: 'Cutting Room Waste Analysis',
    desc: 'Garment manufacturing facilities in Ahmedabad generate up to 18% pattern cut-off waste. This project collects pre-consumer scraps directly from artisan workshops and sampling rooms.',
    metrics: '120 kg scraps collected per collection cycle',
    action: 'Audit of selvedge cuttings, irregular yardages, and pattern trimmings.'
  },
  {
    step: '02',
    name: 'Material Audit & Origin Trace',
    tagline: 'Compositional Verification',
    desc: 'Each textile scrap is categorized by fiber purity: pure mulberry silks, Chanderi cotton-silks, wool gabardines, and deadstock Patola test-strips.',
    metrics: '100% natural, biodegradable fibers prioritized',
    action: 'Burn-tests and microscope yarn structure verification.'
  },
  {
    step: '03',
    name: 'Color & Texture Sorting',
    tagline: 'Harmonic Gradient Stratification',
    desc: 'Scraps are sorted into the 9 core portfolio tones: Deep Wine, Burgundy, Warm Beige, Ivory, and Sand neutrals to eliminate the need for chemical re-dyeing.',
    metrics: '0 liters of toxic effluent generated',
    action: 'Pantone matching and tonal binning.'
  },
  {
    step: '04',
    name: 'Structural Classification',
    tagline: 'Tensile & Bias Categorization',
    desc: 'Classification into three production streams: micro-shredding for weft re-spinning, geometric patches for filigree couching, and cord filler cores.',
    metrics: '92% scrap salvage efficiency rate',
    action: 'Mapping grainlines and structural load tolerance.'
  },
  {
    step: '05',
    name: 'Artisan Re-Creation & Reuse',
    tagline: 'High-Value Couture Transformation',
    desc: 'Scraps are transformed into high-value couture elements: the Patola Rebirth pallu collage (Look E-02), internal corset padding, and hand-embroidered accessories.',
    metrics: 'Over 85 vintage Patola strips upcycled per garment',
    action: 'French-seamed mosaic bonding with gold metallic couching.'
  },
  {
    step: '06',
    name: 'Textile Waste Bank',
    tagline: 'Open-Access Student Repository',
    desc: 'Establishment of an institutional scrap bank at Indus University, allowing fashion design students to deposit offcuts and withdraw materials for future experimentation.',
    metrics: 'Inter-batch circular material exchange',
    action: 'Centralized scrap cataloging and digital weight tracking.'
  },
  {
    step: '07',
    name: 'Circular Closed Loop',
    tagline: 'Zero-Waste Fashion Paradigm',
    desc: 'Garments designed with mono-material construction where possible, ensuring that at the end of their multi-decade wearable life, components can decompose organically or be re-spun.',
    metrics: 'End-of-life natural compostability',
    action: 'Full lifecycle assessment and cradle-to-cradle certification.'
  }
];

export const SustainableJourneyModal: React.FC<SustainableJourneyModalProps> = ({ isOpen, onClose }) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  if (!isOpen) return null;

  const current = CIRCULAR_STEPS[activeStepIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#FCFAF7] border border-[#D8C7B5] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-8 py-5 bg-[#F7F3EC] border-b border-[#D8C7B5]/60 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-[#5A1F2B] text-white flex items-center justify-center">
              <RefreshCw className="w-4 h-4 animate-spin" style={{ animationDuration: '10s' }} />
            </div>
            <div>
              <span className="text-[10px] font-sans-modern tracking-[0.25em] uppercase text-[#5A1F2B] font-bold">
                Sustainable Innovation Project
              </span>
              <h3 className="font-serif-luxury text-xl text-[#262223] font-bold">
                “From Scrap to System” — Circular Textile Journey
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

        {/* Circular Progress Stepper */}
        <div className="px-8 py-3 bg-[#E8DDD0]/30 border-b border-[#D8C7B5]/40 flex items-center justify-between overflow-x-auto space-x-2">
          {CIRCULAR_STEPS.map((s, idx) => (
            <button
              key={s.step}
              onClick={() => {
                sounds.playClick();
                setActiveStepIndex(idx);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-sans-modern whitespace-nowrap transition-all flex items-center space-x-1.5 ${
                activeStepIndex === idx
                  ? 'bg-[#5A1F2B] text-white shadow-md'
                  : 'text-stone-600 hover:text-stone-900 bg-white/70'
              }`}
            >
              <span className="font-bold">{s.step}</span>
              <span className="hidden md:inline">{s.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="p-8 overflow-y-auto space-y-8 flex-1">
          {/* Main Visual Display */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-4">
              <div className="flex items-center space-x-2 text-xs font-sans-modern text-[#722F37] font-semibold">
                <span className="px-2 py-0.5 rounded bg-[#722F37]/10">Stage {current.step} of 07</span>
                <span>•</span>
                <span>{current.tagline}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-serif-luxury text-[#262223] leading-snug">
                {current.name}
              </h2>
              <p className="text-stone-600 font-sans-modern text-sm leading-relaxed">
                {current.desc}
              </p>
              <div className="p-4 rounded-xl bg-[#F7F3EC] border border-[#D8C7B5] space-y-2">
                <div className="flex items-center space-x-2 text-xs font-sans-modern font-semibold text-[#262223]">
                  <CheckCircle2 className="w-4 h-4 text-[#5A1F2B]" />
                  <span>Key Impact Metric</span>
                </div>
                <p className="text-xs text-stone-700 font-serif-luxury italic">
                  {current.metrics}
                </p>
              </div>
            </div>

            {/* Circular Graphic Visualization */}
            <div className="md:col-span-5 flex flex-col items-center justify-center p-6 bg-[#F7F3EC] rounded-2xl border border-[#D8C7B5]/80">
              <div className="relative w-48 h-48 rounded-full border-4 border-dashed border-[#9A6670]/40 flex items-center justify-center p-4">
                <div className="w-36 h-36 rounded-full bg-[#5A1F2B] text-white flex flex-col items-center justify-center text-center p-4 shadow-xl">
                  <TreePine className="w-6 h-6 text-[#D8C7B5] mb-1" />
                  <span className="text-[10px] font-sans-modern uppercase tracking-widest text-[#D8C7B5]">
                    Step {current.step}
                  </span>
                  <span className="text-xs font-serif-luxury font-semibold mt-0.5">
                    {current.name}
                  </span>
                </div>
              </div>
              <span className="text-[11px] text-stone-500 font-sans-modern mt-3 text-center">
                Action: {current.action}
              </span>
            </div>
          </div>

          {/* 7-Stage Flow Visualization Bar */}
          <div className="space-y-3">
            <h4 className="text-xs font-sans-modern uppercase tracking-widest text-stone-500 font-bold">
              Circular Loop Schematic
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
              {CIRCULAR_STEPS.map((step, idx) => (
                <div
                  key={step.step}
                  onClick={() => {
                    sounds.playClick();
                    setActiveStepIndex(idx);
                  }}
                  className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                    activeStepIndex === idx
                      ? 'bg-[#5A1F2B] text-white border-[#5A1F2B] shadow-md'
                      : 'bg-white text-stone-600 border-[#D8C7B5]/60 hover:bg-[#F7F3EC]'
                  }`}
                >
                  <p className="text-[10px] font-bold opacity-75">{step.step}</p>
                  <p className="text-xs font-serif-luxury font-medium mt-1 leading-tight line-clamp-2">
                    {step.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-4 bg-[#F7F3EC] border-t border-[#D8C7B5]/60 flex items-center justify-between">
          <div className="text-xs text-stone-500 font-sans-modern">
            From Scrap to System — Indus University Fashion Thesis
          </div>
          <div className="flex items-center space-x-3">
            <button
              disabled={activeStepIndex === 0}
              onClick={() => {
                sounds.playClick();
                setActiveStepIndex((prev) => Math.max(0, prev - 1));
              }}
              className="px-4 py-2 text-xs rounded-lg border border-[#D8C7B5] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-stone-100 transition-all font-sans-modern"
            >
              Previous Step
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                if (activeStepIndex < CIRCULAR_STEPS.length - 1) {
                  setActiveStepIndex((prev) => prev + 1);
                } else {
                  onClose();
                }
              }}
              className="px-5 py-2 text-xs font-semibold rounded-lg bg-[#5A1F2B] hover:bg-[#722F37] text-white shadow-md flex items-center space-x-2 transition-all"
            >
              <span>{activeStepIndex === CIRCULAR_STEPS.length - 1 ? 'Finish Journey' : 'Next Step'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
