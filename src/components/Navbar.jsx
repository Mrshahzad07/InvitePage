import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { weddingData } from '../data/invitation';
import { useLanguage } from '../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

/**
 * LUXURY FLOATING NAVBAR
 * - Discreet and elegant
 * - Multi-language switcher (English, हिन्दी, اردو)
 * - Provides quick navigation on both mobile and desktop
 */
export default function Navbar({ onNavigateSection }) {
  const { t, isUrdu, isHindi } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'bismillah', label: t.nav.home || 'Invitation' },
    { id: 'couple', label: t.nav.couple || 'Bride & Groom' },
    { id: 'programme', label: t.nav.programme || 'Programme' },
    { id: 'venue', label: t.nav.venue || 'Venue' },
    { id: 'rsvp', label: t.nav.rsvp || 'R.S.V.P.' },
    { id: 'share', label: t.nav.share || 'Share' },
  ];

  const handleNavClick = (id) => {
    onNavigateSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
          scrolled
            ? 'bg-[#06231A]/95 backdrop-blur-md py-2.5 border-b border-[#C9A24B]/30 shadow-lg'
            : 'bg-transparent py-3.5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-3 sm:px-6 flex items-center justify-between gap-2">
          {/* Brand Monogram */}
          <button
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-2 text-left cursor-pointer group shrink-0"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#C9A24B] bg-[#0B3D2E] flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm">
              <span className="font-cinzel text-xs font-bold text-gold-bright tracking-wider">
                FF
              </span>
            </div>
            <div className="hidden sm:block">
              <span className={`text-base sm:text-lg text-[#FFFDF8] block leading-none ${isUrdu ? 'font-urdu' : isHindi ? 'font-poppins font-bold' : 'font-script'}`}>
                {t.couple.brideFull} & {t.couple.groomFull}
              </span>
              <span className="font-cinzel text-[8px] text-[#C9A24B] tracking-[0.2em] uppercase">
                12.12.2026
              </span>
            </div>
          </button>

          {/* Desktop Nav Items + Language Switcher */}
          <div className="hidden md:flex items-center gap-5">
            <nav className="flex items-center gap-5">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-xs text-[#F3E6C4]/85 hover:text-gold-bright transition-colors cursor-pointer ${
                    isUrdu ? 'font-urdu text-sm' : isHindi ? 'font-poppins' : 'font-cinzel tracking-widest uppercase'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Desktop Royal Language Switcher */}
            <LanguageSwitcher />
          </div>

          {/* Mobile Right Bar: Language Switcher + Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <LanguageSwitcher className="scale-90" />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-[#0B3D2E] border border-[#C9A24B]/40 text-[#F3E6C4] cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-29 bg-[#06231A]/95 backdrop-blur-lg flex flex-col justify-center items-center p-6 md:hidden">
          <div className="space-y-5 text-center w-full max-w-xs">
            <div className="w-16 h-16 rounded-full border-2 border-[#C9A24B] bg-[#0B3D2E] mx-auto flex items-center justify-center mb-2 shadow-lg">
              <span className="font-cinzel text-2xl font-bold text-gold-bright tracking-wider">
                FF
              </span>
            </div>

            <p className={`text-xl text-gold-bright font-bold mb-4 ${isUrdu ? 'font-urdu' : isHindi ? 'font-poppins' : 'font-script'}`}>
              {t.couple.brideFull} & {t.couple.groomFull}
            </p>

            {/* Mobile Language Switcher inside Drawer */}
            <div className="flex justify-center mb-4">
              <LanguageSwitcher variant="gate" />
            </div>

            {navItems.map((item) => (
              <div key={item.id}>
                <button
                  onClick={() => handleNavClick(item.id)}
                  className={`text-base text-[#F3E6C4] hover:text-gold-bright transition-colors py-1.5 cursor-pointer ${
                    isUrdu ? 'font-urdu text-lg' : isHindi ? 'font-poppins font-semibold' : 'font-cinzel tracking-[0.2em] uppercase'
                  }`}
                >
                  {item.label}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
