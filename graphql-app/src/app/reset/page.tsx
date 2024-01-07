import type { Metadata } from 'next';
import ResetPassword from './resetForm';

export const metadata: Metadata = {
  title: 'Reset Password - Graphql playground',
};

export default function SignInPage() {
  return (
    <main className="mx-2 flex-1 flex flex-col items-center justify-center">
      <ResetPassword />
    </main>
  );
}
