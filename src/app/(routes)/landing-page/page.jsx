"use client";

import React from 'react';
import Image from 'next/image';
import { IoSearchSharp } from "react-icons/io5";
import Head from 'next/head';
import Link from 'next/link';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#F7F7FF] relative overflow-hidden">
      <Head>
        <title>Gear Portfolio</title>
        <meta name="description" content="Discover, build, and showcase portfolios with AI assistance" />
      </Head>

      {/* Background Image */}
      <div className="w-full h-screen z-0 fixed">
        <div className="relative w-full h-full">
          <Image 
            src="/image/Homepage-1.svg"
            alt="Background"
            fill
            priority
            className="absolute inset-0 w-full h-screen object-cover select-none pointer-events-none z-0" 
          />
        </div>
      </div>

      {/* Content overlay */}
      <div className="relative z-10">
        {/* Navigation Bar */}
        <div className="h-screen py-10">
          <nav className="bg-white/70 max-w-[1800px] mx-auto text-gray-800 rounded-[20px] p-5 flex items-center justify-between">
            <div className="flex flex-row gap-[90px] items-center">
              <div className="flex items-center">
                <div className="flex flex-row text-4xl font-Montserrat font-bold items-center">
                  <Image
                    src="/image/logo.svg"
                    alt="GearFolio Logo"
                    width={73}
                    height={73}
                    className="z-0"
                  />
                  <span className="text-[#145DA0]">GEAR</span>
                  <span className="text-[#2E8BC0]">FOLIO</span>
                </div>
              </div>
              <div className="hidden md:flex gap-[85px] font-bold text-2xl">
                <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
                <Link href="/features" className="hover:text-blue-600 transition-colors">Features</Link>
                <Link href="/testimonials" className="hover:text-blue-600 transition-colors">Testimonials</Link>
                <Link href="/about-us" className="hover:text-blue-600 transition-colors">About us</Link>
              </div>
              <Link href="/signup" className="px-[80px] text-xl ml-[30px] font-regular hover:text-blue-600 transition-colors">Sign up</Link>
            </div>
            <div>
              <Link 
                href="/login" 
                className="px-[45px] py-[13px] bg-[#2E8BC0] text-xl text-white rounded-[25px] hover:bg-[#145DA0] transition-colors"
              >
                Login
              </Link>
            </div>
          </nav>

          {/* Hero Section */}
          <div className="pt-[200px] max-w-[1600px] mx-auto text-white">
            <h1 className="text-6xl md:text-8xl lg:text-[95px] font-bold mb-4">
              Discover, Build, and Showcase <br /> Portfolios with AI Assistance
            </h1>
            <p className="text-lg mb-8">
              Explore the professional achievements of CIT-U students or create your own AI-enhanced portfolio with ease.
            </p>
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search for student portfolios by name or skills..."
                className="px-6 py-4 w-full bg-white rounded-md text-gray-800 pr-16"
              />
              <button 
                className="absolute right-0 mr-2 bg-blue-800 rounded-md p-1 hover:bg-blue-900 transition-colors"
                aria-label="Search"
              >
                <IoSearchSharp className="w-[52px] h-[52px] text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white py-16">
          <section className="text-gray-800 p-10">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
              What Makes Our Platform Unique?
            </h2>
            <p className="text-center max-w-3xl mx-auto mb-8">
              GearFolio is designed to empower students by showcasing their projects, skills, and achievements in a dynamic, professional portfolio.
              Whether you are pursuing a job, internship, or further studies, GearFolio helps you stand out in todays competitive tech landscape.
            </p>
            <div className="flex justify-center mt-8">
              <Link href="/try">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-md flex items-center transition-colors text-lg font-medium">
                  Try GEARFOLIO
                  <span className="ml-2">→</span>
                </button>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;