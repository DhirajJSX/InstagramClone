import React, { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import ProfileIcon from '@mui/icons-material/PersonOutlineOutlined';
import { useNavigate } from "react-router-dom";
import UserMediaUpload from "../UserUpload/UserMediaUpload"; // Import UserMediaUpload

function BottomNav() {
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false); // State to control modal visibility
  const navigate = useNavigate();

  // Navigate functions
  const ProfileButton = () => navigate("/profile");
  const searchButton = () => navigate("/search");
  const notificationButton = () => navigate("/notification");
  const homeButton = () => navigate("/home");

  return (
    <>
      <nav className="fixed bottom-0 w-full bg-black border-t border-gray-300 dark:border-gray-700 flex justify-around items-center pt-1 pb-2 lg:hidden">
        <button onClick={homeButton} className="p-2">
          <HomeOutlinedIcon style={{ fontSize: "30px" }} />
        </button>
        <button onClick={searchButton} className="p-2">
          <SearchIcon style={{ fontSize: "30px" }} />
        </button>
        <button
          onClick={() => setIsMediaModalOpen(true)} // Open modal on click
          className="p-2"
        >
          <AddBoxRoundedIcon style={{ fontSize: "30px" }} />
        </button>
        <button onClick={notificationButton} className="p-2">
          <FavoriteBorderRoundedIcon style={{ fontSize: "30px" }} />
        </button>
        <button onClick={ProfileButton} className="p-2">
          <ProfileIcon style={{ fontSize: "30px" }} />
        </button>
      </nav>

      {/* Conditionally render UserMediaUpload modal */}
      {isMediaModalOpen && (
        <UserMediaUpload
          closeModal={() => setIsMediaModalOpen(false)} // Function to close modal
        />
      )}
    </>
  );
}

export default BottomNav;
