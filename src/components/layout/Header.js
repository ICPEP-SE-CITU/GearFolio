// src/components/layout/Header.js
'use client';

import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

const GearLogo = () => (
  <Image
    src="/image/logo.svg" // Path to your logo in the public folder
    alt="GearFolio Logo"
    width={40} // Desired width of the logo in the header
    height={40} // Desired height of the logo in the header
    className="h-8 w-8" // Tailwind classes can further constrain or style if needed,
                       // but width/height on <Image> are primary for dimensions.
                       // Ensure this matches or complements width/height.
  />
);

const UserProfileIcon = ({ src }) => {
  if (src) {
    return (
      <Image
        src={src}
        alt="User Profile"
        width={32} // Standard size for profile icon
        height={32}
        className="h-8 w-8 rounded-full object-cover"
      />
    );
  }
  return (
    <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
      <svg
        className="h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    </div>
  );
};

const NavLink = ({ href, children, isActive }) => {
  return (
    <Link
      href={href}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors
        ${
          isActive
            ? 'bg-blue-600 text-white' // Active link style
            : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900' // Default link style
        }`}
    >
      {children}
    </Link>
  );
};

const Header = ({ activePage, userProfileSrc }) => {
  return (
    <header className="bg-white shadow-sm">
      {/* Centered container with max-width and responsive padding */}
      <div className="max-w-1xl mx-auto px-2 sm:px-10 lg:px-8">
        {/* Flex container for header items: Logo+Nav group on left, Profile on right */}
        <div className="flex items-center justify-between h-16">
          
          {/* Group 1: Logo and Navigation Links */}
          <div className="flex items-center"> {/* This outer div groups the logo and nav */}
            <div className="flex-shrink-0"> {/* Prevents logo from shrinking if nav is long */}
              <Link href="/" className="flex items-center">
                <GearLogo />
              </Link>
            </div>
            <nav className="hidden md:flex items-center space-x-4 ml-6 sm:ml-10"> {/* Adjust ml-* for space between logo and nav */}
              <NavLink href="/" isActive={activePage === 'home'}>
                Home
              </NavLink>
              <NavLink href="/portfolio" isActive={activePage === 'portfolio'}> {/* Ensure this route exists */}
                My Portfolio
              </NavLink>
              <NavLink href="/ai-recommendations" isActive={activePage === 'recommendations'}> {/* Ensure this route exists */}
                AI recommendations
              </NavLink>
              <NavLink href="/settings" isActive={activePage === 'settings'}>
                Settings
              </NavLink>
            </nav>
          </div>

          {/* Group 2: Profile Section */}
          <div className="flex items-center">
            <div className="relative"> {/* Removed ml-3 as it might be redundant here */}
              <button
                type="button"
                className="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                id="user-menu-button"
                aria-expanded="false"
                aria-haspopup="true"
                // onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} // For dropdown functionality
              >
                <span className="sr-only">Open user menu</span>
                <UserProfileIcon src={userProfileSrc} />
              </button>
              {/* Dropdown menu (if implemented) would go here, controlled by state */}
            </div>
          </div>

        </div>
      </div>
      {/* Mobile menu (if implemented) would go here, controlled by state */}
    </header>
  );
};

export default Header;