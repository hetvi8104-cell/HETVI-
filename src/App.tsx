/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { ExhibitionNavbar, PortfolioSectionId } from './components/ExhibitionNavbar';
import { EditorialCoverHero } from './components/EditorialCoverHero';
import { AboutSection } from './components/AboutSection';
import { WorkSection } from './components/WorkSection';
import { TextileLabSection } from './components/TextileLabSection';
import { SustainableJourneySection } from './components/SustainableJourneySection';
import { ProcessSection } from './components/ProcessSection';
import { CvSection } from './components/CvSection';
import { ContactSection } from './components/ContactSection';
import { ProjectDeepDiveModal } from './components/ProjectDeepDiveModal';
import { AssetManagerModal } from './components/AssetManagerModal';
import { CustomCursor } from './components/CustomCursor';
import { ExhibitionProject } from './data/exhibitionData';

export default function App() {
  const [activeSection, setActiveSection] = useState<PortfolioSectionId>('hero');
  const [selectedProject, setSelectedProject] = useState<ExhibitionProject | null>(null);
  const [isDeepDiveOpen, setIsDeepDiveOpen] = useState<boolean>(false);
  const [isAssetManagerOpen, setIsAssetManagerOpen] = useState<boolean>(false);
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true);

  // Open Project Inspection Modal
  const handleSelectProject = useCallback((project: ExhibitionProject) => {
    setSelectedProject(project);
    setIsDeepDiveOpen(true);
  }, []);

  // Smooth scroll to target section
  const handleNavigate = useCallback((sectionId: PortfolioSectionId) => {
    setActiveSection(sectionId);
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // Scrollspy to automatically highlight active section in navbar
  useEffect(() => {
    const sections: PortfolioSectionId[] = [
      'hero',
      'about',
      'work',
      'textile',
      'sustainability',
      'process',
      'cv',
      'contact'
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      if (e.key === 'Escape') {
        setIsDeepDiveOpen(false);
        setIsAssetManagerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className={`relative w-full min-h-screen transition-colors duration-700 ${
      isDarkTheme 
        ? 'bg-[#220814] text-[#FAF4EF]' 
        : 'bg-[#F5F0EB] text-[#221B1C]'
    }`}>
      {/* High-Fashion Context-Aware Custom Cursor */}
      <CustomCursor />

      {/* Ambient Subtle Grids & Luxury Radial Halos */}
      <div className={`fixed inset-0 pointer-events-none z-0 ${
        isDarkTheme ? 'opacity-[0.045] bg-editorial-dots invert' : 'opacity-[0.035] bg-editorial-dots'
      }`} />
      
      <div className="fixed inset-0 bg-grain opacity-20 pointer-events-none z-0" />
      
      <div className={`fixed -top-32 -left-32 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none z-0 transition-opacity duration-1000 ${
        isDarkTheme ? 'bg-[#6E1A29]/35 opacity-70' : 'bg-[#E5DAC8] opacity-50'
      }`} />
      
      <div className={`fixed -bottom-32 -right-32 w-[650px] h-[650px] rounded-full blur-3xl pointer-events-none z-0 transition-opacity duration-1000 ${
        isDarkTheme ? 'bg-[#4A0B18]/50 opacity-60' : 'bg-[#6E1A29]/8 opacity-35'
      }`} />

      {/* Atmospheric Dark Wine Velvet Light Core */}
      {isDarkTheme && (
        <div className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] bg-[#6E1A29]/15 rounded-full blur-[140px] pointer-events-none z-0" />
      )}

      {/* Top Fixed Minimalist Editorial Navbar */}
      <ExhibitionNavbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenImageManager={() => setIsAssetManagerOpen(true)}
        isDarkTheme={isDarkTheme}
        onToggleTheme={() => setIsDarkTheme(!isDarkTheme)}
      />

      {/* Continuous Single-Page Sections Stack */}
      <main className="relative z-10 w-full flex flex-col">
        {/* 00: Asymmetrical Interactive Fashion-Editorial Cover */}
        <EditorialCoverHero
          onSelectProject={handleSelectProject}
          onExploreClick={() => handleNavigate('about')}
          isDarkTheme={isDarkTheme}
        />

        {/* 01: ABOUT */}
        <AboutSection
          isDarkTheme={isDarkTheme}
          onExploreWork={() => handleNavigate('work')}
        />

        {/* 02: WORK */}
        <WorkSection
          onSelectProject={handleSelectProject}
          isDarkTheme={isDarkTheme}
        />

        {/* 03: TEXTILE */}
        <TextileLabSection
          isDarkTheme={isDarkTheme}
        />

        {/* 04: SUSTAINABILITY */}
        <SustainableJourneySection
          isDarkTheme={isDarkTheme}
        />

        {/* 05: PROCESS */}
        <ProcessSection
          isDarkTheme={isDarkTheme}
        />

        {/* 06: CV */}
        <CvSection
          isDarkTheme={isDarkTheme}
        />

        {/* 07: CONTACT */}
        <ContactSection
          isDarkTheme={isDarkTheme}
          onScrollToTop={() => handleNavigate('hero')}
        />
      </main>

      {/* In-Scene Deep-Dive Inspection Modal */}
      <ProjectDeepDiveModal
        project={selectedProject}
        isOpen={isDeepDiveOpen}
        onClose={() => setIsDeepDiveOpen(false)}
        isDarkTheme={isDarkTheme}
        onSelectProject={setSelectedProject}
      />

      {/* Image & Visual Asset Manager */}
      <AssetManagerModal
        isOpen={isAssetManagerOpen}
        onClose={() => setIsAssetManagerOpen(false)}
        onNavigateToSlide={() => {}}
      />
    </div>
  );
}
