import type { Metadata } from 'next';
import SignInForm from './signinForm';
import translation from '@/common/translation';

export const metadata: Metadata = {
  title: 'Sign In - Graphql playground',
};

export default function SignInPage() {
  //TODO get user language
  const language = 'en';

  return (
    <main className="mx-2 flex-1 flex flex-col items-center justify-center">
      <h1 className="mb-4">{translation.buttons.signIn[language]}</h1>
      <SignInForm />
    </main>
  );
}
