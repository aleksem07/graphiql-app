'use client';

import { createContext, useState } from 'react';

type LangContextType = {
  language: 'en' | 'ru';
  updateLanguage: (language: 'en' | 'ru') => void;
};

export const LangContext = createContext<LangContextType>({
  language: 'en',
  updateLanguage: () => {},
});

export const LangState = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<'en' | 'ru'>('en');
  const updateLanguage = (language: 'en' | 'ru') => setLanguage(language);
  return (
    <LangContext.Provider value={{ language, updateLanguage }}>{children}</LangContext.Provider>
  );
};
