"use client";

import React, { useEffect, useState } from "react";
import { databases } from "../../../utils/appwrite.js"; // Corrected path to appwrite.js

const Dashboard = () => {
  const [analytics, setAnalytics] = useState({ portfolioCompletion: 0, aiSuggestionsApplied: 0 });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await databases.getDocument("67eccfbe002be903030e", "67eccfd9002367c222d8", "67ecd3b60003e722fdfe");
        console.log("Response:", response);
        setAnalytics({
          portfolioCompletion: response.portfolioCompletion,
          aiSuggestionsApplied: response.aiSuggestionsApplied,
        });
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchAnalytics();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await databases.listDocuments("67eccfbe002be903030e", "67eccfd9002367c222d8");
      console.log("Documents in Collection:", response.documents);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Navbar */}
      <nav className="flex justify-between items-center bg-white shadow-md p-4">
        <h1 className="text-xl font-bold text-black">GEARFOLIO</h1>
        <div className="space-x-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Home</button>
          <button className="px-4 py-2 bg-gray-300 text-black rounded-md">My Portfolio</button>
          <button className="px-4 py-2 bg-gray-300 text-black rounded-md">AI Recommendations</button>
          <button className="px-4 py-2 bg-gray-300 text-black rounded-md">Settings</button>
        </div>
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
      </nav>

      {/* Search Bar */}
      <div className="flex items-center bg-white shadow-md p-3 rounded-md mt-4">
        <input
          placeholder="Search for student portfolios by name or skills..."
          className="flex-1 p-2 border rounded-md text-black"
        />
        <button className="ml-2 px-4 py-2 bg-gray-300 text-black rounded-md">🔍</button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        {/* Portfolio Views */}
        <div className="bg-white p-4 shadow-md rounded-md">
          <h2 className="text-lg font-semibold text-black">Portfolio Views</h2>
          <div className="mt-4 flex justify-around">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-blue-500 rounded-full flex items-center justify-center text-lg font-bold text-black">
                {analytics.portfolioCompletion}%
              </div>
              <p className="text-black">Completed</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-blue-300 rounded-full flex items-center justify-center text-lg font-bold text-black">
                {analytics.aiSuggestionsApplied}%
              </div>
              <p className="text-black">Completed</p>
            </div>
          </div>
        </div>

        {/* Suggestions and Reminders */}
        <div className="bg-white p-4 shadow-md rounded-md">
          <h2 className="text-lg font-semibold text-black">Suggestions and Reminders</h2>
          <p className="text-sm text-gray-600 text-black">Revisit your uncompleted sections.</p>
          <div className="w-full bg-gray-200 h-2 rounded-md mt-2">
            <div
              className="bg-blue-500 h-2 rounded-md"
              style={{ width: `${analytics.portfolioCompletion}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2 text-black">Apply AI Suggestions</p>
          <div className="w-full bg-gray-200 h-2 rounded-md mt-2">
            <div
              className="bg-blue-300 h-2 rounded-md"
              style={{ width: `${analytics.aiSuggestionsApplied}%` }}
            ></div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <div className="bg-white p-4 shadow-md rounded-md text-center">
            <h2 className="text-lg font-semibold text-black">Complete your portfolio</h2>
            <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">Click here</button>
          </div>
          <div className="bg-white p-4 shadow-md rounded-md text-center">
            <h2 className="text-lg font-semibold text-black">Start a new project</h2>
            <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">Click here</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;