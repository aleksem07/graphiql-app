import { SectionInfo } from '../../common/wecomePageData';

export const WelcomeSection = ({ info }: { info: SectionInfo }) => (
  <div className="flex-1 flex items-center justify-center flex-col m-10 pt-20">
    <h2 className="text-2xl font-bold pb-5">{info.title}</h2>
    <p>{info.content}</p>
    {
      <a
        href={info.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-white bg-gray-500 hover:bg-gray-700 px-3 py-1 rounded mt-5"
      >
        Learn more...
      </a>
    }
  </div>
);
