import React from "react";
import LeftSidebar from "../HomePage/LeftSidebar";
import BottomNav from "../HomePage/BottomNav";

const posts = [
  { id: 1, image: "https://via.placeholder.com/300x300", isLiked: false },
  { id: 2, image: "https://via.placeholder.com/300x300", isLiked: true },
  { id: 3, image: "https://via.placeholder.com/300x300", isLiked: false },
  { id: 4, image: "https://via.placeholder.com/300x300", isLiked: true },
  { id: 5, image: "https://via.placeholder.com/300x300", isLiked: false },
  { id: 6, image: "https://via.placeholder.com/300x300", isLiked: false },
];

function UserExplorePage() {
  return (
    <div className="flex h-screen flex-row">
      {/* Sidebar */}
      <LeftSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col b overflow-y-auto">
        {/* Grid of Posts */}
        <div className="w-full max-w-5xl mx-auto px-6 py-4 grid grid-cols-3 gap-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-gray-300 dark:bg-gray-700 rounded-md overflow-hidden"
            >
              <img
                src={post.image}
                alt={`Post ${post.id}`}
                className="w-full h-full object-cover"
              />
              <div className="p-2">
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                  User {post.id}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Description {post.id}
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