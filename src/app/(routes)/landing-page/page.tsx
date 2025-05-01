// src/app/page.js or wherever your LandingPage component resides
"use client";

import React from 'react'; // Good practice, though optional for JSX only in newer React/Next.js



const LandingPage = () => {
    return (
        // Using min-h-screen ensures the footer is pushed down even on short content pages
        <div className="flex flex-col min-h-screen">
            

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="bg-gradient-to-br from-blue-100 to-purple-100 text-center py-20 px-4">
                    <div className="container mx-auto">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">
                            Discover, Build, and Showcase Portfolios with AI Assistance
                        </h1>
                        <p className="text-lg text-gray-700 mb-8">
                            Improve the professional achievements of your students by creating an outstanding portfolio.
                        </p>
                        {/* Added 'relative' positioning to the container */}
                        <div className="relative flex justify-center w-full max-w-md mx-auto">
                            
                        </div>
                    </div>
                </section>

                {/* What Makes Our Platform Unique? */}
                <section className="py-16 px-4">
                    <div className="container mx-auto text-center">
                        <h2 className="text-3xl font-semibold text-gray-900 mb-8">What Makes Our Platform Unique?</h2>
                        <p className="text-gray-700 max-w-2xl mx-auto mb-8">
                            GearFolio is designed to streamline the portfolio creation process,
                            making it easier for students to showcase their work and for
                            educators to assess their achievements.
                        </p>
                        
                    </div>
                </section>

                {/* Why Choose GearFolio? */}
                <section className="bg-gray-50 py-16 px-4">
                    <div className="container mx-auto text-center">
                        <h2 className="text-3xl font-semibold text-gray-900 mb-12">Why Choose GearFolio?</h2> {/* Added mb-12 for spacing */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Showcase Your Work */}
                            <div className="flex flex-col items-center p-6"> {/* Added padding */}
                                
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Showcase Your Work</h3>
                                <p className="text-gray-700 text-center">Present your projects in a professional and engaging way.</p> {/* Added text-center */}
                            </div>
                            {/* Impress Employers */}
                            <div className="flex flex-col items-center p-6"> {/* Added padding */}
                                
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Impress Employers</h3>
                                <p className="text-gray-700 text-center">Create a portfolio that stands out to potential employers.</p> {/* Added text-center */}
                            </div>
                            {/* Collaborate and Grow */}
                            <div className="flex flex-col items-center p-6"> {/* Added padding */}
                                
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Collaborate and Grow</h3>
                                <p className="text-gray-700 text-center">Connect with peers and expand your professional network.</p> {/* Added text-center */}
                            </div>
                        </div>
                    </div>
                </section>

                {/* AI-Powered Portfolio Assistance */}
                <section className="py-16 px-4">
                    <div className="container mx-auto text-center flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/2 md:text-left"> {/* Align text left on medium screens */}
                            <h2 className="text-3xl font-semibold text-gray-900 mb-4">AI-Powered Portfolio Assistance</h2>
                            <p className="text-gray-700">
                                Create outstanding portfolios with the help of our AI assistant.
                                Get suggestions, feedback, and design support to make your work
                                shine.
                            </p>
                        </div>
                        <div className="md:w-1/2 flex justify-center md:justify-end"> {/* Center icon container */}
                            
                        </div>
                    </div>
                </section>

                {/* Ready to Take Your Portfolio to the Next Level? */}
                <section className="bg-gray-50 py-16 px-4">
                    <div className="container mx-auto text-center">
                        <h2 className="text-3xl font-semibold text-gray-900 mb-8">
                            Ready to Take Your Portfolio to the Next Level?
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8"> {/* Adjusted grid columns for responsiveness */}
                            {/* Image 1 */}
                            <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"> {/* Added shadow */}
                                <img
                                    src="https://placehold.co/400x300/e2e8f0/3b82f6?text=Portfolio+1" // Example placeholder
                                    alt="Portfolio Example 1"
                                    className="w-full h-auto object-cover" // Added object-cover
                                />
                            </div>
                            {/* Image 2 */}
                            <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"> {/* Added shadow */}
                                <img
                                    src="https://placehold.co/400x300/dbeafe/1d4ed8?text=Portfolio+2" // Example placeholder
                                    alt="Portfolio Example 2"
                                    className="w-full h-auto object-cover" // Added object-cover
                                />
                            </div>
                            {/* Image 3 */}
                            <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"> {/* Added shadow */}
                                <img
                                    src="https://placehold.co/400x300/bfdbfe/2563eb?text=Portfolio+3" // Example placeholder
                                    alt="Portfolio Example 3"
                                    className="w-full h-auto object-cover" // Added object-cover
                                />
                            </div>
                        </div>
                        
                    </div>
                </section>
            </main>

           
        </div>
    );
};

export default LandingPage;