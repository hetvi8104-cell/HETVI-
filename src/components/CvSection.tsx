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
                <span className="text-[10px] font-mono opacity-60">Bachelor's Degree</span>
                <h4 className="text-base font-serif-luxury font-bold text-[#5C1322] dark:text-[#FAF6F0]">
                  Bachelors in Fashion Designing
                </h4>
                <p className="text-xs font-sans-modern text-[#6E1A29] dark:text-[#D48B96] font-semibold">
                  Indus University
                </p>
                <p className="text-xs font-sans-modern opacity-80 pt-1 leading-relaxed">
                  Overall: 9 CGPA <br/>
                  Minor: Sustainable Studies (9 grade)
                </p>
              </div>

              <div className="pt-4 border-t border-current/10 space-y-1">
                <span className="text-[10px] font-mono opacity-60">2021 — 2023</span>
                <h4 className="text-sm font-serif-luxury font-bold text-[#5C1322] dark:text-[#FAF6F0]">
                  Amicus International School
                </h4>
                <p className="text-xs font-sans-modern opacity-85 leading-relaxed">
                  Standard 11th & 12th (Secondary) <br/>
                  Achieved: 80% in 12th
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
                  Digital Tools & Software
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {['Procreate', 'Illustrator', 'Photoshop', 'Canva', 'Microsoft Office'].map((skill, i) => (
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
                  Core Competencies
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {['Draping', 'Pattern Making', 'Embroidery', 'Hardworking', 'Quick Learner'].map((skill, i) => (
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
                  Languages
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {['Gujarati', 'Hindi', 'English'].map((skill, i) => (
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

          {/* Column 3: Workshops & Interests */}
          <div className={`p-8 rounded-3xl border space-y-6 ${
            isDarkTheme ? 'bg-[#280D1A]/90 border-[#6E1A29]/40' : 'bg-[#FCFAF7] border-[#DCD0BF]'
          }`}>
            <div className="flex items-center space-x-3 text-[#6E1A29] dark:text-[#D48B96]">
              <Award className="w-5 h-5" />
              <h3 className="text-sm font-sans-modern tracking-[0.2em] uppercase font-bold text-current">
                Workshops & Interests
              </h3>
            </div>

            <div className="space-y-4 text-xs font-sans-modern">
              <div className="space-y-1.5 border-b border-current/10 pb-3">
                <span className="text-[10px] uppercase font-bold tracking-wider opacity-60">
                  Workshops
                </span>
                <ul className="list-disc list-inside space-y-1 opacity-80 pt-1">
                  <li>Calligraphy & Mandala art</li>
                  <li>Upcycled coconut shell waste (Egai craft)</li>
                  <li>Upcycled waste newspaper baskets (Wellpaper)</li>
                  <li>Eco-printing (Yakshi studio) & Cynotype printing</li>
                  <li>Kolam rangoli & Paper mache art</li>
                  <li>Pedilite workshop (pottery)</li>
                </ul>
              </div>

              <div className="space-y-1.5 pt-2">
                <span className="text-[10px] uppercase font-bold tracking-wider opacity-60">
                  Hobbies & Interests
                </span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {['Dancing', 'Bharatnatyam (6 yrs)', 'Drawing', 'Playing', 'Travelling', 'Styling', 'Nail Artist'].map((hobby, i) => (
                    <span 
                      key={i} 
                      className={`px-2 py-0.5 rounded-full border text-[9px] uppercase ${
                        isDarkTheme ? 'bg-white/5 border-white/10 text-stone-300' : 'bg-[#EFE8DE] border-[#D4C5B0] text-[#221B1C]'
                      }`}
                    >
                      {hobby}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
