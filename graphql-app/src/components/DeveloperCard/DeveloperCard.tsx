import Image from 'next/image';
import { Developer } from '@/common/welcomePageData';
import { AvailableLangs } from '@/context/langContext';

export const DeveloperCard = ({
  developer,
  lang,
}: {
  developer: Developer;
  lang: AvailableLangs;
}) => (
  <div className="m-2">
    <a href={developer.githubLink} target="_blank" rel="noopener noreferrer">
      <div className="w-24 h-24 rounded-full mx-auto overflow-hidden transition-transform duration-200 hover:scale-105">
        <Image
          src={developer.imageLink}
          alt={developer.name[lang]}
          width={96}
          height={96}
          className="rounded-full"
        />
      </div>
    </a>
    <h4 className="font-bold pt-10 text-center">{developer.name[lang]}</h4>
    <ul className="nolist">
      {developer.description[lang].map((description) => (
        <li key={description} className="text-center">
          {description}
        </li>
      ))}
    </ul>
  </div>
);
