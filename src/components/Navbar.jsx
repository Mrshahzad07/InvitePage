import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { weddingData } from '../data/invitation';

/**
 * LUXURY FLOATING NAVBAR
 * - Discreet and elegant
 * - Provides quick navigation on both mobile and desktop
 */
export default function Navbar({ onNavigateSection }) {
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
    { id: 'bismillah', label: 'Invitation' },
    { id: 'couple', label: 'Bride & Groom' },
    { id: 'programme', label: 'Programme' },
    { id: 'venue', label: 'Venue' },
    { id: 'rsvp', label: 'R.S.V.P.' },
    { id: 'share', label: 'Share' },
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
            ? 'bg-[#06231A]/90 backdrop-blur-md py-3 border-b border-[#C9A24B]/30 shadow-lg'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          {/* Brand Monogram */}
          <button
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-2.5 text-left cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-full border border-[#C9A24B] bg-[#0B3D2E] flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="font-cinzel text-xs font-bold text-gold-bright tracking-wider">
                FF
              </span>
            </div>
            <div className="hidden sm:block">
              <span className="font-script text-xl text-[#FFFDF8] block leading-none">
                {weddingData.meta.brideFull} & {weddingData.meta.groomFull}
              </span>
              <span className="font-cinzel text-[8px] text-[#C9A24B] tracking-[0.2em] uppercase">
                12.12.2026
              </span>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="font-cinzel text-xs text-[#F3E6C4]/80 hover:text-gold-bright tracking-widest uppercase transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
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
          <div className="space-y-6 text-center">
            <div className="w-16 h-16 rounded-full border-2 border-[#C9A24B] bg-[#0B3D2E] mx-auto flex items-center justify-center mb-6">
              <span className="font-cinzel text-2xl font-bold text-gold-bright tracking-wider">
                FF
              </span>
            </div>
            {navItems.map((item) => (
              <div key={item.id}>
                <button
                  onClick={() => handleNavClick(item.id)}
                  className="font-cinzel text-base text-[#F3E6C4] hover:text-gold-bright tracking-[0.2em] uppercase transition-colors py-2 cursor-pointer"
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
