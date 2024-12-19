import React, { useState, useEffect, useRef } from "react";
import { Instagram } from "react-content-loader";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import ShareIcon from "@mui/icons-material/Share";
import UserComment from "../HomePage/UserComment/UserComment";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";

function MainContent() {
  const [activeCommentIndex, setActiveCommentIndex] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [userId, setUserId] = useState(null);
  const lastTapRef = useRef(null);

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
          new Set(data.filter((post) => post.likes.includes(userId)).map((post) => post._id))
        );
        setLoadingPosts(new Array(data.length).fill(true));
        setTimeout(() => {
          setLoadingPosts(new Array(data.length).fill(false));
        }, 3000);
      })
      .catch(() => {
        setLoadingPosts([]);
      });
  }, [userId]);

  const toggleCommentSection = (idx) => {
    setActiveCommentIndex((prevIndex) => (prevIndex === idx ? null : idx));
  };

  const likepost = (id, post) => {
    const updatedPosts = [...posts];
    const updatedPost = updatedPosts.find((p) => p._id === id);
    updatedPost.likes.push(userId); 
    setPosts(updatedPosts);
    setLikedPosts((prevLikedPosts) => new Set(prevLikedPosts.add(id)));

    fetch("http://localhost:5000/likes", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("JWT"),
      },
      body: JSON.stringify({ postId: id }),
    })
      .then((res) => res.json())
      .then((result) => {})
      .catch((err) => {
        console.error("Error liking the post:", err);
      });
  };

  const unlikepost = (id) => {
    const updatedPosts = [...posts];
    const updatedPost = updatedPosts.find((p) => p._id === id);
    updatedPost.likes = updatedPost.likes.filter((user) => user !== userId);
    setPosts(updatedPosts);
    setLikedPosts((prevLikedPosts) => {
      const updatedLikedPosts = new Set(prevLikedPosts);
      updatedLikedPosts.delete(id);
      return updatedLikedPosts;
    });

    fetch("http://localhost:5000/unlikes", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("JWT"),
      },
      body: JSON.stringify({ postId: id }),
    })
      .then((res) => res.json())
      .then((result) => {})
      .catch((err) => {
        console.error("Error unliking the post:", err);
      });
  };

  const toggleLike = (id, post) => {
    if (likedPosts.has(id)) {
      unlikepost(id);
    } else {
      likepost(id, post);
    }
  };

  const handleDoubleTapOrClick = (postId) => {
    const now = Date.now();
    if (lastTapRef.current && now - lastTapRef.current < 300) {
      toggleLike(postId, posts.find((post) => post._id === postId))
    }
    lastTapRef.current = now;
  };

  return (
    <main className="flex-1 mb-16 max-w-[600px] w-full pb-4 space-y-6">
      {posts.map((post, idx) => (
        <div key={post._id} className="rounded-lg shadow-md overflow-hidden">
          {loadingPosts[idx] ? (
            <div className="w-full">
              <Instagram foregroundColor="#3b3a3a" backgroundColor="#282b29" />
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center px-2.5 py-2">
                <div className="flex justify-center items-center cursor-pointer">
                  <img
                    src="https://img.freepik.com/free-photo/close-up-portrait-young-african-man-with-stubble_171337-1296.jpg"
                    alt="Profile"
                    className="w-9 h-9 object-cover rounded-full shadow-lg"
                  />
                  <div className="ml-3">
                    <p className="text-[15px] font-semibold">
                      {post.postedBy?.userName}
                    </p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">
                      {formatDistanceToNow(new Date(post.createdAt))} ago
                    </p>
                  </div>
                </div>
                <div className="flex justify-center items-center cursor-pointer">
                  <MoreVertIcon style={{ fontSize: "30px" }} />
                </div>
              </div>
              <div className="w-full" onClick={() => handleDoubleTapOrClick(post._id)}>
                <img
                  className="w-full h-auto max-h-[480px] object-cover"
                  src={post.image}
                  alt="Post"
                />
              </div>
              <div className="px-1 mt-1 py-2">
                <div className="flex justify-between items-center">
                  <div className="flex justify-center items-center space-x-4">
                    <motion.button
                      whileTap={{ scale: 1.2 }}
                      onClick={() => toggleLike(post._id, post)}
                    >
                      {likedPosts.has(post._id) ? (
                        <FavoriteIcon style={{ fontSize: "30px", color: "red" }} />
                      ) : (
                        <FavoriteBorderIcon style={{ fontSize: "30px" }} />
                      )}
                    </motion.button>
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
                <div className="mt-2 flex items-center">
                  <span className="mr-1 font-Poppins text-[14px] font-semibold">
                    {post.postedBy.name}
                  </span>
                  <p className="text-[14px] font-Poppins">{post.body}</p>
                </div>
                <p className="text-[13px] text-gray-600 dark:text-gray-300">
                  Liked by {post.likes.length} people
                </p>
              </div>
            </div>
          )}
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
