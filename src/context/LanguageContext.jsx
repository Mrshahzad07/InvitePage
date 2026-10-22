import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    try {
      const saved = localStorage.getItem('wedding_lang');
      if (saved && (saved === 'en' || saved === 'hi' || saved === 'ur')) {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'en';
  });

  const setLanguage = (newLang) => {
    if (newLang !== 'en' && newLang !== 'hi' && newLang !== 'ur') return;
    setLanguageState(newLang);
    try {
      localStorage.setItem('wedding_lang', newLang);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    // Update document attributes for accessibility and proper bidirectional rendering
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ur' ? 'rtl' : 'ltr';

    if (language === 'ur') {
      document.body.classList.add('lang-ur');
      document.body.classList.remove('lang-hi');
    } else if (language === 'hi') {
      document.body.classList.add('lang-hi');
      document.body.classList.remove('lang-ur');
    } else {
      document.body.classList.remove('lang-ur', 'lang-hi');
    }
  }, [language]);

  const t = translations[language] || translations.en;
  const isUrdu = language === 'ur';
  const isHindi = language === 'hi';
  const isEnglish = language === 'en';
  const dir = isUrdu ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider
      value={{
        language,
        lang: language,
        setLanguage,
        setLang: setLanguage,
        t,
        isUrdu,
        isHindi,
        isEnglish,
        isRTL: isUrdu,
        dir,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
