import Link from 'next/link';
import GitHubIcon from '@/UI/github-icon';
import RsSchoolIcon from '@/UI/rsschool-icon';
import { githubLinks } from '@/common/links';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-2 text-center" data-testid="footer">
      <div className="flex justify-between items-center container mx-auto text-center">
        <Link href="https://rs.school/react/" className="inline-block mx-2" target="_blank">
          <RsSchoolIcon className="text-white hover:text-gray-500" />
        </Link>
        <nav className="flex justify-center nav-links">
          {githubLinks.map(({ href, nickname }) => (
            <Link key={nickname} href={href} className="inline-block mx-2" target="_blank">
              <GitHubIcon className="text-white hover:text-gray-500" />
            </Link>
          ))}
        </nav>
        <p className="font-bold cursor-default">2023</p>
      </div>
    </footer>
  );
}
