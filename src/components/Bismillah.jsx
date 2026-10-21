import React from 'react';
import { weddingData } from '../data/invitation';

/**
 * SECTION 3: BISMILLAH & INVITATION MESSAGE
 * - Sacred Bismillah in Arabic & English
 * - Rising Mihrab-arch frame
 * - Exact text: Mrs. & Mr. Md. Mahtab - Request the honour of your presence on the auspicious occasion of marriage ceremony of our loving Daughter
 */
export default function Bismillah({ guestInfo }) {
  return (
    <section
      id="bismillah"
      className="relative min-h-screen flex items-center justify-center py-20 px-4 z-10"
    >
      <div className="max-w-2xl w-full mx-auto">
        {/* Mihrab Arch Shaped Frame Container */}
        <div className="relative mihrab-arch glass-emerald-card p-8 sm:p-14 text-center border-2 border-[#C9A24B]/50 shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden">
          {/* Inner Ornate Arch Border */}
          <div className="absolute inset-3 sm:inset-4 mihrab-arch border border-[#C9A24B]/30 pointer-events-none" />

          {/* Top Hanging Islamic Star Finial */}
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 rounded-full border border-[#C9A24B]/60 flex items-center justify-center bg-[#0B3D2E]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
                  fill="#C9A24B"
                />
              </svg>
            </div>
          </div>

          {/* Bismillah in Arabic Calligraphy */}
          <h2 className="font-arabic text-3xl sm:text-4xl md:text-5xl text-gold-bright leading-relaxed mb-4 filter drop-shadow-[0_2px_8px_rgba(201,162,75,0.3)]">
            {weddingData.bismillah.arabic}
          </h2>

          {/* Sacred Translation Verbatim */}
          <p className="font-cinzel text-xs sm:text-sm text-[#F3E6C4] tracking-[0.18em] uppercase mb-10 max-w-lg mx-auto">
            "{weddingData.bismillah.english}"
          </p>

          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#C9A24B] to-transparent mx-auto mb-8" />

          {/* Dynamic Guest Callout if personalized */}
          {guestInfo.hasCustomName && (
            <div className="mb-6 inline-block py-1.5 px-6 rounded-full bg-[#134E3A]/80 border border-[#C9A24B]/30">
              <span className="font-cinzel text-xs text-[#C9A24B] uppercase tracking-wider">
                Special Invitation For:
              </span>{' '}
              <span className="font-serif text-base text-[#FFFDF8] font-bold">
                {guestInfo.displayName}
              </span>
            </div>
          )}

          {/* Hosts Opening Line Verbatim */}
          <h3 className="font-cinzel text-lg sm:text-2xl text-gold-bright font-bold tracking-wider mb-4">
            {weddingData.invitationText.hosts}
          </h3>

          {/* Invitation Text Verbatim */}
          <p className="font-cormorant text-xl sm:text-2xl md:text-3xl text-[#FBF6E9] leading-relaxed font-normal max-w-xl mx-auto italic">
            "{weddingData.invitationText.message}"
          </p>

          <div className="mt-10 flex items-center justify-center gap-3">
            <div className="w-8 h-[1px] bg-[#C9A24B]/50" />
            <span className="font-script text-2xl sm:text-3xl text-gold-bright">
              {weddingData.meta.brideFull} &amp; {weddingData.meta.groomFull}
            </span>
            <div className="w-8 h-[1px] bg-[#C9A24B]/50" />
          </div>
        </div>
      </div>
    </section>
  );
}
