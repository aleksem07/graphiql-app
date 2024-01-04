'use client';

import { useEffect } from 'react';
import { EditorQraphqlRequest } from './editor';
import { AppRoutes } from '@/common/routes';
import { auth } from '@/firebase';
import { redirect } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loading from '../loading';

export default function AuthWrapper() {
  const [user, loading] = useAuthState(auth);
  if (!user && !loading) {
    redirect(AppRoutes.HOME);
  }
  useEffect(() => {
    if (!user && !loading) {
      redirect(AppRoutes.HOME);
    }
  }, [user, loading]);

  return (
    <>
      {loading && <Loading />}
      {user && !loading && <EditorQraphqlRequest />}
    </>
  );
}
