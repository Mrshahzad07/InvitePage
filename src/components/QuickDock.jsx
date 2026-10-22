import React from 'react';
import { Phone, MessageCircle, MapPin, Calendar } from 'lucide-react';
import { weddingData } from '../data/invitation';
import { useLanguage } from '../context/LanguageContext';

/**
 * QUICK FLOATING ACTION DOCK
 * Ensures guests can effortlessly access phone calls, WhatsApp, venue maps,
 * schedule, and music at any point on the page in English, Hindi, or Urdu.
 */
export default function QuickDock({ onNavigateSection }) {
  const { t, lang } = useLanguage();

  const hostWhatsAppMessage =
    lang === 'ur'
      ? `السلام علیکم محمد مہتاب خان صاحب، ${t.couple.brideFull} اور ${t.couple.groomFull} کی شادی کی بہت بہت مبارکباد!`
      : lang === 'hi'
      ? `अस्सलाम वालेकुम मो. महताब खान साहब, ${t.couple.brideFull} एवं ${t.couple.groomFull} के निकाह की दिली मुबारकबाद!`
      : `Assalamu Alaikum Md. Mahtab Khan Sahab, heartfelt congratulations on the wedding of ${weddingData.meta.brideFull} & ${weddingData.meta.groomFull}!`;

  return (
    <aside
      aria-label="Quick Actions"
      className="fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom,0px))] sm:bottom-5 left-1/2 -translate-x-1/2 z-40 max-w-md w-[92%] sm:w-auto px-4 py-2.5 rounded-full bg-[#06231A]/95 backdrop-blur-xl border-2 border-[#C9A24B]/70 shadow-[0_15px_35px_rgba(0,0,0,0.85)] flex items-center justify-around sm:justify-center sm:gap-6"
    >
      {/* 1. Call Host */}
      <a
        href={`tel:${weddingData.inviter.mobiles[0]}`}
        className="group flex flex-col items-center text-[#F3E6C4] hover:text-[#E5C365] transition-colors"
        title={t.hostsRsvp.callHost}
      >
        <div className="w-8 h-8 rounded-full bg-[#0B3D2E] border border-[#C9A24B]/50 flex items-center justify-center group-hover:scale-110 transition-transform">
          <Phone className="w-4 h-4 text-[#C9A24B]" />
        </div>
        <span className="font-cinzel text-[9px] tracking-wider uppercase font-semibold mt-1">
          {t.quickDock.call}
        </span>
      </a>

      {/* 2. WhatsApp */}
      <a
        href={`https://wa.me/91${weddingData.inviter.whatsappMobile}?text=${encodeURIComponent(
          hostWhatsAppMessage
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col items-center text-[#F3E6C4] hover:text-[#25D366] transition-colors"
        title={t.hostsRsvp.whatsappDirect}
      >
        <div className="w-8 h-8 rounded-full bg-[#134E3A] border border-[#25D366]/50 flex items-center justify-center group-hover:scale-110 transition-transform">
          <MessageCircle className="w-4 h-4 text-[#25D366]" />
        </div>
        <span className="font-cinzel text-[9px] tracking-wider uppercase font-semibold mt-1">
          {t.quickDock.chat}
        </span>
      </a>

      {/* 3. Venue Map */}
      <button
        onClick={() => onNavigateSection('venue')}
        className="group flex flex-col items-center text-[#F3E6C4] hover:text-[#E5C365] transition-colors cursor-pointer"
        title={t.venue.title}
      >
        <div className="w-8 h-8 rounded-full bg-[#0B3D2E] border border-[#C9A24B]/50 flex items-center justify-center group-hover:scale-110 transition-transform">
          <MapPin className="w-4 h-4 text-[#E5C365]" />
        </div>
        <span className="font-cinzel text-[9px] tracking-wider uppercase font-semibold mt-1">
          {t.quickDock.map}
        </span>
      </button>

      {/* 4. Wedding Schedule */}
      <button
        onClick={() => onNavigateSection('programme')}
        className="group flex flex-col items-center text-[#F3E6C4] hover:text-[#E5C365] transition-colors cursor-pointer"
        title={t.programme.header}
      >
        <div className="w-8 h-8 rounded-full bg-[#0B3D2E] border border-[#C9A24B]/50 flex items-center justify-center group-hover:scale-110 transition-transform">
          <Calendar className="w-4 h-4 text-[#C9A24B]" />
        </div>
        <span className="font-cinzel text-[9px] tracking-wider uppercase font-semibold mt-1">
          {t.quickDock.events}
        </span>
      </button>
    </aside>
  );
}
