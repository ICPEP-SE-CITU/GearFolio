// src/components/layout/Footer.js
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const GearLogoFooter = () => (
  <div className="flex items-center">
    <Image
      src="/image/logo.svg"
      alt="GearFolio Logo"
      width={50}
      height={50}
    />
    <div className="ml-3">
      <span className="block text-xl font-bold text-blue-700">GEAR</span>
      <span className="block text-xl font-bold text-blue-500 -mt-1">FOLIO</span>
    </div>
  </div>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-0"> {/* mt-auto helps with sticky footer */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div className="md:col-span-1 lg:col-span-1">
            <GearLogoFooter />
            <p className="mt-4 text-gray-500 text-sm">
              Discover, Build, and Showcase Portfolios with AI Assistance.
            </p>
            <p className="mt-4 text-gray-400 text-xs">
              © {currentYear} GearFolio. All rights reserved.
            </p>
          </div>

          <div className="mt-8 md:mt-0">
            <h3 className="text-sm font-semibold text-gray-700 tracking-wider uppercase">
              Social
            </h3>
            <ul role="list" className="mt-4 space-y-2">
              <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-blue-600">Facebook</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-blue-600">Instagram</a></li>
              <li><a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-blue-600">TikTok</a></li>
              <li><a href="https://www.youtube.com/watch?v=MRavjoPpmgM" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-blue-600">YouTube</a></li>
            </ul>
          </div>

          <div className="mt-8 md:mt-0 md:col-span-2 lg:col-span-1 lg:col-start-4 flex flex-col md:items-end">
            <div className="grid grid-cols-2 md:grid-cols-1 gap-y-2 gap-x-8 md:gap-y-4">
                <div>
                    <h3 className="text-sm font-semibold text-gray-700 tracking-wider uppercase opacity-0 md:opacity-100">
                        Company
                    </h3>
                    <ul role="list" className="mt-0 md:mt-4 space-y-2">
                        <li><Link href="/about" className="text-sm text-gray-500 hover:text-blue-600">About</Link></li>
                        <li><Link href="/faq" className="text-sm text-gray-500 hover:text-blue-600">FAQ</Link></li>
                    </ul>
                </div>
                <div className="mt-0 md:mt-8">
                    <h3 className="text-sm font-semibold text-gray-700 tracking-wider uppercase opacity-0 md:opacity-100">
                        Legal
                    </h3>
                    <ul role="list" className="mt-0 md:mt-4 space-y-2">
                        <li><Link href="/privacy" className="text-sm text-gray-500 hover:text-blue-600">Privacy Policy</Link></li>
                        <li><Link href="/terms" className="text-sm text-gray-500 hover:text-blue-600">Terms of Service</Link></li>
                        <li><Link href="/support" className="text-sm text-gray-500 hover:text-blue-600">Help & Support</Link></li>
                    </ul>
                </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;