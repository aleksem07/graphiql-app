'use client';

import Link from 'next/link';
import { AppRoutes } from '@/common/routes';
import translation from '@/common/translation';
import { auth, logout } from '@/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareFromSquare } from '@fortawesome/free-regular-svg-icons';

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

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 480);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
          <div className="group">
            <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-blue-500 text-white rounded-full group-hover:opacity-100">
              <span className="text-lg font-bold">{userEmail.charAt(0).toUpperCase()}</span>
            </div>

            <div className="opacity-0 pointer-events-none absolute top-full right-1/3 transform -translate-x-1/2 bg-gray-500 text-white px-2 py-1 rounded-md transition-opacity duration-300 group-hover:opacity-100">
              {translation.header.loggedInAs[language] + userEmail}
            </div>
          </div>

          <Link
            href={AppRoutes.GRAPHQL}
            className="text-sm sm:text-base w-fit text-center hover:text-gray-300"
          >
            {translation.buttons.toGraphqlPage[language]}
          </Link>
          <button onClick={handleLogout} className="hover:text-gray-300">
            {isMobile ? (
              <FontAwesomeIcon icon={faShareFromSquare} />
            ) : (
              translation.buttons.logout[language]
            )}
          </button>
        </>
      )}
    </>
  );
}
