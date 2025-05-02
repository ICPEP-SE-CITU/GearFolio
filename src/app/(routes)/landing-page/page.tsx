
"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#F7F7FF] relative overflow-hidden">

      <Image
        src="/image/Homepage-1.svg"
        alt="background"
        width={1920} // <-- Add this prop
        height={1080} // <-- Add this prop
        className="absolute inset-0 w-[1920px] h-[1080px] object-cover select-none pointer-events-none z-0"
      />

      {/* Content overlay */}
      <div className="relative z-10">
        {/* Navigation Bar */}
        <div className="bg-white/70 mt-[45px] text-gray-800 w-[1800px] ml-[60px] rounded-[20px] p-5 flex  items-center">
          <div className="flex flex-row gap-[150px] items-center ">
            <div className="flex items-center">
              <div className="flex flex-row text-4xl font-Montserrat font-bold items-center text-blue-600">
                <Image
                  src="/image/logo.svg"
                  alt="background"
                  width={73}
                  height={73}
                  className="z-0"
                />
                <span className="text-[#145DA0]">GEAR</span><span className="text-[#2E8BC0]">FOLIO</span>
              </div>
            </div>
            <div className="hidden md:flex gap-[85px] font-bold text-2xl">
              <a>Home</a> {/* Use Link component, href is a prop */}
              <a>Features</a>
              <a href="/testimonials">Testimonials</a>
              <a href="/about-us">About us</a>
            </div>
            <div className="ml-[189px]">
              <a href="/" className="px-1 py-1 text-xl font-regular ">Sign up</a>
              <a href="/" className="px-[45px] py-[13px] bg-[#2E8BC0] text-xl text-white rounded-[25px]">Login</a>
            </div>
          </div>
        </div>


        <div className="py-6 my-[120px] text-center text-white">
          <h1 className="text-8xl -ml-[125px] md:text-[95px] font-bold mb-4">Discover, Build, and Showcase</h1>
          <h1 className="text-8xl -ml-[225px] md:text-[95px] font-bold mb-4">Portfolios with AI Assistance</h1>
          <p className="text-l -ml-[737px] mb-8">Explore the professional achievements of CIT-U students or create your own AI-enhanced portfolio with ease.</p>
          <div className="flex justify-center mb-12">
            <div className="relative w-full max-w-2xl">
              <input
                type="text"
                placeholder="Search for student portfolios by name or skills..."
                className="px-4 -ml-[425px] py-3 w-[1240px] bg-white rounded-md text-gray-800"
              />
              <button className="absolute right-1 top-1 bg-blue-700 p-2 rounded-md">
                <span>🔍</span>
              </button>
            </div>
          </div>
        </div>


        <section className="bg-white my-[550px] text-gray-800 py-16 px-4 md:px-12 rounded-3xl mx-4 md:mx-12 my-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">What Makes Our Platform Unique?</h2>
          <p className="text-center max-w-3xl mx-auto mb-8">
            GearFolio is designed to empower students by showcasing their projects, skills, and achievements in a dynamic, professional portfolio.
            Whether you are pursuing a job, internship, or further studies, GearFolio helps you stand out in todays competitive tech landscape.
          </p>
          <div className="flex justify-center mt-8">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md flex items-center">
              Try GEARFOLIO
              <span className="ml-2">→</span>
            </button>
          </div>
        </section>

        {/* Why Choose GearFolio Section */}
        <section className="py-16 px-4 md:px-12 max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">Why Choose GearFolio</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl text-center text-gray-800">
              <div className="bg-blue-100 p-4 rounded-xl inline-block mb-4">
                {/* Briefcase icon placeholder */}
                <div className="w-16 h-16"></div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Showcase Your Work</h3>
            </div>
            <div className="bg-white p-8 rounded-xl text-center text-gray-800">
              <div className="bg-blue-100 p-4 rounded-xl inline-block mb-4">
                {/* Folder icon placeholder */}
                <div className="w-16 h-16"></div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Impress Employers</h3>
            </div>
            <div className="bg-white p-8 rounded-xl text-center text-gray-800">
              <div className="bg-blue-100 p-4 rounded-xl inline-block mb-4">
                {/* Puzzle pieces icon placeholder */}
                <div className="w-16 h-16"></div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Collaborate and Grow</h3>
            </div>
          </div>
        </section>

        {/* AI-Powered Section */}
        <section className="py-16 px-4 md:px-12 max-w-6xl mx-auto">
          <div className="bg-white text-gray-800 p-8 md:p-12 rounded-3xl flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h2 className="text-3xl font-bold mb-4">AI-Powered Portfolio Assistance</h2>
              <p className="mb-4">
                Creating a compelling portfolio can be challenging, but GearFolio makes it effortless with AI-driven suggestions and automation. From project highlights to skills visualization, our AI helps ensure your portfolio showcases your skills and experience in the best possible way.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center">
              {/* Robot illustration placeholder */}
              <div className="w-64 h-64"></div>
            </div>
          </div>
        </section>

        {/* Ready to Take Section */}
        <section className="py-16 px-4 md:px-12 max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white">Ready to Take Your Portfolio to the Next Level?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-xl overflow-hidden">
              {/* Professional image placeholder */}
              <div className="w-full h-48 bg-gray-200"></div>
            </div>
            <div className="bg-white rounded-xl overflow-hidden">
              {/* Creator image placeholder */}
              <div className="w-full h-48 bg-gray-200"></div>
            </div>
            <div className="bg-white rounded-xl overflow-hidden">
              {/* Business image placeholder */}
              <div className="w-full h-48 bg-gray-200"></div>
            </div>
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-md uppercase font-bold">
            GET STARTED!
          </button>
        </section>

        {/* Footer */}
        <footer className="bg-white text-gray-800 py-12 px-4 md:px-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-xl font-bold text-blue-600 mb-4">GEARFOLIO</div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Social</h4>
              <div className="space-y-2">
                <p>LinkedIn</p>
                <p>Twitter</p>
                <p>Instagram</p>
                <p>Facebook</p>
              </div>
            </div>
            <div></div>
            <div>
              <div className="space-y-2 text-sm">
                <p>About</p>
                <p>Help</p>
                <p>Privacy Policy</p>
                <p>Terms of Service</p>
                <p>Help & Support</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;