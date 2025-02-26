import React, { useState, useEffect } from "react";
import LeftSidebar from "../HomePage/LeftSidebar";
import BottomNav from "../HomePage/BottomNav";

import ProfilePostLoader from "../Loaders/ProfilePostLoader";

function UserExplorePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for at least 2 seconds
    const loadPosts = async () => {
      try {
        const response = await fetch("https://instagramclone-djuv.onrender.com/allposts");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await response.json();

        // Sort posts by creation date in descending order (newest first)
        const sortedPosts = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        // Limit the number of posts to show (e.g., 9 newest posts)
        const newestPosts = sortedPosts.slice(0, 9);
        setPosts(newestPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        // Ensure loader stays visible for 2 seconds minimum
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    loadPosts();
  }, []);

  return (
    <div className="flex h-screen flex-row bg-black">
      {/* Sidebar */}
      <LeftSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto py-8">
        {/* Grid of Posts */}
        {loading ? (
          <div className="flex justify-center items-center h-full">
            {/* Temporarily replace loader with text for debugging */}
            <ProfilePostLoader />
          </div>
        ) : (
          <div className="w-full max-w-6xl mx-auto px-2 pb-10 grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3">
            {posts.length === 0 ? (
              <p className="text-white">No posts available</p>
            ) : (
              posts
                .filter((post) => post.image) // Only show posts that have an image
                .map((post) => (
                  <div
                    key={post._id}
                    className="bg-[#1A1A1A] cursor-pointer rounded-2xl
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
                ))
            )}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}

export default UserExplorePage;
