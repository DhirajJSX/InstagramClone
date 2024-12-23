import React, { useState, useEffect } from "react";
import { Instagram } from "react-content-loader";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import ShareIcon from "@mui/icons-material/Share";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";
import UserComment from "../HomePage/UserComment/UserComment";
import SendIcon from "@mui/icons-material/Send";

function MainContent() {
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [userId, setUserId] = useState(null);
  const [openComment, setOpenComment] = useState(null);
  const [openInput, setOpenInput] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [postComments, setPostComments] = useState({}); 

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUserId(user?._id);
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/allposts")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        return response.json();
      })
      .then((data) => {
        setPosts(data);
        setLikedPosts(
          new Set(
            data
              .filter((post) => post.likes.includes(userId))
              .map((post) => post._id)
          )
        );
        setLoadingPosts(new Array(data.length).fill(true));
        setTimeout(() => {
          setLoadingPosts(new Array(data.length).fill(false));
        }, 1000);
      })
      .catch(() => {
        setLoadingPosts([]);
      });
  }, [userId]);

  const toggleLike = (id) => {
    const isLiked = likedPosts.has(id);
    if (isLiked) {
      unlikePost(id);
    } else {
      likePost(id);
    }
  };

  const likePost = (id) => {
    setLikedPosts((prevLikedPosts) => new Set(prevLikedPosts.add(id)));
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === id ? { ...post, likes: [...post.likes, userId] } : post
      )
    );
    fetch("http://localhost:5000/likes", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("JWT"),
      },
      body: JSON.stringify({ postId: id }),
    });
  };

  const unlikePost = (id) => {
    setLikedPosts((prevLikedPosts) => {
      const updated = new Set(prevLikedPosts);
      updated.delete(id);
      return updated;
    });
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === id
          ? { ...post, likes: post.likes.filter((user) => user !== userId) }
          : post
      )
    );
    fetch("http://localhost:5000/unlikes", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("JWT"),
      },
      body: JSON.stringify({ postId: id }),
    });
  };

  const toggleComment = (id) => {
    setOpenComment((prevId) => (prevId === id ? null : id));
    setOpenInput((prevId) => (prevId === id ? null : id));
  };

  const makeComment = (text, id) => {
    if (!text) return; // Prevent empty comments
    fetch("http://localhost:5000/comment", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("JWT"),
      },
      body: JSON.stringify({
        text: inputValue,
        postId: id,
      }),
    })
    
      .then((res) => res.json())
      .then((data) => {
        setPostComments((prev) => ({
          ...prev,
          [id]: data.result.comments,
        }));
        setInputValue("");
      })
      .catch((err) => console.error(err));
  };

  return (
    <main className="flex-1 mb-16 max-w-[600px] w-full pb-4">
      {posts.map((post, idx) => (
        <div key={post._id} className="rounded-lg shadow-md overflow-hidden">
          {loadingPosts[idx] ? (
            <div className="w-full">
              <Instagram foregroundColor="#3b3a3a" backgroundColor="#282b29" />
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center px-2.5 py-2">
                <div className="flex items-center cursor-pointer">
                  <img
                    src="https://andrewstuder.com/wp-content/uploads/2020/04/AF3I3830-scaled.jpg"
                    alt="Profile"
                    className="w-9 h-9 rounded-full"
                  />
                  <div className="ml-3">
                    <p className="text-[15px] font-semibold">
                      {post.postedBy?.userName}
                    </p>
                    <p className="text-[11px] text-gray-500">
                      {formatDistanceToNow(new Date(post.createdAt))} ago
                    </p>
                  </div>
                </div>
                <MoreVertIcon style={{ fontSize: "30px" }} />
              </div>
              <div className="w-full">
                <img
                  src={post.image}
                  alt="Post"
                  className="w-full h-auto max-h-[480px] object-cover"
                  onDoubleClick={() => toggleLike(post._id)}
                />
              </div>
              <div className="px-3 py-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <motion.button
                      whileTap={{ scale: 1.1 }}
                      onClick={() => toggleLike(post._id)}
                    >
                      {likedPosts.has(post._id) ? (
                        <FavoriteIcon
                          style={{ fontSize: "30px", color: "red" }}
                        />
                      ) : (
                        <FavoriteBorderIcon style={{ fontSize: "30px" }} />
                      )}
                      <span className="pl-1 text-[14px]">Like</span>
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 1.1 }}
                      onClick={() => toggleComment(post._id)}
                    >
                      <ModeCommentOutlinedIcon
                        style={{ fontSize: "30px" }}
                        className="cursor-pointer"
                      />
                      <span className="pl-1 text-[14px]">Comments</span>
                    </motion.button>
                  </div>
                  <ShareIcon style={{ fontSize: "30px" }} />
                </div>
                <div>
                  <div className="mt-2 flex items-center">
                    <span className="mr-1 font-Poppins text-[14px] font-semibold">
                      {post.postedBy.name}
                    </span>
                    <p className="text-[14px] font-Poppins">{post.body}</p>
                  </div>
                  <p className="text-[13px]">
                    Liked by {post.likes.length} people
                  </p>
                </div>

                {openComment === post._id && (
                  <motion.div
                    initial={{ opacity: 0, y: 1 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                    className=" mt-1"
                  >
                    <UserComment comments={postComments[post._id] || []} />

                    {openInput === post._id && (
                      <div className="flex justify-between mt-2">
                        <textarea
                          className="w-full h-10 px-5 py-2 bg-[#1A1A1A] text-white outline-none rounded-md resize-none"
                          placeholder="Write a comment..."
                          rows="3"
                          onChange={(e) => setInputValue(e.target.value)}
                          value={inputValue}
                        />
                        <div className="flex items-center  rounded-md mx-2 py-2 cursor-pointer  px-2   bg-blue-600">
                          <button
                            className="text-white outline-none"
                            onClick={() => makeComment(inputValue, post._id)}
                          >
                            Send
                          </button>
                          <SendIcon
                            className="ml-2"
                            style={{ fontSize: "18px" }}
                          />
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </main>
  );
}

export default MainContent;
