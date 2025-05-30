import React, { useState, useEffect } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";

function DesktopLogout() {
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);

  const hamburgerButtonHandle = () => {
    setShowLogout(!showLogout);
  };

  const touchAnyWhere = () => {
    setShowLogout(false);
  };

  const handleLogout = () => {
    setShowLogout(false);
    localStorage.clear();
    window.history.replaceState(null, "", "/");
    navigate("/");
  };

  const handleSettingsClick = () => {
    setShowLogout(false);
    navigate("/settings");
  };

  const handleAiStudioClick = () => {
    setShowLogout(false);
    navigate("/ai-studio");
  };

  useEffect(() => {
    if (showLogout) {
      gsap.fromTo(
        ".logout-button",
        { y: "100%", opacity: 0, scale: 0.5 },
        { y: "0%", opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" }
      );
    } else {
      gsap.to(".logout-button", {
        y: "100%",
        opacity: 0,
        scale: 0.5,
        duration: 0.6,
        ease: "power3.in",
      });
    }
  }, [showLogout]);

  return (
    <div className="w-full bg-black max-w-5xl px-4 py-2 flex items-center justify-between border-b border-gray-600 sticky top-0 z-10">
      <button
        onClick={hamburgerButtonHandle}
        className="text-white text-xl p-2 sm:p-3"
        aria-label="Open menu"
      >
        <span className="text-2xl">☰</span>
      </button>

      {showLogout && (
        <div
          onClick={touchAnyWhere}
          className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-40"
          aria-label="Close menu"
        />
      )}

      {showLogout && (
        <div className="logout-button fixed bottom-0 mx-1.5 mb-2 left-0 right-0 bg-[#262626] text-white rounded-[5px] shadow-xl z-50">
          <div className="flex flex-col items-center justify-center mx-4 sm:mx-6 md:mx-8 py-5 sm:p-8">
            <div className="flex flex-col items-center justify-between bg-[#333333] w-full p-2 sm:p-6 rounded-md shadow-md">
              <div className="flex items-center justify-start w-full p-2">
                <SettingsIcon
                  className="bg-[#3b3b3b] rounded-full text-white mr-3"
                  style={{ fontSize: "30px" }}
                />
                <button
                  onClick={handleSettingsClick}
                  className="text-white text-[15px] sm:text-[15px] font-medium w-full text-left rounded-md transition-all duration-200"
                  aria-label="Settings"
                >
                  Settings
                </button>
              </div>

              <div className="flex items-center justify-start w-full p-2 mt-4">
                <AutoFixHighIcon
                  className="bg-[#3b3b3b] rounded-full text-white mr-3"
                  style={{ fontSize: "30px" }}
                />
                <button
                  onClick={handleAiStudioClick}
                  className="text-white text-[15px] sm:text-[15px] font-medium w-full text-left rounded-md transition-all duration-200"
                  aria-label="Ai Studio"
                >
                  Ai Studio
                </button>
              </div>

              <div className="w-full flex justify-center mt-4">
                <button
                  onClick={handleLogout}
                  className="w-full px-6 py-3 bg-red-600 text-sm sm:text-lg font-medium rounded-md shadow-lg hover:bg-red-700 transition-all duration-200"
                  aria-label="Logout"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DesktopLogout;
