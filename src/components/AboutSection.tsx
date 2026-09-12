import React from 'react';
import { ArrowRight } from 'lucide-react';

interface AboutSectionProps {
  isDarkTheme: boolean;
  onExploreWork: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ isDarkTheme, onExploreWork }) => {
  return (
    <section id="about" className="relative w-full py-28 px-6 md:px-12 lg:px-20 border-b border-[#D4C5B0]/70 dark:border-white/[0.06]">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Category Pre-Title */}
        <div className="flex items-center space-x-3">
          <span className="w-8 h-[1px] bg-[#6E1A29] dark:bg-[#D48B96]" />
          <span className="text-[10px] font-sans-modern tracking-[0.35em] uppercase font-bold text-[#6E1A29] dark:text-[#D48B96]">
            01 • ABOUT THE DESIGNER
          </span>
        </div>

        {/* Main Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Portrait & Visual Statement */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-[#DCD0BF] dark:border-white/10 group" data-cursor="view">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85" 
                alt="Hetvi Kapadia — Fashion Designer" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#150F11]/90 via-[#150F11]/25 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-[#E5DAC8]">
                  INDUS UNIVERSITY • B.DES FASHION DESIGN
                </span>
                <h3 className="text-2xl font-serif-luxury font-bold text-[#FAF6F0]">
                  HETVI KAPADIA
                </h3>
                <p 
                  id="about-designer-role"
                  className="text-xs sm:text-sm font-sans-modern tracking-[0.2em] uppercase font-medium text-[#FAF6F0]/90"
                >
                  Fashion Designer
                </p>
              </div>
            </div>

            {/* Micro Quote */}
            <div className={`p-6 rounded-2xl border ${
              isDarkTheme ? 'bg-[#280D1A]/90 border-[#6E1A29]/40' : 'bg-[#FCFAF7] border-[#DCD0BF]'
            }`}>
              <p className="text-xs italic font-serif-luxury leading-relaxed text-[#221B1C]/90 dark:text-[#F3EBE6]/90">
                "Fashion is neither purely ornament nor static geometry; it is an architectural carapace that negotiates human movement, ancestral memory, and zero-waste responsibility."
              </p>
            </div>
          </div>

          {/* Right Column: Bio & Core Philosophical Pillars */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-bold tracking-tight leading-tight text-[#5C1322] dark:text-[#FAF6F0]">
                BRIDGING ANCESTRAL GUJARATI CRAFT WITH SCULPTURAL FUTURISM.
              </h2>
              <p className="text-sm sm:text-base font-sans-modern text-[#221B1C]/80 dark:text-[#F3EBE6]/80 leading-relaxed font-light">
                Hetvi Kapadia is an Indian fashion designer trained at Indus University. Her practice operates at the intersection of Brutalist architectural tailoring, ancestral Gujarati craft revival (Double-Ikat Patan Patola, Bandhani, and Zardozi), and circular zero-waste engineering systems.
              </p>
            </div>

            {/* 3 Core Philosophical Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-[#D4C5B0]/70 dark:border-white/10">
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold text-[#6E1A29] dark:text-[#D48B96] tracking-widest uppercase">
                  PILLAR 01
                </span>
                <h4 className="text-base font-serif-luxury font-bold text-[#221B1C] dark:text-[#FAF6F0]">
                  Architectural Rigor
                </h4>
                <p className="text-xs font-sans-modern text-[#221B1C]/70 dark:text-[#F3EBE6]/70 leading-relaxed">
                  Deconstructed tailoring, exposed corset boning, internal horsehair canvas, and origami accordion pleating.
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold text-[#6E1A29] dark:text-[#D48B96] tracking-widest uppercase">
                  PILLAR 02
                </span>
                <h4 className="text-base font-serif-luxury font-bold text-[#221B1C] dark:text-[#FAF6F0]">
                  Craft Ancestry
                </h4>
                <p className="text-xs font-sans-modern text-[#221B1C]/70 dark:text-[#F3EBE6]/70 leading-relaxed">
                  Preserving indigenous weaving lineages of Patan and Kutch through contemporary sculptural silhouettes.
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold text-[#6E1A29] dark:text-[#D48B96] tracking-widest uppercase">
                  PILLAR 03
                </span>
                <h4 className="text-base font-serif-luxury font-bold text-[#221B1C] dark:text-[#FAF6F0]">
                  Circular Ecology
                </h4>
                <p className="text-xs font-sans-modern text-[#221B1C]/70 dark:text-[#F3EBE6]/70 leading-relaxed">
                  100% pre-consumer scrap recovery, water-soluble stabilizer couching, and zero-waste pattern interlocking.
                </p>
              </div>
            </div>

            {/* Key Facts Matrix */}
            <div className={`p-6 rounded-2xl border grid grid-cols-2 sm:grid-cols-4 gap-4 text-center ${
              isDarkTheme ? 'bg-[#280D1A]/90 border-[#6E1A29]/40' : 'bg-[#FCFAF7] border-[#DCD0BF]'
            }`}>
              <div>
                <span className="block text-2xl font-serif-luxury font-bold text-[#6E1A29] dark:text-[#D48B96]">06</span>
                <span className="text-[9px] font-sans-modern uppercase tracking-wider opacity-70">Master Looks</span>
              </div>
              <div>
                <span className="block text-2xl font-serif-luxury font-bold text-[#6E1A29] dark:text-[#D48B96]">100%</span>
                <span className="text-[9px] font-sans-modern uppercase tracking-wider opacity-70">Circular Trace</span>
              </div>
              <div>
                <span className="block text-2xl font-serif-luxury font-bold text-[#6E1A29] dark:text-[#D48B96]">3D</span>
                <span className="text-[9px] font-sans-modern uppercase tracking-wider opacity-70">Virtual Simulation</span>
              </div>
              <div>
                <span className="block text-2xl font-serif-luxury font-bold text-[#6E1A29] dark:text-[#D48B96]">2026</span>
                <span className="text-[9px] font-sans-modern uppercase tracking-wider opacity-70">Capsule Year</span>
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-2">
              <button
                onClick={onExploreWork}
                data-cursor="link"
                className="px-8 py-3.5 rounded-full bg-[#6E1A29] hover:bg-[#802031] text-[#FAF6F0] text-[11px] font-sans-modern tracking-[0.2em] uppercase font-semibold flex items-center space-x-3 shadow-lg hover:shadow-xl transition-all active:scale-95"
              >
                <span>View Curated Archive</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
