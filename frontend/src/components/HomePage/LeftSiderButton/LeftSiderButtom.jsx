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
    setShowLogout((prev) => !prev); // Toggle dropdown
  };

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
        { opacity: 0, y: -20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.7)" }
      );
    } else if (logoutDropdownRef.current) {
      gsap.to(logoutDropdownRef.current, {
        opacity: 0,
        y: -20,
        scale: 0.9,
        duration: 0.3,
        ease: "power3.in",
      });
    }
  }, [showLogout]);

  return (
    <div className="left-sidebar mt-auto">
      <ul className="flex flex-col space-y-3 overflow-y-auto">
        <li
          onClick={handleSettingsClick}
          className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors duration-300
            hover:bg-gradient-to-r hover:from-pink-600 hover:to-purple-600 hover:text-white
            select-none"
          aria-haspopup="true"
          aria-expanded={showLogout}
        >
          <SettingsIcon style={{ fontSize: 26 }} />
          <p className="text-sm font-semibold">Settings</p>
        </li>

        {/* Dropdown */}
        {showLogout && (
          <div
            ref={logoutDropdownRef}
              className="w-full bg-[#2c2c2c] rounded-lg shadow-lg border border-[#444444]"
            role="menu"
            aria-label="Settings dropdown"
          >
            <ul>
              <li
                className="px-4 py-2 cursor-pointer hover:bg-[#444444] text-gray-300 select-none rounded-t-lg"
                onClick={() => navigate("/settings")}
              >
                Account Settings
              </li>
              <li
                onClick={handleLogout}
                className="px-4 py-2 cursor-pointer hover:bg-red-600 hover:text-white text-red-400 select-none rounded-b-lg"
              >
                Logout
              </li>
            </ul>
          </div>
        )}

        <li
          onClick={() => navigate("/ai-studio")}
          className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors duration-300
            hover:bg-gradient-to-r hover:from-pink-600 hover:to-purple-600 hover:text-white
            select-none"
        >
          <AutoFixHighIcon style={{ fontSize: 26 }} />
          <p className="text-sm font-semibold truncate">Ai Studio</p>
        </li>
      </ul>
    </div>
  );
}

export default LeftSiderButtom;
