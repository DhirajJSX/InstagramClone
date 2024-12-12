import React from "react";
import IGimg from "../../img/LoginPage/instagram.png";
import {DeskstopLEftSiderIcon, bottomIcon} from "../../Data/DeskstopLEftSiderIcon";

function LeftSidebar() {
  return (
    <aside className="w-full  lg:w-[250px] dark:border-gray-700 text-white border-r p-4 pb-10 hidden lg:flex flex-col justify-between lg:sticky lg:top-0 lg:h-screen overflow-hidden">
      <div className="flex cursor-pointer items-center ml-5 my-6">
        <img className="w-[100px]" src={IGimg} alt="Instagram" />
      </div>

      {/* Navigation Sections */}
      <div className="flex flex-col h-full">
        {/* Main Navigation */}
        <ul className="flex-grow ">
          {DeskstopLEftSiderIcon.map((item, index) => (
            <li
              key={index}
              className="flex items-center space-x-4 p-3 my-0.5  rounded-md hover:bg-[#1A1A1A] hover:text-white transition-all duration-700 ease-out cursor-pointer"
            >
              <span className=" font-normal">
                {typeof item.icon === "string" ? (
                  item.icon
                ) : (
                  <item.icon style={{ fontSize: "30px", marginBottom: "3px"}} />
                )}
              </span>
              <p className="text-[15px]">{item.name}</p>
            </li>
          ))}
        </ul>

        {/* Secondary Navigation */}
        <ul>
          {bottomIcon.map((item, index) => (
            <li
              key={index}
              className="flex items-center space-x-4 p-3 my-0.5  rounded-md hover:bg-[#1A1A1A] hover:text-white transition-all duration-700 ease-out cursor-pointer"
            >
              <span className="text-2xl">
                {typeof item.icon === "string" ? (
                  item.icon
                ) : (
                  <item.icon style={{ fontSize: "30px", marginBottom: "3px"}} />
                )}
              </span>
              <p className="text-lg truncate">{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default LeftSidebar;
