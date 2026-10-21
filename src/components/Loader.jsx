import React, { useEffect, useState } from 'react';
import { weddingData } from '../data/invitation';

/**
 * SECTION 0: LOADER
 * - FF monogram wreath draws itself (SVG stroke animation)
 * - Swinging fanous lantern
 * - Loading percentage counter with gold shimmer
 * - Sacred Bismillah opening
 */
export default function Loader({ onLoaded }) {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsFadingOut(true);
            setTimeout(onLoaded, 600);
          }, 300);
          return 100;
        }
        // Organic accelerated loading feel
        const step = Math.floor(Math.random() * 8) + 4;
        return Math.min(100, prev + step);
      });
    }, 60);

    return () => clearInterval(timer);
  }, [onLoaded]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#06231A] transition-opacity duration-700 ease-out ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Islamic Geometric Pattern */}
      <div className="absolute inset-0 pattern-islamic-stars opacity-20 pointer-events-none" />

      {/* Swinging Fanous Lantern at Top */}
      <div className="relative mb-6 animate-sway">
        <svg width="42" height="72" viewBox="0 0 42 72" fill="none">
          {/* Chain */}
          <line x1="21" y1="0" x2="21" y2="18" stroke="#C9A24B" strokeWidth="2" strokeDasharray="3 3" />
          {/* Cap */}
          <path d="M12 24 L21 16 L30 24 Z" fill="#C9A24B" />
          {/* Core Body */}
          <rect x="13" y="24" width="16" height="26" rx="2" fill="#134E3A" stroke="#C9A24B" strokeWidth="1.5" />
          {/* Glowing Flame */}
          <ellipse cx="21" cy="37" rx="4" ry="7" fill="#FDE047" className="animate-pulse" />
          {/* Base */}
          <path d="M13 50 L21 57 L29 50 Z" fill="#C9A24B" />
          {/* Tassel */}
          <line x1="21" y1="57" x2="21" y2="70" stroke="#7A1F2B" strokeWidth="2.5" />
        </svg>
      </div>

      {/* Drawing Wreath & FF Monogram SVG */}
      <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center">
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full filter drop-shadow-[0_0_15px_rgba(201,162,75,0.4)]"
        >
          <defs>
            <linearGradient id="loaderGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFDF8" />
              <stop offset="40%" stopColor="#F3E6C4" />
              <stop offset="80%" stopColor="#C9A24B" />
              <stop offset="100%" stopColor="#8A6A24" />
            </linearGradient>

            {/* Circular Clip for Couple Cartoon Image */}
            <clipPath id="loaderCoupleClip">
              <circle cx="100" cy="100" r="60" />
            </clipPath>
          </defs>

          {/* Outer Rotating Dashed Ring */}
          <circle
            cx="100"
            cy="100"
            r="88"
            fill="none"
            stroke="url(#loaderGold)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            className="opacity-40 animate-[spin_18s_linear_infinite]"
          />

          {/* Circular Backdrop & Couple Photo inside Center Wreath (Replaces FF) */}
          <circle
            cx="100"
            cy="100"
            r="61"
            fill="#06231A"
            stroke="url(#loaderGold)"
            strokeWidth="2.5"
          />

          <image
            href="/couple-cartoon.jpg"
            x="40"
            y="40"
            width="120"
            height="120"
            clipPath="url(#loaderCoupleClip)"
            preserveAspectRatio="xMidYMid slice"
            style={{
              opacity: Math.max(0.6, progress / 100),
              transition: 'opacity 0.2s ease-out',
            }}
          />

          {/* Golden Inner Rim around Couple Photo */}
          <circle
            cx="100"
            cy="100"
            r="60"
            fill="none"
            stroke="url(#loaderGold)"
            strokeWidth="2"
            className="filter drop-shadow-[0_0_8px_rgba(201,162,75,0.6)]"
          />

          {/* Botanical Floral Wreath Stroke Drawing */}
          <path
            d="M 100 22 C 55 22 26 55 26 100 C 26 145 55 178 100 178 C 145 178 174 145 174 100 C 174 55 145 22 100 22"
            fill="none"
            stroke="url(#loaderGold)"
            strokeWidth="2.5"
            strokeDasharray="480"
            strokeDashoffset={480 - (480 * progress) / 100}
            strokeLinecap="round"
            className="transition-all duration-150 ease-out"
          />

          {/* Decorative Floral Leaves along the wreath */}
          <g fill="url(#loaderGold)" opacity={progress > 30 ? 0.9 : 0.2} className="transition-opacity duration-300">
            <path d="M 85 24 Q 78 16 80 27 Z" />
            <path d="M 115 24 Q 122 16 120 27 Z" />
            <path d="M 38 65 Q 28 62 36 74 Z" />
            <path d="M 162 65 Q 172 62 164 74 Z" />
            <path d="M 38 135 Q 28 138 36 126 Z" />
            <path d="M 162 135 Q 172 138 164 126 Z" />
            <path d="M 85 176 Q 78 184 80 173 Z" />
            <path d="M 115 176 Q 122 184 120 173 Z" />
          </g>
        </svg>
      </div>

      {/* Sacred Bismillah Opening */}
      <p className="font-arabic text-xl sm:text-2xl text-[#C9A24B] mt-5 tracking-wide text-center px-4">
        {weddingData.bismillah.arabic}
      </p>

      {/* Progress Bar & Counter */}
      <div className="mt-4 flex flex-col items-center">
        <div className="w-48 h-1 bg-[#134E3A] rounded-full overflow-hidden border border-[#C9A24B]/30">
          <div
            className="h-full bg-gradient-to-r from-[#9A7728] via-[#E5C365] to-[#FBF6E9] transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="font-cinzel text-xs text-[#F3E6C4] tracking-[0.25em] mt-2">
          {progress}% • ENTERING NIKAH NIGHT
        </span>
      </div>
    </div>
  );
}
