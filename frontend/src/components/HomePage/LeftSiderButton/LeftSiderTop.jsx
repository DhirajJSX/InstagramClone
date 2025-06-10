import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ProfileIcon from "@mui/icons-material/PersonOutlineOutlined";
import UserMediaUpload from "./../../UserUpload/UserMediaUpload";

function LeftSiderTop() {
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: "/home", icon: <HomeIcon fontSize="medium" />, label: "Home" },
    { path: "/search", icon: <SearchIcon fontSize="medium" />, label: "Search" },
    { path: "/explore", icon: <ExploreOutlinedIcon fontSize="medium" />, label: "Explore" },
    { path: "/Messages", icon: <MailOutlinedIcon fontSize="medium" />, label: "Messages" },
    { path: "/notification", icon: <NotificationsNoneOutlinedIcon fontSize="medium" />, label: "Notification" },
    { path: "create", icon: <AddOutlinedIcon fontSize="medium" />, label: "Create" },
    { path: "/profile", icon: <ProfileIcon fontSize="medium" />, label: "Profile" },
  ];

  const handleClick = (path) => {
    if (path === "create") {
      setIsMediaModalOpen(true);
    } else {
      navigate(path);
    }
  };

  return (
    <>
      <ul className="flex-grow space-y-2">
        {menuItems.map(({ path, icon, label }) => {
          const isActive = location.pathname === path;

          return (
            <li
              key={label}
              onClick={() => handleClick(path)}
              className={`flex items-center space-x-4 p-3 rounded-xl cursor-pointer transition-all duration-300 select-none
                ${
                  isActive
                    ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold shadow-lg"
                    : "hover:bg-[#1A1A1A] hover:text-white text-gray-300"
                }`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && handleClick(path)}
            >
              <div className={`${isActive ? "text-white" : "text-gray-300"}`}>{icon}</div>
              <p className="text-sm">{label}</p>
            </li>
          );
        })}
      </ul>

      {isMediaModalOpen && <UserMediaUpload closeModal={() => setIsMediaModalOpen(false)} />}
    </>
  );
}

export default LeftSiderTop;
