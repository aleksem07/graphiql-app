import type { Metadata } from 'next';
import SignInForm from './signinForm';
import AuthGuard from '@/components/authGuard/authGuard';

export const metadata: Metadata = {
  title: 'Sign In - Graphql playground',
};

export default function SignInPage() {
  return (
    <main className="mx-2 flex-1 flex flex-col items-center justify-center">
      <AuthGuard>
        <SignInForm />
      </AuthGuard>
    </main>
  );
}
