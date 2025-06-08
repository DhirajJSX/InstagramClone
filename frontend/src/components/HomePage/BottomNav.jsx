import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import SearchIcon from "@mui/icons-material/Search";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import ProfileIcon from "@mui/icons-material/PersonOutlineOutlined";
import UserMediaUpload from "../UserUpload/UserMediaUpload";

function BottomNav() {
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [rotateCreateIcon, setRotateCreateIcon] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: "/home", icon: HomeOutlinedIcon, label: "Home" },
    { path: "/search", icon: SearchIcon, label: "Search" },
    { path: "create", icon: AddBoxRoundedIcon, label: "Create" },
    { path: "/notification", icon: FavoriteBorderRoundedIcon, label: "Notifications" },
    { path: "/profile", icon: ProfileIcon, label: "Profile" },
  ];

  const handleClick = (path) => {
    if (path === "create") {
      setRotateCreateIcon(true);
      setTimeout(() => {
        setRotateCreateIcon(false);
        setIsMediaModalOpen(true);
      }, 500); // Rotation duration
    } else {
      navigate(path);
    }
  };

  return (
    <>
      <nav className="fixed bottom-0 w-full bg-gradient-to-br from-black via-[#0e0e0e] to-[#1a1a1a] border-t border-white/10 shadow-[0_-2px_10px_rgba(255,255,255,0.05)] flex justify-around items-center px-2 py-2 lg:hidden z-50">
        {navItems.map(({ path, icon: IconComponent, label }) => {
          const isActive = location.pathname === path;
          const isCreate = path === "create";

          return (
            <button
              key={label}
              onClick={() => handleClick(path)}
              className="group flex flex-col items-center justify-center transition-all duration-200"
            >
              <div
                className={`rounded-full p-3 transition-all duration-300
                  ${isActive
                    ? "bg-white/10 drop-shadow-[0_0_8px_rgba(255,0,115,0.7)] text-pink-500"
                    : "text-white group-hover:text-pink-400"}`}
              >
                {isCreate ? (
                  <motion.div
                    animate={rotateCreateIcon ? { rotate: 360 } : {}}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="flex items-center justify-center"
                  >
                    <IconComponent style={{ fontSize: "30px" }} />
                  </motion.div>
                ) : (
                  <IconComponent style={{ fontSize: "30px" }} />
                )}
              </div>
            </button>
          );
        })}
      </nav>

      {isMediaModalOpen && (
        <UserMediaUpload closeModal={() => setIsMediaModalOpen(false)} />
      )}
    </>
  );
}

export default BottomNav;
