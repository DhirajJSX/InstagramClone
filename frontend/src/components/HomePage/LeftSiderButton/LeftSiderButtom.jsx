import React, { useState, useEffect, useRef } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

function LeftSiderButtom() {
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);
  const logoutDropdownRef = useRef(null);

  const handleSettingsClick = () => {
    setShowLogout((prev) => !prev); // Toggle the logout menu visibility
  };

  // const handleAiStudioClick = () => {
  //   setShowLogout(false); // Close logout menu on Ai Studio click
  //   navigate("/ai-studio"); // Navigate to Ai Studio page
  // };

  const handleLogout = () => {
    setShowLogout(false);
    localStorage.clear();
    window.history.replaceState(null, "", "/"); 
    navigate("/");
  };

  useEffect(() => {
    if (showLogout) {
      gsap.fromTo(
        logoutDropdownRef.current,
        { opacity: 0, y: -30, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.7)" }
      );
    // } else {
    //   // Scale and slide out
    //   gsap.to(logoutDropdownRef.current, {
    //     opacity: 0,
    //     y: -30,
    //     scale: 0.8,
    //     duration: 0.3,
    //     ease: "power3.in",
    //   });
    }
  }, [showLogout]); 

  return (
    <div className="left-sidebar">
      <ul className="flex-grow overflow-y-auto">
        <li
          onClick={handleSettingsClick}
          className="flex items-center space-x-3 p-2 my-1 rounded-md hover:bg-[#1A1A1A] hover:text-white transition-all duration-300 ease-out cursor-pointer"
        >
          <SettingsIcon style={{ fontSize: "24px" }} />
          <p className="text-sm truncate">Settings</p>
        </li>
        {showLogout && (
          <div
            ref={logoutDropdownRef}
            className="logout-dropdown text-[12px] px-1 mt-2"
          >
            <ul className="bg-[#2c2c2c] text-white rounded-lg shadow-lg border border-[#444444]">
              <li className="p-2 cursor-pointer hover:bg-[#444444] transition-all duration-300 rounded-t-lg">
                Settings
              </li>
              <li
                onClick={handleLogout}
                className="p-2 cursor-pointer hover:bg-red-600 transition-all duration-300 rounded-b-lg"
              >
                Logout
              </li>
            </ul>
          </div>
        )}
        <li
          className="flex items-center space-x-3 p-2 my-1 rounded-md hover:bg-[#1A1A1A] hover:text-white transition-all duration-300 ease-out cursor-pointer"
        >
          <AutoFixHighIcon style={{ fontSize: "24px" }} />
          <p className="text-sm truncate">Ai Studio</p>
        </li>
      </ul>
    </div>
  );
}

export default LeftSiderButtom;
