// src/app/layout.js
import { Geist, Geist_Mono } from 'next/font/google';
import '../styles/globals.css';
import AiRecommButton from '../components/features/aiRecomm/aiRecommButton.js';
// --- USE RELATIVE PATH for Footer ---
// From src/app/layout.js to src/components/layout/Footer.js is '../components/layout/Footer.js'
import Footer from '../components/layout/Footer.js';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

/*
export const metadata = {
  title: 'GearFolio',
  description: 'Discover, Build, and Showcase Portfolios with AI Assistance.',
};
*/
export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <div className="flex-grow">
          {children}
        </div>
        <div className="fixed bottom-4 right-4 z-50">
          <AiRecommButton />
        </div>
        <Footer />
      </body>
    </html>
  );
}