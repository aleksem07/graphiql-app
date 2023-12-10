import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex-1 flex items-center justify-center">
      <h1>Main page</h1>
      <span>&nbsp;|&nbsp;</span>
      <Link href="/editor" className="text-blue-500">
        Go to Editor
      </Link>
    </main>
  );
}
