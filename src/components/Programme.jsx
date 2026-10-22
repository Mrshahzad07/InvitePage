import React, { useState } from 'react';
import {
  BookOpen,
  Sun,
  Sparkles,
  Utensils,
  Compass,
  HeartHandshake,
  Sunrise,
  Calendar,
  Clock,
  ChevronRight,
  Download,
} from 'lucide-react';
import { weddingData } from '../data/invitation';
import { downloadAllEventsIcs, getGoogleCalendarUrl } from '../utils/calendar';
import { useLanguage } from '../context/LanguageContext';

const iconMap = {
  milad: BookOpen,
  haldi: Sun,
  mehndi: Sparkles,
  dinner: Utensils,
  barat: Compass,
  nikah: HeartHandshake,
  rukhsati: Sunrise,
};

/**
 * SECTION 5: WEDDING ITINERARY / PROGRAMME
 * - Prominent, crystal-clear date and time banners on every event card
 * - Fixed overlap issue completely: dates are placed prominently inside the card
 * - Day filter pills for easy navigation
 * - Direct Google Calendar & ICS download links
 * - Multi-language support (English, हिन्दी, اردو)
 */
export default function Programme({ onHoverEvent }) {
  const { t, isUrdu, isHindi } = useLanguage();
  const [activeDay, setActiveDay] = useState('all');

  const daysList = [
    { id: '1', shortDay: t.programme.days.day1, ceremony: t.programme.days.day1Ceremony, dayNum: '1' },
    { id: '2', shortDay: t.programme.days.day2, ceremony: t.programme.days.day2Ceremony, dayNum: '2' },
    { id: '3', shortDay: t.programme.days.day3, ceremony: t.programme.days.day3Ceremony, dayNum: '3' },
    { id: '4', shortDay: t.programme.days.day4, ceremony: t.programme.days.day4Ceremony, dayNum: '4' },
  ];

  // Merge translation event details with base icon & metadata
  const baseEvents = weddingData.programme;
  const translatedEvents = (t.programme.events || []).map((tEvt, idx) => {
    const base = baseEvents[idx] || {};
    return {
      ...base,
      ...tEvt,
      id: tEvt.id || base.id,
      day: base.day || '1',
      isMainNikah: base.isMainNikah,
      iconKey: base.id,
    };
  });

  const displayedEvents = translatedEvents.length > 0 ? translatedEvents : baseEvents;

  const filteredEvents =
    activeDay === 'all'
      ? displayedEvents
      : displayedEvents.filter((evt) => evt.day === activeDay);

  return (
    <section
      id="programme"
      className="relative min-h-screen py-20 px-3 sm:px-6 z-10"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#134E3A]/90 border border-[#C9A24B]/50 mb-3 shadow-[0_0_20px_rgba(201,162,75,0.25)]">
            <Calendar className="w-4 h-4 text-[#C9A24B]" />
            <span className={`text-xs font-bold text-[#F3E6C4] uppercase ${isUrdu ? 'font-urdu' : isHindi ? 'font-poppins' : 'font-cinzel tracking-[0.25em]'}`}>
              {t.programme.badge}
            </span>
          </div>

          <h2 className={`text-2xl sm:text-3xl md:text-4xl text-gold-bright font-bold tracking-wider px-2 ${
            isUrdu ? 'font-urdu text-2xl sm:text-3xl' : isHindi ? 'font-poppins font-bold' : 'font-cinzel'
          }`}>
            {t.programme.header}
          </h2>

          <p className={`italic text-lg sm:text-xl text-[#F3E6C4]/90 mt-2 max-w-xl mx-auto ${
            isUrdu ? 'font-urdu' : isHindi ? 'font-poppins' : 'font-cormorant'
          }`}>
            {t.programme.subtitle}
          </p>
        </div>

        {/* Properly Structured Day Filter Navigation */}
        <div className="max-w-2xl mx-auto mb-10 px-1">
          {/* Top Master "All 7 Events" Pill */}
          <div className="flex justify-center mb-3">
            <button
              onClick={() => setActiveDay('all')}
              className={`w-full sm:w-auto px-7 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase transition-all duration-300 cursor-pointer border ${
                isUrdu ? 'font-urdu text-sm' : isHindi ? 'font-poppins' : 'font-cinzel tracking-[0.2em]'
              } ${
                activeDay === 'all'
                  ? 'bg-gradient-to-r from-[#F3E6C4] via-[#E5C365] to-[#C9A24B] text-[#06231A] border-[#FFFDF8] shadow-[0_4px_20px_rgba(201,162,75,0.45)] scale-102'
                  : 'bg-[#06231A]/90 text-[#F3E6C4] border-[#C9A24B]/40 hover:border-[#C9A24B] hover:bg-[#0B3D2E]'
              }`}
            >
              {t.programme.viewAll}
            </button>
          </div>

          {/* Balanced 2x2 Grid on Mobile, 4x1 on Tablet/Desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            {daysList.map((day) => (
              <button
                key={day.id}
                onClick={() => setActiveDay(day.id)}
                className={`py-3 px-3 rounded-2xl text-xs transition-all duration-300 cursor-pointer flex flex-col items-center justify-center text-center border ${
                  activeDay === day.id
                    ? 'bg-gradient-to-r from-[#F3E6C4] via-[#E5C365] to-[#C9A24B] text-[#06231A] font-bold border-[#FFFDF8] shadow-[0_4px_20px_rgba(201,162,75,0.4)] scale-102'
                    : 'bg-[#0B3D2E]/90 text-[#F3E6C4] border-[#C9A24B]/40 hover:border-[#C9A24B] hover:bg-[#134E3A]'
                }`}
              >
                <span className={`font-bold text-[11px] sm:text-xs tracking-wider ${isUrdu ? 'font-urdu' : isHindi ? 'font-poppins' : 'font-cinzel'}`}>
                  {day.shortDay}
                </span>
                <span className={`text-[10px] mt-0.5 truncate max-w-full ${
                  isUrdu ? 'font-urdu text-[11px]' : 'font-poppins'
                } ${activeDay === day.id ? 'text-[#06231A] font-semibold' : 'text-[#E5C365]'}`}>
                  {day.ceremony}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Event Cards Stack — Large, Clear & Unmistakable Dates */}
        <div className="space-y-6 sm:space-y-8">
          {filteredEvents.map((evt) => {
            const IconComponent = iconMap[evt.iconKey || evt.id] || Sparkles;
            const isNikah = evt.isMainNikah;

            return (
              <div
                key={evt.id}
                onMouseEnter={() => onHoverEvent && onHoverEvent(`programme-${evt.id}`)}
                className={`relative rounded-3xl overflow-hidden border-2 transition-all duration-300 transform hover:-translate-y-1 shadow-[0_15px_35px_rgba(0,0,0,0.7)] ${
                  isNikah
                    ? 'border-[#E5C365] bg-gradient-to-br from-[#134E3A] via-[#0B3D2E] to-[#7A1F2B]/60 shadow-[0_0_40px_rgba(201,162,75,0.35)]'
                    : 'border-[#C9A24B]/40 bg-[#0B3D2E]/90 backdrop-blur-md hover:border-[#C9A24B]'
                }`}
              >
                {/* PROMINENT TOP DATE & TIME BANNER */}
                <div
                  className={`py-3 px-4 sm:px-7 flex flex-wrap items-center justify-between gap-2.5 border-b ${
                    isNikah
                      ? 'bg-gradient-to-r from-[#C9A24B] via-[#E5C365] to-[#C9A24B] text-[#06231A] border-[#FFFDF8]/40'
                      : 'bg-[#06231A]/90 text-[#FFFDF8] border-[#C9A24B]/30'
                  }`}
                >
                  {/* Big Readable Date */}
                  <div className="flex items-center gap-2.5">
                    <Calendar className={`w-5 h-5 ${isNikah ? 'text-[#06231A]' : 'text-[#C9A24B]'}`} />
                    <div>
                      <span className={`text-base sm:text-lg font-bold tracking-wider ${isNikah ? 'text-[#06231A]' : 'text-gold-bright'} ${isUrdu ? 'font-urdu' : isHindi ? 'font-poppins' : 'font-cinzel'}`}>
                        {evt.date}
                      </span>
                      <span className={`text-sm sm:text-base font-semibold ml-2 ${isNikah ? 'text-[#06231A]/90' : 'text-[#F3E6C4]'} ${isUrdu ? 'font-urdu' : isHindi ? 'font-poppins' : 'font-serif'}`}>
                        ({evt.dayOfWeek})
                      </span>
                    </div>
                  </div>

                  {/* Big Readable Time Badge */}
                  <div className="flex items-center gap-2">
                    {isNikah && (
                      <span className={`hidden sm:inline-block px-3 py-1 rounded-full bg-[#06231A] text-[#E5C365] text-[10px] font-bold tracking-widest uppercase ${isUrdu ? 'font-urdu' : isHindi ? 'font-poppins' : 'font-cinzel'}`}>
                        {t.programme.sacredCeremonyBadge}
                      </span>
                    )}
                    <div
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border ${
                        isNikah
                          ? 'bg-[#06231A] text-[#FFFDF8] border-[#06231A]'
                          : 'bg-[#134E3A] text-[#F3E6C4] border-[#C9A24B]/50'
                      }`}
                    >
                      <Clock className={`w-4 h-4 ${isNikah ? 'text-[#E5C365]' : 'text-[#C9A24B]'}`} />
                      <span className={`text-xs sm:text-sm font-bold tracking-wide ${isUrdu ? 'font-urdu text-sm' : 'font-poppins'}`}>
                        {evt.time}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Main Body */}
                <div className="p-6 sm:p-7">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${
                        isNikah
                          ? 'bg-[#C9A24B] text-[#06231A] border-[#FFFDF8] shadow-[0_0_15px_#C9A24B]'
                          : 'bg-[#134E3A] text-[#C9A24B] border-[#C9A24B]/40'
                      }`}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className={`text-2xl sm:text-3xl text-gold-bright font-bold tracking-wide ${isUrdu ? 'font-urdu text-2xl sm:text-3xl' : isHindi ? 'font-poppins font-bold' : 'font-serif'}`}>
                          {evt.title || evt.event}
                        </h3>
                        {isNikah && (
                          <span className={`sm:hidden px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#C9A24B] text-[#06231A] ${isUrdu ? 'font-urdu' : isHindi ? 'font-poppins' : 'font-cinzel'}`}>
                            {t.programme.mainNikahBadge}
                          </span>
                        )}
                      </div>

                      <p className={`text-sm text-[#FBF6E9]/90 leading-relaxed mt-2.5 ${isUrdu ? 'font-urdu text-base' : 'font-poppins'}`}>
                        {evt.description}
                      </p>

                      {/* Single Event Calendar Button */}
                      <div className="mt-4 pt-4 border-t border-[#C9A24B]/20 flex flex-wrap items-center justify-between gap-3">
                        <span className={`text-xs text-[#C9A24B] tracking-wider ${isUrdu ? 'font-urdu text-sm' : isHindi ? 'font-poppins' : 'font-cinzel'}`}>
                          Day {evt.day} • {t.programme.ceremonyAtHotel}
                        </span>

                        <a
                          href={getGoogleCalendarUrl(evt.id)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#06231A] border border-[#C9A24B]/40 text-xs font-poppins text-[#F3E6C4] hover:text-[#FFFDF8] hover:border-[#C9A24B] transition-colors"
                        >
                          <Calendar className="w-3.5 h-3.5 text-[#C9A24B]" />
                          <span className={isUrdu ? 'font-urdu text-xs' : ''}>{t.programme.addToCalendar}</span>
                          <ChevronRight className="w-3.5 h-3.5 text-[#C9A24B]" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Download All 7 Events ICS Button */}
        <div className="mt-12 text-center">
          <button
            onClick={downloadAllEventsIcs}
            className={`inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-sm font-bold tracking-widest uppercase bg-gradient-to-r from-[#F3E6C4] via-[#E5C365] to-[#C9A24B] text-[#06231A] shadow-[0_8px_25px_rgba(201,162,75,0.4)] hover:brightness-110 active:scale-95 transition-all duration-200 cursor-pointer ${
              isUrdu ? 'font-urdu text-base' : isHindi ? 'font-poppins' : 'font-cinzel'
            }`}
          >
            <Download className="w-4 h-4 text-[#06231A]" />
            <span>{t.programme.downloadAllIcs}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
