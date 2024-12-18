import React, { useState, useEffect } from "react";
import LeftSidebar from "../HomePage/LeftSidebar";
import BottomNav from "../HomePage/BottomNav";

function UserExplorePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch posts from the backend when the component mounts
  useEffect(() => {
    fetch("http://localhost:5000/allposts")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        return response.json();
      })
      .then((data) => {
        // Shuffle the array to get random posts and limit the number of posts
        const shuffledPosts = data.sort(() => 0.5 - Math.random()).slice(0, 9); // Show 9 random posts
        setPosts(shuffledPosts); // Use shuffled posts
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-row bg-black">
      {/* Sidebar */}
      <LeftSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto py-8">
        {/* Grid of Posts */}
        <div className="w-full max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {posts
            .filter((post) => post.image) // Only show posts that have an image
            .map((post) => (
              <div
                key={post._id}
                className="bg-[#1A1A1A] cursor-pointer rounded-sm
                 shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl duration-200"
              >
                {/* Post Image */}
                <img
                  src={post.image}
                  alt={`Post ${post._id}`}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  {/* Username */}
                  <p className="text-lg font-semibold text-gray-800 dark:text-white">
                    {post.postedBy.userName}
                  </p>
                  {/* Post Body */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
                    {post.body}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}

export default UserExplorePage;
