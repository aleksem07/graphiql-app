'use client';

import Link from 'next/link';
import { AppRoutes } from '@/const/routes';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Header() {
  const notify = () => toast('Notification sent!');

  return (
    <header className="bg-gray-800 text-white p-4" data-testid="header">
      <div className="container mx-auto flex justify-between items-center">
        <Link href={AppRoutes.HOME} className="text-2xl font-bold">
          Logo
        </Link>
        <button className='ml-auto mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={notify}>Notify!</button>
        <ToastContainer position="bottom-right" />
        <nav className="space-x-4">
          <Link href={AppRoutes.SING_IN} className="hover:text-gray-300">
            Sign In
          </Link>
          <Link href={AppRoutes.SING_UP} className="hover:text-gray-300">
            Sign Up
          </Link>
        </nav>
      </div>
    </header>
  );
}
