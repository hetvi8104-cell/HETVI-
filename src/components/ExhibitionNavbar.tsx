import React, { useState, useEffect } from 'react';
import { 
  Sun,
  Moon,
  Image as ImageIcon,
  Menu,
  X,
  ArrowUpRight
} from 'lucide-react';

export type PortfolioSectionId = 
  | 'hero' 
  | 'about' 
  | 'work' 
  | 'textile' 
  | 'sustainability' 
  | 'process' 
  | 'cv' 
  | 'contact';

interface ExhibitionNavbarProps {
  activeSection: PortfolioSectionId;
  onNavigate: (sectionId: PortfolioSectionId) => void;
  onOpenImageManager: () => void;
  isDarkTheme: boolean;
  onToggleTheme: () => void;
}

export const ExhibitionNavbar: React.FC<ExhibitionNavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenImageManager,
  isDarkTheme,
  onToggleTheme
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const navLinks: { id: PortfolioSectionId; label: string }[] = [
    { id: 'about', label: 'ABOUT' },
    { id: 'work', label: 'WORK' },
    { id: 'textile', label: 'TEXTILE' },
    { id: 'sustainability', label: 'SUSTAINABILITY' },
    { id: 'process', label: 'PROCESS' },
    { id: 'cv', label: 'CV' },
    { id: 'contact', label: 'CONTACT' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 transition-all duration-500 flex items-center justify-between select-none ${
      isScrolled
        ? isDarkTheme
          ? 'bg-[#220814]/94 backdrop-blur-xl border-b border-[#6E1A29]/45 shadow-[0_12px_32px_rgba(10,2,6,0.6)] py-3.5'
          : 'bg-[#F5F0EB]/92 backdrop-blur-xl border-b border-[#D4C5B0]/80 shadow-xs py-3.5'
        : 'bg-transparent border-b border-transparent'
    }`}>
      {/* Brand Identity / Home Anchor */}
      <button
        onClick={() => onNavigate('hero')}
        className="group text-left focus:outline-none flex flex-col justify-center"
        data-cursor="link"
      >
        <div className="flex items-center space-x-2">
          <span className="text-[10px] tracking-[0.35em] uppercase font-bold text-[#6E1A29] dark:text-[#D48B96]">
            HETVI KAPADIA
          </span>
        </div>
        <div className="flex items-baseline space-x-2">
          <span 
            id="header-atelier-brand"
            className="text-xs md:text-sm font-serif-luxury font-bold tracking-[0.22em] text-[#221B1C] dark:text-[#F3EBE6] transition-colors group-hover:text-[#6E1A29] dark:group-hover:text-[#D48B96] uppercase"
          >
            HK ATELIER
          </span>
        </div>
      </button>

      {/* Elegant Minimal Editorial Navigation Links */}
      <nav className="hidden xl:flex items-center space-x-7">
        {navLinks.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              data-cursor="link"
              className={`relative py-1 text-[10px] font-sans-modern tracking-[0.22em] uppercase font-medium transition-all duration-300 ${
                isActive
                  ? isDarkTheme 
                    ? 'text-white font-bold' 
                    : 'text-[#6E1A29] font-bold'
                  : isDarkTheme
                    ? 'text-stone-400 hover:text-white'
                    : 'text-[#221B1C]/70 hover:text-[#6E1A29]'
              }`}
            >
              <span>{item.label}</span>
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#6E1A29] dark:bg-[#D48B96] transition-all" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Right Controls: Theme + Image Manager + Mobile Toggle */}
      <div className="flex items-center space-x-3">
        {/* Theme Lighting Switcher */}
        <button
          id="header-theme-toggle-btn"
          onClick={onToggleTheme}
          data-cursor="link"
          className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 shadow-2xs hover:shadow-md active:scale-95 ${
            isDarkTheme
              ? 'border-[#6E1A29]/60 bg-[#280D1A]/90 text-[#F59E0B] hover:text-[#FBBF24] hover:border-[#D48B96]/60 hover:bg-[#381123]'
              : 'border-[#D4C5B0] bg-[#FAF6F0] text-[#6E1A29] hover:text-[#8B1E34] hover:border-[#6E1A29]/60 hover:bg-white'
          }`}
          title={isDarkTheme ? 'Switch to Studio Light' : 'Switch to Dark Wine Theme'}
          aria-label="Toggle Theme"
        >
          {isDarkTheme ? (
            <Sun 
              id="header-theme-toggle-icon" 
              className="w-4 h-4 text-[#F59E0B] transition-transform duration-500 ease-out hover:rotate-90" 
              strokeWidth={2}
            />
          ) : (
            <Moon 
              id="header-theme-toggle-icon" 
              className="w-4 h-4 text-[#6E1A29] transition-transform duration-500 ease-out hover:-rotate-45" 
              strokeWidth={2}
            />
          )}
        </button>

        {/* Assets & Image Replacer */}
        <button
          onClick={onOpenImageManager}
          data-cursor="link"
          className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
            isDarkTheme
              ? 'border-[#6E1A29]/40 text-stone-300 hover:text-white hover:border-[#6E1A29] hover:bg-white/[0.08]'
              : 'border-[#D4C5B0] text-[#221B1C] hover:text-[#6E1A29] hover:bg-[#EFE8DE]'
          }`}
          title="Image Asset Manager"
          aria-label="Image Asset Manager"
        >
          <ImageIcon className="w-3.5 h-3.5" />
        </button>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          data-cursor="link"
          className={`xl:hidden w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
            isDarkTheme
              ? 'border-white/15 text-stone-300 hover:text-white'
              : 'border-[#D4C5B0] text-[#221B1C]'
          }`}
          aria-label="Toggle Mobile Menu"
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className={`xl:hidden absolute top-full left-0 right-0 p-6 border-b shadow-2xl transition-all ${
          isDarkTheme ? 'bg-[#220814]/98 border-[#6E1A29]/40 text-white' : 'bg-[#F5F0EB]/98 border-[#D4C5B0] text-[#221B1C]'
        }`}>
          <div className="flex flex-col space-y-3">
            {navLinks.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left py-2.5 px-4 rounded-xl text-xs font-sans-modern tracking-[0.2em] uppercase transition-all flex items-center justify-between ${
                    isActive 
                      ? 'bg-[#6E1A29] text-white font-semibold' 
                      : isDarkTheme ? 'hover:bg-white/5 text-stone-300' : 'hover:bg-[#EFE8DE] text-[#221B1C]'
                  }`}
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
