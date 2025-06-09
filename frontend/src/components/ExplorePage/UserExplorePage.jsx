import React, { useState, useEffect } from "react";
import LeftSidebar from "../HomePage/LeftSidebar";
import BottomNav from "../HomePage/BottomNav";
import ProfilePostLoader from "../Loaders/ProfilePostLoader";
import { BASE_URL } from "../../utils/config";

function UserExplorePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/allposts`);
        if (!response.ok) throw new Error("Failed to fetch posts");

        const data = await response.json();
        const trendingPosts = data
          .filter((post) => post.image)
          .sort((a, b) => {
            const likesA = a.likes ? a.likes.length : 0;
            const likesB = b.likes ? b.likes.length : 0;
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            const scoreA = likesA * 3 + dateA / 1000000;
            const scoreB = likesB * 3 + dateB / 1000000;

            return scoreB - scoreA;
          })
          .slice(0, 9);

        setPosts(trendingPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setTimeout(() => setLoading(false), 1000);
      }
    };
    loadPosts();
  }, []);

  return (
    <div className="flex h-screen flex-row bg-black">
      <LeftSidebar />

      <main className="flex-1 flex flex-col overflow-y-auto">
         <div className="w-full px-4 md:px-6 py-3.5 border-b border-white/10 backdrop-blur-md bg-white/5">
          <h2 className="text-2xl font-semibold text-gray-100">
            Explorer
          </h2>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <ProfilePostLoader />
          </div>
        ) : posts.length === 0 ? (
          <p className="text-center text-gray-400 mt-20 text-lg">No posts available</p>
        ) : (
          <div className="max-w-7xl mx-auto grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1">
            {posts.map((post) => (
              <div
                key={post._id}
                className="relative w-full cursor-pointer overflow-hidden rounded-sm"
              >
                <img
                  src={post.image}
                  alt={`Post ${post._id}`}
                  className="object-cover w-full aspect-square"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}

export default UserExplorePage;
