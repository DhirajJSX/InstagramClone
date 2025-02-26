import React, { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { gsap } from "gsap";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

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
    navigate
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


   
    fetch("https://instagramclone-djuv.onrender.com/profile", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("JWT"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserInfo(data.user);
        setProfile(data.profile);
        console.log(data);
       
      })
      .catch((err) => {
       
      });
  }, []);

  return (
    <div className="w-full bg-black max-w-5xl px-4 py-2 flex items-center justify-between border-b border-gray-600 sticky top-0 z-10 lg:hidden">
      <div className="flex justify-start items-center ml-2 sm:ml-4">
        <button className="flex items-center text-white text-lg sm:text-xl md:text-2xl">
          <LockOutlinedIcon
            className="mx-1 mt-1"
            style={{ color: "white", fontSize: "18px" }}
          />
          <span className="mt-1 text-lg sm:text-xl md:text-2xl">
          {userInfo?.userName} 
          </span>
        </button>
      </div>

      <button
        onClick={hamburgerButtonHandle}
        className="text-white text-xl p-2 sm:p-3"
        aria-label="Open menu"
      >
        <MenuIcon />
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
              <div className="flex items-center justify-start w-full">
                <AddIcon
                  className="bg-[#3b3b3b] rounded-full text-white mr-3"
                  fontSize="large"
                />
                <button
                  onClick={handleAddAccountClick}
                  className="text-white text-[13px] sm:text-[15px] font-medium w-full text-left rounded-md transition-all duration-200"
                  aria-label="Add Instagram account"
                >
                  Add Instagram account
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

export default Mobilelogout;
