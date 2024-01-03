'use client';

import { AppRoutes } from '@/common/routes';
import { auth } from '@/firebase';
import { redirect } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loading from '../../app/loading';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [user, loading] = useAuthState(auth);
  if (user && !loading) {
    redirect(AppRoutes.GRAPHQL);
  }

  return (
    <>
      {loading && <Loading />}
      {!user && !loading && children}
    </>
  );
}
