'use client';

import { useState } from 'react';
import footer from '../../layout/Footer';

function FAQItem({ question, answer, activeIndex, index, setActiveIndex }) {
  const isOpen = activeIndex === index;

  return (
    <div className="border-b py-4">
      <button
        className="w-full text-left text-lg font-semibold flex justify-between items-center text-black"
        onClick={() => setActiveIndex(isOpen ? null : index)}
      >
        {question}
        <span>{isOpen ? '▲' : '▼'}</span>
      </button>
      {isOpen && <p className="mt-2 text-black">{answer}</p>}
    </div>
  );
}

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    { question: 'How does it know when my tools need maintenance?', answer: 'Gearfolio AI uses historical usage data, manufacturer guidelines, and sensor inputs (if connected) to predict when maintenance is due.' },
    { question: 'What if I forget my password?', answer: 'You can reset your password by clicking the “Forgot Password” link on the login page.' },
    { question: 'Can I delete my account?', answer: 'Yes, account deletion is typically available under Account Settings.' },
    { question: 'How do I report a bug or request a new feature?', answer: 'Use the in-app Help or Feedback section to report bugs or suggest features.' },
    { question: 'What if my data isn’t updating?', answer: 'Check your internet connection and make sure all integrated devices or systems are connected.' },
    { question: 'Can I connect Gearfolio AI with other apps or software?', answer: 'Yes, Gearfolio AI may offer integrations with apps like Slack, Google Workspace, or other asset management systems.' },
    { question: 'Do I need to install anything?', answer: 'If Gearfolio AI is cloud-based, no installation is needed beyond accessing it via a web browser.' },
  ];

  return (
    <div className="min-h-screen flex flex-col text-black">
      <header className="bg-blue-600 p-6 text-center text-xl font-bold">
        Header Placeholder
      </header>

      <main className="flex-grow bg-[#C0DDF7] flex justify-center items-center py-10">
        <div className="bg-white shadow-lg rounded-lg p-8 w-[70%] max-w-[1200px] flex justify-center items-center gap-8">
          <div className="w-1/2 border border-gray-400 rounded-lg p-8 shadow-md bg-gray-100 flex flex-col justify-center items-center h-[600px]">
            <h2 className="text-2xl font-bold mb-2 text-center">FAQs</h2>
            <p className="text-gray-600 text-center mb-6">
              Explore helpful tips and expert guidance to make the most of your AI-powered portfolio.
            </p>
            <div className="w-full">
              {faqs.map((faq, index) => (
                <FAQItem key={index} {...faq} index={index} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
              ))}
            </div>
          </div>

          <div className="w-1/2 border border-gray-400 rounded-lg p-8 shadow-md bg-gray-100 flex flex-col justify-center items-center h-[600px]">
            <h2 className="text-xl font-bold mb-2 text-center">Tutorials</h2>
            <p className="text-gray-600 text-center mb-6">
              Get the most out of your AI-powered portfolio with step-by-step guides and expert tips.
            </p>
            <div className="grid grid-cols-2 gap-4 w-full">
              <a href="#" className="flex flex-col items-center p-4 bg-white rounded-lg shadow hover:bg-gray-200">
                <span className="text-3xl">📘</span>
                <span className="font-semibold text-black">Getting Started Tutorial</span>
              </a>
              <a href="#" className="flex flex-col items-center p-4 bg-white rounded-lg shadow hover:bg-gray-200">
                <span className="text-3xl">🎨</span>
                <span className="font-semibold text-black">Creating Your Portfolio</span>
              </a>
              <a href="#" className="flex flex-col items-center p-4 bg-white rounded-lg shadow hover:bg-gray-200">
                <span className="text-3xl">⚙️</span>
                <span className="font-semibold text-black">Using AI Recommendations</span>
              </a>
              <a href="#" className="flex flex-col items-center p-4 bg-white rounded-lg shadow hover:bg-gray-200">
                <span className="text-3xl">🎬</span>
                <span className="font-semibold text-black">Customizing Your Portfolio Design</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 p-6 text-center">
        
      </footer>
    </div>
  );
}