
"use client";


const LandingPage = () => {
    return (
        <div className="flex flex-col">
            <Header /> {/* Using the Header component */}

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
                        <div className="flex justify-center w-full max-w-md mx-auto">
                            <Input
                                type="text"
                                placeholder="Search for student portfolios by name or skills..."
                                className="pr-16" // Make space for the button
                            />
                            <Button
                                variant="outline"
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 text-blue-500 hover:bg-white/30"
                            >
                                <Search className="w-5 h-5" />
                            </Button>
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
                        <Button variant="default" className="bg-blue-600 hover:bg-blue-700 text-white">
                            Try GEARFOLIO
                        </Button>
                    </div>
                </section>

                {/* Why Choose GearFolio? */}
                <section className="bg-gray-50 py-16 px-4">
                    <div className="container mx-auto text-center">
                        <h2 className="text-3xl font-semibold text-gray-900 mb-8">Why Choose GearFolio?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Showcase Your Work */}
                            <div className="flex flex-col items-center">
                                <Users className="w-12 h-12 text-blue-500 mb-4" />
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Showcase Your Work</h3>
                                <p className="text-gray-700">Present your projects in a professional and engaging way.</p>
                            </div>
                            {/* Impress Employers */}
                            <div className="flex flex-col items-center">
                                <Briefcase className="w-12 h-12 text-blue-500 mb-4" />
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Impress Employers</h3>
                                <p className="text-gray-700">Create a portfolio that stands out to potential employers.</p>
                            </div>
                            {/* Collaborate and Grow */}
                            <div className="flex flex-col items-center">
                                 <Folder className="w-12 h-12 text-blue-500 mb-4" />
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Collaborate and Grow</h3>
                                <p className="text-gray-700">Connect with peers and expand your professional network.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* AI-Powered Portfolio Assistance */}
                <section className="py-16 px-4">
                    <div className="container mx-auto text-center flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/2">
                            <h2 className="text-3xl font-semibold text-gray-900 mb-4">AI-Powered Portfolio Assistance</h2>
                            <p className="text-gray-700">
                                Create outstanding portfolios with the help of our AI assistant.
                                Get suggestions, feedback, and design support to make your work
                                shine.
                            </p>
                        </div>
                        <div className="md:w-1/2">
                             <BrainCircuit className="w-48 h-48 text-blue-500 mx-auto" />
                        </div>
                    </div>
                </section>

                {/* Ready to Take Your Portfolio to the Next Level? */}
                <section className="bg-gray-50 py-16 px-4">
                    <div className="container mx-auto text-center">
                        <h2 className="text-3xl font-semibold text-gray-900 mb-8">
                            Ready to Take Your Portfolio to the Next Level?
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Image 1 */}
                            <div className="rounded-lg overflow-hidden">
                                <img
                                    src="https://placehold.co/400x300/EEE/31343C" // Replace with actual image URLs
                                    alt="Placeholder 1"
                                    className="w-full h-auto"
                                />
                            </div>
                            {/* Image 2 */}
                            <div className="rounded-lg overflow-hidden">
                                <img
                                    src="https://placehold.co/400x300/EEE/31343C"  // Replace with actual image URLs
                                    alt="Placeholder 2"
                                    className="w-full h-auto"
                                />
                            </div>
                            {/* Image 3 */}
                            <div className="rounded-lg overflow-hidden">
                                <img
                                   src="https://placehold.co/400x300/EEE/31343C"  // Replace with actual image URLs
                                    alt="Placeholder 3"
                                    className="w-full h-auto"
                                />
                            </div>
                        </div>
                        <Button variant="default" className="mt-8 bg-blue-600 hover:bg-blue-700 text-white">
                            GET STARTED!
                        </Button>
                    </div>
                </section>
            </main>

            <Footer /> {/* Using the Footer component */}
        </div>
    );
};

export default LandingPage;
