import Welcome from '@/components/welcome/page';

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold m-5">Welcome to GraphiQL App</h2>
      <Welcome />
    </main>
  );
}
