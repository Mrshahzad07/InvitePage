import React from 'react';
import { Heart, ArrowUp, Phone, MessageCircle, Code, Sparkles } from 'lucide-react';
import { weddingData } from '../data/invitation';

/**
 * SECTION 10: FOOTER
 * - "With Best Compliments From: Md. Mahtab Khan" verbatim
 * - Dua line: "Jazakallah Khair for your presence & prayers" + Arabic
 * - 3D cartoon couple farewell waving illustration
 * - Shooting star decorative effect
 * - Developer & Custom Wedding Website Inquiry Card: Md Shahzad (Raja) - 8340156191
 */
export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative pt-20 pb-28 px-4 z-10 text-center overflow-hidden border-t border-[#C9A24B]/30 bg-gradient-to-b from-transparent via-[#06231A]/95 to-[#041610]">
      {/* Decorative Shooting Star CSS Element */}
      <div className="absolute top-8 left-1/4 w-32 h-[1px] bg-gradient-to-r from-transparent via-[#FFFDF8] to-transparent transform -rotate-12 opacity-75 animate-pulse" />

      <div className="max-w-2xl mx-auto flex flex-col items-center">
        {/* Cartoon Couple Farewell Avatar */}
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-[#C9A24B] to-[#E5C365] shadow-[0_0_25px_rgba(201,162,75,0.4)] overflow-hidden mx-auto">
            <img
              src="/couple-cartoon.jpg"
              alt="Farha and Firoj Farewell Wave"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#06231A] border border-[#C9A24B] text-[10px] font-cinzel font-bold text-[#E5C365] tracking-wider uppercase whitespace-nowrap">
            Khuda Hafiz
          </span>
        </div>

        {/* Monogram Floral Wreath Icon */}
        <div
          onClick={scrollToTop}
          className="w-14 h-14 rounded-full border-2 border-[#C9A24B] bg-[#0B3D2E] flex flex-col items-center justify-center cursor-pointer shadow-[0_0_20px_rgba(201,162,75,0.4)] mb-6 hover:scale-110 transition-transform group"
          title="Back to Top"
        >
          <span className="font-cinzel text-xl font-bold text-gold-bright tracking-wider">
            {weddingData.meta.monogram}
          </span>
          <ArrowUp className="w-3 h-3 text-[#C9A24B] group-hover:-translate-y-0.5 transition-transform" />
        </div>

        {/* Closing Compliments Verbatim */}
        <div className="py-2.5 px-6 rounded-full glass-gold-subtle border border-[#C9A24B]/50 mb-6">
          <p className="font-cinzel text-sm sm:text-base text-gold-bright font-bold tracking-wider uppercase">
            {weddingData.closingCompliments}
          </p>
        </div>

        {/* Sacred Dua in Arabic */}
        <p className="font-arabic text-3xl sm:text-4xl text-[#C9A24B] leading-relaxed mb-2">
          {weddingData.dua.arabic}
        </p>

        {/* Transliteration and Blessings */}
        <h4 className="font-cormorant italic text-xl sm:text-2xl text-[#FFFDF8] font-medium tracking-wide max-w-lg mx-auto">
          "{weddingData.dua.transliteration}"
        </h4>

        <p className="font-poppins text-xs sm:text-sm text-[#F3E6C4]/85 max-w-md mx-auto mt-2 leading-relaxed">
          {weddingData.dua.subtext}
        </p>

        <div className="w-20 h-[1.5px] bg-gradient-to-r from-transparent via-[#C9A24B] to-transparent my-8" />

        {/* Couple & Date Recap */}
        <div className="space-y-1">
          <p className="font-script text-3xl sm:text-4xl text-gold-bright">
            {weddingData.meta.brideFull} <span className="text-[#F3E6C4] font-cormorant text-xl">&</span> {weddingData.meta.groomFull}
          </p>
          <p className="font-cinzel text-xs text-[#C9A24B] tracking-[0.25em] uppercase font-semibold">
            12.12.2026 • Hotel Shree Parivaar, Barhi
          </p>
        </div>

        {/* Farewell Tag */}
        <div className="mt-6 flex items-center justify-center gap-1.5 text-xs font-poppins text-[#F3E6C4]/70">
          <span>Crafted with heartfelt barakah & prayers for all guests</span>
          <Heart className="w-3.5 h-3.5 text-[#C9A24B] fill-[#C9A24B]" />
        </div>

        {/* DEVELOPER CREDIT & WEDDING WEBSITE INQUIRY CARD */}
        <div className="mt-8 w-full max-w-lg p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-[#0B3D2E]/95 via-[#06231A]/95 to-[#134E3A]/90 border-2 border-[#E5C365]/70 shadow-[0_15px_40px_rgba(0,0,0,0.85)] text-center relative overflow-hidden group">
          {/* Top Gold Shimmer Border */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-[#E5C365] to-transparent" />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#06231A] border border-[#C9A24B]/60 mb-3 shadow-sm">
            <Code className="w-3.5 h-3.5 text-[#E5C365]" />
            <span className="font-cinzel text-[10px] sm:text-xs text-[#E5C365] font-bold tracking-[0.2em] uppercase">
              WEBSITE DEVELOPER
            </span>
          </div>

          {/* Developer Name */}
          <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#FFFDF8] tracking-wider">
            Md Shahzad <span className="text-[#E5C365] font-semibold">(Raja)</span>
          </h3>

          {/* Inquiry Pitch */}
          <p className="font-cormorant italic text-base sm:text-lg text-[#F3E6C4] mt-1.5 max-w-sm mx-auto leading-snug">
            Want to build a stunning, custom 3D digital invitation website like this for your marriage?
          </p>

          <p className="font-poppins text-xs text-[#C9A24B] mt-1 mb-4 font-medium">
            Contact me to create your personalized wedding website
          </p>

          {/* Action Buttons: Direct Call & Direct WhatsApp */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={`tel:${weddingData.developer.phone}`}
              className="px-4 py-2.5 rounded-full bg-[#134E3A] hover:bg-[#E5C365] text-[#FFFDF8] hover:text-[#06231A] border border-[#C9A24B] transition-all font-cinzel text-xs font-bold tracking-wider flex items-center gap-2 shadow-md active:scale-95 cursor-pointer"
              title="Call Md Shahzad (Raja)"
            >
              <Phone className="w-3.5 h-3.5 text-[#E5C365] group-hover:text-[#06231A]" />
              <span>Call: {weddingData.developer.phone}</span>
            </a>

            <a
              href={`https://wa.me/91${weddingData.developer.whatsapp}?text=${encodeURIComponent(
                'Hello Md Shahzad (Raja), I saw your 3D wedding invitation website and would love to build a similar custom website for my wedding!'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-full bg-[#25D366]/25 hover:bg-[#25D366] text-[#FFFDF8] hover:text-[#06231A] border border-[#25D366]/70 transition-all font-cinzel text-xs font-bold tracking-wider flex items-center gap-2 shadow-md active:scale-95 cursor-pointer"
              title="Chat with Md Shahzad (Raja) on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366] group-hover:text-[#06231A]" />
              <span>WhatsApp: {weddingData.developer.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
