import Image from 'next/image';
import { Developer } from '@/common/welcomePageData';

export const DeveloperCard = ({ developer }: { developer: Developer }) => (
  <div className="m-2">
    <a href={developer.githubLink} target="_blank" rel="noopener noreferrer">
      <div className="w-24 h-24 rounded-full mx-auto overflow-hidden transition-transform duration-200 hover:scale-105">
        <Image
          src={developer.imageLink}
          alt={developer.name}
          width={96}
          height={96}
          className="rounded-full"
        />
      </div>
    </a>
    <h4 className="font-bold pt-10">{developer.name}</h4>
    <p>{developer.description}</p>
  </div>
);
