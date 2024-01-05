'use client';

import { createContext } from 'react';

type LangContextType = 'en' | 'ru';

export const LangContext = createContext<LangContextType>('en');

export function LangProvider({ children }: { children: React.ReactNode }) {
  return <LangContext.Provider value="en">{children}</LangContext.Provider>;
}
