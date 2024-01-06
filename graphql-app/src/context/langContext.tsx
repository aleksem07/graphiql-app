'use client';

import { createContext, useState } from 'react';

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
  const [language, setLanguage] = useState<AvailableLangs>('en');
  const updateLanguage = (language: AvailableLangs) => setLanguage(language);
  return (
    <LangContext.Provider value={{ language, updateLanguage }}>{children}</LangContext.Provider>
  );
};
