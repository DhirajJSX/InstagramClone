import React from "react";
import IGimg from "../../img/LoginPage/instagram.png";

function LeftSidebar() {
  return (
    <aside className="w-full lg:w-[300px] dark:border-gray-700 text-white border-r p-4 pb-10 hidden lg:flex flex-col justify-between lg:sticky lg:top-0 lg:h-screen overflow-hidden">
      {/* Logo Section */}
      <div className="flex items-center ml-5 my-6">
        <img className="w-[130px]" src={IGimg} alt="Instagram" />
      </div>

      {/* Navigation Sections */}
      <div className="flex flex-col h-full">
        {/* Main Navigation */}
        <ul className="flex-grow ">
          {[
            { name: "Home", icon: "🏠" },
            { name: "Search", icon: "🔍" },
            { name: "Explore", icon: "🗺️" },
            { name: "Reels", icon: "🎥" },
            { name: "Messages", icon: "✉️" },
            { name: "Notifications", icon: "🔔" },
            { name: "Create", icon: "➕" },
            { name: "Profile", icon: "👤" },
          ].map((item, index) => (
            <li
              key={index}
              className="flex items-center space-x-4 p-3 m-1 rounded-md hover:bg-[#1A1A1A] hover:text-white transition cursor-pointer"
            >
              <span className="text-2xl">{item.icon}</span>
              <p className="text-lg truncate">{item.name}</p>
            </li>
          ))}
        </ul>

        {/* Secondary Navigation */}
        <ul className="">
          {[
            { name: "Settings", icon: "⚙️" },
            { name: "AI Studio", icon: "🤖" },
          ].map((item, index) => (
            <li
              key={index}
              className="flex items-center space-x-4 p-3 m-1 rounded-md hover:bg-[#1A1A1A] hover:text-white transition cursor-pointer"
            >
              <span className="text-2xl">{item.icon}</span>
              <p className="text-lg truncate">{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default LeftSidebar;
