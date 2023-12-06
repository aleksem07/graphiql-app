import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex-1 flex items-center justify-center">
      <h1>404 page not found</h1>
      <span>&nbsp;|&nbsp;</span>
      <Link href="/" className='text-blue-500'>Back to Home</Link>
    </main>
  );
}