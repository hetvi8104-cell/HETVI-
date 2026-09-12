import React, { useState } from 'react';
import { PageContent } from '../data/portfolioData';
import { COLOR_PALETTE, GARMENTS_DATA, SECTIONS_META, TEXTILE_SAMPLES } from '../data/garmentsData';
import { ImagePlaceholder } from './ImagePlaceholder';
import { ThreeClothPreview } from './ThreeClothPreview';
import { sounds } from '../utils/soundEffects';
import { 
  Compass, 
  Scissors, 
  Palette, 
  Sparkles, 
  Layers, 
  ArrowRight, 
  Box, 
  RefreshCw, 
  CheckCircle2, 
  Mail, 
  Instagram, 
  MapPin, 
  ExternalLink,
  Maximize2
} from 'lucide-react';

interface SlideViewerProps {
  page: PageContent;
  onNavigateToSlide: (pageNumber: number) => void;
  onOpenAtelier: () => void;
  onOpenTextileLab: () => void;
  onOpenSustainable: () => void;
}

export const SlideViewer: React.FC<SlideViewerProps> = ({
  page,
  onNavigateToSlide,
  onOpenAtelier,
  onOpenTextileLab,
  onOpenSustainable
}) => {
  const currentSection = SECTIONS_META.find((s) => s.id === page.sectionId) || SECTIONS_META[0];

  // Helper to render custom slide content based on pageNumber
  const renderSlideBody = () => {
    switch (page.pageNumber) {
      // PAGE 01: COVER PAGE
      case 1:
        return (
          <div className="relative w-full h-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-14">
            {/* Left Editorial Spine Marker (hidden on small screens) */}
            <div className="hidden xl:flex flex-col items-center justify-center gap-4 py-8">
              <div className="h-16 w-[1px] bg-[#5A1F2B] opacity-30"></div>
              <span className="writing-vertical-rl rotate-180 uppercase tracking-[0.4em] text-[10px] opacity-40 font-bold text-[#5A1F2B]">
                01 Introduction
              </span>
              <div className="h-16 w-[1px] bg-[#5A1F2B] opacity-30"></div>
            </div>

            {/* Left Oversized Editorial Typography */}
            <div className="flex-1 flex flex-col justify-center space-y-6 max-w-2xl">
              <div className="flex items-center space-x-3">
                <span className="w-10 h-[1px] bg-[#5A1F2B]" />
                <span className="text-[10px] font-sans-modern tracking-[0.35em] text-[#5A1F2B] uppercase font-bold">
                  Indus University • 2026
                </span>
              </div>

              <div className="space-y-2">
                <h1 className="font-serif-luxury text-[52px] sm:text-[76px] lg:text-[96px] xl:text-[108px] leading-[0.9] text-[#5A1F2B] font-normal tracking-tight">
                  HETVI<br />
                  <span className="font-light italic text-[#262223]">KAPADIA</span>
                </h1>
                <p className="text-xs sm:text-sm font-sans-modern tracking-[0.35em] text-[#722F37] uppercase font-semibold pt-1">
                  Fashion Design Portfolio
                </p>
              </div>

              {/* Editorial Left Border Summary Quote */}
              <div className="border-l border-[#5A1F2B] pl-6 text-[13px] leading-relaxed tracking-wide opacity-80 font-light text-[#262223] max-w-lg space-y-1">
                <p className="font-semibold text-xs tracking-wider uppercase text-[#5A1F2B]">
                  Western Tailoring • Indian Ethnic • Circular Systems
                </p>
                <p className="text-xs text-stone-600 font-sans-modern">
                  42-Page Comprehensive Fashion Design Graduation Portfolio & Virtual 3D Atelier.
                </p>
              </div>

              <p className="text-sm font-serif-luxury italic text-stone-600 max-w-md">
                "{page.quote}"
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => {
                    sounds.playSlideTransition();
                    onNavigateToSlide(2);
                  }}
                  className="px-8 py-3.5 md:py-4 bg-[#5A1F2B] hover:bg-[#722F37] text-white text-[10px] tracking-[0.3em] uppercase transition-all flex items-center gap-4 group shadow-md hover:shadow-lg"
                >
                  <span>Enter Portfolio</span>
                  <span className="w-8 h-[1px] bg-white/40 group-hover:w-12 transition-all" />
                </button>

                <button
                  onClick={() => {
                    sounds.playClick();
                    onOpenAtelier();
                  }}
                  className="px-6 py-3.5 md:py-4 border border-[#262223]/20 hover:border-[#5A1F2B] text-[#262223] hover:text-[#5A1F2B] text-[10px] tracking-[0.25em] uppercase font-semibold transition-all flex items-center space-x-2"
                >
                  <Box className="w-3.5 h-3.5 text-[#5A1F2B]" />
                  <span>3D Atelier</span>
                </button>

                <button
                  onClick={() => {
                    sounds.playSlideTransition();
                    onNavigateToSlide(3);
                  }}
                  className="text-stone-500 hover:text-[#5A1F2B] text-[10px] font-sans-modern tracking-[0.2em] uppercase transition-all"
                >
                  Index (42 Pages)
                </button>
              </div>
            </div>

            {/* Right Hero Fashion Frame */}
            <div className="w-full lg:w-[440px] xl:w-[480px] shrink-0 relative">
              <ImagePlaceholder
                slotId="cover_hero"
                label="UPLOAD COVER HERO FASHION IMAGE"
                placeholderHint="Editorial Hero Fashion Photograph / Illustration"
                defaultUrl={page.visualSlots?.[0]?.defaultUrl || ''}
                aspectRatio="aspect-[3/4]"
                caption="Signature Architectural Silhouette | Ahmedabad"
              />
            </div>

            {/* Ghost Background Typography */}
            <div className="absolute right-0 bottom-0 pointer-events-none select-none font-serif-luxury text-[100px] xl:text-[140px] opacity-[0.03] text-[#5A1F2B] font-bold leading-none -z-0">
              42 Pages
            </div>
          </div>
        );

      // PAGE 02: ABOUT ME
      case 2:
        return (
          <div className="w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 space-y-4">
              <ImagePlaceholder
                slotId="designer_portrait"
                label="UPLOAD DESIGNER PORTRAIT"
                placeholderHint="Professional Designer Portrait"
                defaultUrl={page.visualSlots?.[0]?.defaultUrl || ''}
                aspectRatio="aspect-[4/5]"
                caption="Hetvi Kapadia — Fashion Designer"
              />
              <div className="p-4 rounded-xl bg-[#F7F3EC] border border-[#D8C7B5]/60 text-center">
                <span className="text-[10px] font-sans-modern tracking-widest text-[#9A6670] uppercase font-bold">
                  Academic Affiliation
                </span>
                <p className="text-xs font-serif-luxury font-semibold text-[#262223] mt-0.5">
                  Indus University, Ahmedabad
                </p>
                <p className="text-[10px] text-stone-500 font-sans-modern">
                  Department of Fashion Design & Technology
                </p>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-sans-modern uppercase tracking-[0.25em] text-[#722F37] font-semibold">
                  Biography & Creative Journey
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-[#262223]">
                  ABOUT THE DESIGNER
                </h2>
              </div>

              <div className="space-y-3 text-stone-700 font-sans-modern text-xs sm:text-sm leading-relaxed">
                {page.bodyText?.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Design Philosophy Block */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#5A1F2B]/5 border border-[#5A1F2B]/20 space-y-1.5">
                <span className="text-[10px] font-sans-modern tracking-widest text-[#5A1F2B] uppercase font-bold">
                  Design Philosophy
                </span>
                <p className="text-sm sm:text-base font-serif-luxury italic text-[#262223] leading-snug">
                  {page.quote}
                </p>
              </div>

              {/* Core Interests Tags */}
              <div className="space-y-2.5">
                <span className="text-xs font-sans-modern uppercase tracking-widest text-stone-500 font-semibold">
                  Core Technical & Design Competencies
                </span>
                <div className="flex flex-wrap gap-2">
                  {page.bulletPoints?.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-lg bg-[#E8DDD0]/50 border border-[#D8C7B5]/60 text-xs font-sans-modern text-[#262223]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      // PAGE 03: INDEX
      case 3:
        return (
          <div className="w-full h-full flex flex-col justify-between space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-sans-modern uppercase tracking-[0.25em] text-[#722F37] font-semibold">
                Complete Portfolio Directory
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-[#262223]">
                INDEX OF 08 CHAPTERS
              </h2>
              <p className="text-xs text-stone-600 font-sans-modern">
                Click any section below to navigate instantly across the 42-page portfolio presentation.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-1 items-stretch">
              {SECTIONS_META.map((sec) => (
                <div
                  key={sec.id}
                  onClick={() => {
                    sounds.playSlideTransition();
                    onNavigateToSlide(sec.startPage);
                  }}
                  className="p-5 rounded-2xl bg-white border border-[#D8C7B5]/70 shadow-2xs hover:shadow-xl hover:border-[#5A1F2B] transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-serif-luxury font-bold px-2 py-0.5 rounded bg-[#5A1F2B]/10 text-[#5A1F2B]">
                        SECTION {sec.number}
                      </span>
                      <span className="text-[10px] text-stone-400 font-sans-modern">
                        p. {sec.startPage < 10 ? `0${sec.startPage}` : sec.startPage}–{sec.endPage}
                      </span>
                    </div>
                    <h3 className="text-base font-serif-luxury font-bold text-[#262223] group-hover:text-[#722F37] transition-colors">
                      {sec.title}
                    </h3>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-sans-modern text-stone-500 group-hover:text-[#5A1F2B]">
                    <span>Explore Section</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      // PAGE 04: DESIGN PHILOSOPHY & COLLECTION OVERVIEW
      case 4:
        return (
          <div className="w-full h-full flex flex-col justify-between space-y-6">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <span className="text-xs font-sans-modern uppercase tracking-[0.25em] text-[#722F37] font-semibold">
                Dual Capsule Direction
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif-luxury font-bold text-[#262223]">
                {page.quote}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 items-stretch">
              {/* Western Capsule Card */}
              <div className="p-6 rounded-2xl bg-white border border-[#D8C7B5] flex flex-col justify-between space-y-4 shadow-sm">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-sans-modern uppercase tracking-widest text-[#5A1F2B] font-bold">
                      Capsule 01
                    </span>
                    <span className="text-[11px] font-sans-modern text-stone-500">3 Garments (W-01 to W-03)</span>
                  </div>
                  <h3 className="text-2xl font-serif-luxury font-bold text-[#262223]">
                    WESTERN COLLECTION
                  </h3>
                  <p className="text-xs text-stone-600 font-sans-modern leading-relaxed">
                    Architectural deconstruction, angular tailored trench coats, internal boned corsetry, and origami-pleated culottes. A dialogue on structural tension and effortless drape.
                  </p>
                </div>
                <ImagePlaceholder
                  slotId="overview_western_preview"
                  label="UPLOAD WESTERN COLLECTION OVERVIEW"
                  placeholderHint="Western Silhouette Image"
                  defaultUrl={page.visualSlots?.[0]?.defaultUrl || ''}
                  aspectRatio="aspect-[16/9]"
                  caption="Western Tailoring: Sculptural Deconstruction"
                />
              </div>

              {/* Ethnic Capsule Card */}
              <div className="p-6 rounded-2xl bg-white border border-[#D8C7B5] flex flex-col justify-between space-y-4 shadow-sm">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-sans-modern uppercase tracking-widest text-[#722F37] font-bold">
                      Capsule 02
                    </span>
                    <span className="text-[11px] font-sans-modern text-stone-500">3 Garments (E-01 to E-03)</span>
                  </div>
                  <h3 className="text-2xl font-serif-luxury font-bold text-[#262223]">
                    ETHNIC COLLECTION
                  </h3>
                  <p className="text-xs text-stone-600 font-sans-modern leading-relaxed">
                    Modernized Gujarati Bandhani, upcycled deadstock Patola concept saree, and hand-embroidered Mughal velvet Angrakha ensembles. Reinterpreting royal heritage for the contemporary muse.
                  </p>
                </div>
                <ImagePlaceholder
                  slotId="overview_ethnic_preview"
                  label="UPLOAD ETHNIC COLLECTION OVERVIEW"
                  placeholderHint="Ethnic Silhouette Image"
                  defaultUrl={page.visualSlots?.[1]?.defaultUrl || ''}
                  aspectRatio="aspect-[16/9]"
                  caption="Ethnic Heritage: Modernized Craft & Cording"
                />
              </div>
            </div>
          </div>
        );

      // PAGE 12: COLOUR BOARD
      case 12:
        return (
          <div className="w-full h-full flex flex-col justify-between space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-sans-modern uppercase tracking-[0.25em] text-[#722F37] font-semibold">
                Harmonic Colour Architecture
              </span>
              <h2 className="text-3xl font-serif-luxury font-bold text-[#262223]">
                COLOUR BOARD & RATIO SYSTEM
              </h2>
              <p className="text-xs text-stone-600 font-sans-modern">
                Visual ratio: 45% Ivory/Off-White + 25% Beige + 20% Wine/Burgundy + 10% Charcoal Definition.
              </p>
            </div>

            {/* Proportion Bar */}
            <div className="w-full h-8 rounded-xl overflow-hidden flex shadow-inner border border-[#D8C7B5]">
              {COLOR_PALETTE.map((c) => (
                <div
                  key={c.name}
                  style={{ width: `${c.proportion}%`, backgroundColor: c.hex }}
                  className="h-full relative group cursor-pointer transition-all hover:brightness-110"
                  title={`${c.name}: ${c.proportion}% (${c.hex})`}
                />
              ))}
            </div>

            {/* Swatch Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 flex-1 overflow-y-auto">
              {COLOR_PALETTE.map((c) => (
                <div
                  key={c.name}
                  className="p-3.5 rounded-xl bg-white border border-[#D8C7B5]/60 flex items-start space-x-3.5 shadow-2xs hover:shadow-md transition-all"
                >
                  <div
                    className="w-10 h-10 rounded-lg shrink-0 border border-stone-200 shadow-inner"
                    style={{ backgroundColor: c.hex }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-serif-luxury font-bold text-[#262223] truncate">
                        {c.name}
                      </h4>
                      <span className="text-[10px] font-sans-modern text-[#5A1F2B] font-bold">
                        {c.proportion}%
                      </span>
                    </div>
                    <p className="text-[10px] font-mono text-stone-400 mt-0.5">{c.hex} • {c.rgb}</p>
                    <p className="text-[10px] text-stone-600 font-sans-modern mt-1 line-clamp-2">
                      {c.usage}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      // PAGE 22: COLLECTION LINE-UP
      case 22:
        return (
          <div className="w-full h-full flex flex-col justify-between space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-sans-modern uppercase tracking-[0.25em] text-[#722F37] font-semibold">
                Runway Lineup Sequence
              </span>
              <h2 className="text-3xl font-serif-luxury font-bold text-[#262223]">
                FULL COLLECTION LINE-UP: 06 LOOKS
              </h2>
              <p className="text-xs text-stone-600 font-sans-modern">
                W-01 to W-03 (Western Tailoring) | E-01 to E-03 (Ethnic Heritage)
              </p>
            </div>

            {/* 6-Card Horizontal Lineup */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 flex-1 items-stretch">
              {GARMENTS_DATA.map((g, idx) => (
                <div
                  key={g.id}
                  onClick={() => {
                    const targetSlide = idx < 3 ? 23 + idx * 2 : 30 + (idx - 3) * 2;
                    sounds.playSlideTransition();
                    onNavigateToSlide(targetSlide);
                  }}
                  className="bg-white border border-[#D8C7B5] rounded-xl overflow-hidden p-2.5 flex flex-col justify-between shadow-2xs hover:shadow-xl hover:border-[#5A1F2B] transition-all cursor-pointer group"
                >
                  <div className="relative aspect-[3/5] bg-stone-100 rounded-lg overflow-hidden">
                    <img
                      src={g.defaultIllustration}
                      alt={g.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded bg-black/70 text-[9px] font-sans-modern font-bold text-white">
                      {g.code}
                    </div>
                  </div>

                  <div className="pt-2 text-center space-y-0.5">
                    <h4 className="text-[11px] font-serif-luxury font-bold text-[#262223] truncate">
                      {g.name}
                    </h4>
                    <p className="text-[9px] text-[#722F37] font-sans-modern truncate">
                      {idx < 3 ? 'Western Capsule' : 'Ethnic Capsule'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      // TECHNICAL DETAILS PAGES (24, 26, 28, 31, 33, 35)
      case 24:
      case 26:
      case 28:
      case 31:
      case 33:
      case 35: {
        const lookIdx = page.techData?.lookIndex ?? 0;
        const currentLook = GARMENTS_DATA[lookIdx];

        return (
          <div className="w-full h-full flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#D8C7B5]/50">
              <div>
                <span className="text-[10px] font-sans-modern uppercase tracking-[0.2em] text-[#5A1F2B] font-bold">
                  Technical Specification Sheet • {currentLook.code}
                </span>
                <h2 className="text-2xl font-serif-luxury font-bold text-[#262223]">
                  {currentLook.name} — TECHPACK & FLATS
                </h2>
              </div>
              <button
                onClick={() => {
                  sounds.playClick();
                  onOpenAtelier();
                }}
                className="hidden sm:flex px-3 py-1.5 rounded-full bg-[#5A1F2B] text-white text-xs font-sans-modern items-center space-x-1.5"
              >
                <Box className="w-3.5 h-3.5" />
                <span>3D Wireframe</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 overflow-y-auto">
              {/* Left CAD Flats */}
              <div className="lg:col-span-6 grid grid-cols-2 gap-3">
                <ImagePlaceholder
                  slotId={page.visualSlots?.[0]?.slotId || `tech_flat_front_${lookIdx}`}
                  label={page.visualSlots?.[0]?.label || 'FRONT TECHNICAL FLAT'}
                  placeholderHint="Vector CAD Drawing - Front"
                  defaultUrl={currentLook.defaultFlatFront}
                  aspectRatio="aspect-[3/4]"
                  caption="CAD Flat: Front View"
                />
                <ImagePlaceholder
                  slotId={page.visualSlots?.[1]?.slotId || `tech_flat_back_${lookIdx}`}
                  label={page.visualSlots?.[1]?.label || 'BACK TECHNICAL FLAT'}
                  placeholderHint="Vector CAD Drawing - Back"
                  defaultUrl={currentLook.defaultFlatBack}
                  aspectRatio="aspect-[3/4]"
                  caption="CAD Flat: Back View"
                />
              </div>

              {/* Right Tech Specs Table */}
              <div className="lg:col-span-6 space-y-4 text-xs font-sans-modern">
                {/* Measurements Sheet */}
                <div className="p-3.5 rounded-xl bg-white border border-[#D8C7B5]/60 space-y-2">
                  <h4 className="font-bold text-[#5A1F2B] uppercase tracking-wider text-[11px]">
                    Garment Measurements (Size UK 8 / EU 36)
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {currentLook.measurements.map((m, mIdx) => (
                      <div key={mIdx} className="p-1.5 bg-[#F7F3EC] rounded flex justify-between">
                        <span className="text-stone-600">{m.part}:</span>
                        <span className="font-semibold text-[#262223]">{m.spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Construction & Seams */}
                <div className="p-3.5 rounded-xl bg-white border border-[#D8C7B5]/60 space-y-1.5">
                  <h4 className="font-bold text-[#5A1F2B] uppercase tracking-wider text-[11px]">
                    Construction Architecture
                  </h4>
                  {currentLook.constructionNotes.map((note, nIdx) => (
                    <p key={nIdx} className="text-stone-600 text-[11px] leading-tight">
                      • {note}
                    </p>
                  ))}
                </div>

                {/* Hardware / Trims */}
                <div className="p-3.5 rounded-xl bg-white border border-[#D8C7B5]/60 space-y-1.5">
                  <h4 className="font-bold text-[#5A1F2B] uppercase tracking-wider text-[11px]">
                    Bill of Trims & Fastenings
                  </h4>
                  <div className="space-y-1">
                    {currentLook.trims.map((t, tIdx) => (
                      <div key={tIdx} className="flex items-center justify-between text-[11px]">
                        <span className="font-semibold text-stone-800">{t.item}</span>
                        <span className="text-stone-500">{t.spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }

      // PAGE 38: FABRIC & TRIM SPECIFICATION (BOM)
      case 38:
        return (
          <div className="w-full h-full flex flex-col justify-between space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-sans-modern uppercase tracking-[0.25em] text-[#722F37] font-semibold">
                Production Documentation
              </span>
              <h2 className="text-3xl font-serif-luxury font-bold text-[#262223]">
                MASTER BILL OF MATERIALS (BOM)
              </h2>
              <p className="text-xs text-stone-600 font-sans-modern">
                Comprehensive fabric, lining, trim, and fastening schedule across all 6 capsule garments.
              </p>
            </div>

            {/* Interactive BOM Table */}
            <div className="flex-1 overflow-x-auto bg-white rounded-xl border border-[#D8C7B5] shadow-xs">
              <table className="w-full text-left text-xs font-sans-modern">
                <thead className="bg-[#F7F3EC] border-b border-[#D8C7B5] text-[#5A1F2B] uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-3">Look Code</th>
                    <th className="p-3">Garment Name</th>
                    <th className="p-3">Primary Fabric</th>
                    <th className="p-3">Secondary / Lining</th>
                    <th className="p-3">Hardware & Trims</th>
                    <th className="p-3">Specialty Finish</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {GARMENTS_DATA.map((g) => (
                    <tr key={g.id} className="hover:bg-[#FCFAF7] transition-colors">
                      <td className="p-3 font-bold text-[#5A1F2B]">{g.code}</td>
                      <td className="p-3 font-serif-luxury font-semibold text-[#262223]">{g.name}</td>
                      <td className="p-3 text-stone-700">{g.fabrics[0]?.name} ({g.fabrics[0]?.weight})</td>
                      <td className="p-3 text-stone-600">{g.fabrics[1]?.name || 'Silk Habotai'}</td>
                      <td className="p-3 text-stone-600">{g.trims[0]?.item}</td>
                      <td className="p-3 text-stone-600 italic">{g.keyDetails[0]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      // DEFAULT EDITORIAL SLIDE RENDERER (For all other pages)
      default:
        return (
          <div className="w-full h-full flex flex-col justify-between space-y-6">
            {/* Slide Header */}
            <div className="space-y-1">
              <span className="text-xs font-sans-modern uppercase tracking-[0.25em] text-[#722F37] font-semibold">
                {page.sectionTitle}
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif-luxury font-bold text-[#262223] tracking-tight">
                {page.title}
              </h2>
              {page.subtitle && (
                <p className="text-xs sm:text-sm font-editorial text-stone-600 italic">
                  {page.subtitle}
                </p>
              )}
            </div>

            {/* Center Body & Visuals */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 items-center overflow-y-auto">
              {/* Text Narrative Column */}
              <div className={`${page.visualSlots && page.visualSlots.length > 0 ? 'lg:col-span-6' : 'lg:col-span-12'} space-y-4`}>
                {page.heroTagline && (
                  <p className="text-xs font-sans-modern font-semibold text-[#5A1F2B] tracking-wider uppercase">
                    {page.heroTagline}
                  </p>
                )}

                {page.quote && (
                  <div className="p-4 rounded-xl bg-[#5A1F2B]/5 border-l-2 border-[#5A1F2B]">
                    <p className="text-sm font-serif-luxury italic text-[#262223]">
                      {page.quote}
                    </p>
                  </div>
                )}

                <div className="space-y-3 text-stone-700 font-sans-modern text-xs sm:text-sm leading-relaxed">
                  {page.bodyText?.map((txt, idx) => (
                    <p key={idx}>{txt}</p>
                  ))}
                </div>

                {/* Bullet Points if any */}
                {page.bulletPoints && page.bulletPoints.length > 0 && (
                  <ul className="space-y-1.5 pt-2">
                    {page.bulletPoints.map((bp, bIdx) => (
                      <li key={bIdx} className="text-xs text-stone-700 font-sans-modern flex items-start space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#722F37] mt-1.5 shrink-0" />
                        <span>{bp}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Annotations if any */}
                {page.annotations && page.annotations.length > 0 && (
                  <div className="space-y-2 pt-2">
                    {page.annotations.map((ann, aIdx) => (
                      <div key={aIdx} className="p-3 rounded-lg bg-[#F7F3EC] border border-[#D8C7B5]/60">
                        <span className="text-[10px] font-sans-modern font-bold uppercase tracking-wider text-[#5A1F2B]">
                          {ann.title}
                        </span>
                        <p className="text-xs text-stone-700 font-sans-modern mt-0.5">
                          {ann.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Visual Slots Column */}
              {page.visualSlots && page.visualSlots.length > 0 && (
                <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {page.visualSlots.map((slot) => (
                    <div key={slot.slotId} className={page.visualSlots!.length === 1 ? 'sm:col-span-2' : ''}>
                      <ImagePlaceholder
                        slotId={slot.slotId}
                        label={slot.label}
                        placeholderHint={slot.placeholderHint}
                        defaultUrl={slot.defaultUrl}
                        aspectRatio={page.visualSlots!.length === 1 ? 'aspect-[4/3]' : 'aspect-[3/4]'}
                        caption={slot.caption}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full h-full p-6 sm:p-10 lg:p-14 flex flex-col justify-between select-text animate-in fade-in duration-500">
      {renderSlideBody()}
    </div>
  );
};
