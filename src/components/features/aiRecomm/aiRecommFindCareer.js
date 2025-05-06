import Image from 'next/image';
function Settings() {
  return (
        <div className="flex flex-col w-full md:w-1/2 relative">
          <div
            className="absolute w-[1046px] h-[822px] left-[704px] top-[129px] bg-white shadow-[2px_2px_30px_1px_rgba(0,_0,_0,_0.25)] rounded-[12px]"
          />
          <Image
          className="absolute w-[95.95px] h-[70.07px] left-[1645.78px] top-[862.51px] filter-blur-[1.5px]"
                  src="/gearfolio.svg"
                  alt="Image"
                  width={50}
                  height={50}
                  objectFit="contain"
                />
          <div className="absolute w-[501px] h-[26px] left-[976px] top-[509px] text-[#2E8BC0] text-[35px] font-[Roboto_Condensed] font-medium leading-[30px]">
            Your career path will be shown here
          </div>

          {/* Left Section */}
          <div className="absolute w-[527px] h-[822px] left-[142px] top-[129px]">
            <div className="absolute w-[527px] h-[822px] bg-white shadow-[2px_2px_30px_1px_rgba(0,_0,_0,_0.25)] rounded-[12px]" />
            <div className="absolute w-[353px] h-[45px] left-[83px] top-[121px] text-center text-[#616161] text-[9px] font-[Anek_Gujarati] font-medium leading-[8px]">
              Get personalized career recommendations based on your skills, interests, and current
              <br />
              education level. Fill in the details below to receive AI-driven insights tailored to your
              <br />
              learning journey and professional aspirations
            </div>
            <div className="absolute w-[377px] h-[30px] left-[107px] top-[64px] text-[#2E8BC0] text-[43px] font-[Anek_Gujarati] font-medium leading-[33px] text-shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)]">
              AI Recommendation
            </div>
            <Image
          className="absolute w-[64px] h-[64px] left-[35px] top-[47px]"
                  src="/aiRecommButton.svg"
                  alt="Image"
                  width={50}
                  height={50}
                  objectFit="contain"
                />
            <div className="absolute w-[427px] h-[56px] left-[57px] top-[688px] bg-[#2E8BC0] rounded-[12px]" />
            <div className="absolute w-[145px] h-[11px] left-[187px] top-[711px] text-white text-[16px] font-[Roboto] font-medium leading-[10px]">
              Find My Career Path
            </div>
            <Image
          className="absolute w-[18.99px] h-[19px] left-[342px] top-[706px]"
                  src="/pencil.svg"
                  alt="Image"
                  width={50}
                  height={50}
                  objectFit="contain"
                />

            {/* Form Inputs */}
            <div className="absolute left-[50px] top-[213px] text-[#4A4B4C] text-[16px] font-[Roboto] font-medium leading-[10px]">
              Skills
            </div>
            <div className="absolute w-[427px] h-[35px] left-[50px] top-[231px]  border border-black rounded-tl-[5px] rounded-bl-[20px] rounded-tr-[20px] rounded-br-[5px] bg-white">
              <input
                 className="w-full h-full border-none bg-transparent text-[14px] font-['Roboto'] px-4 py-2 rounded-tl-[20px] rounded-bl-[20px] rounded-tr-[5px] rounded-br-[5px] outline-none placeholder-gray-500"
                 type="text"
                 placeholder="Enter skills e.g., [Python, JavaScript, SQL, HTML/CSS]"
               />
            </div>

            <div className="absolute left-[50px] top-[363px] text-[#4A4B4C] text-[16px] font-[Roboto] font-medium leading-[10px]">
              Current Education
            </div>
            <div className="absolute w-[427px] h-[35px] left-[50px] top-[381px] border border-black rounded-tl-[5px] rounded-bl-[20px] rounded-tr-[20px] rounded-br-[5px] bg-white">
              <input
                className="w-full h-full border-none bg-transparent text-[14px] font-['Roboto'] px-4 py-2 rounded-tl-[20px] rounded-bl-[20px] rounded-tr-[5px] rounded-br-[5px] outline-none placeholder-gray-500"
                type="text"
                placeholder="Enter your education"
              />
            </div>
            <div className="absolute left-[50px] top-[513px] text-[#4A4B4C] text-[16px] font-[Roboto] font-medium leading-[10px]">
              Present Location
            </div>
            <div className="absolute w-[427px] h-[35px] left-[50px] top-[531px] border border-black rounded-tl-[5px] rounded-bl-[20px] rounded-tr-[20px] rounded-br-[5px] bg-white">
              <input
                className="w-full h-full border-none bg-transparent text-[14px] font-['Roboto'] px-4 py-2 rounded-tl-[20px] rounded-bl-[20px] rounded-tr-[5px] rounded-br-[5px] outline-none placeholder-gray-500"
                type="text"
                placeholder="Enter your location"
              />
            </div>
            <div className="absolute left-[50px] top-[588px] text-[#4A4B4C] text-[16px] font-[Roboto] font-medium leading-[10px]">
              Desired Position / job
            </div>
            <div className="absolute w-[427px] h-[35px] left-[50px] top-[606px] border border-black rounded-tl-[5px] rounded-bl-[20px] rounded-tr-[20px] rounded-br-[5px] bg-white">
              <input
                className="w-full h-full border-none bg-transparent text-[14px] font-['Roboto'] px-4 py-2 rounded-tl-[20px] rounded-bl-[20px] rounded-tr-[5px] rounded-br-[5px] outline-none placeholder-gray-500"
                type="text"
                placeholder="Enter desired position"
              />
            </div>
            <div className="absolute left-[50px] top-[438px] text-[#4A4B4C] text-[16px] font-[Roboto] font-medium leading-[10px]">
              Current Skill Level
            </div>
            <div className="absolute w-[427px] h-[35px] left-[50px] top-[456px] border border-black rounded-tl-[5px] rounded-bl-[20px] rounded-tr-[20px] rounded-br-[5px] bg-white">
              <input
                className="w-full h-full border-none bg-transparent text-[14px] font-['Roboto'] px-4 py-2 rounded-tl-[20px] rounded-bl-[20px] rounded-tr-[5px] rounded-br-[5px] outline-none placeholder-gray-500"
                type="text"
                placeholder="Enter current skill level"
              />
            </div>
            <div className="absolute left-[50px] top-[288px] text-[#4A4B4C] text-[16px] font-[Roboto] font-medium leading-[10px]">
              Interest
            </div>
            <div className="absolute w-[427px] h-[35px] left-[50px] top-[306px] border border-black rounded-tl-[5px] rounded-bl-[20px] rounded-tr-[20px] rounded-br-[5px] bg-white">
              <input
                className="w-full h-full border-none bg-transparent text-[14px] font-['Roboto'] px-4 py-2 rounded-tl-[20px] rounded-bl-[20px] rounded-tr-[5px] rounded-br-[5px] outline-none placeholder-gray-500"
                type="text"
                placeholder="Enter your interests e.g., [AI, Web Development, Data Science, Cybersecurity]"
              />
            </div>
          </div>
        </div>
  );
}

export default Settings;
