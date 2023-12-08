import Link from 'next/link';
import { AppRoutes } from '@/const/routes';

export default function Home() {
  return (
    <main className="flex-1 flex items-center justify-center">
      <h1>Main page</h1>
      <Link href={AppRoutes.GRAPHQL} />
    </main>
  );
}
