"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { IoSearchSharp } from "react-icons/io5";
import { LuArrowUpRight } from "react-icons/lu";
import Head from "next/head";
import Link from "next/link";
import PortfolioAssistant from "../../../components/landing-page/portfolioAssistance";
import NextLevel from "../../../components/landing-page/nextLevel";
import Footer from "../../../components/layout/Footer";

const LandingPage = () => {
  const [stage, setStage] = useState("splash");
  const [navVisible, setNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const featuresRef = useRef(null);
  const whyChooseRef = useRef(null);
  const portfolioAssistantRef = useRef(null);
  const nextLevelRef = useRef(null);

  useEffect(() => {
    const splashTimer = setTimeout(() => setStage("transition1"), 2000);
    const transitionTimer = setTimeout(() => setStage("main"), 4000);
    return () => {
      clearTimeout(splashTimer);
      clearTimeout(transitionTimer);
    };
  }, []);

  useEffect(() => {
    if (stage === "main") {
      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > lastScrollY) {
          // Scrolling down
          setNavVisible(false);
        } else {
          // Scrolling up
          setNavVisible(true);
        }
        setLastScrollY(currentScrollY);
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [lastScrollY, stage]);

  const scrollToSection = (ref) => {
    window.scrollTo({
      top: ref.current.offsetTop - 100,
      behavior: "smooth"
    });
  };

  return (
    <div className="min-h-screen bg-[#F7F7FF] relative overflow-hidden">
      <Head>
        <title>Gear Portfolio</title>
        <meta
          name="description"
          content="Discover, build, and showcase portfolios with AI assistance"
        />
      </Head>

      {/* Backgrounds by stage */}
      {stage !== "main" ? (
        <div className="w-full h-screen fixed top-0 left-0 z-0">
          {stage === "splash" && (
            <Image
              src="/image/Homepage_orig.svg"
              alt="Splash"
              fill
              priority
              className="object-cover"
            />
          )}
          {stage === "transition1" && (
            <Image
              src="/image/Homepage_1.svg"
              alt="Transition"
              fill
              priority
              className="object-cover"
            />
          )}
        </div>
      ) : (
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
      )}

      {/* Main Content */}
      {stage === "main" && (
        <div className="relative z-10">
          {/* Navigation Bar */}
          <div className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${navVisible ? "translate-y-0" : "-translate-y-full"}`}>
            <nav className="bg-white/70 max-w-[1800px] mx-auto text-gray-800 rounded-[20px] p-5 flex items-center justify-between m-4">
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
                  <button 
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="hover:text-blue-600 transition-colors"
                  >
                    Home
                  </button>
                  <button 
                    onClick={() => scrollToSection(featuresRef)}
                    className="hover:text-blue-600 transition-colors"
                  >
                    Features
                  </button>
                  <button 
                    onClick={() => scrollToSection(whyChooseRef)}
                    className="hover:text-blue-600 transition-colors"
                  >
                    Why Choose
                  </button>
                  <button 
                    onClick={() => scrollToSection(portfolioAssistantRef)}
                    className="hover:text-blue-600 transition-colors"
                  >
                    Portfolio Assistant
                  </button>
                </div>
              </div>
              <div>
                <Link href="/signup" className="px-[40px] text-xl ml-[20px] font-regular hover:text-blue-600 transition-colors">
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
          </div>

          {/* Hero Section */}
          <div className="h-screen py-10 pt-24">
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
                  className="absolute right-0 bg-blue-800 rounded-md p-2 hover:bg-blue-900 transition-colors"
                  aria-label="Search"
                >
                  <IoSearchSharp className="w-[45px] h-[45px] text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div ref={featuresRef} className="relative w-full py-10 h-[1090px]">
            <Image
              src="/image/Homepage-2.svg"
              alt="Background"
              fill
              priority
              className="absolute inset-0 object-cover -z-10"
            />
            <div className="relative z-10 text-gray-800 p-10 rounded-lg max-w-[1600px] mx-auto">
              <h1 className="pt-[250px] text-6xl md:text-7xl lg:text-[75px] font-bold text-center mb-6">
                What Makes Our Platform Unique?
              </h1>
              <p className="text-center max-w-[1600px] mx-auto mb-1">
                GearFolio empowers students by showcasing their projects and achievements dynamically. <br />
                Whether for jobs, internships, or further studies, GearFolio helps you stand out.
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

          {/* Why Choose Section */}
          <div ref={whyChooseRef} className="relative w-full py-10 min-h-screen">
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
                <div className="bg-white shadow-lg rounded-2xl p-8 text-center hover:shadow-xl transition">
                  <img src="/image/showcase.svg" alt="Showcase Your Work" className="mx-auto mb-6 w-20 h-20" />
                  <h3 className="text-xl font-semibold mb-2">Showcase Your Work</h3>
                  <p className="text-gray-600">Present your projects and skills professionally and compellingly.</p>
                </div>
                <div className="bg-white shadow-lg rounded-2xl p-8 text-center hover:shadow-xl transition">
                  <img src="/image/impress.svg" alt="Impress Employers" className="mx-auto mb-6 w-20 h-20" />
                  <h3 className="text-xl font-semibold mb-2">Impress Employers</h3>
                  <p className="text-gray-600">Make a strong impression with clean, impactful portfolios.</p>
                </div>
                <div className="bg-white shadow-lg rounded-2xl p-8 text-center hover:shadow-xl transition">
                  <img src="/image/collaborate.svg" alt="Collaborate and Grow" className="mx-auto mb-6 w-20 h-20" />
                  <h3 className="text-xl font-semibold mb-2">Collaborate and Grow</h3>
                  <p className="text-gray-600">Connect with peers and professionals to level up your career.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div ref={portfolioAssistantRef}>
            <PortfolioAssistant />
          </div>
          
          <div ref={nextLevelRef}>
            <NextLevel />
          </div>
          
          <Footer />
        </div>     
      )}
    </div>
  );
};

export default LandingPage;
