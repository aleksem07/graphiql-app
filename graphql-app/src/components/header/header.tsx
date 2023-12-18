'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AppRoutes } from '@/common/routes';
import NavLinks from '../navLinks/navLinks';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const handleScroll = (): void => {
    setIsScrolled(window.scrollY > 50);
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stickyHeaderStyle: React.CSSProperties = {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    backgroundColor: isScrolled ? '#fff' : '#1a202c',
    color: isScrolled ? '#1a202c' : '#fff',
    padding: '2rem',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  };

  return (
    <header style={stickyHeaderStyle} data-testid="header">
      <div className="container mx-auto flex justify-between items-center">
        <Link href={AppRoutes.HOME} className="text-2xl font-bold">
          Logo
        </Link>
        <nav className="space-x-4">
          <NavLinks />
        </nav>
      </div>
    </header>
  );
}
