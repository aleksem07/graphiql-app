import Link from 'next/link';
import { AppRoutes } from '@/common/routes';

export default function Home() {
  return (
    <main className="flex-1 flex items-center justify-center">
      <h1>Main page</h1>
      <span>&nbsp;|&nbsp;</span>
      <Link href={AppRoutes.GRAPHQL} className="text-blue-500">
        Go to Editor
      </Link>
      <div style={{ height: '1000px' }}></div>
    </main>
  );
}
