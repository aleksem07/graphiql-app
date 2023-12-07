import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} All Rights Reserved.</p>
        <nav className="mt-2">
          <Link href="#" className="inline-block mx-2 hover:text-gray-300">
            RS School
          </Link>
          <Link href="#" className="inline-block mx-2 hover:text-gray-300">
            GitHub
          </Link>
        </nav>
      </div>
    </footer>
  );
}
