import React from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const MobileComments = () => {
  return (
    <div className="w-full h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center px-4 py-2 border-b border-gray-700">
        <button>
          <ArrowBackIosNewIcon style={{ fontSize: "20px", color: "white" }} />
        </button>
        <h1 className="text-lg font-semibold ml-4">Comments</h1>
      </div>

      {/* Scrollable Comments */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        {/* Single Comment */}
        {Array(10)
          .fill(null)
          .map((_, idx) => (
            <div key={idx} className="flex items-start">
              <img
                src="https://via.placeholder.com/40"
                alt="User"
                className="w-9 h-9 rounded-full mr-3"
              />
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-semibold">user_{idx + 1}</span>{" "}
                  This is a sample comment with some emojis! 🔥🔥🔥
                </p>
                <div className="text-gray-500 text-xs mt-1 flex gap-4">
                  <span>2h</span>
                  <button className="font-semibold">Reply</button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Sticky Input Box */}
      <div className="flex items-center px-4 py-2 border-t border-gray-700 bg-black">
        <input
          type="text"
          placeholder="Add a comment..."
          className="flex-grow bg-transparent outline-none text-sm placeholder-gray-500 px-2"
        />
        <button className="text-blue-500 font-semibold text-sm hover:text-blue-400">
          Post
        </button>
      </div>
    </div>
  );
};

export default MobileComments;
