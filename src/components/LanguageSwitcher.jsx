import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

/**
 * ROYAL MULTI-LANGUAGE SWITCHER (English • हिन्दी • اردو)
 * Allows guests to switch between English, Hindi, and Urdu at any time.
 */
export default function LanguageSwitcher({ variant = 'default', className = '' }) {
  const { language, setLanguage } = useLanguage();

  const options = [
    { code: 'en', label: 'English', short: 'EN' },
    { code: 'hi', label: 'हिन्दी', short: 'हिन्दी' },
    { code: 'ur', label: 'اردو', short: 'اردو' },
  ];

  if (variant === 'gate') {
    return (
      <div className={`flex flex-col items-center my-3 ${className}`}>
        <div className="inline-flex items-center gap-1.5 p-1 rounded-full bg-[#06231A]/90 border-2 border-[#E5C365]/70 shadow-[0_4px_20px_rgba(201,162,75,0.35)]">
          <div className="pl-2 pr-1 flex items-center text-[#E5C365]">
            <Globe className="w-3.5 h-3.5" />
          </div>

          <div className="flex items-center gap-1">
            {options.map((opt) => {
              const active = language === opt.code;
              return (
                <button
                  key={opt.code}
                  type="button"
                  onClick={() => setLanguage(opt.code)}
                  className={`px-3 py-1 rounded-full font-cinzel text-xs font-bold transition-all duration-300 cursor-pointer ${
                    active
                      ? 'bg-gradient-to-r from-[#F3E6C4] via-[#E5C365] to-[#C9A24B] text-[#06231A] shadow-[0_2px_10px_rgba(201,162,75,0.4)] scale-105'
                      : 'text-[#F3E6C4]/80 hover:text-[#FFFDF8] hover:bg-[#0B3D2E]'
                  }`}
                  aria-pressed={active}
                  aria-label={`Switch language to ${opt.label}`}
                >
                  <span className={opt.code === 'ur' ? 'font-urdu text-[11px]' : opt.code === 'hi' ? 'font-poppins text-[11px]' : ''}>
                    {opt.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Default compact navbar / page pill
  return (
    <div className={`inline-flex items-center p-0.5 rounded-full bg-[#06231A]/90 backdrop-blur-md border border-[#C9A24B]/60 shadow-md ${className}`}>
      <div className="pl-2 pr-1 text-[#C9A24B]">
        <Globe className="w-3.5 h-3.5" />
      </div>

      <div className="flex items-center gap-0.5">
        {options.map((opt) => {
          const active = language === opt.code;
          return (
            <button
              key={opt.code}
              type="button"
              onClick={() => setLanguage(opt.code)}
              className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                active
                  ? 'bg-gradient-to-r from-[#F3E6C4] via-[#E5C365] to-[#C9A24B] text-[#06231A] font-bold shadow-[0_2px_8px_rgba(201,162,75,0.4)]'
                  : 'text-[#F3E6C4]/80 hover:text-[#FFFDF8] hover:bg-[#134E3A]'
              }`}
              aria-pressed={active}
              aria-label={`Switch language to ${opt.label}`}
            >
              <span className={opt.code === 'ur' ? 'font-urdu text-[11px]' : opt.code === 'hi' ? 'font-poppins text-[11px]' : 'font-cinzel text-[10px]'}>
                {opt.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
