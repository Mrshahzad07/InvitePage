import React, { useState, useEffect } from 'react';
import { ChevronDown, Heart, Sparkles, Download } from 'lucide-react';
import confetti from 'canvas-confetti';
import { weddingData } from '../data/invitation';
import { generatePersonalizedWeddingPdf } from '../utils/pdfGenerator';

/**
 * SECTION 2: HERO WITH REAL 3D CARTOON COUPLE
 * - Prominent 3D Cartoon Groom & Bride characters (Sherwani/Topi, Emerald Lehenga/Dupatta)
 * - Rotating welcoming speech bubbles
 * - Interactive Mubarak & Salaam buttons
 * - Dulhan first: "Farha Praveen & Md. Firoj"
 * - Dynamic guest greeting banner & Personalized PDF download
 */
export default function Hero({ guestInfo, onNavigateSection }) {
  const [bubbleIndex, setBubbleIndex] = useState(0);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);

  const handleDownloadPdf = async () => {
    setIsDownloadingPdf(true);
    try {
      await generatePersonalizedWeddingPdf(guestInfo.displayName);
      confetti({
        particleCount: 45,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#C9A24B', '#F3E6C4', '#134E3A', '#7A1F2B'],
      });
    } catch (err) {
      console.error('PDF generation error', err);
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  // Welcoming speech bubble messages
  const speechOptions = [
    'Assalamu Alaikum wa Rahmatullahi wa Barakatuh',
    'Welcome to our Wedding Celebration!',
    'Aap sabhi ko dil se dawat hai',
    guestInfo.hasCustomName ? `Khush Amdeed, ${guestInfo.displayName}!` : 'Khush Amdeed - Welcome!',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setBubbleIndex((prev) => (prev + 1) % speechOptions.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [speechOptions.length]);

  const handleSendMubarak = () => {
    confetti({
      particleCount: 50,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#C9A24B', '#F3E6C4', '#10B981', '#7A1F2B'],
    });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-between pt-20 pb-12 px-3 sm:px-6 text-center z-10"
    >
      {/* Top Header Label */}
      <div className="flex flex-col items-center animate-float">
        <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full glass-gold-subtle border border-[#C9A24B]/50 mb-2 shadow-[0_0_20px_rgba(201,162,75,0.2)]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#E5C365] animate-ping" />
          <span className="font-cinzel text-xs font-bold text-[#F3E6C4] tracking-[0.25em] uppercase">
            ROYAL NIKAH INVITATION
          </span>
        </div>

        <div className="font-cinzel text-xs sm:text-sm text-gold-bright tracking-[0.2em] uppercase font-semibold">
          12.12.2026 • Saturday (10:00 PM)
        </div>
      </div>

      {/* Main Center Stage */}
      <div className="max-w-2xl mx-auto my-auto flex flex-col items-center">
        {/* Monogram Medallion */}
        <div className="w-14 h-14 rounded-full border-2 border-[#C9A24B] flex items-center justify-center bg-[#0B3D2E] mb-2 shadow-[0_0_20px_rgba(201,162,75,0.4)]">
          <span className="font-cinzel text-xl font-bold text-gold-bright tracking-widest">
            {weddingData.meta.monogram}
          </span>
        </div>

        {/* Spiritual Invocation */}
        <p className="font-cormorant italic text-sm sm:text-lg text-[#F3E6C4]/90 tracking-wide mt-1 mb-1">
          Together with the blessings of Allah
        </p>

        {/* Bride & Groom Complete Full Names - Dulhan first as requested */}
        <h1 className="font-script text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-gold-bright leading-tight filter drop-shadow-[0_4px_15px_rgba(0,0,0,0.9)] my-0.5">
          {weddingData.meta.brideFull}
        </h1>

        <div className="flex items-center justify-center gap-3 sm:gap-4 my-0.5">
          <div className="h-[1.5px] w-12 sm:w-24 bg-gradient-to-r from-transparent via-[#C9A24B] to-[#C9A24B]" />
          <span className="font-cormorant italic text-xl sm:text-3xl text-[#F3E6C4] px-1 sm:px-2 tracking-wider">
            &
          </span>
          <div className="h-[1.5px] w-12 sm:w-24 bg-gradient-to-l from-transparent via-[#C9A24B] to-[#C9A24B]" />
        </div>

        <h2 className="font-script text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-gold-bright leading-tight filter drop-shadow-[0_4px_15px_rgba(0,0,0,0.9)] my-0.5">
          {weddingData.meta.groomFull}
        </h2>

        <p className="font-poppins text-xs sm:text-sm text-[#F3E6C4]/85 tracking-wider mt-1 mb-2">
          Invite you to celebrate their wedding ceremony
        </p>

        {/* 3D CARTOON BRIDE & GROOM INTERACTIVE SHOWCASE */}
        <div className="relative mt-4 mb-3 flex flex-col items-center w-full max-w-md px-2">
          {/* Animated Welcoming Speech Bubble */}
          <div className="relative mb-3 px-4 sm:px-5 py-2.5 rounded-2xl glass-emerald-card border-2 border-[#C9A24B] shadow-[0_0_25px_rgba(201,162,75,0.4)] w-full max-w-sm sm:max-w-md animate-pulse-glow">
            <p className="font-serif text-xs sm:text-base text-[#FFFDF8] font-bold tracking-wide flex items-center justify-center gap-2">
              <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E5C365] fill-[#E5C365] shrink-0" />
              <span>"{speechOptions[bubbleIndex]}"</span>
            </p>
            {/* Bubble arrow pointing down to couple */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#0B3D2E] border-b-2 border-r-2 border-[#C9A24B] transform rotate-45" />
          </div>

          {/* 3D Cartoon Characters Card */}
          <div className="relative group p-2 rounded-3xl bg-gradient-to-tr from-[#06231A] via-[#0B3D2E] to-[#C9A24B]/40 border-2 border-[#C9A24B] shadow-[0_15px_40px_rgba(0,0,0,0.8)] overflow-hidden w-[250px] h-[250px] sm:w-[320px] sm:h-[320px] max-w-full">
            <img
              src="/couple-cartoon.jpg"
              alt="Cartoon 3D Farha and Firoj Muslim Wedding Couple"
              className="w-full h-full object-cover rounded-2xl filter brightness-105 group-hover:scale-105 transition-transform duration-500"
            />

            {/* Bottom Character Caption matching photo positions (Groom on left, Bride on right) */}
            <div className="absolute bottom-3 left-3 right-3 py-1.5 px-3 rounded-xl bg-[#06231A]/90 backdrop-blur-md border border-[#C9A24B]/50 flex items-center justify-between">
              <span className="font-cinzel text-[10px] sm:text-xs text-[#E5C365] font-bold tracking-wider">
                Md. Firoj (Dulha)
              </span>
              <Heart className="w-3.5 h-3.5 text-[#C9A24B] fill-[#C9A24B]" />
              <span className="font-cinzel text-[10px] sm:text-xs text-[#E5C365] font-bold tracking-wider">
                Farha Praveen (Dulhan)
              </span>
            </div>
          </div>

          {/* Interactive Mubarak & Blessings Buttons */}
          <div className="flex items-center justify-center gap-3 mt-3">
            <button
              onClick={handleSendMubarak}
              className="px-4 py-2 rounded-full bg-[#134E3A] border border-[#C9A24B] text-[#FFFDF8] font-cinzel text-xs font-semibold tracking-wider hover:bg-[#C9A24B] hover:text-[#06231A] transition-all flex items-center gap-1.5 shadow-md cursor-pointer active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E5C365]" />
              <span>Send Mubarak (Blessing)</span>
            </button>
          </div>
        </div>

        {/* Dynamic Guest Salutation Line */}
        <div className="mt-3 px-5 py-2 rounded-full bg-[#06231A]/80 border border-[#C9A24B]/40 shadow-sm">
          <p className="font-poppins text-xs sm:text-sm text-[#C9A24B]">
            {guestInfo.salutation}{' '}
            <span className="font-bold text-[#FFFDF8]">{guestInfo.displayName}</span>
          </p>
        </div>

        {/* Personalized PDF Invitation Card Download Button */}
        <button
          onClick={handleDownloadPdf}
          disabled={isDownloadingPdf}
          className="mt-3.5 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#F3E6C4] via-[#E5C365] to-[#C9A24B] text-[#06231A] font-cinzel text-xs font-bold tracking-wider uppercase flex items-center gap-2 shadow-[0_4px_20px_rgba(201,162,75,0.4)] hover:brightness-110 active:scale-95 transition-all cursor-pointer border border-[#FFFDF8]/50"
          title="Download printable wedding card in PDF format"
        >
          <Download className="w-4 h-4 text-[#06231A]" />
          <span>{isDownloadingPdf ? 'Generating Royal PDF...' : 'Download Invitation Card (PDF)'}</span>
        </button>
      </div>

      {/* Bottom Scroll Indicator & Action Pill */}
      <div className="flex flex-col items-center gap-2 mt-4">
        <button
          onClick={() => onNavigateSection('bismillah')}
          className="group flex flex-col items-center text-[#F3E6C4]/80 hover:text-[#C9A24B] transition-colors cursor-pointer"
          aria-label="Scroll to Invitation Message"
        >
          <span className="font-cinzel text-[10px] tracking-[0.25em] uppercase mb-1">
            Read Invitation Details
          </span>
          <div className="w-8 h-8 rounded-full border border-[#C9A24B]/50 flex items-center justify-center group-hover:border-[#C9A24B] transition-colors">
            <ChevronDown className="w-4 h-4 text-[#C9A24B] animate-bounce" />
          </div>
        </button>
      </div>
    </section>
  );
}
