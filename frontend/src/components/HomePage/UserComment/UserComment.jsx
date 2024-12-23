import React, { useState } from "react";
import { motion } from "framer-motion";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import ChevronDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ChevronUpIcon from "@mui/icons-material/ExpandLess";
import SendIcon from "@mui/icons-material/Send";
import { formatDistanceToNow } from "date-fns";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DeleletComment from "./deleteCommentButton/DeleletComment";  // Import the delete confirmation component

function UserComment({ comments }) {
  const [showReplies, setShowReplies] = useState({});
  const [replyText, setReplyText] = useState("");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const toggleReplies = (commentId) => {
    setShowReplies((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
  };

  const handleReplyChange = (e) => {
    setReplyText(e.target.value);
  };

  const handleReplySubmit = (commentId) => {
    console.log(`Reply to comment ${commentId}:`, replyText);
    setReplyText("");
  };

  const handleDeleteClick = (commentId) => {
    setShowDeleteConfirmation(true);
    setCommentToDelete(commentId);
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirmation(false);
  };

  const handleDeleteConfirm = () => {
    
    // You can add the actual delete logic here
    setShowDeleteConfirmation(false);
  };

  if (!comments) return null;

  if (comments.length === 0) {
    return (
      <div className="text-gray-400 font-Poppins text-sm text-center">
        Add a comment on this post
      </div>
    );
  }

  return (
    <div className="flex flex-col px-2 py-4 bg-white text-black font-Poppins shadow-md rounded-md md:px-4">
      {showDeleteConfirmation && (
        <DeleletComment
          onCancel={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
        />
      )}

      {comments.map((comment) => (
        <div key={comment._id} className="flex flex-col mb-4 pb-2">
          <div className="flex items-start gap-3">
            <img
              src="https://andrewstuder.com/wp-content/uploads/2020/04/AF3I3830-scaled.jpg"
              alt="User Avatar"
              className="w-10 h-10 rounded-full object-cover md:w-12 md:h-12"
            />
            <div className="flex flex-col w-full">
              <p className="text-sm md:text-base">
                <span className="font-bold hover:underline cursor-pointer">
                  {comment.postedBy.name}
                </span>
                <span className="ml-1">{comment.comment}</span>
              </p>
              <div className="flex gap-2 items-center mt-2 text-xs text-gray-600 md:text-sm">
                <motion.button whileTap={{ scale: 1.1 }}>
                  <FavoriteBorderIcon style={{ fontSize: "16px" }} />
                  <span className="px-1">Likes</span>
                </motion.button>
                <motion.button whileTap={{ scale: 1.1 }}>
                  <ModeCommentOutlinedIcon style={{ fontSize: "16px" }} />
                  <span className="px-1">Reply</span>
                </motion.button>
                <motion.button
                  onClick={() => handleDeleteClick(comment._id)}
                  whileTap={{ scale: 1.1 }}
                >
                  <DeleteOutlineIcon style={{ fontSize: "16px" }} />
                  <span className="px-1">Delete</span>
                </motion.button>
                <span className="text-[11px]">
                  {formatDistanceToNow(new Date(comment.updatedAt))} ago
                </span>
              </div>
            </div>
          </div>

          <div
            className="mt-2 pl-8 text-xs text-gray-500 hover:text-gray-800 flex items-center cursor-pointer md:text-sm"
            onClick={() => toggleReplies(comment._id)}
          >
            <motion.div>
              {showReplies[comment._id] ? (
                <ChevronUpIcon style={{ fontSize: "16px" }} />
              ) : (
                <ChevronDownIcon style={{ fontSize: "16px" }} />
              )}
              <span className="ml-1">
                {showReplies[comment._id]
                  ? `Hide replies`
                  : `View replies (${comment.replies?.length || 0})`}
              </span>
            </motion.div>
          </div>

          {showReplies[comment._id] && (
            <motion.div
              className="mt-2 pl-10 space-y-3"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.4 }}
            >
              {comment.replies?.map((reply, index) => (
                <div key={index} className="flex items-start gap-3">
                  <img
                    src="https://andrewstuder.com/wp-content/uploads/2020/04/AF3I3830-scaled.jpg"
                    alt="Reply Avatar"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm">
                      <span className="font-bold hover:underline cursor-pointer">
                        {reply.userName}
                      </span>
                      <span className="ml-1">{reply.text}</span>
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-600">
                      <motion.button whileTap={{ scale: 1.1 }}>
                        <FavoriteBorderIcon style={{ fontSize: "16px" }} />
                        <span className="px-1">Likes</span>
                      </motion.button>
                      <span className="cursor-default">
                        {formatDistanceToNow(new Date(reply.updatedAt))} ago
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex mt-2">
                <textarea
                  className="w-full h-10 resize-none p-2 border border-gray-300 rounded-md"
                  placeholder="Write a reply..."
                  rows="2"
                  value={replyText}
                  onChange={handleReplyChange}
                />
                <button
                  className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md"
                  onClick={() => handleReplySubmit(comment._id)}
                  disabled={!replyText.trim()}
                >
                  <SendIcon />
                </button>
              </div>
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
}

export default UserComment;
