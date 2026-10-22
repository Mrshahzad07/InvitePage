import React, { useState, useEffect } from 'react';
import { Clock, Sparkles } from 'lucide-react';
import { weddingData } from '../data/invitation';
import { useLanguage } from '../context/LanguageContext';

/**
 * SECTION 6: COUNTDOWN TO NIKAH
 * Target: 12-Dec-2026 22:00 IST (UTC+05:30)
 * 3D luxury flip digit boxes
 * Multi-language support (English, हिन्दी, اردو)
 */
export default function Countdown() {
  const { t, isUrdu, isHindi } = useLanguage();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isToday: false,
    isPast: false,
  });

  useEffect(() => {
    const targetDate = new Date(weddingData.nikahTargetIso).getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        // Check if it's the wedding day itself (within 24h)
        const isSameDay = Math.abs(difference) < 86400000;
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isToday: isSameDay,
          isPast: !isSameDay,
        });
        return;
      }

      // Check if current date matches 12.12.2026
      const nowDate = new Date();
      const isWeddingDay =
        nowDate.getFullYear() === 2026 &&
        nowDate.getMonth() === 11 && // 0-indexed Dec is 11
        nowDate.getDate() === 12;

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isToday: isWeddingDay,
        isPast: false,
      });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDigits = (num) => String(num).padStart(2, '0');

  const units = [
    { label: t.countdown.days, value: formatDigits(timeLeft.days) },
    { label: t.countdown.hours, value: formatDigits(timeLeft.hours) },
    { label: t.countdown.minutes, value: formatDigits(timeLeft.minutes) },
    { label: t.countdown.seconds, value: formatDigits(timeLeft.seconds) },
  ];

  return (
    <section
      id="countdown"
      className="relative py-20 px-4 z-10"
    >
      <div className="max-w-3xl mx-auto text-center">
        {/* Section Header */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-gold-subtle border border-[#C9A24B]/30 mb-4">
          <Clock className="w-3.5 h-3.5 text-[#C9A24B]" />
          <span className={`text-xs text-[#F3E6C4] uppercase ${isUrdu ? 'font-urdu' : isHindi ? 'font-poppins' : 'font-cinzel tracking-[0.25em]'}`}>
            {t.countdown.badge}
          </span>
        </div>

        <h2 className={`text-2xl sm:text-3xl md:text-4xl text-gold-bright font-bold tracking-wider mb-2 ${
          isUrdu ? 'font-urdu text-2xl sm:text-3xl' : isHindi ? 'font-poppins font-bold' : 'font-cinzel'
        }`}>
          {t.countdown.title}
        </h2>

        <p className={`italic text-lg sm:text-xl text-[#F3E6C4]/80 mb-10 ${
          isUrdu ? 'font-urdu' : isHindi ? 'font-poppins' : 'font-cormorant'
        }`}>
          {t.countdown.subtitle}
        </p>

        {timeLeft.isToday ? (
          <div className="py-8 px-6 rounded-2xl glass-emerald-card border-2 border-[#C9A24B] shadow-[0_0_40px_rgba(201,162,75,0.4)] animate-pulse-glow">
            <Sparkles className="w-8 h-8 text-[#E5C365] mx-auto mb-3" />
            <h3 className={`text-3xl sm:text-4xl text-gold-bright font-bold ${isUrdu ? 'font-urdu' : isHindi ? 'font-poppins' : 'font-serif'}`}>
              {t.countdown.ceremonyBegun}
            </h3>
            <p className="font-poppins text-sm text-[#F3E6C4] mt-2">
              {t.countdown.ceremonyBegunSub}
            </p>
          </div>
        ) : timeLeft.isPast ? (
          <div className="py-8 px-6 rounded-2xl glass-emerald-card border border-[#C9A24B]/40">
            <h3 className={`text-2xl sm:text-3xl text-gold-bright font-bold ${isUrdu ? 'font-urdu' : isHindi ? 'font-poppins' : 'font-serif'}`}>
              {t.countdown.ceremonyPast}
            </h3>
            <p className="font-poppins text-sm text-[#F3E6C4] mt-2">
              {t.countdown.ceremonyPastSub}
            </p>
          </div>
        ) : (
          /* 3D Luxury Flip-Clock Digit Cards Grid */
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 max-w-2xl mx-auto">
            {units.map((unit) => (
              <div
                key={unit.label}
                className="group relative glass-emerald-card rounded-2xl p-3.5 sm:p-6 border border-[#C9A24B]/40 shadow-[0_12px_30px_rgba(0,0,0,0.6)] transform hover:scale-105 transition-transform duration-300"
              >
                {/* Horizontal Flip seam line */}
                <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-[#06231A] opacity-60 pointer-events-none" />

                {/* Corner accent */}
                <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#C9A24B]/40" />

                {/* Big Digit */}
                <div className="font-cinzel text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-extrabold text-gold-bright drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] tracking-wider">
                  {unit.value}
                </div>

                {/* Label */}
                <div className={`text-[10px] sm:text-xs font-semibold text-[#F3E6C4]/80 tracking-wider uppercase mt-1.5 ${
                  isUrdu ? 'font-urdu text-xs' : isHindi ? 'font-poppins' : 'font-cinzel'
                }`}>
                  {unit.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Timezone Note */}
        <p className="font-poppins text-xs text-[#C9A24B]/70 tracking-wider mt-6">
          {t.countdown.timezoneNote}
        </p>
      </div>
    </section>
  );
}
