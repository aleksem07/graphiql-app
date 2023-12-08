import Link from 'next/link';
import GitHubIcon from '@/UI/github-icon';
import RsSchoolIcon from '@/UI/rsschool-icon';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white pt-4 text-center" data-testid="footer">
      <div className="container mx-auto text-center">
        <nav className="flex justify-center items-center">
          <Link href="https://github.com/irinaosp" className="inline-block mx-2" target="_blank">
            <GitHubIcon className="text-white hover:text-gray-500" />
          </Link>
          <Link href="https://github.com/juliaavona" className="inline-block mx-2" target="_blank">
            <GitHubIcon className="text-white hover:text-gray-500" />
          </Link>
          <Link href="https://github.com/aleksem07" className="inline-block mx-2" target="_blank">
            <GitHubIcon className="text-white hover:text-gray-500" />
          </Link>
        </nav>
        <nav className="flex justify-center items-center">
          <Link href="https://rs.school/react/" className="inline-block mx-2" target="_blank">
            <RsSchoolIcon className="text-white hover:text-gray-500" />
          </Link>
          <p>&copy; 2023 All rights reserved</p>
        </nav>
      </div>
    </footer>
  );
}
