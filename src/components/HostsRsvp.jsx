import React from 'react';
import { Phone, MessageCircle, Heart, MapPin, Users, Sparkles, Star } from 'lucide-react';
import { weddingData } from '../data/invitation';

/**
 * SECTION 8: HOSTS & R.S.V.P.
 * - Prominently highlighted & prioritized Late Elders (Late Naim Khan, Late Aftab Khan)
 *   in a distinguished Royal Memorial Honor Card with sacred blessings.
 * - "A Cordial Invitation From: Md. Mahtab Khan" + full address
 * - Tap-to-call buttons for all 3 phone numbers
 * - WhatsApp direct chat link (wa.me)
 * - Family members list & "All Relatives & Friends"
 */
export default function HostsRsvp() {
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
            <span className="font-cinzel text-xs font-bold text-[#FFFDF8] tracking-[0.25em] uppercase">
              ETERNAL BLESSINGS & SACRED MEMORY
            </span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-gold-bright font-bold tracking-wide mt-1 mb-2">
            In Revere Remembrance of Our Beloved Late Elders
          </h3>

          <p className="font-arabic text-xl sm:text-2xl text-[#C9A24B] mb-6">
            سایۂ شفقت و مغفرت کی دعا کے ساتھ
          </p>

          <p className="font-cormorant italic text-base sm:text-lg text-[#F3E6C4]/90 max-w-xl mx-auto mb-8">
            The foundation, guidance, and prayers of our cherished elders remain with us forever as we celebrate this sacred union.
          </p>

          {/* HIGHLIGHTED LATE ELDERS DIGNIFIED SHRINE GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
            {weddingData.rsvp.lateElders.map((elder) => (
              <div
                key={elder.name}
                className="relative p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-[#06231A] via-[#0B3D2E] to-[#134E3A] border-2 border-[#C9A24B] shadow-[0_10px_30px_rgba(0,0,0,0.7)] group hover:scale-105 transition-all duration-300"
              >
                {/* Memorial Filigree Corners */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#C9A24B]" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#C9A24B]" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#C9A24B]" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#C9A24B]" />

                <span className="font-cinzel text-[10px] text-[#C9A24B] tracking-[0.2em] uppercase font-semibold block mb-2">
                  Beloved Pillar of Family
                </span>

                <h4 className="font-cinzel text-2xl sm:text-3xl text-gold-bright font-bold tracking-wider drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                  {elder.name}
                </h4>

                <p className="font-poppins text-xs text-[#F3E6C4]/70 mt-2">
                  (May Allah grant them the highest station in Jannat-ul-Firdaus)
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 2. CORDIAL INVITATION FROM HOST */}
        <div className="glass-emerald-card rounded-3xl p-6 sm:p-10 border-2 border-[#C9A24B]/50 shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-center relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#134E3A]/90 border border-[#C9A24B]/40 mb-3">
            <Heart className="w-3.5 h-3.5 text-[#C9A24B]" />
            <span className="font-cinzel text-xs font-bold text-[#F3E6C4] tracking-[0.2em] uppercase">
              WARM HOSTS
            </span>
          </div>

          {/* Heading Verbatim */}
          <h2 className="font-cinzel text-base sm:text-lg text-[#F3E6C4] tracking-wider uppercase mb-1">
            {weddingData.inviter.heading}
          </h2>

          {/* Host Name Verbatim */}
          <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-gold-bright font-bold mb-4">
            {weddingData.inviter.name}
          </h3>

          {/* Host Address Verbatim */}
          <div className="flex items-start justify-center gap-2 max-w-xl mx-auto mb-8 px-2">
            <MapPin className="w-4 h-4 text-[#C9A24B] shrink-0 mt-1" />
            <p className="font-poppins text-xs sm:text-sm text-[#FBF6E9]/90 leading-relaxed text-center">
              {weddingData.inviter.address}
            </p>
          </div>

          {/* Tap-to-call Numbers Grid */}
          <div className="border-t border-[#C9A24B]/20 pt-6">
            <p className="font-cinzel text-xs text-[#C9A24B] tracking-[0.2em] uppercase font-bold mb-4">
              TAP TO CALL OR WHATSAPP
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
              {weddingData.inviter.mobiles.map((mobile) => (
                <a
                  key={mobile}
                  href={`tel:${mobile}`}
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
                className="inline-flex items-center gap-2 py-3 px-6 rounded-xl font-cinzel text-xs font-bold tracking-wider uppercase bg-[#134E3A] text-[#FFFDF8] border border-[#10B981]/60 hover:bg-[#10B981] hover:text-[#06231A] transition-all duration-200 shadow-lg cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#10B981] group-hover:text-[#06231A]" />
                <span>Message on WhatsApp ({weddingData.inviter.whatsappMobile})</span>
              </a>
            </div>
          </div>
        </div>

        {/* 3. R.S.V.P. FAMILY LIST */}
        <div className="glass-emerald-card rounded-3xl p-6 sm:p-10 border border-[#C9A24B]/40 shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#134E3A]/80 border border-[#C9A24B]/30 mb-4">
            <Users className="w-3.5 h-3.5 text-[#C9A24B]" />
            <span className="font-cinzel text-xs text-[#F3E6C4] tracking-[0.2em] uppercase font-bold">
              {weddingData.rsvp.heading}
            </span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl text-gold-bright font-bold mb-6">
            With The Warm Compliments & Respects Of Our Family
          </h3>

          {/* Respected Family Members */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 max-w-2xl mx-auto my-6">
            {weddingData.rsvp.familyMembers.map((member) => (
              <span
                key={member}
                className="py-2 px-4 rounded-full bg-[#0B3D2E] border border-[#C9A24B]/35 font-poppins text-xs sm:text-sm text-[#FBF6E9] shadow-sm font-medium hover:border-[#C9A24B] transition-colors"
              >
                {member}
              </span>
            ))}
          </div>

          {/* All Relatives & Friends Verbatim */}
          <div className="mt-8 pt-6 border-t border-[#C9A24B]/20">
            <p className="font-cormorant italic text-2xl sm:text-3xl text-gold-bright font-bold">
              {weddingData.rsvp.inclusive}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
