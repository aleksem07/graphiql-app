import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="#" className="text-2xl font-bold">Logo</Link>
        <nav className="space-x-4">
          <Link href="#" className="hover:text-gray-300">Sign In</Link>
          <Link href="#" className="hover:text-gray-300">Sign Up</Link>
        </nav>
      </div>
    </header>
  ); 
}