import React, { useState } from 'react';
import { Sparkles, MapPin, Heart } from 'lucide-react';
import { weddingData } from '../data/invitation';
import { useLanguage } from '../context/LanguageContext';

/**
 * SECTION 4: BRIDE & GROOM
 * - Bride: Farha Praveen, D/o.- Md. Mahtab, Vill.-Konhara Khurd, Near Mazar Sharif, Barkatha, Dist.- Hazaribagh (Jharkhand)
 * - "weds" glowing medallion
 * - Groom: Md. Firoj, S/o.- Md. Mustaque, At.-L.F. Road, Hindpiri, Ranchi, Jharkhand
 * - Distinct solo 3D cartoon portraits for Groom and Bride (each doing Islamic Salaam)
 * - Multi-language support (English, हिन्दी, اردو)
 */
export default function BrideGroom() {
  const { t, isUrdu, isHindi } = useLanguage();
  const [activeCard, setActiveCard] = useState(null);

  return (
    <section
      id="couple"
      className="relative min-h-screen flex flex-col items-center justify-center py-20 px-3 sm:px-6 z-10"
    >
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full glass-gold-subtle border border-[#C9A24B]/40 mb-3 shadow-[0_0_20px_rgba(201,162,75,0.25)]">
          <Sparkles className="w-4 h-4 text-[#C9A24B]" />
          <span className={`text-xs font-bold text-[#F3E6C4] uppercase ${isUrdu ? 'font-urdu' : isHindi ? 'font-poppins' : 'font-cinzel tracking-[0.25em]'}`}>
            {t.couple.badge}
          </span>
        </div>
        <h2 className={`text-3xl sm:text-4xl text-gold-bright font-bold tracking-wider ${isUrdu ? 'font-urdu text-3xl sm:text-4xl' : isHindi ? 'font-poppins font-bold' : 'font-cinzel'}`}>
          {t.couple.title}
        </h2>
        <p className={`italic text-lg sm:text-xl text-[#F3E6C4]/85 mt-1 ${isUrdu ? 'font-urdu' : isHindi ? 'font-poppins' : 'font-cormorant'}`}>
          {t.couple.subtitle}
        </p>
      </div>

      {/* Cards Layout */}
      <div className="max-w-4xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative items-center">
        {/* BRIDE CARD (Farha Praveen - Solo Portrait with Adaab/Salaam) */}
        <div
          onMouseEnter={() => setActiveCard('bride')}
          onMouseLeave={() => setActiveCard(null)}
          className={`relative glass-emerald-card rounded-3xl p-6 sm:p-9 border-2 border-[#C9A24B]/60 transition-all duration-500 transform ${
            activeCard === 'bride' ? 'scale-[1.02] shadow-[0_20px_50px_rgba(201,162,75,0.4)]' : ''
          }`}
        >
          {/* Badge */}
          <div className="absolute top-4 right-4 px-3.5 py-1 rounded-full bg-[#134E3A] border border-[#C9A24B]/60 shadow-sm">
            <span className={`text-[10px] text-[#E5C365] font-bold uppercase ${isUrdu ? 'font-urdu' : isHindi ? 'font-poppins' : 'font-cinzel tracking-widest'}`}>
              {t.couple.brideBadge || weddingData.bride.badge}
            </span>
          </div>

          {/* SEPARATE SOLO BRIDE CARTOON PORTRAIT */}
          <div className="w-32 h-32 sm:w-36 sm:h-36 mx-auto rounded-full bg-gradient-to-tr from-[#0B3D2E] via-[#134E3A] to-[#C9A24B] p-1.5 shadow-[0_0_30px_rgba(201,162,75,0.5)] mb-5 overflow-hidden border-2 border-[#E5C365]">
            <img
              src="/bride-cartoon.jpg"
              alt="Farha Praveen - Bride doing Islamic Adaab Salaam"
              className="w-full h-full object-cover object-top rounded-full hover:scale-110 transition-transform duration-500"
            />
          </div>

          <div className="text-center">
            <span className={`text-xs text-[#C9A24B] uppercase font-bold ${isUrdu ? 'font-urdu' : isHindi ? 'font-poppins' : 'font-cinzel tracking-[0.25em]'}`}>
              {t.couple.brideRole}
            </span>
            <h3 className={`text-gold-bright my-1.5 drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] ${isUrdu ? 'font-urdu text-3xl sm:text-4xl' : isHindi ? 'font-poppins font-bold text-3xl sm:text-4xl' : 'font-script text-4xl sm:text-5xl'}`}>
              {t.couple.brideFull}
            </h3>

            {/* Parentage Line Verbatim */}
            <p className={`text-lg sm:text-xl text-[#F3E6C4] font-medium tracking-wide mt-2 ${isUrdu ? 'font-urdu text-lg sm:text-xl' : isHindi ? 'font-poppins' : 'font-serif'}`}>
              {t.couple.brideRelation || weddingData.bride.relation}
            </p>

            {/* Address Line Verbatim */}
            <div className="mt-4 pt-4 border-t border-[#C9A24B]/25 flex items-start justify-center gap-2 text-left">
              <MapPin className="w-4 h-4 text-[#C9A24B] shrink-0 mt-0.5" />
              <p className={`text-xs sm:text-sm text-[#FBF6E9]/90 leading-relaxed ${isUrdu ? 'font-urdu text-sm' : isHindi ? 'font-poppins' : 'font-poppins'}`}>
                {t.couple.brideAddress || weddingData.bride.address}
              </p>
            </div>
          </div>
        </div>

        {/* Center Glowing "Weds" Ornament (Desktop) */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-16 h-16 rounded-full bg-gradient-to-r from-[#C9A24B] to-[#E5C365] p-[2px] shadow-[0_0_25px_rgba(201,162,75,0.7)] animate-pulse-glow">
          <div className="w-full h-full rounded-full bg-[#0B3D2E] flex items-center justify-center">
            <span className={`text-2xl text-gold-bright ${isUrdu ? 'font-urdu text-xl' : isHindi ? 'font-poppins font-bold text-lg' : 'font-script'}`}>
              {t.hero.connector || 'weds'}
            </span>
          </div>
        </div>

        {/* Mobile "weds" divider */}
        <div className="flex md:hidden items-center justify-center gap-3 my-1">
          <div className="h-[1px] w-16 bg-[#C9A24B]/40" />
          <div className="w-11 h-11 rounded-full bg-[#0B3D2E] border-2 border-[#C9A24B] flex items-center justify-center shadow-lg">
            <span className={`text-xl text-gold-bright ${isUrdu ? 'font-urdu text-base' : isHindi ? 'font-poppins font-bold text-sm' : 'font-script'}`}>
              {t.hero.connector || 'weds'}
            </span>
          </div>
          <div className="h-[1px] w-16 bg-[#C9A24B]/40" />
        </div>

        {/* GROOM CARD (Md. Firoj - Solo Portrait with Hand on Heart Salaam) */}
        <div
          onMouseEnter={() => setActiveCard('groom')}
          onMouseLeave={() => setActiveCard(null)}
          className={`relative glass-emerald-card rounded-3xl p-6 sm:p-9 border-2 border-[#C9A24B]/60 transition-all duration-500 transform ${
            activeCard === 'groom' ? 'scale-[1.02] shadow-[0_20px_50px_rgba(201,162,75,0.4)]' : ''
          }`}
        >
          {/* Badge */}
          <div className="absolute top-4 right-4 px-3.5 py-1 rounded-full bg-[#134E3A] border border-[#C9A24B]/60 shadow-sm">
            <span className={`text-[10px] text-[#E5C365] font-bold uppercase ${isUrdu ? 'font-urdu' : isHindi ? 'font-poppins' : 'font-cinzel tracking-widest'}`}>
              {t.couple.groomBadge || weddingData.groom.badge}
            </span>
          </div>

          {/* SEPARATE SOLO GROOM CARTOON PORTRAIT */}
          <div className="w-32 h-32 sm:w-36 sm:h-36 mx-auto rounded-full bg-gradient-to-tr from-[#0B3D2E] via-[#134E3A] to-[#C9A24B] p-1.5 shadow-[0_0_30px_rgba(201,162,75,0.5)] mb-5 overflow-hidden border-2 border-[#E5C365]">
            <img
              src="/groom-cartoon.jpg"
              alt="Md. Firoj - Groom doing Hand on Heart Salaam"
              className="w-full h-full object-cover object-top rounded-full hover:scale-110 transition-transform duration-500"
            />
          </div>

          <div className="text-center">
            <span className={`text-xs text-[#C9A24B] uppercase font-bold ${isUrdu ? 'font-urdu' : isHindi ? 'font-poppins' : 'font-cinzel tracking-[0.25em]'}`}>
              {t.couple.groomRole}
            </span>
            <h3 className={`text-gold-bright my-1.5 drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] ${isUrdu ? 'font-urdu text-3xl sm:text-4xl' : isHindi ? 'font-poppins font-bold text-3xl sm:text-4xl' : 'font-script text-4xl sm:text-5xl'}`}>
              {t.couple.groomFull}
            </h3>

            {/* Parentage Line Verbatim */}
            <p className={`text-lg sm:text-xl text-[#F3E6C4] font-medium tracking-wide mt-2 ${isUrdu ? 'font-urdu text-lg sm:text-xl' : isHindi ? 'font-poppins' : 'font-serif'}`}>
              {t.couple.groomRelation || weddingData.groom.relation}
            </p>

            {/* Address Line Verbatim */}
            <div className="mt-4 pt-4 border-t border-[#C9A24B]/25 flex items-start justify-center gap-2 text-left">
              <MapPin className="w-4 h-4 text-[#C9A24B] shrink-0 mt-0.5" />
              <p className={`text-xs sm:text-sm text-[#FBF6E9]/90 leading-relaxed ${isUrdu ? 'font-urdu text-sm' : isHindi ? 'font-poppins' : 'font-poppins'}`}>
                {t.couple.groomAddress || weddingData.groom.address}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
