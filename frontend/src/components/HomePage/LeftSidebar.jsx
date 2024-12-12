import React from "react";
import IGimg from "../../img/LoginPage/instagram.png";
import { useNavigate } from "react-router-dom";
import LeftSiderTop from "./LeftSiderButton/LeftSiderTop";
import LeftSiderButtom from "./LeftSiderButton/LeftSiderButtom";
function LeftSidebar() {

  return (
    <aside className="w-full  lg:w-[250px] dark:border-gray-700 text-white border-r p-4 pb-10 hidden lg:flex flex-col justify-between lg:sticky lg:top-0 lg:h-screen overflow-hidden">
      <div className="flex cursor-pointer items-center ml-5 my-6">
        <img className="w-[100px]" src={IGimg} alt="Instagram" />
      </div>

      {/* Navigation Sections */}
      <div className="flex flex-col h-full">
        {/* TOp */}
        <LeftSiderTop />
        <LeftSiderButtom />
      </div>
    </aside>
  );
}

export default LeftSidebar;
