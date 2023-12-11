'use client';

import Link from 'next/link';
import { AppRoutes } from '@/common/routes';
import { RootState } from '@/redux/store';
import translation from '@/common/translation';
import { logout } from '@/firebase';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { removeUser } from '@/redux/user/userSlice';

export default function Header() {
  const isUserSignedIn: boolean = useAppSelector((state: RootState) => state.userSlice.isSignedIn);
  const userEmail: string | null = useAppSelector((state: RootState) => state.userSlice.email);
  const dispatch = useAppDispatch();

  const language = 'en';

  const handleLogout = () => {
    logout();
    dispatch(removeUser());
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href={AppRoutes.HOME} className="text-2xl font-bold">
          Logo
        </Link>
        <nav className="space-x-4">
          {!isUserSignedIn && (
            <>
              <Link href={AppRoutes.SING_IN} className="hover:text-gray-300">
                Sign In
              </Link>
              <Link href={AppRoutes.SING_UP} className="hover:text-gray-300">
                Sign Up
              </Link>
            </>
          )}
          {isUserSignedIn && (
            <>
              <span className="text-xs">
                {translation.header.loggedInAs[language]}
                {userEmail}
              </span>
              <Link href={AppRoutes.GRAPHQL} className="hover:text-gray-300">
                {translation.buttons.toGraphqlPage[language]}
              </Link>
              <button onClick={handleLogout} className="hover:text-gray-300">
                {translation.buttons.logout[language]}
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
