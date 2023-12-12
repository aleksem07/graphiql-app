import Link from 'next/link';
import { AppRoutes } from '@/common/routes';
import NavLinks from '../navLinks/navLinks';

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-2" data-testid="header">
      <div className="container mx-auto flex justify-between items-center">
        <Link href={AppRoutes.HOME} className="text-2xl font-bold">
          Logo
        </Link>
        <nav className="space-x-4">
          <NavLinks />
        </nav>
      </div>
    </header>
  );
}
