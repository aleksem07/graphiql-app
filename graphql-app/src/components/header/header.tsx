import Link from 'next/link';
import { AppRoutes } from '@/const/routes';

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4" data-testid="header">
      <div className="container mx-auto flex justify-between items-center">
        <Link href={AppRoutes.HOME} className="text-2xl font-bold">
          Logo
        </Link>
        <nav className="space-x-4">
          <Link href={AppRoutes.SING_IN} className="hover:text-gray-300">
            Sign In
          </Link>
          <Link href={AppRoutes.SING_UP} className="hover:text-gray-300">
            Sign Up
          </Link>
          <Link href={AppRoutes.WELCOME} className="hover:text-gray-300">
            Welcome page
          </Link>
        </nav>
      </div>
    </header>
  );
}
