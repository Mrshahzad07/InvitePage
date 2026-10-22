import React from 'react';
import { Phone, MessageCircle, Heart, MapPin, Users, Sparkles, Star } from 'lucide-react';
import { weddingData } from '../data/invitation';
import { useLanguage } from '../context/LanguageContext';

/**
 * SECTION 8: HOSTS & R.S.V.P.
 * - Prominently highlighted & prioritized Late Elders (Late Naim Khan, Late Aftab Khan)
 *   in a distinguished Royal Memorial Honor Card with sacred blessings.
 * - "A Cordial Invitation From: Md. Mahtab Khan" + full address
 * - Tap-to-call buttons for all 3 phone numbers
 * - WhatsApp direct chat link (wa.me)
 * - Family members list & "All Relatives & Friends"
 * - Multi-language support (English, हिन्दी, اردو)
 */
export default function HostsRsvp() {
  const { t, isUrdu, isHindi } = useLanguage();

  const lateEldersList = t.hostsRsvp.lateElders || weddingData.rsvp.lateElders;
  const familyMembersList = t.hostsRsvp.familyMembers || weddingData.rsvp.familyMembers;

  return (
    <section
      id="rsvp"
      className="relative min-h-screen flex flex-col items-center justify-center py-20 px-3 sm:px-6 z-10"
    >
      <div className="max-w-4xl w-full mx-auto space-y-10">

        {/* 1. HIGH PRIORITY: SACRED BLESSINGS OF OUR REVERED LATE ELDERS (HIGHLY HIGHLIGHTED) */}
        <div className="relative glass-emerald-card rounded-3xl p-6 sm:p-10 border-2 border-[#E5C365] shadow-[0_0_50px_rgba(201,162,75,0.45)] text-center overflow-hidden animate-pulse-glow">
          {/* Top Decorative Star Finial */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#06231A] border-2 border-[#C9A24B] flex items-center justify-center shadow-lg">
            <Star className="w-5 h-5 text-[#E5C365] fill-[#E5C365]" />
          </div>

          <div className="mt-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#134E3A] border border-[#C9A24B]/60 mb-3 shadow-md">
            <Sparkles className="w-4 h-4 text-[#E5C365]" />
            <span className={`text-xs font-bold text-[#FFFDF8] uppercase ${isUrdu ? 'font-urdu' : isHindi ? 'font-poppins' : 'font-cinzel tracking-[0.25em]'}`}>
              {t.hostsRsvp.lateEldersBadge}
            </span>
          </div>

          <h3 className={`text-2xl sm:text-3xl md:text-4xl text-gold-bright font-bold tracking-wide mt-1 mb-2 ${isUrdu ? 'font-urdu text-2xl sm:text-3xl' : isHindi ? 'font-poppins font-bold' : 'font-serif'}`}>
            {t.hostsRsvp.lateEldersHeading}
          </h3>

          <p className="font-arabic text-xl sm:text-2xl text-[#C9A24B] mb-6">
            {t.hostsRsvp.lateEldersDua}
          </p>

          <p className={`italic text-base sm:text-lg text-[#F3E6C4]/90 max-w-xl mx-auto mb-8 ${isUrdu ? 'font-urdu text-base' : isHindi ? 'font-poppins' : 'font-cormorant'}`}>
            {t.hostsRsvp.lateEldersSub}
          </p>

          {/* HIGHLIGHTED LATE ELDERS DIGNIFIED SHRINE GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
            {lateEldersList.map((elder) => (
              <div
                key={elder.name}
                className="relative p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-[#06231A] via-[#0B3D2E] to-[#134E3A] border-2 border-[#C9A24B] shadow-[0_10px_30px_rgba(0,0,0,0.7)] group hover:scale-105 transition-all duration-300"
              >
                {/* Memorial Filigree Corners */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#C9A24B]" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#C9A24B]" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#C9A24B]" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#C9A24B]" />

                <span className={`text-[10px] text-[#C9A24B] uppercase font-semibold block mb-2 ${isUrdu ? 'font-urdu text-xs' : isHindi ? 'font-poppins' : 'font-cinzel tracking-[0.2em]'}`}>
                  {t.hostsRsvp.pillarOfFamily}
                </span>

                <h4 className={`text-2xl sm:text-3xl text-gold-bright font-bold tracking-wider drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] ${isUrdu ? 'font-urdu text-2xl sm:text-3xl' : isHindi ? 'font-poppins font-bold' : 'font-cinzel'}`}>
                  {elder.name}
                </h4>

                <p className={`text-xs text-[#F3E6C4]/70 mt-2 ${isUrdu ? 'font-urdu text-sm' : 'font-poppins'}`}>
                  {t.hostsRsvp.elderPrayer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 2. CORDIAL INVITATION FROM HOST */}
        <div className="glass-emerald-card rounded-3xl p-6 sm:p-10 border-2 border-[#C9A24B]/50 shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-center relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#134E3A]/90 border border-[#C9A24B]/40 mb-3">
            <Heart className="w-3.5 h-3.5 text-[#C9A24B]" />
            <span className={`text-xs font-bold text-[#F3E6C4] uppercase ${isUrdu ? 'font-urdu' : isHindi ? 'font-poppins' : 'font-cinzel tracking-[0.2em]'}`}>
              {t.hostsRsvp.warmHosts}
            </span>
          </div>

          {/* Heading in Active Language */}
          <h2 className={`text-base sm:text-lg text-[#F3E6C4] tracking-wider uppercase mb-1 ${isUrdu ? 'font-urdu' : isHindi ? 'font-poppins font-semibold' : 'font-cinzel'}`}>
            {t.hostsRsvp.inviterHeading}
          </h2>

          {/* Host Name in Active Language */}
          <h3 className={`text-3xl sm:text-4xl md:text-5xl text-gold-bright font-bold mb-4 ${isUrdu ? 'font-urdu text-3xl sm:text-4xl' : isHindi ? 'font-poppins font-bold' : 'font-serif'}`}>
            {t.hostsRsvp.inviterName}
          </h3>

          {/* Host Address in Active Language */}
          <div className="flex items-start justify-center gap-2 max-w-xl mx-auto mb-8 px-2">
            <MapPin className="w-4 h-4 text-[#C9A24B] shrink-0 mt-1" />
            <p className={`text-xs sm:text-sm text-[#FBF6E9]/90 leading-relaxed text-center ${isUrdu ? 'font-urdu text-sm' : 'font-poppins'}`}>
              {t.hostsRsvp.inviterAddress}
            </p>
          </div>

          {/* Tap-to-call Numbers Grid */}
          <div className="border-t border-[#C9A24B]/20 pt-6">
            <p className={`text-xs text-[#C9A24B] uppercase font-bold mb-4 ${isUrdu ? 'font-urdu text-sm' : isHindi ? 'font-poppins' : 'font-cinzel tracking-[0.2em]'}`}>
              {t.hostsRsvp.tapToCall}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
              {weddingData.inviter.mobiles.map((mobile) => (
                <a
                  key={mobile}
                  href={`tel:${mobile}`}
                  dir="ltr"
                  className="group flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#06231A] border border-[#C9A24B]/40 hover:border-[#C9A24B] hover:bg-[#134E3A] transition-all duration-200 shadow-sm"
                >
                  <Phone className="w-4 h-4 text-[#C9A24B] group-hover:scale-110 transition-transform" />
                  <span className="font-poppins font-semibold text-sm text-[#FFFDF8] tracking-wider">
                    {mobile}
                  </span>
                </a>
              ))}
            </div>

            {/* Direct WhatsApp Deep Link */}
            <div className="mt-5 flex justify-center">
              <a
                href={`https://wa.me/91${weddingData.inviter.whatsappMobile}?text=${encodeURIComponent(
                  `Assalamu Alaikum Md. Mahtab Khan Sahab, heartfelt congratulations on the wedding of ${weddingData.meta.brideFull} & ${weddingData.meta.groomFull}!`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 py-3 px-6 rounded-xl text-xs font-bold tracking-wider uppercase bg-[#134E3A] text-[#FFFDF8] border border-[#10B981]/60 hover:bg-[#10B981] hover:text-[#06231A] transition-all duration-200 shadow-lg cursor-pointer ${
                  isUrdu ? 'font-urdu text-sm' : isHindi ? 'font-poppins' : 'font-cinzel'
                }`}
              >
                <MessageCircle className="w-4 h-4 text-[#10B981] group-hover:text-[#06231A]" />
                <span>{t.hostsRsvp.whatsappDirect} ({weddingData.inviter.whatsappMobile})</span>
              </a>
            </div>
          </div>
        </div>

        {/* 3. R.S.V.P. FAMILY LIST */}
        <div className="glass-emerald-card rounded-3xl p-6 sm:p-10 border border-[#C9A24B]/40 shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#134E3A]/80 border border-[#C9A24B]/30 mb-4">
            <Users className="w-3.5 h-3.5 text-[#C9A24B]" />
            <span className={`text-xs text-[#F3E6C4] uppercase font-bold ${isUrdu ? 'font-urdu' : isHindi ? 'font-poppins' : 'font-cinzel tracking-[0.2em]'}`}>
              {t.hostsRsvp.rsvpBadge}
            </span>
          </div>

          <h3 className={`text-2xl sm:text-3xl text-gold-bright font-bold mb-6 ${isUrdu ? 'font-urdu text-2xl sm:text-3xl' : isHindi ? 'font-poppins font-bold' : 'font-serif'}`}>
            {t.hostsRsvp.familyCompliments}
          </h3>

          {/* Respected Family Members (All Preserved!) */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 max-w-2xl mx-auto my-6">
            {familyMembersList.map((member) => (
              <span
                key={member}
                className={`py-2 px-4 rounded-full bg-[#0B3D2E] border border-[#C9A24B]/35 text-xs sm:text-sm text-[#FBF6E9] shadow-sm font-medium hover:border-[#C9A24B] transition-colors ${
                  isUrdu ? 'font-urdu text-sm' : isHindi ? 'font-poppins' : 'font-poppins'
                }`}
              >
                {member}
              </span>
            ))}
          </div>

          {/* All Relatives & Friends Verbatim */}
          <div className="mt-8 pt-6 border-t border-[#C9A24B]/20">
            <p className={`text-2xl sm:text-3xl text-gold-bright font-bold ${isUrdu ? 'font-urdu text-2xl sm:text-3xl' : isHindi ? 'font-poppins font-bold text-xl sm:text-2xl' : 'font-cormorant italic'}`}>
              {t.hostsRsvp.inclusive}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
