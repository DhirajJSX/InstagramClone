import React, { useState } from "react";
import { motion } from "framer-motion";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import ChevronDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ChevronUpIcon from "@mui/icons-material/ExpandLess";
import SendIcon from "@mui/icons-material/Send";

function UserComment({ comments }) {
  // State to toggle replies visibility
  const [showReplies, setShowReplies] = useState({});

  const toggleReplies = (commentId) => {
    setShowReplies((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
  };

  return (
    <div className="flex flex-col px-4 py-4 bg-white text-black font-Poppins shadow-md rounded-md">
      {/* If there are no comments, display a message */}
      {comments.length === 0 ? (
        <div className="text-center text-gray-500 font-semibold">
          There are no comments in this post.
        </div>
      ) : (
        comments.map((comment) => (
          <div key={comment._id} className="flex flex-col mb-3">
            {/* User Information and Comment */}
            <div className="flex items-start gap-4 sm:gap-3 mb-3">
              <img
                src="https://andrewstuder.com/wp-content/uploads/2020/04/AF3I3830-scaled.jpg"
                alt="User Avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <p className="text-sm sm:text-base">
                  <span className="font-bold hover:underline cursor-pointer">
                    {comment.postedBy.name}
                  </span>
                  <span className="ml-1">{comment.comment}</span>
                </p>
                <div className="flex gap-4 items-center mt-2 text-xs sm:text-sm text-gray-600">
                  <motion.button whileTap={{ scale: 1.1 }}>
                    <FavoriteBorderIcon style={{ fontSize: "20px" }} />
                    <span className="px-1">Likes</span>
                  </motion.button>
                  <motion.button whileTap={{ scale: 1.1 }}>
                    <ModeCommentOutlinedIcon style={{ fontSize: "20px" }} />
                    <span className="px-1">Reply</span>
                  </motion.button>
                  <span className="cursor-default">2h</span>
                </div>
              </div>
            </div>

            {/* Static Reply Section */}
            <div
              className="mt-2 pl-8 text-xs text-gray-500 cursor-pointer hover:text-gray-800 flex items-center sm:text-sm"
              onClick={() => toggleReplies(comment._id)}
            >
              <motion.div>
                {showReplies[comment._id] ? (
                  <ChevronUpIcon style={{ fontSize: "18px" }} />
                ) : (
                  <ChevronDownIcon style={{ fontSize: "18px" }} />
                )}
                <span className="ml-1">
                  {showReplies[comment._id] ? "Hide replies" : "View replies (3)"}
                </span>
              </motion.div>
            </div>

            {/* Replies Section */}
            {showReplies[comment._id] && (
              <motion.div
                className="mt-2 pl-10 space-y-3"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
              >
                {/* Map over replies here if available */}
                <div className="flex items-start gap-4 sm:gap-3">
                  <img
                    src="https://andrewstuder.com/wp-content/uploads/2020/04/AF3I3830-scaled.jpg"
                    alt="Reply Avatar"
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm sm:text-base">
                      <span className="font-bold hover:underline cursor-pointer">
                        reply_user
                      </span>
                      <span className="ml-1">This is a reply to the main comment.</span>
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs sm:text-sm text-gray-600">
                      <motion.button whileTap={{ scale: 1.1 }}>
                        <FavoriteBorderIcon style={{ fontSize: "18px" }} />
                        <span className="px-1">Likes</span>
                      </motion.button>
                      <motion.button whileTap={{ scale: 1.1 }}>
                        <ModeCommentOutlinedIcon style={{ fontSize: "18px" }} />
                        <span className="px-1">Reply</span>
                      </motion.button>
                      <span className="cursor-default">2h</span>
                    </div>
                  </div>
                </div>

                {/* Static Reply Input Field */}
                <div className="flex mt-2 pl-10">
                  <textarea
                    className="w-full h-10 resize-none p-2 outline-none border border-gray-300 rounded-md"
                    placeholder="Write a reply..."
                    rows="3"
                    disabled
                  />
                  <div className="flex items-center rounded-md mx-2 py-2 cursor-pointer px-2 bg-blue-600">
                    <button className="text-white outline-none" type="submit" disabled>
                      Send
                    </button>
                    <SendIcon className="ml-2 text-white" style={{ fontSize: "18px" }} />
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default UserComment;
