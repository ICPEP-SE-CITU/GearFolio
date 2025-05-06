"use client";

import React from 'react';
import Image from 'next/image';
import { IoSearchSharp } from "react-icons/io5";
import { LuArrowUpRight } from "react-icons/lu";
import Head from 'next/head';
import Link from 'next/link';
import PortfolioAssistant from '../../../components/landing-page/portfolioAssistance';
import NextLevel from '../../../components/landing-page/nextLevel'
import Footer from '../../../components/layout/Footer';

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

            </div>
            <div>
              <Link href="/signup" className="px-[40px] text-xl ml-[20px] font-regular hover:text-blue-600 transition-colors"
              >
                Sign up
              </Link>
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
                className="absolute right-0 bg-blue-800  rounded-md p-2 hover:bg-blue-900 transition-colors"
                aria-label="Search"
              >
                <IoSearchSharp className="w-[45px] h-[45px] text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="relative w-full h-screen py-10 h-[1090px]">
          {/* Background Image */}
          <Image
            src="/image/Homepage-2.svg"
            alt="Background"
            fill
            priority
            className="absolute inset-0 object-cover -z-10"
          />

          {/* Content */}
          <div className="relative z-10 text-gray-800 p-10 rounded-lg max-w-[1600px] mx-auto">
            <h1 className="pt-[250px] max-w-[1600px] text-6xl md:text-7xl lg:text-[75px] text-6xl md:text-6xl font-bold text-center mb-6">
              What Makes Our Platform Unique?
            </h1>
            <p className="text-center max-w-[1600px] mx-auto mb-1">
              GearFolio is designed to empower students by showcasing their projects, skills, and achievements in a dynamic, professional portfolio.<br />
              Whether you are pursuing a job, internship, or further studies, GearFolio helps you stand out in today’s competitive tech landscape.
            </p>
            <div className="flex justify-center mt-8">
              <Link href="/try">
                <button className="bg-[#2E8BC0] hover:bg-[#0C7AB9] text-white px-8 py-4 rounded-md flex items-center transition-colors text-xl font-medium">
                  Try GEARFOLIO
                  <LuArrowUpRight className="w-[45px] h-[45px] text-white" />
                </button>
              </Link> 
            </div>
          </div>
        </div>


        <div className="relative w-full py-10 min-h-screen ">
          <Image
            src="/image/Homepage-3.svg"
            alt="Background"
            fill
            priority
            className="absolute inset-0 object-cover -z-10"
          />

          <div className="relative z-10 text-gray-800 px-6 md:px-10 lg:px-20 max-w-[1600px] mx-auto">
            <h1 className="pt-40 text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16 text-gray-900">
              Why Choose GearFolio
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="bg-white shadow-lg rounded-2xl p-8 text-center hover:shadow-xl transition">
                <img
                  src="/image/showcase.svg"
                  alt="Showcase Your Work"
                  className="mx-auto mb-6 w-20 h-20"
                />
                <h3 className="text-xl font-semibold mb-2">Showcase Your Work</h3>
                <p className="text-gray-600">
                  Present your projects and skills in a professional, compelling way.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white shadow-lg rounded-2xl p-8 text-center hover:shadow-xl transition">
                <img
                  src="/image/impress.svg"
                  alt="Impress Employers"
                  className="mx-auto mb-6 w-20 h-20"
                />
                <h3 className="text-xl font-semibold mb-2">Impress Employers</h3>
                <p className="text-gray-600">
                  Create a strong impression with clean, impactful portfolios.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white shadow-lg rounded-2xl p-8 text-center hover:shadow-xl transition">
                <img
                  src="/image/collaborate.svg"
                  alt="Collaborate and Grow"
                  className="mx-auto mb-6 w-20 h-20"
                />
                <h3 className="text-xl font-semibold mb-2">Collaborate and Grow</h3>
                <p className="text-gray-600">
                  Connect with peers and professionals to level up your career.
                </p>
              </div>
            </div>
          </div>
        </div>
1-Landing-Page


        <PortfolioAssistant />
        <NextLevel />

          <PortfolioAssistant />
          <NextLevel />
          <Footer />
 main
      </div>

    </div>
  );
};

export default LandingPage;
