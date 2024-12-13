import React, { useState } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import ShareIcon from '@mui/icons-material/Share';
import UserComment from "../HomePage/UserComment/UserComment";

function MainContent() {
  const [activeCommentIndex, setActiveCommentIndex] = useState(null); // Track the active post

  const toggleCommentSection = (idx) => {
    setActiveCommentIndex((prevIndex) => (prevIndex === idx ? null : idx)); // Toggle logic
  };

  return (
    <main className="flex-1 mb-16 max-w-[600px] w-full pb-4 space-y-6">
      {Array(5)
        .fill(null)
        .map((_, idx) => (
          <div key={idx} className="rounded-lg shadow-md overflow-hidden">
            {/* Post Header */}
            <div className="flex justify-between items-center px-2.5 py-2">
              <div className="flex justify-center items-center cursor-pointer">
                <img
                  src="https://img.freepik.com/free-photo/close-up-portrait-young-african-man-with-stubble_171337-1296.jpg"
                  alt="Profile"
                  className="w-9 h-9 object-cover rounded-full shadow-lg"
                />
                <div className="ml-3">
                  <p className="font-semibold text-gray-700 dark:text-gray-300">
                    User {idx + 1}
                  </p>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400">
                    2 hours ago
                  </p>
                </div>
              </div>
              <div className="flex justify-center items-center cursor-pointer">
                <MoreVertIcon style={{ fontSize: "30px" }} />
              </div>
            </div>

            {/* Post Image */}
            <div className="w-full">
              <img
                className="w-full h-auto max-h-[550px] object-cover"
                src="https://img.freepik.com/free-photo/close-up-portrait-young-african-man-with-stubble_171337-1296.jpg"
                alt="Image"
              />
            </div>

            {/* Post Actions */}
            <div className="px-4 mt-1 py-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <button>
                    <FavoriteBorderRoundedIcon style={{ fontSize: "30px" }} />
                  </button>
                  <button onClick={() => toggleCommentSection(idx)}>
                    <ModeCommentOutlinedIcon style={{ fontSize: "30px" }} />
                  </button>
                </div>
                <div className="flex justify-center items-center px-2">
                  <button>
                    <ShareIcon style={{ fontSize: "30px" }} />
                  </button>
                </div>
              </div>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Liked by 120 people
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                View all 10 comments
              </p>
            </div>

            {/* Comment Section */}
            {activeCommentIndex === idx && (
              <div className="mt-2 px-4">
                <UserComment /> 
              </div>
            )}
          </div>
        ))}
    </main>
  );
}

export default MainContent;
