import React, { useState, useEffect } from "react";
import LeftSidebar from "../HomePage/LeftSidebar";
import BottomNav from "../HomePage/BottomNav";
import Mobilelogout from "./MobileHeader/Mobilelogout";

function UserProfile() {
  const [activeTab, setActiveTab] = useState("posts");
  const [posts, setPosts] = useState([]);
  const [userInfo, setUserInfo] = useState({}); // To store user details

  // Handler to switch between tabs
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    // Fetch posts and user info from the backend
    fetch("http://localhost:5000/me", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("JWT"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.length > 0) {
          setPosts(result);
          setUserInfo(result[0].postedBy); // Extract user info from the first post
        }
      })
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  return (
    <>
      <div className="flex h-screen flex-row">
        {/* Sidebar */}
        <LeftSidebar />

        {/* Profile Content */}
        <div className="flex-1 flex flex-col items-center overflow-y-auto">
          {/* Mobile Header */}
          <Mobilelogout />

          {/* Profile Header */}
          <div className="w-full max-w-5xl px-6 py-4">
            <div className="flex items-center space-x-8">
              {/* Profile Picture */}
              <div className="w-32 h-32 rounded-full bg-gray-300 dark:bg-gray-700 overflow-hidden">
                <img
                  src="https://via.placeholder.com/150"
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* User Info */}
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-4">
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                    {userInfo.userName || "Loading..."} {/* Dynamic Name */}
                  </h2>
                  <button className="px-4 py-1 border rounded-md text-sm font-medium dark:text-gray-300">
                    Edit Profile
                  </button>
                </div>
                <div className="flex space-x-6">
                  <p>
                    <span className="font-semibold text-gray-800 dark:text-gray-100">
                      {posts.length}
                    </span>{" "}
                    posts
                  </p>
                  <p>
                    <span className="font-semibold text-gray-800 dark:text-gray-100">
                      500
                    </span>{" "}
                    followers
                  </p>
                  <p>
                    <span className="font-semibold text-gray-800 dark:text-gray-100">
                      300
                    </span>{" "}
                    following
                  </p>
                </div>
              </div>
            </div>

            {/* User Bio */}
            <div className="mt-4">
              <p className="font-semibold text-gray-800 dark:text-gray-100">
                {userInfo.name || "User"} {/* Dynamic Name */}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Photographer | Traveler | Nature Lover {/* Static Example */}
              </p>
              <a
                href="https://example.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 dark:text-blue-400"
              >
                example.com
              </a>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="w-full max-w-5xl border-t border-b border-gray-300 dark:border-gray-700">
            <div className="flex justify-center space-x-10 text-gray-500 dark:text-gray-400 py-2">
              <button
                onClick={() => handleTabChange("posts")}
                className={`hover:text-gray-800 dark:hover:text-gray-100 ${
                  activeTab === "posts" ? "text-gray-800 dark:text-gray-100" : ""
                }`}
              >
                Posts
              </button>
              <button
                onClick={() => handleTabChange("reels")}
                className={`hover:text-gray-800 dark:hover:text-gray-100 ${
                  activeTab === "reels" ? "text-gray-800 dark:text-gray-100" : ""
                }`}
              >
                Reels
              </button>
              <button
                onClick={() => handleTabChange("tagged")}
                className={`hover:text-gray-800 dark:hover:text-gray-100 ${
                  activeTab === "tagged"
                    ? "text-gray-800 dark:text-gray-100"
                    : ""
                }`}
              >
                Tagged
              </button>
            </div>
          </div>

          {/* Dynamic Posts Section */}
          <div className="w-full max-w-5xl px-6 py-4 flex flex-wrap justify-start gap-4">
            {activeTab === "posts" && posts.length > 0 ? (
              posts.map((post, index) => (
                <div
                  key={post._id || index}
                  className="w-[30%] aspect-square bg-gray-300 dark:bg-gray-700 rounded-md overflow-hidden"
                >
                  <img
                    src={post.image}
                    alt={post.body}
                    className="w-full h-full object-cover"
                  />
                  <p className="text-center text-sm mt-2 text-gray-800 dark:text-gray-100">
                    {post.body}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-600 dark:text-gray-400">
                No posts to display.
              </p>
            )}
            {activeTab === "reels" && <p>Reels content will be displayed here.</p>}
            {activeTab === "tagged" && (
              <p>Tagged content will be displayed here.</p>
            )}
          </div>
        </div>
        <BottomNav />
      </div>
    </>
  );
}

export default UserProfile;
