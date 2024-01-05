import type { Metadata } from 'next';
import SignupForm from './signupForm';
import AuthGuard from '@/components/authGuard/authGuard';

export const metadata: Metadata = {
  title: 'Sign Up - Graphql playground',
};

export default function SignUpPage() {
  return (
    <main className="mx-2 flex-1 flex flex-col items-center justify-center">
      <AuthGuard>
        <SignupForm />
      </AuthGuard>
    </main>
  );
}
