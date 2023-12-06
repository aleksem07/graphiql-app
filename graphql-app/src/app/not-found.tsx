import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1>404 page not found</h1>
      <Link href="/" className='text-blue-500'>Back to Home</Link>
    </main>
  );
}