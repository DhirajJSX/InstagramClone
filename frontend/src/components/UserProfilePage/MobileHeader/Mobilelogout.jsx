import React, { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../utils/config";

function Mobilelogout() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
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

  const handleAddAccountClick = () => {
    setShowLogout(false);
    navigate("/");
  };

  useEffect(() => {
    if (showLogout) {
      gsap.fromTo(
        ".logout-button",
        { y: "100%", opacity: 0, scale: 0.5 },
        { y: "0%", opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" }
      );
    }

    fetch(`${BASE_URL}/profile`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("JWT"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserInfo(data.user);
      })
      .catch((err) => {
        console.error("Error fetching user profile", err);
      });
  }, []);

  return (
    <div className="w-full bg-black max-w-5xl px-4 py-2 flex items-center justify-between border-b border-gray-600 sticky top-0 z-10 lg:hidden">
      {/* User Info */}
      <div className="flex justify-start items-center ml-2 sm:ml-4">
        <button className="flex items-center text-white text-lg sm:text-xl md:text-2xl">
          <LockOutlinedIcon className="mx-1 mt-1" style={{ fontSize: "18px" }} />
          <span className="mt-1">{userInfo?.userName || "User"}</span>
        </button>
      </div>

      {/* Menu Icon */}
      <button
        onClick={hamburgerButtonHandle}
        className="text-white text-xl p-2 sm:p-3"
        aria-label="Open menu"
      >
        <MenuIcon />
      </button>

      {/* Overlay */}
      {showLogout && (
        <div
          onClick={touchAnyWhere}
          className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-40"
        />
      )}

      {/* Logout Modal */}
      {showLogout && (
        <div className="logout-button fixed bottom-0 mx-2 mb-3 left-0 right-0 bg-[#262626] text-white rounded-md shadow-xl z-50">
          <div className="flex flex-col gap-4 p-4">
            <button
              onClick={handleAddAccountClick}
              className="w-full flex items-center gap-3 p-3 rounded-md hover:bg-[#333] transition"
            >
              <AddIcon />
              <span>Add Account</span>
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 p-3 rounded-md hover:bg-[#333] transition text-red-400"
            >
              <LogoutIcon />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Mobilelogout;
