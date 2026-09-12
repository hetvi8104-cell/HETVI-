import React from 'react';
import { Download, Award, GraduationCap, Wrench } from 'lucide-react';

interface CvSectionProps {
  isDarkTheme: boolean;
}

export const CvSection: React.FC<CvSectionProps> = ({ isDarkTheme }) => {
  return (
    <section id="cv" className="relative w-full py-28 px-6 md:px-12 lg:px-20 border-b border-[#D4C5B0]/70 dark:border-white/[0.06]">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Pre-Title & Action Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#D4C5B0]/70 dark:border-white/10 pb-8">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center space-x-3">
              <span className="w-8 h-[1px] bg-[#6E1A29] dark:bg-[#D48B96]" />
              <span className="text-[10px] font-sans-modern tracking-[0.35em] uppercase font-bold text-[#6E1A29] dark:text-[#D48B96]">
                06 • CURRICULUM VITAE
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-bold tracking-tight text-[#5C1322] dark:text-[#FAF6F0]">
              EDUCATION & MASTERIES
            </h2>
            <p className="text-xs sm:text-sm font-sans-modern text-[#221B1C]/75 dark:text-[#F3EBE6]/75 leading-relaxed">
              Academic credentials, technical craft proficiencies, exhibition history, and circular design research.
            </p>
          </div>

          <a
            href="/hetvi_kapadia_cv.pdf"
            download="Hetvi_Kapadia_CV.pdf"
            target="_blank"
            rel="noreferrer"
            data-cursor="link"
            className="px-6 py-3 rounded-full border border-[#6E1A29] text-[#6E1A29] hover:bg-[#6E1A29] hover:text-[#FAF6F0] dark:border-[#D48B96] dark:text-[#D48B96] dark:hover:bg-[#6E1A29] dark:hover:text-[#FAF6F0] transition-all text-[10px] font-sans-modern tracking-[0.2em] uppercase font-bold flex items-center space-x-2.5 shadow-sm active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Dossier (PDF)</span>
          </a>
        </div>

        {/* 3 Column Systematic CV Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Column 1: Education & Foundation */}
          <div className={`p-8 rounded-3xl border space-y-6 ${
            isDarkTheme ? 'bg-[#280D1A]/90 border-[#6E1A29]/40' : 'bg-[#FCFAF7] border-[#DCD0BF]'
          }`}>
            <div className="flex items-center space-x-3 text-[#6E1A29] dark:text-[#D48B96]">
              <GraduationCap className="w-5 h-5" />
              <h3 className="text-sm font-sans-modern tracking-[0.2em] uppercase font-bold text-current">
                Academic Background
              </h3>
            </div>

            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-mono opacity-60">2022 — 2026</span>
                <h4 className="text-base font-serif-luxury font-bold text-[#5C1322] dark:text-[#FAF6F0]">
                  Bachelor of Design (B.Des)
                </h4>
                <p className="text-xs font-sans-modern text-[#6E1A29] dark:text-[#D48B96] font-semibold">
                  Fashion & Textile Design
                </p>
                <p className="text-xs font-sans-modern opacity-80 pt-1 leading-relaxed">
                  Indus University, Institute of Design Environment & Architecture (IDEA), Ahmedabad, Gujarat.
                </p>
              </div>

              <div className="pt-4 border-t border-current/10 space-y-1">
                <span className="text-[10px] font-mono opacity-60">Focus Areas</span>
                <p className="text-xs font-sans-modern opacity-85 leading-relaxed">
                  Architectural Tailoring, Heritage Textile Revival, Zero-Waste Pattern Engineering, CLO3D Digital Prototyping.
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: Technical Craft & Digital Masteries */}
          <div className={`p-8 rounded-3xl border space-y-6 ${
            isDarkTheme ? 'bg-[#280D1A]/90 border-[#6E1A29]/40' : 'bg-[#FCFAF7] border-[#DCD0BF]'
          }`}>
            <div className="flex items-center space-x-3 text-[#6E1A29] dark:text-[#D48B96]">
              <Wrench className="w-5 h-5" />
              <h3 className="text-sm font-sans-modern tracking-[0.2em] uppercase font-bold text-current">
                Technical Masteries
              </h3>
            </div>

            <div className="space-y-4 text-xs font-sans-modern">
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase font-bold tracking-wider opacity-60">
                  Digital Prototyping & CAD
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {['CLO3D', 'Adobe Illustrator', 'Photoshop', 'Pattern Vectors', 'Three.js Virtual'].map((skill, i) => (
                    <span 
                      key={i} 
                      className={`px-2.5 py-1 rounded-md border text-[10px] ${
                        isDarkTheme ? 'bg-white/5 border-white/10 text-stone-300' : 'bg-[#EFE8DE] border-[#D4C5B0] text-[#221B1C]'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5 pt-2">
                <span className="text-[10px] uppercase font-bold tracking-wider opacity-60">
                  Couture Construction
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {['Bespoke Draping', 'Horsehair Pad-Stitching', 'Spiral Boning', 'Origami Pleating', 'French Seaming'].map((skill, i) => (
                    <span 
                      key={i} 
                      className={`px-2.5 py-1 rounded-md border text-[10px] ${
                        isDarkTheme ? 'bg-white/5 border-white/10 text-stone-300' : 'bg-[#EFE8DE] border-[#D4C5B0] text-[#221B1C]'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5 pt-2">
                <span className="text-[10px] uppercase font-bold tracking-wider opacity-60">
                  Heritage Craft Lineages
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {['Double-Ikat Patola', 'Bandhani Micro-Tying', 'Zardozi Gold Couching', 'Deadstock Mosaic'].map((skill, i) => (
                    <span 
                      key={i} 
                      className={`px-2.5 py-1 rounded-md border text-[10px] ${
                        isDarkTheme ? 'bg-white/5 border-white/10 text-stone-300' : 'bg-[#EFE8DE] border-[#D4C5B0] text-[#221B1C]'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Exhibitions & Honors */}
          <div className={`p-8 rounded-3xl border space-y-6 ${
            isDarkTheme ? 'bg-[#280D1A]/90 border-[#6E1A29]/40' : 'bg-[#FCFAF7] border-[#DCD0BF]'
          }`}>
            <div className="flex items-center space-x-3 text-[#6E1A29] dark:text-[#D48B96]">
              <Award className="w-5 h-5" />
              <h3 className="text-sm font-sans-modern tracking-[0.2em] uppercase font-bold text-current">
                Exhibitions & Honors
              </h3>
            </div>

            <div className="space-y-4 text-xs font-sans-modern">
              <div className="space-y-1 border-b border-current/10 pb-3">
                <div className="flex justify-between items-center">
                  <span className="font-bold font-serif-luxury text-[#5C1322] dark:text-[#FAF6F0]">The Monolith & Mulmul</span>
                  <span className="text-[10px] font-mono opacity-50">2026</span>
                </div>
                <p className="opacity-75 text-[11px]">Solo Graduate Capsule Exhibition, IDEA Gallery, Ahmedabad</p>
              </div>

              <div className="space-y-1 border-b border-current/10 pb-3">
                <div className="flex justify-between items-center">
                  <span className="font-bold font-serif-luxury text-[#5C1322] dark:text-[#FAF6F0]">Circular Craft Innovation Award</span>
                  <span className="text-[10px] font-mono opacity-50">2025</span>
                </div>
                <p className="opacity-75 text-[11px]">Finalist, Gujarat Handloom & Handicrafts Directorate</p>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold font-serif-luxury text-[#5C1322] dark:text-[#FAF6F0]">Contemporary Ethnic Biennale</span>
                  <span className="text-[10px] font-mono opacity-50">2024</span>
                </div>
                <p className="opacity-75 text-[11px]">Curated Presentation: "The Patola Rebirth & Zero Waste"</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
