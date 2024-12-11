import React from "react";
import IGimg from "../../img/LoginPage/instagram.png";

function LeftSidebar() {
  return (
    <aside className="w-[300px] dark:border-gray-700 text-white border-r p-4 hidden lg:block sticky top-0 h-screen">
      <div className="flex items-center ml-5 my-6">
        <img className="w-[130px]" src={IGimg} alt="Instagram" />
      </div>

      <div className="flex gap-16 flex-col">
        <ul>
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
              <p className="text-lg">{item.name}</p>
            </li>
          ))}
        </ul>

        {/* Add space between the two groups */}
        <div className="mt-4"></div>

        <ul>
          {[
            { name: "Settings", icon: "⚙️" },
            { name: "AI Studio", icon: "🤖" },
            { name: "Threads", icon: "🧵" },
          ].map((item, index) => (
            <li
              key={index}
              className="flex items-center space-x-4 p-3 m-1 rounded-md hover:bg-[#1A1A1A] hover:text-white transition cursor-pointer"
            >
              <span className="text-2xl">{item.icon}</span>
              <p className="text-lg">{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default LeftSidebar;
