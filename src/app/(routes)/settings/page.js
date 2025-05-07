'use client';

import React, { useState, useEffect } from 'react';
import Header from '../../../components/layout/Header.js';
import SettingsFooter from '../../../components/layout/settings/settingsfooter.js';

function SettingsPage() {
  const [activeTab, setActiveTab] = useState('account');

  const [accountDetails, setAccountDetails] = useState({
    firstName: 'Juan',
    lastName: 'Dela Cruz',
    username: 'juandelacruz',
    phoneNumber: '09123456789',
  });

  const [securitySettings, setSecuritySettings] = useState({
    email: 'juan.delacruz@example.com',
    password: '',
    theme: 'System Default',
    privacy: 'Public',
  });

  const [connectedExperiences, setConnectedExperiences] = useState({
    linkedin: 'linkedin.com/in/juandelacruz',
    facebook: 'facebook.com/juandelacruz',
    github: 'github.com/juandelacruz',
    instagram: 'instagram.com/juandelacruz',
    microsoft: 'live:juandelacruz',
  });

  useEffect(() => {
    const globalFooter = document.getElementById('global-footer');
    let originalDisplay = '';

    if (globalFooter) {
      originalDisplay = globalFooter.style.display;
      globalFooter.style.display = 'none';
    }

    return () => {
      if (globalFooter) {
        globalFooter.style.display = originalDisplay;
      }
    };
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleAccountDetailsChange = (e) => {
    const { id, value } = e.target;
    setAccountDetails(prevDetails => ({ ...prevDetails, [id]: value }));
  };

  const handleSecuritySettingsChange = (e) => {
    const { id, value } = e.target;
    setSecuritySettings(prevSettings => ({ ...prevSettings, [id]: value }));
  };

  const handleConnectedExperiencesChange = (e) => {
    const { id, value } = e.target;
    setConnectedExperiences(prevExperiences => ({ ...prevExperiences, [id]: value }));
  };

  const handleAccountSave = (e) => {
    e.preventDefault();
    console.log('Saving account details:', accountDetails);
    alert('Account details saved (simulated)!');
  };

  const handleSecuritySave = (e) => {
    e.preventDefault();
    console.log('Saving security settings:', securitySettings);
    alert('Security settings saved (simulated)!');
  };

  const handleConnectedSave = (e) => {
    e.preventDefault();
    console.log('Saving connected experiences:', connectedExperiences);
    alert('Connected experiences saved (simulated)!');
  };

  const handleEditProfile = () => {
    alert('Edit Profile clicked (implement functionality)!');
  };

  const handleLogout = () => {
    alert('Logout successful (simulated)!');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      alert('Account deleted (simulated)!');
    }
  };

  return (
    <>
      <Header activePage="settings" userProfileSrc={undefined} />
      <main
        className="py-6 flex justify-center flex-grow bg-gradient-to-b from-[#F7F7FF] to-[#C0DDF7]"
      >
        <div className="bg-white rounded-lg shadow-xl overflow-hidden w-[90%] max-w-[1400px] flex my-4">
          {/* Left Sidebar */}
          <div className="w-1/4 border-r p-8 flex flex-col bg-white">
            <div className="flex items-center mb-8">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-800">{accountDetails.firstName} {accountDetails.lastName}</h1>
                <h2 className="text-sm italic text-gray-600">Your personal account</h2>
              </div>
            </div>
            <nav className="mt-4 space-y-1">
              <button
                onClick={() => handleTabClick('account')}
                className={`w-full text-left flex items-center mt-5 py-3 px-4 text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-150 ${activeTab === 'account' ? 'bg-gray-100 font-semibold text-blue-600' : 'text-gray-600'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0H9m10-3v2m0 0H5M5 11h2m2 0h2m2 0h2m2 0h2" />
                </svg>
                Account Settings
              </button>
              <button
                onClick={() => handleTabClick('security')}
                className={`w-full text-left flex items-center py-3 mt-5 px-4 text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-150 ${activeTab === 'security' ? 'bg-gray-100 font-semibold text-blue-600' : 'text-gray-600'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Password and Security
              </button>
              <button
                onClick={() => handleTabClick('connected')}
                className={`w-full text-left flex items-center py-3 mt-5 px-4 text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-150 ${activeTab === 'connected' ? 'bg-gray-100 font-semibold text-blue-600' : 'text-gray-600'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899A4 4 0 005.75 7.5M10 12.5a2.5 2.5 0 01-2.5-2.5M7.5 10a2.5 2.5 0 01-2.5-2.5M13.828 10.172L15 9m-1.172 1.172L12.5 12.5m1.328-2.328L15 9m0 0l1.172-1.172a4 4 0 00-5.656-5.656l-4 4a4 4 0 005.656 5.656l1.101-1.102" />
                </svg>
                Connected Experiences
              </button>
            </nav>
            <div className="mt-auto pt-6">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full py-2.5 px-5 rounded-md text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 flex items-center justify-center transition-colors duration-150"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v-3m6 0h-6m-6-4v-3" />
                </svg>
                Logout
              </button>
            </div>
          </div>

          {/* Right Content Panel (Full content) */}
          <div className="w-3/4 p-8 overflow-y-auto bg-white">
            {activeTab === 'account' && (
              <form onSubmit={handleAccountSave}>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Account Settings</h2>
                <p className="text-gray-600 mb-8">Update your name, phone number, and profile picture to keep your account up to date.</p>
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-700 mb-4 text-left">Edit account details</h3> {/* Added text-center here if you want the heading centered too */}
                  {/* MODIFICATION START: Wrapper for profile picture and edit button */}
                  <div className="flex flex-col items-center mb-8"> {/* Centering container */}
                    <div className="w-30 h-30 rounded-full bg-gray-200 flex items-center justify-center mb-4 flex-shrink-0"> {/* Added mb-4 for spacing */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-15 w-15 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <button type="button" onClick={handleEditProfile} className="text-blue-600 hover:text-blue-700 font-medium focus:outline-none flex items-center transition-colors duration-150">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-1.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                      Edit Profile
                    </button>
                  </div>
                  {/* MODIFICATION END */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input type="text" id="firstName" name="firstName" value={accountDetails.firstName} onChange={handleAccountDetailsChange} className="shadow-sm appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input type="text" id="lastName" name="lastName" value={accountDetails.lastName} onChange={handleAccountDetailsChange} className="shadow-sm appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div className="mt-5">
                      <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                      <input type="text" id="username" name="username" value={accountDetails.username} onChange={handleAccountDetailsChange} className="shadow-sm appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div className="mt-5">
                      <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input type="tel" id="phoneNumber" name="phoneNumber" value={accountDetails.phoneNumber} onChange={handleAccountDetailsChange} className="shadow-sm appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition ease-in-out duration-150">
                    Save Account
                  </button>
                </div>
              </form>
            )}
            {activeTab === 'security' && (
              <form onSubmit={handleSecuritySave}>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Password and Security</h2>
                <p className="text-gray-600 mb-8">Control your password, theme, portfolio privacy, and review your recent login activity.</p>
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Account Security</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-8">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Update Email</label>
                    <input type="email" id="email" name="email" value={securitySettings.email} onChange={handleSecuritySettingsChange} className="shadow-sm appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <input type="password" id="password" name="password" value={securitySettings.password} onChange={handleSecuritySettingsChange} className="shadow-sm appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter new password (optional)"/>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Preferences</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-8">
                  <div>
                    <label htmlFor="theme" className="block text-sm font-medium text-gray-700 mb-1">Choose Portfolio Theme</label>
                    <div className="relative">
                      <select id="theme" name="theme" value={securitySettings.theme} onChange={handleSecuritySettingsChange} className="shadow-sm appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8">
                        <option>Dark</option>
                        <option>Light</option>
                        <option>System Default</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="privacy" className="block text-sm font-medium text-gray-700 mb-1">Choose Portfolio Privacy</label>
                    <div className="relative">
                      <select id="privacy" name="privacy" value={securitySettings.privacy} onChange={handleSecuritySettingsChange} className="shadow-sm appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8">
                        <option>Public</option>
                        <option>Private</option>
                        <option>Only Me</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end pt-4 mb-8">
                  <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition ease-in-out duration-150">
                    Save Security Settings
                  </button>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-red-600 mb-3">Delete Account</h3>
                  <p className="text-gray-600 text-sm mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                  <button type="button" onClick={handleDeleteAccount} className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition ease-in-out duration-150">
                    Delete your account
                  </button>
                </div>
              </form>
            )}
            {activeTab === 'connected' && (
              <form onSubmit={handleConnectedSave}>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Connected Experiences</h2>
                <p className="text-gray-600 mb-8">Link or unlink accounts from services like Google, Facebook, and GitHub for a seamless experience.</p>
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Link your social accounts</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-8">
                  <div>
                    <label htmlFor="linkedin" className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-700 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                      LinkedIn Profile URL
                    </label>
                    <input type="text" id="linkedin" name="linkedin" value={connectedExperiences.linkedin} onChange={handleConnectedExperiencesChange} className="shadow-sm appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="https://linkedin.com/in/yourprofile" />
                  </div>
                  <div>
                    <label htmlFor="facebook" className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                        </svg>
                      Facebook Profile URL
                    </label>
                    <input type="text" id="facebook" name="facebook" value={connectedExperiences.facebook} onChange={handleConnectedExperiencesChange} className="shadow-sm appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="https://facebook.com/yourprofile"/>
                  </div>
                  <div>
                    <label htmlFor="github" className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-800 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      GitHub Profile URL
                    </label>
                    <input type="text" id="github" name="github" value={connectedExperiences.github} onChange={handleConnectedExperiencesChange} className="shadow-sm appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="https://github.com/yourusername" />
                  </div>
                  <div>
                    <label htmlFor="instagram" className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-pink-600 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.359 2.618 6.78 6.98 6.98 1.281.059 1.689.073 4.948.073s3.667-.014 4.947-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      Instagram Profile URL
                    </label>
                    <input type="text" id="instagram" name="instagram" value={connectedExperiences.instagram} onChange={handleConnectedExperiencesChange} className="shadow-sm appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="https://instagram.com/yourusername"/>
                  </div>
                  <div>
                    <label htmlFor="microsoft" className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M0 0v24h24v-24h-24zm11.018 3.099h10.011v10.011h-10.011v-10.011zm-8.047 0h7.065v7.065h-7.065v-7.065zm8.047 10.983h10.011v7.065h-10.011v-7.065zm-8.047 0h7.065v7.065h-7.065v-7.065z"/>
                      </svg>
                      Microsoft Account Email
                    </label>
                    <input type="email" id="microsoft" name="microsoft" value={connectedExperiences.microsoft} onChange={handleConnectedExperiencesChange} className="shadow-sm appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="your-email@outlook.com"/>
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition ease-in-out duration-150">
                    Save Connections
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
      <SettingsFooter />
    </>
  );
}

export default SettingsPage;