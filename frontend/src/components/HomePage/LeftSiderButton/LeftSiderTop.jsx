import React, { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ProfileIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useNavigate } from "react-router-dom";
import UserMediaUpload from "./../../UserUpload/UserMediaUpload";

function LeftSiderTop() {
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const navigate = useNavigate();

  const messageButtonDestop = () => {
    navigate("/Messages");
  };

  const ProfileButton = () => {
    navigate("/profile");
  };

  const homeButton = () => {
    navigate("/home");
  };

  const notificationButton = () => {
    navigate("/notification");
  };

  const searchButton = () => {
    navigate("/search");
  };

  const exploreButton = () => {
    navigate("/explore");
  };

  const reelButton = () => {
    navigate("/reels");
  };

  return (
    <>
      <ul className="flex-grow">
        <li
          onClick={homeButton}
          className="flex items-center space-x-3 p-2 my-1 rounded-md hover:bg-[#1A1A1A] hover:text-white transition-all duration-300 ease-out cursor-pointer"
        >
          <HomeIcon style={{ fontSize: "24px" }} />
          <p className="text-sm">Home</p>
        </li>
        <li
          onClick={searchButton}
          className="flex items-center space-x-3 p-2 my-1 rounded-md hover:bg-[#1A1A1A] hover:text-white transition-all duration-300 ease-out cursor-pointer"
        >
          <SearchIcon style={{ fontSize: "24px" }} />
          <p className="text-sm">Search</p>
        </li>
        <li
          onClick={exploreButton}
          className="flex items-center space-x-3 p-2 my-1 rounded-md hover:bg-[#1A1A1A] hover:text-white transition-all duration-300 ease-out cursor-pointer"
        >
          <ExploreOutlinedIcon style={{ fontSize: "24px" }} />
          <p className="text-sm">Explore</p>
        </li>
        {/* <li
          onClick={reelButton}
          className="flex items-center space-x-3 p-2 my-1 rounded-md hover:bg-[#1A1A1A] hover:text-white transition-all duration-300 ease-out cursor-pointer"
        >
          <VideocamOutlinedIcon style={{ fontSize: "24px" }} />
          <p className="text-sm">Reels</p>
        </li> */}
        <li
          onClick={messageButtonDestop}
          className="flex items-center space-x-3 p-2 my-1 rounded-md hover:bg-[#1A1A1A] hover:text-white transition-all duration-300 ease-out cursor-pointer"
        >
          <MailOutlinedIcon style={{ fontSize: "24px" }} />
          <p className="text-sm">Messages</p>
        </li>
        <li
          onClick={notificationButton}
          className="flex items-center space-x-3 p-2 my-1 rounded-md hover:bg-[#1A1A1A] hover:text-white transition-all duration-300 ease-out cursor-pointer"
        >
          <NotificationsNoneOutlinedIcon style={{ fontSize: "24px" }} />
          <p className="text-sm">Notification</p>
        </li>
        <li
          onClick={() => setIsMediaModalOpen(true)}
          className="flex items-center space-x-3 p-2 my-1 rounded-md hover:bg-[#1A1A1A] hover:text-white transition-all duration-300 ease-out cursor-pointer"
        >
          <AddOutlinedIcon style={{ fontSize: "24px" }} />
          <p className="text-sm">Create</p>
        </li>
        <li
          onClick={ProfileButton}
          className="flex items-center space-x-3 p-2 my-1 rounded-md hover:bg-[#1A1A1A] hover:text-white transition-all duration-300 ease-out cursor-pointer"
        >
          <ProfileIcon style={{ fontSize: "24px" }} />
          <p className="text-sm">Profile</p>
        </li>
      </ul>

      {isMediaModalOpen && (
        <UserMediaUpload
          closeModal={() => setIsMediaModalOpen(false)} // Function to close modal
        />
      )}
    </>
  );
}

export default LeftSiderTop;
