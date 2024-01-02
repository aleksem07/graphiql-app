'use client';

import Link from 'next/link';
import { AppRoutes } from '@/common/routes';
import translation from '@/common/translation';
import { auth, logout } from '@/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react';

export default function NavLinks() {
  const [user, loading] = useAuthState(auth);
  const userEmail = user?.email;
  const language = 'en';

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    if (loading) return;
    if (!user) handleLogout();
  }, [loading, user]);

  return (
    <>
      {!userEmail && (
        <>
          <Link href={AppRoutes.SING_IN} className="hover:text-gray-300">
            Sign In
          </Link>
          <Link href={AppRoutes.SING_UP} className="hover:text-gray-300">
            Sign Up
          </Link>
        </>
      )}
      {userEmail && (
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
    </>
  );
}
