import type { Metadata } from 'next';
import Welcome from '@/components/welcome/page';

export const metadata: Metadata = {
  title: 'Welcome page - Graphql playground',
};

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center">
      <Welcome />
    </main>
  );
}
