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
  const [file, setFile] = useState(null);
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

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(URL.createObjectURL(selectedFile)); // Preview the file
    }
  };

  const handleCloseModal = () => {
    setIsMediaModalOpen(false);
    setFile(null); // Clear file on modal close
  };

  return (
    <>
      <ul className="flex-grow">
        <li onClick={homeButton} className="flex items-center space-x-4 p-3 my-0.5 rounded-md hover:bg-[#1A1A1A] hover:text-white transition-all duration-700 ease-out cursor-pointer">
          <span className=" font-normal">
            <HomeIcon style={{ fontSize: "30px", marginBottom: "3px" }} />
          </span>
          <p className="text-[15px]">Home</p>
        </li>
        <li onClick={searchButton} className="flex items-center space-x-4 p-3 my-0.5 rounded-md hover:bg-[#1A1A1A] hover:text-white transition-all duration-700 ease-out cursor-pointer">
          <span className=" font-normal">
            <SearchIcon style={{ fontSize: "30px", marginBottom: "3px" }} />
          </span>
          <p className="text-[15px]">Search</p>
        </li>
        <li onClick={exploreButton} className="flex items-center space-x-4 p-3 my-0.5 rounded-md hover:bg-[#1A1A1A] hover:text-white transition-all duration-700 ease-out cursor-pointer">
          <span className=" font-normal">
            <ExploreOutlinedIcon style={{ fontSize: "30px", marginBottom: "3px" }} />
          </span>
          <p className="text-[15px]">Explore</p>
        </li>
        <li onClick={reelButton} className="flex items-center space-x-4 p-3 my-0.5 rounded-md hover:bg-[#1A1A1A] hover:text-white transition-all duration-700 ease-out cursor-pointer">
          <span className=" font-normal">
            <VideocamOutlinedIcon style={{ fontSize: "30px", marginBottom: "3px" }} />
          </span>
          <p className="text-[15px]">Reels</p>
        </li>
        <li onClick={messageButtonDestop} className="flex items-center space-x-4 p-3 my-0.5 rounded-md hover:bg-[#1A1A1A] hover:text-white transition-all duration-700 ease-out cursor-pointer">
          <span className=" font-normal">
            <MailOutlinedIcon style={{ fontSize: "30px", marginBottom: "3px" }} />
          </span>
          <p className="text-[15px]">Messages</p>
        </li>
        <li onClick={notificationButton} className="flex items-center space-x-4 p-3 my-0.5 rounded-md hover:bg-[#1A1A1A] hover:text-white transition-all duration-700 ease-out cursor-pointer">
          <span className=" font-normal">
            <NotificationsNoneOutlinedIcon style={{ fontSize: "30px", marginBottom: "3px" }} />
          </span>
          <p className="text-[15px]">Notification</p>
        </li>
        <li
          onClick={() => setIsMediaModalOpen(true)} // Open media upload modal
          className="flex items-center space-x-4 p-3 my-0.5 rounded-md hover:bg-[#1A1A1A] hover:text-white transition-all duration-700 ease-out cursor-pointer"
        >
          <span className=" font-normal">
            <AddOutlinedIcon style={{ fontSize: "30px", marginBottom: "3px" }} />
          </span>
          <p className="text-[15px]">Create</p>
        </li>
        <li onClick={ProfileButton} className="flex items-center space-x-4 p-3 my-0.5 rounded-md hover:bg-[#1A1A1A] hover:text-white transition-all duration-700 ease-out cursor-pointer">
          <span className=" font-normal">
            <ProfileIcon style={{ fontSize: "30px", marginBottom: "3px" }} />
          </span>
          <p className="text-[15px]">Profile</p>
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
