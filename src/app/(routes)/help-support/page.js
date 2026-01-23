'use client';

import Footer from '../../../components/layout/Footer'; // Ensure this path is correct
import { useState } from 'react';

function FAQItem({ question, answer, activeIndex, index, setActiveIndex }) {
  const isOpen = activeIndex === index;
  const itemID = `faq-answer-${index}`;

  return (
    // Each FAQ item: white background, gray border, rounded, no shadow.
    <div className="bg-white border border-gray-300 rounded-lg transition-all duration-300 ease-in-out">
      <h3 className="m-0 font-medium"> {/* Semantic heading, remove default margin, font-medium for structure if needed */}
        <button
          type="button"
          className="w-full flex justify-between items-center text-left p-4 hover:bg-gray-50 rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75"
          onClick={() => setActiveIndex(isOpen ? null : index)}
          aria-expanded={isOpen}
          aria-controls={itemID}
        >
          {/* Question text: smaller, medium weight, dark gray */}
          <span className="text-sm font-bold text-gray-800">{index + 1}. {question}</span>
          {/* SVG Chevron Icon for dropdown */}
          <svg
            className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </h3>
      {/* Answer section */}
      {isOpen && (
        <div className="px-4 pb-4 pt-0 text-sm text-gray-600" id={itemID}> {/* Adjusted padding for answer */}
          <p className="mt-1">{answer}</p> {/* Added small top margin to paragraph for spacing */}
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState(null);

  // User's original FAQ data
  const faqs = [
    { question: 'How does it know when my tools need maintenance?', answer: 'Gearfolio AI uses historical usage data, manufacturer guidelines, and sensor inputs (if connected) to predict when maintenance is due.' },
    { question: 'What if I forget my password?', answer: 'You can reset your password by clicking the “Forgot Password” link on the login page.' },
    { question: 'Can I delete my account?', answer: 'Yes, account deletion is typically available under Account Settings.' },
    { question: 'How do I report a bug or request a new feature?', answer: 'Use the in-app Help or Feedback section to report bugs or suggest features.' },
    { question: 'What if my data isn’t updating?', answer: 'Check your internet connection and make sure all integrated devices or systems are connected.' },
    { question: 'Can I connect Gearfolio AI with other apps or software?', answer: 'Yes, Gearfolio AI may offer integrations with apps like Slack, Google Workspace, or other asset management systems.' },
    { question: 'Do I need to install anything?', answer: 'If Gearfolio AI is cloud-based, no installation is needed beyond accessing it via a web browser.' },
  ];

  const tutorials = [
    { title: 'Getting Started Tutorial', icon: '📘', href: '#' },
    { title: 'Creating Your Portfolio', icon: '🎨', href: '#' },
    { title: 'Using AI Recommendations', icon: '⚙️', href: '#' },
    { title: 'Customizing Your Portfolio Design', icon: '🎬', href: '#' },
  ];

  const customSkyShadowXl = 'shadow-[0_20px_25px_-5px_rgba(14,165,233,0.1),_0_8px_10px_-6px_rgba(14,165,233,0.08)]';
  const customSkyShadowLg = 'shadow-[0_10px_15px_-3px_rgba(14,165,233,0.1),_0_4px_6px_-4px_rgba(14,165,233,0.08)]';

  return (
    <div className="min-h-screen flex flex-col text-black">
      <header className="bg-blue-600 p-4 md:p-6 text-center text-xl font-bold text-white">
        Help & Support
      </header>

      {/* Main content area with gradient background */}
      <main className="flex-grow bg-gradient-to-b from-[#145DA0] to-[#2E8BC0] flex justify-center items-start py-8 md:py-12 px-4">
        <div className="w-full max-w-5xl lg:max-w-6xl flex flex-col lg:flex-row gap-6 md:gap-8">
          
          {/* FAQs Panel */}
          <div className={`w-full lg:w-1/2 bg-white ${customSkyShadowXl} rounded-xl p-6 md:p-8 flex flex-col`}>
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-800 text-center lg:text-left">FAQs</h2>
            <p className="text-sm md:text-base text-gray-600 mb-6 text-center lg:text-left">
              Explore helpful tips and expert guidance to make the most of your AI-powered portfolio.
            </p>
            {/* Adjusted spacing between FAQ items */}
            <div className="w-full space-y-3">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  index={index}
                  activeIndex={activeIndex}
                  setActiveIndex={setActiveIndex}
                />
              ))}
            </div>
          </div>

          {/* Tutorials Panel */}
          <div className={`w-full lg:w-1/2 bg-white ${customSkyShadowXl} rounded-xl p-6 md:p-8 flex flex-col`}>
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-800 text-center lg:text-left">Tutorials</h2>
            <p className="text-sm md:text-base text-gray-600 mb-6 text-center lg:text-left">
              Get the most out of your AI-powered portfolio with step-by-step guides and expert tips.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {tutorials.map((tutorial, index) => (
                <a
                  key={index}
                  href={tutorial.href}
                  // Tutorial items: white bg, gray border, rounded, distinct shadow, hover effect
                  className={`flex flex-col items-center justify-center text-center p-4 bg-white border border-sky-300 rounded-lg ${customSkyShadowLg} hover:shadow-[0_10px_15px_-3px_rgba(14,165,233,0.15),_0_4px_6px_-4px_rgba(14,165,233,0.12)] hover:bg-gray-50 transition-all duration-200 ease-in-out min-h-[120px] md:min-h-[140px]`}
                >
                  {/* For exact icon match, replace span with <img> or SVG component */}
                  <span className="text-3xl md:text-4xl mb-2">{tutorial.icon}</span>
                  <span className="font-bold text-sm md:text-base text-gray-800">{tutorial.title}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}