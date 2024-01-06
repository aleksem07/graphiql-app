'use client';

import { createContext, useEffect, useState } from 'react';

export type AvailableLangs = 'en' | 'ru';

type LangContextType = {
  language: AvailableLangs;
  updateLanguage: (language: 'en' | 'ru') => void;
};

export const LangContext = createContext<LangContextType>({
  language: 'en',
  updateLanguage: () => {},
});

export const LangState = ({ children }: { children: React.ReactNode }) => {
  const [langFromLS, setLangFromLS] = useState<string | null>(null);
  useEffect(() => {
    setLangFromLS(localStorage.getItem('langGRAPHQL') || null);
  }, []);
  const [language, setLanguage] = useState<AvailableLangs>(
    langFromLS === 'en' || langFromLS === 'ru' ? langFromLS : 'en'
  );
  const updateLanguage = (language: AvailableLangs) => {
    setLanguage(language);
    localStorage.setItem('langGRAPHQL', language);
  };
  return (
    <LangContext.Provider value={{ language, updateLanguage }}>{children}</LangContext.Provider>
  );
};
