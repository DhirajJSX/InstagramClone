import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ProfileIcon from "@mui/icons-material/PersonOutlineOutlined";


import { useNavigate } from "react-router-dom";

function LeftSiderTop() {
  const navigate = useNavigate()

  const messageButton = () => {
    navigate("/messages")
  }
  return (
    <>
      <ul className="flex-grow ">
        <li className="flex items-center space-x-4 p-3 my-0.5  rounded-md hover:bg-[#1A1A1A] hover:text-white transition-all duration-700 ease-out cursor-pointer">
          <span className=" font-normal">
            <HomeIcon style={{ fontSize: "30px", marginBottom: "3px" }} />
          </span>
          <p className="text-[15px]">Home</p>
        </li>
        <li className="flex items-center space-x-4 p-3 my-0.5  rounded-md hover:bg-[#1A1A1A] hover:text-white transition-all duration-700 ease-out cursor-pointer">
          <span className=" font-normal">
            <SearchIcon style={{ fontSize: "30px", marginBottom: "3px" }} />
          </span>
          <p className="text-[15px]">Search</p>
        </li>
        <li className="flex items-center space-x-4 p-3 my-0.5  rounded-md hover:bg-[#1A1A1A] hover:text-white transition-all duration-700 ease-out cursor-pointer">
          <span className=" font-normal">
            <ExploreOutlinedIcon style={{ fontSize: "30px", marginBottom: "3px" }}/>
          </span>
          <p className="text-[15px]">Explore</p>
        </li>
        <li className="flex items-center space-x-4 p-3 my-0.5  rounded-md hover:bg-[#1A1A1A] hover:text-white transition-all duration-700 ease-out cursor-pointer">
          <span className=" font-normal">
            <VideocamOutlinedIcon style={{ fontSize: "30px", marginBottom: "3px" }}/>
          </span>
          <p className="text-[15px]">Reels</p>
        </li>
        <li onClick={messageButton} className="flex items-center space-x-4 p-3 my-0.5  rounded-md hover:bg-[#1A1A1A] hover:text-white transition-all duration-700 ease-out cursor-pointer">
          <span className=" font-normal">
            <MailOutlinedIcon style={{ fontSize: "30px", marginBottom: "3px" }} />
          </span>
          <p className="text-[15px]">Messages</p>
        </li>
        <li className="flex items-center space-x-4 p-3 my-0.5  rounded-md hover:bg-[#1A1A1A] hover:text-white transition-all duration-700 ease-out cursor-pointer">
          <span className=" font-normal">
            <NotificationsNoneOutlinedIcon style={{ fontSize: "30px", marginBottom: "3px" }} />
          </span>
          <p className="text-[15px]">Notification</p>
        </li>
        <li className="flex items-center space-x-4 p-3 my-0.5  rounded-md hover:bg-[#1A1A1A] hover:text-white transition-all duration-700 ease-out cursor-pointer">
          <span className=" font-normal">
            <AddOutlinedIcon style={{ fontSize: "30px", marginBottom: "3px" }} />
          </span>
          <p className="text-[15px]">Create</p>
        </li>
        <li className="flex items-center space-x-4 p-3 my-0.5  rounded-md hover:bg-[#1A1A1A] hover:text-white transition-all duration-700 ease-out cursor-pointer">
          <span className=" font-normal">
            <ProfileIcon  style={{ fontSize: "30px", marginBottom: "3px" }}/>
          </span>
          <p className="text-[15px]">Profile</p>
        </li>
      </ul>
    </>
  );
}

export default LeftSiderTop;
