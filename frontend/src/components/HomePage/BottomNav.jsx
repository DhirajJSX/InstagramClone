import React, { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import ProfileIcon from '@mui/icons-material/PersonOutlineOutlined';
import { useNavigate } from "react-router-dom";

function BottomNav() {
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const ProfileButton = () => {
    navigate("/profile");
  };

  const searchButton = () => {
    navigate("/search");
  };

  const notificationButton = () => {
    navigate("/notification");
  };

  const homeButton = () => {
    navigate("/home");
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
      <nav className="fixed bottom-0 w-full bg-black border-t border-gray-300 dark:border-gray-700 flex justify-around items-center pt-1 pb-2 lg:hidden z-50">
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

      {/* Media Upload Modal */}
      {isMediaModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-80">
            <h2 className="text-center text-xl font-semibold mb-4">Upload Media</h2>
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="block w-full mb-4"
            />
            {file && (
              <div className="flex justify-center mb-4">
                {file.includes("video") ? (
                  <video
                    src={file}
                    controls
                    className="w-full max-w-xs rounded-md"
                    alt="Preview"
                  />
                ) : (
                  <img
                    src={file}
                    alt="Preview"
                    className="w-full max-w-xs rounded-md"
                  />
                )}
              </div>
            )}
            <div className="flex justify-between">
              <button
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-full hover:bg-gray-400"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600">
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default BottomNav;
