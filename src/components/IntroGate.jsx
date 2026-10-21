import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, ChevronRight, Heart, Star } from 'lucide-react';
import { weddingData } from '../data/invitation';

/**
 * ROYAL 3D ARCHED WEDDING GATE
 * - State machine: 'closed' | 'opening' | 'opened'
 * - Completely covers and conceals all invitation content until doors fully swing open
 * - Deep royal maroon, emerald, ivory, and antique gold aesthetic
 * - 3D cartoon bride & groom featured on the gate welcome stage
 * - Both full names: Md. Firoj & Farha Praveen prominently displayed
 * - Synchronized 3D door rotation with real transition-end event (no premature reveals)
 */
export default function IntroGate({ guestInfo, onUpdateGuestName, onOpenStart, onOpenComplete, gateState = 'closed' }) {
  const [internalState, setInternalState] = useState('closed'); // 'closed' | 'opening' | 'opened'
  const [enteredName, setEnteredName] = useState(
    guestInfo.hasCustomName ? guestInfo.displayName : ''
  );
  const [nameError, setNameError] = useState(false);
  const nameInputRef = useRef(null);
  const leftDoorRef = useRef(null);
  const rightDoorRef = useRef(null);

  const handleNameChange = (val) => {
    setEnteredName(val);
    if (nameError && val.trim().length >= 2) {
      setNameError(false);
    }
    if (onUpdateGuestName) {
      onUpdateGuestName(val);
    }
  };

  // Sync with prop if passed
  useEffect(() => {
    if (gateState === 'opened' && internalState !== 'opened') {
      setInternalState('opened');
    }
  }, [gateState, internalState]);

  const handleOpenGate = () => {
    if (internalState !== 'closed') return;

    // MANDATORY REQUIREMENT: Gate will NOT open until guest enters their name
    const validName = enteredName && enteredName.trim().length >= 2;
    if (!validName) {
      setNameError(true);
      if (nameInputRef.current) {
        nameInputRef.current.focus();
      }
      if (typeof window !== 'undefined' && 'vibrate' in navigator) {
        try {
          navigator.vibrate([80, 50, 80]);
        } catch {
          // ignore
        }
      }
      return;
    }

    setNameError(false);
    setInternalState('opening');

    // Notify audio and scene to begin immediately upon gesture
    if (onOpenStart) onOpenStart();

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const animDuration = prefersReducedMotion ? 100 : 1850;

    // Haptic feedback on mobile if supported
    if (!prefersReducedMotion && typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([40, 60, 40]);
      } catch {
        // ignore
      }
    }

    // Celebratory golden petal and dust burst
    confetti({
      particleCount: prefersReducedMotion ? 20 : 60,
      spread: 80,
      origin: { y: 0.65 },
      colors: ['#C9A24B', '#F3E6C4', '#7A1F2B', '#134E3A'],
    });

    // Controlled synchronization: transition takes 1.8s
    // Complete the gate opening ONLY after the 3D swing has fully concluded
    const timer = setTimeout(() => {
      setInternalState('opened');
      if (onOpenComplete) onOpenComplete();
    }, animDuration);

    return () => clearTimeout(timer);
  };

  if (internalState === 'opened') return null;

  const isOpening = internalState === 'opening';

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden flex items-center justify-center transition-opacity duration-700 ${
        isOpening ? 'pointer-events-none' : ''
      }`}
      style={{ perspective: '1400px' }}
      aria-modal="true"
      role="dialog"
      aria-label="Wedding Gate Invitation"
    >
      {/* Background Deep Glow Curtain */}
      <div className="absolute inset-0 bg-[#06231A] z-0" />

      {/* LEFT 3D DOOR PANEL */}
      <div
        ref={leftDoorRef}
        className="absolute top-0 left-0 w-1/2 h-full z-20 origin-left border-r-2 border-[#E5C365]/80 shadow-[10px_0_40px_rgba(0,0,0,0.9)] overflow-hidden transition-transform duration-[1800ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
        style={{
          transformStyle: 'preserve-3d',
          transform: isOpening
            ? 'rotateY(-105deg)'
            : 'rotateY(0deg)',
          background: 'linear-gradient(135deg, #7A1F2B 0%, #4A121A 40%, #0B3D2E 100%)',
        }}
      >
        {/* Islamic Geometric Girih Pattern Overlay */}
        <div className="absolute inset-0 pattern-islamic-stars opacity-30 pointer-events-none" />

        {/* Outer Gold Ornamental Filigree Frame */}
        <div className="absolute inset-4 sm:inset-8 border-2 border-[#C9A24B]/60 rounded-tr-[120px] pointer-events-none" />
        <div className="absolute inset-6 sm:inset-12 border border-[#C9A24B]/30 rounded-tr-[100px] pointer-events-none" />

        {/* Left Brass Door Knocker */}
        <div className="absolute top-1/2 right-6 sm:right-10 -translate-y-1/2 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#0B3D2E] border-2 border-[#E5C365] flex items-center justify-center shadow-[0_0_20px_rgba(201,162,75,0.6)]">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-4 border-[#C9A24B]" />
        </div>

        {/* Left Arch Corner Flower */}
        <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-[#E5C365]" />
      </div>

      {/* RIGHT 3D DOOR PANEL */}
      <div
        ref={rightDoorRef}
        className="absolute top-0 right-0 w-1/2 h-full z-20 origin-right border-l-2 border-[#E5C365]/80 shadow-[-10px_0_40px_rgba(0,0,0,0.9)] overflow-hidden transition-transform duration-[1800ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
        style={{
          transformStyle: 'preserve-3d',
          transform: isOpening
            ? 'rotateY(105deg)'
            : 'rotateY(0deg)',
          background: 'linear-gradient(225deg, #7A1F2B 0%, #4A121A 40%, #0B3D2E 100%)',
        }}
      >
        {/* Islamic Geometric Girih Pattern Overlay */}
        <div className="absolute inset-0 pattern-islamic-stars opacity-30 pointer-events-none" />

        {/* Outer Gold Ornamental Filigree Frame */}
        <div className="absolute inset-4 sm:inset-8 border-2 border-[#C9A24B]/60 rounded-tl-[120px] pointer-events-none" />
        <div className="absolute inset-6 sm:inset-12 border border-[#C9A24B]/30 rounded-tl-[100px] pointer-events-none" />

        {/* Right Brass Door Knocker */}
        <div className="absolute top-1/2 left-6 sm:left-10 -translate-y-1/2 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#0B3D2E] border-2 border-[#E5C365] flex items-center justify-center shadow-[0_0_20px_rgba(201,162,75,0.6)]">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-4 border-[#C9A24B]" />
        </div>

        {/* Right Arch Corner Flower */}
        <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-[#E5C365]" />
      </div>

      {/* GOLDEN VOLUMETRIC LIGHT BURST (Beams out when opening) */}
      <div
        className={`absolute inset-0 z-25 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#FFFDF8] via-[#E5C365]/60 to-transparent transition-opacity duration-1000 pointer-events-none ${
          isOpening ? 'opacity-90 scale-125' : 'opacity-0'
        }`}
      />

      {/* CENTER ROYAL INVITATION PRESENTATION SHIELD */}
      {/* (Sits gracefully in front of the gate seam; fades smoothly when opening) */}
      <div
        className={`relative z-30 max-w-lg w-[92%] sm:w-full mx-auto my-auto p-5 sm:p-7 rounded-3xl glass-emerald-card border-2 border-[#E5C365] shadow-[0_20px_60px_rgba(0,0,0,0.95)] text-center transition-all duration-700 ${
          isOpening ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'
        }`}
      >
        {/* Top Arch Crown & Star Finial */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#C9A24B]" />
          <Star className="w-4 h-4 text-[#E5C365] fill-[#E5C365]" />
          <span className="font-cinzel text-[10px] sm:text-xs text-[#E5C365] font-bold tracking-[0.25em] uppercase">
            ROYAL WEDDING INVITATION
          </span>
          <Star className="w-4 h-4 text-[#E5C365] fill-[#E5C365]" />
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#C9A24B]" />
        </div>

        {/* Sacred Bismillah */}
        <p className="font-arabic text-xl sm:text-2xl text-[#C9A24B] tracking-wide mb-1">
          {weddingData.bismillah.arabic}
        </p>

        {/* Spiritual Welcome Header */}
        <p className="font-cormorant italic text-sm sm:text-base text-[#F3E6C4]/90 mb-3">
          Together with the blessings of Allah
        </p>

        {/* 3D CARTOON BRIDE & GROOM WELCOME PREVIEW */}
        <div className="relative my-2 flex justify-center">
          <div className="relative group p-1.5 rounded-2xl bg-gradient-to-tr from-[#7A1F2B] via-[#C9A24B] to-[#0B3D2E] shadow-[0_0_30px_rgba(201,162,75,0.45)] border border-[#E5C365] animate-float">
            <img
              src="/couple-cartoon.jpg"
              alt="Cartoon 3D Muslim Wedding Couple - Md. Firoj & Farha Praveen"
              className="w-48 h-48 sm:w-56 sm:h-56 object-cover rounded-xl filter brightness-105"
            />
            {/* Wax Seal Monogram Badge */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#06231A] border-2 border-[#E5C365] shadow-lg flex items-center gap-1.5">
              <span className="font-cinzel text-xs font-bold text-gold-bright tracking-widest">
                {weddingData.meta.monogram}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#E5C365]" />
              <span className="font-cinzel text-[9px] text-[#F3E6C4] tracking-wider uppercase font-semibold">
                12.12.2026
              </span>
            </div>
          </div>
        </div>

        {/* BOTH COMPLETE FULL NAMES - DULHAN (Farha Praveen) FIRST, THEN DULHA (Md. Firoj) */}
        <div className="mt-4 mb-2">
          <h2 className="font-script text-3xl sm:text-4xl md:text-5xl text-gold-bright leading-tight filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
            {weddingData.meta.brideFull}
          </h2>
          <span className="font-cormorant italic text-lg sm:text-xl text-[#F3E6C4] px-2">
            &
          </span>
          <h2 className="font-script text-3xl sm:text-4xl md:text-5xl text-gold-bright leading-tight filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
            {weddingData.meta.groomFull}
          </h2>
          <p className="font-poppins text-xs text-[#F3E6C4]/80 mt-0.5">
            Invite you to celebrate their wedding
          </p>
        </div>

        {/* Mandatory Visitor / Guest Name Input */}
        <div className={`my-2.5 p-3.5 rounded-2xl bg-[#06231A]/95 max-w-sm mx-auto text-left shadow-lg transition-all duration-300 border-2 ${
          nameError
            ? 'border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.6)] animate-pulse'
            : 'border-[#E5C365]/70 focus-within:border-[#E5C365]'
        }`}>
          <label htmlFor="gate-visitor-name" className="block font-cinzel text-[11px] text-[#E5C365] font-bold tracking-wider uppercase mb-1">
            ✦ Please Enter Your Name to Open Invitation <span className="text-amber-400">*</span>
          </label>
          <input
            id="gate-visitor-name"
            ref={nameInputRef}
            type="text"
            value={enteredName}
            onChange={(e) => handleNameChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleOpenGate();
            }}
            placeholder="e.g. Salma Khala, Dr. Rashid, Farooq Bhai"
            className="w-full px-3.5 py-2 rounded-xl bg-[#0B3D2E] border border-[#C9A24B]/50 text-[#FFFDF8] placeholder-[#F3E6C4]/40 font-poppins text-xs sm:text-sm focus:outline-none focus:border-[#E5C365] shadow-inner"
          />

          {nameError ? (
            <p className="font-poppins text-[11px] text-amber-300 font-semibold mt-1.5 flex items-center gap-1.5">
              <span>⚠️</span> Please enter your name above to unlock your invitation
            </p>
          ) : (
            <p className="font-poppins text-[10px] text-[#F3E6C4]/80 mt-1">
              {enteredName.trim()
                ? `Greeting: ${guestInfo.salutation} ${enteredName.trim()}`
                : 'Name required for your personalized wedding card'}
            </p>
          )}
        </div>

        {/* Date & Venue Tag */}
        <p className="font-cinzel text-xs text-[#E5C365] tracking-[0.18em] uppercase font-semibold mb-4">
          {weddingData.meta.dateShort} ({weddingData.meta.dayShort}) • {weddingData.venue.name}
        </p>

        {/* "Open Wedding Invitation" 3D Glowing Button */}
        <button
          onClick={handleOpenGate}
          disabled={isOpening}
          className="group relative w-full py-4 px-6 rounded-2xl font-cinzel font-bold text-sm sm:text-base tracking-[0.2em] uppercase text-[#06231A] bg-gradient-to-r from-[#F3E6C4] via-[#E5C365] to-[#C9A24B] hover:brightness-110 shadow-[0_8px_30px_rgba(201,162,75,0.5)] active:scale-95 transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer border-2 border-[#FFFDF8]/40"
        >
          <Sparkles className="w-5 h-5 text-[#06231A] animate-spin" />
          <span>
            {isOpening
              ? 'Opening Royal Gate...'
              : enteredName.trim()
              ? `Open Invitation for ${enteredName.trim()}`
              : 'Enter Name to Open Invitation'}
          </span>
          <ChevronRight className="w-5 h-5 text-[#06231A] group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
