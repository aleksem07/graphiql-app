import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';
import { Providers } from '@/redux/provider';
import 'react-toastify/dist/ReactToastify.css';
import { LangProvider } from '@/context/langContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Graphql playground',
  description: '',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`flex flex-col min-h-screen ${inter.className}`}>
        <Providers>
          <LangProvider>
            <Header />
            {children}
            <Footer />
          </LangProvider>
        </Providers>
      </body>
    </html>
  );
}
