import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 Page not found',
};

export default function NotFound() {
  return (
    <main className="flex-1 flex items-center justify-center">
      <h1>404 page not found</h1>
      <span>&nbsp;|&nbsp;</span>
      <Link href="/" className="text-blue-500">
        Back to Home
      </Link>
    </main>
  );
}
