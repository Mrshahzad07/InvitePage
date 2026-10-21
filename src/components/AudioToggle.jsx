import React, { useState, useEffect } from 'react';
import { Music, Play, Pause } from 'lucide-react';
import { weddingMusic } from '../utils/sound';

/**
 * RESPONSIVE WEDDING MUSIC CONTROLLER
 * - Prominent Play / Pause icon that instantly changes based on playing/paused state
 * - Fixed safely in the bottom-right corner with full safe-area inset support
 * - Mobile-first compact pill that never covers card text or bottom navigation
 * - Desktop expands with clear label and animated equalizer waves
 */
export default function AudioToggle() {
  const [isPlaying, setIsPlaying] = useState(() => weddingMusic.getIsPlaying());

  useEffect(() => {
    // Automatically keep in sync with global music engine state
    const unsubscribe = weddingMusic.subscribe((active) => {
      setIsPlaying(active);
    });
    return unsubscribe;
  }, []);

  const toggleSound = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    const nextState = weddingMusic.toggle();
    setIsPlaying(nextState);
  };

  return (
    <div
      className="fixed z-40 right-3 sm:right-6 bottom-[calc(4.8rem+env(safe-area-inset-bottom,0px))] sm:bottom-6 transition-all duration-300"
    >
      <button
        onClick={toggleSound}
        className={`group flex items-center gap-2 sm:gap-3 p-2 sm:py-2.5 sm:px-4 rounded-full border-2 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.85)] cursor-pointer active:scale-95 ${
          isPlaying
            ? 'bg-[#134E3A] border-[#E5C365] text-[#FFFDF8] shadow-[0_0_25px_rgba(201,162,75,0.5)]'
            : 'bg-[#06231A]/95 border-[#C9A24B]/70 text-[#F3E6C4] hover:border-[#E5C365]'
        }`}
        aria-label={isPlaying ? 'Pause Sab Tera wedding music' : 'Play Sab Tera wedding music'}
        title={isPlaying ? 'Pause Sab Tera' : 'Play Sab Tera (Wedding Song)'}
      >
        {/* Play / Pause Toggle Medallion: Instantly switches between Play and Pause */}
        <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 shadow-inner transition-colors duration-200 ${
          isPlaying 
            ? 'bg-[#0B3D2E] border-[#E5C365]' 
            : 'bg-[#06231A] border-[#C9A24B] group-hover:border-[#E5C365]'
        }`}>
          {isPlaying ? (
            <Pause className="w-4 h-4 text-[#E5C365] transition-transform duration-200" />
          ) : (
            <Play className="w-4 h-4 text-[#E5C365] ml-0.5 transition-transform duration-200" />
          )}
        </div>

        {/* Text Label: Visible on larger screens, compact icon on small mobile */}
        <div className="hidden sm:block text-left pr-1">
          <p className="font-cinzel text-[11px] font-bold text-gold-bright tracking-wider uppercase leading-none flex items-center gap-1.5">
            {isPlaying && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />}
            <span>{isPlaying ? 'Sab Tera Playing' : 'Play Sab Tera'}</span>
          </p>
          <p className="font-poppins text-[9px] text-[#F3E6C4]/80 mt-0.5">
            {isPlaying ? 'Pause Music' : 'Romantic Wedding Song'}
          </p>
        </div>

        {/* Gentle Equalizer Waves when playing, Static Music Icon when paused */}
        {isPlaying ? (
          <div className="flex items-end gap-0.5 sm:gap-1 h-3.5 pr-1">
            <span className="w-1 h-2.5 bg-[#E5C365] rounded-full animate-[pulse_1.2s_ease-in-out_infinite]" />
            <span className="w-1 h-3.5 bg-[#C9A24B] rounded-full animate-[pulse_1.6s_ease-in-out_infinite]" />
            <span className="w-1 h-2 bg-[#F3E6C4] rounded-full animate-[pulse_1.4s_ease-in-out_infinite]" />
            <span className="w-1 h-3 bg-[#E5C365] rounded-full animate-[pulse_1.8s_ease-in-out_infinite]" />
          </div>
        ) : (
          <Music className="w-4 h-4 text-[#C9A24B]/80 group-hover:text-[#E5C365] mr-0.5" />
        )}
      </button>
    </div>
  );
}
