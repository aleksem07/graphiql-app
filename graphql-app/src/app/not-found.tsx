import Link from 'next/link';
import type { Metadata } from 'next';
import translation from '@/common/translation';
import { useContext } from 'react';
import { LangContext } from '@/context/langContext';

export const metadata: Metadata = {
  title: '404 Page not found',
};

export default function NotFound() {
  const { language } = useContext(LangContext);

  return (
    <main className="flex-1 flex items-center justify-center">
      <h1>{translation.error.err404[language]}</h1>
      <span>&nbsp;|&nbsp;</span>
      <Link href="/" className="text-blue-500">
        {translation.buttons.backHome[language]}
      </Link>
    </main>
  );
}
