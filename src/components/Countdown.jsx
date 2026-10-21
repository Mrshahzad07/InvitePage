import React, { useState, useEffect } from 'react';
import { Clock, Sparkles } from 'lucide-react';
import { weddingData } from '../data/invitation';

/**
 * SECTION 6: COUNTDOWN TO NIKAH
 * Target: 12-Dec-2026 22:00 IST (UTC+05:30)
 * 3D luxury flip digit boxes
 * On the event day: "Alhamdulillah, today is the day"
 */
export default function Countdown() {
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
    { label: 'DAYS', value: formatDigits(timeLeft.days) },
    { label: 'HOURS', value: formatDigits(timeLeft.hours) },
    { label: 'MINUTES', value: formatDigits(timeLeft.minutes) },
    { label: 'SECONDS', value: formatDigits(timeLeft.seconds) },
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
          <span className="font-cinzel text-xs text-[#F3E6C4] tracking-[0.25em] uppercase">
            COUNTDOWN TO NIKAH
          </span>
        </div>

        <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl text-gold-bright font-bold tracking-wider mb-2">
          12 December 2026 • 10:00 PM IST
        </h2>

        <p className="font-cormorant italic text-lg sm:text-xl text-[#F3E6C4]/80 mb-10">
          Counting every blessed moment until the sacred vows
        </p>

        {timeLeft.isToday ? (
          <div className="py-8 px-6 rounded-2xl glass-emerald-card border-2 border-[#C9A24B] shadow-[0_0_40px_rgba(201,162,75,0.4)] animate-pulse-glow">
            <Sparkles className="w-8 h-8 text-[#E5C365] mx-auto mb-3" />
            <h3 className="font-serif text-3xl sm:text-4xl text-gold-bright font-bold">
              Alhamdulillah, today is the day!
            </h3>
            <p className="font-poppins text-sm text-[#F3E6C4] mt-2">
              We look forward to welcoming you at Hotel Shree Parivaar, Barhi tonight.
            </p>
          </div>
        ) : timeLeft.isPast ? (
          <div className="py-8 px-6 rounded-2xl glass-emerald-card border border-[#C9A24B]/40">
            <h3 className="font-serif text-2xl sm:text-3xl text-gold-bright font-bold">
              Alhamdulillah, the Nikah has been solemnised!
            </h3>
            <p className="font-poppins text-sm text-[#F3E6C4] mt-2">
              Jazakallah Khair for your gracious presence and heartfelt prayers.
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
                <div className="font-cinzel text-[10px] sm:text-xs font-semibold text-[#F3E6C4]/80 tracking-[0.25em] uppercase mt-1.5">
                  {unit.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Timezone Note */}
        <p className="font-poppins text-xs text-[#C9A24B]/70 tracking-wider mt-6">
          * Indian Standard Time (IST • UTC+05:30)
        </p>
      </div>
    </section>
  );
}
