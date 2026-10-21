import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';

import WeddingScene from './components/3d/WeddingScene';
import Loader from './components/Loader';
import IntroGate from './components/IntroGate';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Bismillah from './components/Bismillah';
import BrideGroom from './components/BrideGroom';
import Programme from './components/Programme';
import Countdown from './components/Countdown';
import Venue from './components/Venue';
import HostsRsvp from './components/HostsRsvp';
import ShareSave from './components/ShareSave';
import Footer from './components/Footer';
import AudioToggle from './components/AudioToggle';
import QuickDock from './components/QuickDock';

import { getGuestInfo, formatGuestInfo } from './utils/guest';
import { weddingData } from './data/invitation';
import { weddingMusic } from './utils/sound';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  // Three-state gate animation state machine: 'closed' -> 'opening' -> 'opened'
  const [gateState, setGateState] = useState('closed');
  const [guestInfo, setGuestInfo] = useState({
    rawName: '',
    displayName: 'Dear Guest',
    hasCustomName: false,
    salutation: 'To, Mrs./Mr.',
  });
  const [currentSection, setCurrentSection] = useState('hero');
  const lenisRef = useRef(null);

  // Initialize Guest Info from URL parameter
  useEffect(() => {
    const info = getGuestInfo();
    setGuestInfo(info);
    if (info.hasCustomName) {
      document.title = `Invitation for ${info.displayName} | ${weddingData.meta.coupleNames}`;
    }
  }, []);

  // Initialize Lenis Smooth Scrolling only after gate is fully opened
  useEffect(() => {
    if (gateState !== 'opened') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [gateState]);

  // Track Sections for Dynamic 3D Scene Lighting Shifts
  useEffect(() => {
    if (gateState !== 'opened') return;

    const sectionIds = ['hero', 'bismillah', 'couple', 'programme', 'countdown', 'venue', 'rsvp', 'share'];
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setCurrentSection(id);
            }
          });
        },
        { threshold: 0.3 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [gateState]);

  // Smooth scroll helper
  const handleNavigateSection = (sectionId) => {
    const target = document.getElementById(sectionId);
    if (!target) return;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset: -60, duration: 1.4 });
    } else {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleUpdateGuestName = (name) => {
    const info = formatGuestInfo(name);
    setGuestInfo(info);
    try {
      if (info.hasCustomName) {
        localStorage.setItem('wedding_guest_name', info.displayName);
        document.title = `Invitation for ${info.displayName} | ${weddingData.meta.coupleNames}`;
      } else {
        localStorage.removeItem('wedding_guest_name');
        document.title = weddingData.meta.title;
      }
    } catch {
      // ignore
    }
  };

  const handleStartGateOpening = () => {
    // Start calm, clean music upon explicit user tap gesture
    weddingMusic.start();
    setGateState('opening');
  };

  const handleGateOpeningComplete = () => {
    setGateState('opened');
  };

  const isContentRevealed = gateState === 'opened';

  return (
    <div className="relative min-h-screen bg-[#06231A] text-[#FBF6E9] selection:bg-[#C9A24B] selection:text-[#06231A] overflow-x-hidden">
      {/* Persistent 3D Three.js Master Scene */}
      <WeddingScene
        isGateOpen={gateState !== 'closed'}
        currentSection={currentSection}
      />

      {/* SECTION 0: SVG Loader (FF monogram wreath drawing) */}
      {isLoading && <Loader onLoaded={() => setIsLoading(false)} />}

      {/* SECTION 1: Royal 3D Arched Gate (Full screen door opening animation) */}
      {!isLoading && gateState !== 'opened' && (
        <IntroGate
          guestInfo={guestInfo}
          gateState={gateState}
          onUpdateGuestName={handleUpdateGuestName}
          onOpenStart={handleStartGateOpening}
          onOpenComplete={handleGateOpeningComplete}
        />
      )}

      {/* MAIN INVITATION CONTENT: Revealed ONLY after the gate has finished opening */}
      {isContentRevealed && (
        <main
          className="relative z-10 transition-opacity duration-1000 ease-out opacity-100 pb-28 animate-in fade-in zoom-in-98"
        >
          {/* Quick Floating Navbar */}
          <Navbar onNavigateSection={handleNavigateSection} />

          {/* SECTION 2: Hero (With Full Names: Md. Firoj & Farha Praveen) */}
          <Hero
            guestInfo={guestInfo}
            onNavigateSection={handleNavigateSection}
          />

          {/* SECTION 3: Sacred Bismillah & Invitation Message */}
          <Bismillah guestInfo={guestInfo} />

          {/* SECTION 4: Bride & Groom Lineage Cards with Separate Solo Avatars */}
          <BrideGroom />

          {/* SECTION 5: Programme Timeline (Large Prominent Dates Inside Every Card) */}
          <Programme onHoverEvent={(eventId) => setCurrentSection(eventId)} />

          {/* SECTION 6: Live Countdown to Nikah */}
          <Countdown />

          {/* SECTION 7: Venue (Hotel Shree Parivaar, Barhi with Scannable Google Maps QR) */}
          <Venue />

          {/* SECTION 8: Hosts, Contact Numbers & Highly Prioritized Late Elders */}
          <HostsRsvp />

          {/* SECTION 9: Save & Share (Calendar, WhatsApp, QR Code) */}
          <ShareSave guestInfo={guestInfo} />

          {/* SECTION 10: Footer (Closing compliments, Dua & Shooting star) */}
          <Footer />

          {/* Floating Audio Controller */}
          <AudioToggle />

          {/* Bottom Quick Action Dock for effortless navigation */}
          <QuickDock onNavigateSection={handleNavigateSection} />
        </main>
      )}
    </div>
  );
}
