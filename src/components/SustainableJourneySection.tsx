import React, { useState, useEffect } from 'react';
import { 
  ArrowRight
} from 'lucide-react';

interface SustainableJourneySectionProps {
  isDarkTheme: boolean;
}

interface LoopStage {
  id: number;
  title: string;
  subtitle: string;
  percentage: string;
  description: string;
  materials: string[];
  image: string;
  metric: {
    label: string;
    value: string;
  };
}

export const SustainableJourneySection: React.FC<SustainableJourneySectionProps> = ({ isDarkTheme }) => {
  const [activeStage, setActiveStage] = useState<number>(0);
  const [isAutoCycling, setIsAutoCycling] = useState<boolean>(true);

  const stages: LoopStage[] = [
    {
      id: 1,
      title: 'Post-Cutting Scrap Audit & Sorting',
      subtitle: 'Zero-Waste Pattern Grading & Re-Collection',
      percentage: '100% Pre-Consumer Waste',
      description: 'Systematic classification of atelier fabric offcuts by fiber composition (silk, cotton, wool, linen) and color gradient. Micro-scraps under 5cm are channeled into re-spinning; larger offcuts are prepared for modular origami tessellation.',
      materials: ['Patan Patola Silk Remnants', 'Heavy Wool Gabardine Ends', 'Mulmul Cutting Offcuts'],
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80',
      metric: { label: 'Scrap Recovery Rate', value: '94.2%' }
    },
    {
      id: 2,
      title: 'Fiber Shredding & Hand Re-Spinning',
      subtitle: 'Mechanical Unraveling to Slub Yarns',
      percentage: 'Zero Chemical Processing',
      description: 'Clean selvages and thread waste are unraveled by hand on a traditional charkha wheel, blended with raw organic cotton slivers, and spun into dynamic irregular slub yarns with high tactile character.',
      materials: ['Hand-Spun Slub Yarn', 'Unprocessed Organic Cotton', 'Metallic Zari Dust Reclaim'],
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80',
      metric: { label: 'Virgin Fiber Reduced', value: '88.5%' }
    },
    {
      id: 3,
      title: 'Water-Soluble Stabilizer Mosaic Couching',
      subtitle: 'Multi-Directional Filigree Embroidery',
      percentage: '92% Textile Waste Upcycled',
      description: 'Geometric silk patches are collaged onto biodegradable water-soluble PVA membrane. Computer-guided and hand-couched gold metallic threads lock the mosaic into a continuous supple textile before the membrane dissolves in cold water.',
      materials: ['Biodegradable PVA Film', 'Gold Couching Thread', 'Multi-Tonal Patola Fragments'],
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=80',
      metric: { label: 'Tensile Strength', value: 'Equal to Virgin Silk' }
    },
    {
      id: 4,
      title: 'Modular Assembly & Circular Garment Realization',
      subtitle: 'Zero-Waste Pattern Interlocking Geometry',
      percentage: 'Zero Waste Cutting Layout',
      description: 'Tessellated polygonal garment patterns interlock seamlessly edge-to-edge across the fabric width, leaving zero negative scrap during final cutting and tailoring.',
      materials: ['Architectural Trench Exoskeleton', 'Concept Patola Saree', 'Corded Bodice Panels'],
      image: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=1000&q=80',
      metric: { label: 'Fabric Yield Efficiency', value: '99.4%' }
    },
    {
      id: 5,
      title: 'Closed-Loop Lifecycle & Natural Biodegradation',
      subtitle: 'Mono-Material Construction for Easy Disassembly',
      percentage: '100% Circular Disassembly',
      description: 'All structural components utilize natural cotton stitching threads and screw-in brass hardware, enabling clean mechanical disassembly and natural soil composting at the end of garment lifecycle.',
      materials: ['Organic Cotton Threads', 'Natural Alum Fixatives', 'Lead-Free Brass Snaps'],
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80',
      metric: { label: 'Biodegradable Factor', value: '100% Natural' }
    }
  ];

  // Auto-cycle loop
  useEffect(() => {
    if (!isAutoCycling) return;
    const timer = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % stages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoCycling, stages.length]);

  const current = stages[activeStage];

  return (
    <section id="sustainability" className="relative w-full py-28 px-6 md:px-12 lg:px-20 border-b border-[#D4C5B0]/70 dark:border-white/[0.06]">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#6E1A29] dark:bg-[#D48B96]" />
            <span className="text-[10px] font-sans-modern tracking-[0.35em] uppercase font-bold text-[#6E1A29] dark:text-[#D48B96]">
              04 • CIRCULAR FASHION FRAMEWORK
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-bold tracking-tight text-[#5C1322] dark:text-[#FAF6F0]">
            FROM SCRAP TO SYSTEM
          </h2>
          <p className="text-xs sm:text-sm font-sans-modern text-[#221B1C]/75 dark:text-[#F3EBE6]/75 max-w-2xl leading-relaxed">
            A radical circular design framework converting atelier pre-consumer textile waste into high-fashion architectural couture without chemical degradation.
          </p>
        </div>

        {/* Circular Orbital Visual Loop Stepper */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {stages.map((stage, idx) => {
            const isActive = activeStage === idx;
            return (
              <button
                key={stage.id}
                onClick={() => {
                  setActiveStage(idx);
                  setIsAutoCycling(false);
                }}
                data-cursor="link"
                className={`p-4 sm:p-5 rounded-2xl border text-left transition-all relative overflow-hidden group ${
                  isActive
                    ? 'bg-[#6E1A29] border-[#6E1A29] text-[#FAF6F0] shadow-xl scale-[1.02]'
                    : isDarkTheme
                      ? 'border-[#6E1A29]/35 bg-[#280D1A]/90 text-[#FAF4EF] hover:border-[#D48B96]/60'
                      : 'border-[#D4C5B0] bg-[#FCFAF7] text-[#221B1C] hover:bg-[#EFE8DE]'
                }`}
              >
                <div className="flex justify-between items-center pb-2">
                  <span className={`text-[10px] font-mono font-bold ${isActive ? 'text-[#FAF6F0]' : 'text-[#6E1A29] dark:text-[#D48B96]'}`}>
                    STAGE 0{stage.id}
                  </span>
                  <span className="text-[9px] opacity-70">
                    {stage.metric.value}
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-serif-luxury font-bold line-clamp-2 leading-tight">
                  {stage.title}
                </h4>
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/40 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Deep Dive Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Visual */}
          <div className="lg:col-span-7">
            <div 
              data-cursor="view"
              className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-[#DCD0BF] dark:border-white/15 shadow-2xl bg-black/40 group"
            >
              <img 
                src={current.image} 
                alt={current.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
                <div>
                  <span className="text-[9px] font-mono tracking-widest uppercase opacity-75 text-[#E5DAC8]">
                    {current.percentage}
                  </span>
                  <h3 className="text-xl font-serif-luxury font-bold text-[#FAF6F0]">
                    {current.title}
                  </h3>
                </div>
                <div className="p-3 rounded-xl backdrop-blur-md bg-black/50 border border-white/15 text-right">
                  <span className="text-[9px] uppercase tracking-wider block opacity-70">
                    {current.metric.label}
                  </span>
                  <span className="text-sm font-serif-luxury font-bold text-[#E5DAC8]">
                    {current.metric.value}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Descriptive Content */}
          <div className="lg:col-span-5 space-y-6">
            <div className={`p-8 rounded-3xl border shadow-xl space-y-6 ${
              isDarkTheme ? 'bg-[#280D1A]/90 border-[#6E1A29]/40' : 'bg-[#FCFAF7] border-[#DCD0BF]'
            }`}>
              <div className="space-y-1">
                <span className="text-[10px] font-sans-modern tracking-[0.3em] uppercase font-bold text-[#6E1A29] dark:text-[#D48B96]">
                  PROCESS STAGE 0{current.id}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif-luxury font-bold text-[#5C1322] dark:text-[#FAF6F0]">
                  {current.subtitle}
                </h3>
              </div>

              <p className="text-xs sm:text-sm font-sans-modern leading-relaxed opacity-85 border-l-2 border-[#6E1A29] dark:border-[#D48B96] pl-3 text-[#221B1C] dark:text-[#F3EBE6]">
                {current.description}
              </p>

              {/* Material Elements */}
              <div className="space-y-2 border-t border-current/10 pt-4">
                <span className="text-[10px] font-sans-modern tracking-[0.2em] uppercase font-bold text-[#6E1A29] dark:text-[#D48B96]">
                  Integrated Material Streams
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

              {/* Next Stage Step Button */}
              <button
                onClick={() => {
                  setActiveStage((prev) => (prev + 1) % stages.length);
                  setIsAutoCycling(false);
                }}
                data-cursor="link"
                className="w-full py-3.5 rounded-full bg-[#6E1A29] hover:bg-[#802031] text-[#FAF6F0] text-[10px] tracking-[0.25em] uppercase font-bold flex items-center justify-center space-x-2 shadow-md transition-all group active:scale-95"
              >
                <span>Advance to Next Phase</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
