import translation from '@/common/translation';
import { SectionInfo } from '@/common/welcomePageData';
import { AvailableLangs } from '@/context/langContext';

export const WelcomeSection = ({ info, lang }: { info: SectionInfo; lang: AvailableLangs }) => (
  <div className="flex-1 flex items-center justify-center flex-col m-2 pt-5">
    <h2 className="text-2xl font-bold pb-5">{info.title[lang]}</h2>
    <p className="text-justify">{info.content[lang]}</p>
    {
      <a
        href={info.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-white bg-gray-500 hover:bg-gray-700 px-3 py-1 rounded mt-5"
      >
        {translation.welcome.learnMore[lang]}
      </a>
    }
  </div>
);
