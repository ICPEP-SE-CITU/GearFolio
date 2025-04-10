"use client";
import Link from "next/link";
import {FcLeft } from "react-icons/fc";


export default function GeneratePorfolioPage() {
  return (
    <>
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 flex flex-col items-center justify-center"> 
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Generate Porfolio Section Page</h1>
          <div className="w-20 h-1 bg-blue-500 mt-2"></div> {/* Underline effect */}
        </div>   
    </div>

    {/* Navigation buttons */}
    <div className="absolute -mt-120 left-160 flex gap-4">
          <Link
            href="/portfolio_creation_page/7_template_section"
            className="p-2 flex items-center justify-center rounded-md bg-transparent hover:transition-all duration-300 group"
          >
            <FcLeft className="text-4xl group-hover:scale-125 transition-transform duration-300"/>

          </Link>
        </div>
        <div className="absolute -mt-120 right-160 flex gap-4">
          <Link
            href="/portfolio_creation_page/#"
            className='text-xl hover:scale-115 transition-transform duration-300'>
            Finish
          </Link>
        </div>
    </>
  );
}