'use client';
import { DeveloperCard } from '@/components/DeveloperCard/DeveloperCard';
import { WelcomeSection } from '@/components/WelcomeSection/WelcomeSection';
import { developers, sections } from '@/common/welcomePageData';
import { useContext } from 'react';
import { LangContext } from '@/context/langContext';
import translation from '@/common/translation';

export default function Welcome() {
  const { language } = useContext(LangContext);
  return (
    <>
      <div className="mx-auto max-w-[1280px] h-100vh">
        <h1 className="text-3xl text-center font-bold m-5 mt-10">
          {translation.welcome.welcome[language]}
        </h1>
        {sections.map((section) => (
          <WelcomeSection key={section.title.en} info={section} lang={language} />
        ))}
        <div className="flex-1 flex items-start justify-start">
          <div className="flex-1 flex items-center justify-center flex-col m-2">
            <h2 className="text-2xl font-bold">{translation.welcome.aboutUs[language]}</h2>
            <div className="grid gap-4 grid-cols-1 pt-5 xs:grid-cols-3">
              {developers.map((developer) => (
                <DeveloperCard key={developer.name.en} developer={developer} lang={language} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
