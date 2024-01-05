import type { Metadata } from 'next';
import SignupForm from './signupForm';
import translation from '@/common/translation';
import AuthGuard from '@/components/authGuard/authGuard';

export const metadata: Metadata = {
  title: 'Sign Up - Graphql playground',
};

export default function SignUpPage() {
  //TODO get user language
  const language = 'en';

  return (
    <main className="mx-2 flex-1 flex flex-col items-center justify-center">
      <AuthGuard>
        <h1 className="mb-4">{translation.buttons.signUp[language]}</h1>
        <SignupForm />
      </AuthGuard>
    </main>
  );
}
