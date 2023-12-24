import Welcome from '@/components/welcome/page';

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center">
      <h1 className="mb-4 pb-4">Welcome to GraphQL App</h1>
            <Link href={AppRoutes.GRAPHQL} className="text-blue-500">
        Go to Editor
      </Link>
      <Welcome />
    </main>
  );
}
