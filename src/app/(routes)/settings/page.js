function Settings() {
    return (
      <div className="min-h-screen py-[1%] bg-[#ADD8E6]">
        <div className="flex flex-row md:flex-row h-full items-center">
        <div className="flex flex-col w-full md:w-1/6 ml-6 border-l border-r border-b pt-0 pb-8 px-4 " 
             style={{ borderTopWidth: 0, marginTop: '100px' }}>
                              <h1 className="text-[#000000] mt-[5%] md:text-xl font-inter">
                    Juan Dela Cruz
                    </h1>
                <h2 className="italic text-[#000000] border-b border-[#000000] font-inter">
                  Your personal account
                </h2>
                <h3 className="md:text-[25px] text-black mt-5">
                  Account Settings
                </h3>
                <h3 className="md:text-[25px] text-black mt-7">
                  Password and Security
                </h3>
                <h3 className="md:text-[25px] text-black mt-7">
                  Connected Experiences
                </h3>
                <button type="button" className="mt-50 ml-5 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-10">Default</button>

            </div>
            <div>

            </div>
        </div>
      </div>
    );
  }
  
  export default Settings;
  