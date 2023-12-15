import Link from 'next/link';
import { AppRoutes } from '@/common/routes';

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center">
      <h1 className="mb-4">Main page</h1>
      <Link href={AppRoutes.GRAPHQL} className="mb-4 text-white bg-gray-500 hover:bg-gray-700 px-3 py-1 rounded mt-5">
        GraphQL Page
      </Link>
      <Link href={AppRoutes.WELCOME} className="mb-4 text-white bg-gray-500 hover:bg-gray-700 px-3 py-1 rounded mt-5">
        Welcome page
      </Link>
    </main>
  );
}
