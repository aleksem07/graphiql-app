import type { Metadata } from 'next';
import { DeveloperCard } from '@/components/DeveloperCard/DeveloperCard';
import { WelcomeSection } from '@/components/WelcomeSection/WelcomeSection';
import { developers, sections } from '@/common/welcomePageData';

export const metadata: Metadata = {
  title: 'Welcome page - Graphql playground',
};

export default function Welcome() {
  return (
    <>
      <div className="mx-auto max-w-[1280px] h-100vh">
        <div className="flex-1 flex items-start justify-start">
          <div className="flex-1 flex items-center justify-center flex-col m-10 pt-20">
            <h2 className="text-2xl font-bold">About Us</h2>
            <div className="grid gap-4 grid-cols-1 pt-20 xs:grid-cols-3">
              {developers.map((developer) => (
                <DeveloperCard key={developer.name} developer={developer} />
              ))}
            </div>
          </div>
        </div>
        {sections.map((section) => (
          <WelcomeSection key={section.title} info={section} />
        ))}
      </div>
    </>
  );
}
