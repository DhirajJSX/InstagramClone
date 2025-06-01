import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

const ViewUserPost = ({ posts, taggedPosts = [] }) => {
  const [activeTab, setActiveTab] = useState("posts");
  const postsRef = useRef(null);

  useEffect(() => {
    if (postsRef.current) {
      gsap.fromTo(
        postsRef.current.children,
        { opacity: 0, y: 50, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
      );
    }
  }, [activeTab, posts, taggedPosts]);

  const renderGridPosts = (postsToRender) => {
    if (!postsToRender || postsToRender.length === 0) {
      return (
        <p className="text-gray-600 dark:text-gray-400 text-center py-10">
          No {activeTab === "posts" ? "posts" : "tagged content"} to display.
        </p>
      );
    }

    return (
      <div
        className="w-full max-w-5xl grid grid-cols-3 px-3 gap-[5px] py-2 pb-16 justify-center"
        ref={postsRef}
      >
        {[...postsToRender].reverse().map((post, index) => (
          <div
            key={post._id || index}
            className="aspect-square bg-gray-300 dark:bg-gray-700 overflow-hidden relative"
          >
            {post.image ? (
              <img
                src={post.image}
                alt={post.body || "User post image"}
                className="w-full h-full object-cover cursor-pointer absolute inset-0"
                onClick={() => {
                  console.log(`Clicked post: ${post._id}`);
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                No image
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-6">
      <div className="border-t border-b py-2 border-gray-300 dark:border-gray-700">
        <div className="flex justify-center space-x-10 text-gray-500 dark:text-gray-400 py-2">
          <button
            onClick={() => setActiveTab("posts")}
            className={`hover:text-gray-800 dark:hover:text-gray-100 ${
              activeTab === "posts" ? "text-gray-800 dark:text-gray-100" : ""
            }`}
          >
            Posts
          </button>
          <button
            onClick={() => setActiveTab("tagged")}
            className={`hover:text-gray-800 dark:hover:text-gray-100 ${
              activeTab === "tagged" ? "text-gray-800 dark:text-gray-100" : ""
            }`}
          >
            Tagged
          </button>
        </div>
      </div>

      {activeTab === "posts" && renderGridPosts(posts)}
      {activeTab === "tagged" && renderGridPosts(taggedPosts)}
    </div>
  );
};

export default ViewUserPost;
