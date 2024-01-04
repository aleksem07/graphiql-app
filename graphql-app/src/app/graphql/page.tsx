import type { Metadata } from 'next';
import AuthWrapper from './authWrapper';

export const metadata: Metadata = {
  title: 'Editor - Graphql playground',
};

export default function GraphqlPage() {
  return (
    <main className="mx-1 flex-1 flex flex-col items-center justify-center">
      <AuthWrapper />
    </main>
  );
}
