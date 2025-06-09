import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";

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
      }, 500);
    } else {
      navigate(path);
    }
  };

  return (
    <>
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[95%] bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl shadow-[0_5px_30px_rgba(255,255,255,0.08)] flex justify-around items-center  py-1 lg:hidden ">
        {navItems.map(({ path, icon: IconComponent, label }) => {
          const isActive = location.pathname === path;
          const isCreate = path === "create";

          const x = useMotionValue(0);
          const y = useMotionValue(0);
          const springX = useSpring(x, { stiffness: 300, damping: 20 });
          const springY = useSpring(y, { stiffness: 300, damping: 20 });

          const handleMouseMove = (e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const mouseX = e.clientX - rect.left - rect.width / 2;
            const mouseY = e.clientY - rect.top - rect.height / 2;
            x.set(mouseX * 0.3);
            y.set(mouseY * 0.3);
          };

          const handleMouseLeave = () => {
            x.set(0);
            y.set(0);
          };

          return (
            <motion.button
              key={label}
              onClick={() => handleClick(path)}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative flex flex-col items-center justify-center focus:outline-none"
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                style={{ x: springX, y: springY }}
                animate={isCreate && rotateCreateIcon ? {  scale: [1, 1, 1] } : {}}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className={`rounded-full p-3 flex items-center justify-center transition-all duration-300 ${
                  isActive
                    ? "bg-white/10 "
                    : "text-white"
                }`}
              >
                <IconComponent style={{ fontSize: isCreate ? 34 : 28 }} />
              </motion.div>
            </motion.button>
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
