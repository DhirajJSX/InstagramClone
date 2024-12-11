import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import IGimg from "../../img/LoginPage/instagram.png";

function MobileHeader() {
  const navigate = useNavigate(); // Hook to navigate between pages

  const handleMessageClick = () => {
    navigate("/messages"); // Navigate to the message page
  };

  return (
    <header className="lg:hidden top-0 z-50 px-4 py-3 border-b-[1px] border-gray-700 flex items-center justify-between">
      <img src={IGimg} alt="Instagram Logo" className="h-8 mt-1" />
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search"
          className="hidden md:block px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none"
        />
        <button className="text-gray-600 dark:text-gray-300">🔔</button>
        <button
          className="text-gray-600 dark:text-gray-300"
          onClick={handleMessageClick} // Navigate to the messages page
        >
          ✉️
        </button>
      </div>
    </header>
  );
}

export default MobileHeader;
