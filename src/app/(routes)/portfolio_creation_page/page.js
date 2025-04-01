function PortfolioCreationPage() {
  return (
    <div className="min-h-screen flex items-center justify-start bg-gray-50 p-30">
      <div className="max-w-2xl">
        <h1 className="text-8xl font-bold text-gray-800 mb-4 whitespace-nowrap">
          Create your
          <br/>
          <span className="text-blue-600">Portfolio</span>
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          Create your own AI-enhanced portfolio with ease.
        </p>
        
        <button className="
          bg-blue-600 
          hover:bg-blue-700 
          hover:scale-105 
          active:bg-blue-500 
          active:scale-100 
          text-white 
          font-semibold 
          py-4 px-8 
          rounded-lg 
          shadow-md 
          transition-all 
          duration-300 
          text-xl 
          cursor-pointer
          transform
        ">
          Get started
        </button>
      </div>
    </div>
  );
}

export default PortfolioCreationPage;