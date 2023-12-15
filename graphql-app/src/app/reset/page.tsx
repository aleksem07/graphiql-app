import type { Metadata } from 'next';
import translation from '@/common/translation';
import ResetPassword from './resetForm';

export const metadata: Metadata = {
  title: 'Reset Password - Graphql playground',
};

export default function SignInPage() {
  //TODO get user language
  const language = 'en';

  return (
    <main className="flex-1 flex flex-col items-center justify-center">
      <h1 className="mb-4">{translation.buttons.reset[language]}</h1>
      <ResetPassword />
    </main>
  );
}
