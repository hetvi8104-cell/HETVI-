import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

interface ProcessSectionProps {
  isDarkTheme: boolean;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ isDarkTheme }) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      number: '01',
      title: 'Gestural Draping & 3D Form Finding',
      subtitle: 'Physical Muslin Exploration & Tension Sculpting',
      description: 'The design begins on the live dress form with raw unbleached calico. Grainlines are rotated 45 degrees across the bias to establish liquid gravity before structural boning channels are pinned directly onto the anatomy.',
      materials: ['Unbleached Cotton Muslin', 'Dressmaker Pins', 'Graphite Marking Lead'],
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=80',
      milestones: [
        'Bias drape balance verification under 360-degree rotation',
        'Direct bodice volume carving without paper constraints',
        'Tension point mapping across shoulder and iliac crest'
      ]
    },
    {
      number: '02',
      title: 'Zero-Waste Origami & Flat Pattern Geometry',
      subtitle: 'Tessellated Mathematical CAD Construction',
      description: 'Muslin draping is translated into precision 2D pattern vectors. Polygon edges interlock with zero negative offcut scrap across standard 140cm textile bolts, optimizing fabric yield to 99.4%.',
      materials: ['CAD Vector Drafting', 'Heavy Manila Pattern Paper', 'Rotary Cutters'],
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=80',
      milestones: [
        'Zero-waste pattern interlocking layout calculation',
        'Origami accordion crease geometry scoring',
        'Grainline alignment matching across double-ikat repeats'
      ]
    },
    {
      number: '03',
      title: 'Ancestral Gujarati Craft Execution',
      subtitle: 'Patola Double-Ikat, Bandhani & Zari Couching',
      description: 'Collaborating with generational master weavers in Patan and Kutch. Pure silk warps and wefts are resist-dyed before weaving, creating double-ikat geometric symmetry fused with hand-couched metallic dori cording.',
      materials: ['Pure Mulberry Silk', 'Natural Indigo & Madder Dyes', 'Metallic Zari Cords'],
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80',
      milestones: [
        '100% natural dyestuff extraction and fixing with alum',
        'Micro-tied silk Bandhani resist-dye clusters',
        'Water-soluble PVA membrane filigree embroidery'
      ]
    },
    {
      number: '04',
      title: 'Architectural Tailoring & Exoskeleton Assembly',
      subtitle: 'Pad-Stitched Canvas & Spiral Steel Boning',
      description: 'Merging traditional bespoke English tailoring with couture construction. Horsehair canvas is pad-stitched by hand to give resilient chest spring, reinforced by spiral steel bones encased in plush velvet channels.',
      materials: ['Horsehair Canvas Interfacing', 'Spiral Steel Corset Bones', 'Solid Brass Snaps'],
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80',
      milestones: [
        'Internal waist stay balancing garment load',
        'French-seamed silk organza lining insertion',
        'Modular screw-in hardware for circular end-of-life disassembly'
      ]
    }
  ];

  const current = steps[activeStep];

  return (
    <section id="process" className="relative w-full py-28 px-6 md:px-12 lg:px-20 border-b border-[#D4C5B0]/70 dark:border-white/[0.06]">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Pre-Title */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#6E1A29] dark:bg-[#D48B96]" />
            <span className="text-[10px] font-sans-modern tracking-[0.35em] uppercase font-bold text-[#6E1A29] dark:text-[#D48B96]">
              05 • ATELIER METHODOLOGY
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-bold tracking-tight text-[#5C1322] dark:text-[#FAF6F0]">
            THE CRAFT PIPELINE
          </h2>
          <p className="text-xs sm:text-sm font-sans-modern text-[#221B1C]/75 dark:text-[#F3EBE6]/75 leading-relaxed max-w-2xl">
            From initial gestural muslin draping to precision zero-waste origami geometry and bespoke tailored exoskeleton engineering.
          </p>
        </div>

        {/* 4 Step Nav Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {steps.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={step.number}
                onClick={() => setActiveStep(idx)}
                data-cursor="link"
                className={`p-5 rounded-2xl border text-left transition-all relative overflow-hidden group ${
                  isActive
                    ? 'bg-[#6E1A29] border-[#6E1A29] text-[#FAF6F0] shadow-xl scale-[1.02]'
                    : isDarkTheme
                      ? 'border-[#6E1A29]/35 bg-[#280D1A]/90 text-[#FAF4EF] hover:border-[#D48B96]/60'
                      : 'border-[#D4C5B0] bg-[#FCFAF7] text-[#221B1C] hover:bg-[#EFE8DE]'
                }`}
              >
                <div className="flex justify-between items-center pb-2">
                  <span className={`text-xs font-mono font-bold ${isActive ? 'text-[#FAF6F0]' : 'text-[#6E1A29] dark:text-[#D48B96]'}`}>
                    STEP {step.number}
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-serif-luxury font-bold line-clamp-2 leading-tight">
                  {step.title}
                </h4>
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/40 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Step Deep Dive Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Step Photo */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-[#DCD0BF] dark:border-white/15 shadow-2xl bg-black/40 group" data-cursor="view">
              <img 
                src={current.image} 
                alt={current.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-75" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#E5DAC8]">
                  PHASE {current.number} • ATELIER BENCHMARK
                </span>
                <h3 className="text-xl font-serif-luxury font-bold text-[#FAF6F0]">
                  {current.title}
                </h3>
              </div>
            </div>
          </div>

          {/* Step Content & Milestones */}
          <div className="lg:col-span-6 space-y-6">
            <div className={`p-8 rounded-3xl border shadow-xl space-y-6 ${
              isDarkTheme ? 'bg-[#280D1A]/90 border-[#6E1A29]/40' : 'bg-[#FCFAF7] border-[#DCD0BF]'
            }`}>
              <div className="space-y-1">
                <span className="text-[10px] font-sans-modern tracking-[0.3em] uppercase font-bold text-[#6E1A29] dark:text-[#D48B96]">
                  PROCESS STAGE {current.number}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif-luxury font-bold text-[#5C1322] dark:text-[#FAF6F0]">
                  {current.subtitle}
                </h3>
              </div>

              <p className="text-xs sm:text-sm font-sans-modern leading-relaxed opacity-85 border-l-2 border-[#6E1A29] dark:border-[#D48B96] pl-3 text-[#221B1C] dark:text-[#F3EBE6]">
                {current.description}
              </p>

              {/* Integrated Materials */}
              <div className="space-y-2 border-t border-current/10 pt-4">
                <span className="text-[10px] font-sans-modern tracking-[0.2em] uppercase font-bold text-[#6E1A29] dark:text-[#D48B96]">
                  Materials & Tooling
                </span>
                <div className="flex flex-wrap gap-2">
                  {current.materials.map((mat, i) => (
                    <span 
                      key={i}
                      className={`px-3 py-1 rounded-full border text-[11px] font-sans-modern font-medium ${
                        isDarkTheme ? 'bg-white/5 border-white/10 text-stone-300' : 'bg-[#EFE8DE] border-[#D4C5B0] text-[#221B1C]'
                      }`}
                    >
                      {mat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Milestones */}
              <div className="space-y-2 border-t border-current/10 pt-4">
                <span className="text-[10px] font-sans-modern tracking-[0.2em] uppercase font-bold text-[#6E1A29] dark:text-[#D48B96]">
                  Quality & Construction Milestones
                </span>
                <ul className="space-y-2">
                  {current.milestones.map((m, i) => (
                    <li key={i} className="flex items-start space-x-2 text-xs font-sans-modern opacity-80">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#6E1A29] dark:text-[#D48B96] mt-0.5 shrink-0" />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
