import React, { useState, useEffect } from "react";
import LeftSidebar from "../HomePage/LeftSidebar";
import BottomNav from "../HomePage/BottomNav";
import Mobilelogout from "./MobileHeader/Mobilelogout";
 // Import the modal
import ProfileAbout from "./ProfileAbout.js/ProfileAbout"; // Import ProfileAbout

function UserProfile() {
  const [activeTab, setActiveTab] = useState("posts");
  const [posts, setPosts] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  // const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleEditProfile = () => {
    setIsModalOpen(true);
  };

  // const handleSaveProfile = (updatedData) => {
  //   setUserInfo(updatedData);
  // };

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
          setUserInfo(result[0].postedBy);
        }
        // console.log(result);
        
      })
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  return (
    <>
      <div className="flex h-screen flex-row">
        <LeftSidebar />
        <div className="flex-1 flex flex-col items-center overflow-y-auto">
          <Mobilelogout />
          <ProfileAbout 
            userInfo={userInfo} 
            posts={posts} 
            handleEditProfile={handleEditProfile}
          />

          {/* Tabs */}
          <div className="w-full max-w-5xl border-t border-b border-gray-300 dark:border-gray-700">
            <div className="flex justify-center space-x-10 text-gray-500 dark:text-gray-400 py-2">
              <button
                onClick={() => handleTabChange("posts")}
                className={`hover:text-gray-800 dark:hover:text-gray-100 ${
                  activeTab === "posts"
                    ? "text-gray-800 dark:text-gray-100"
                    : ""
                }`}
              >
                Posts
              </button>
              {/* <button
                onClick={() => handleTabChange("reels")}
                className={`hover:text-gray-800 dark:hover:text-gray-100 ${
                  activeTab === "reels"
                    ? "text-gray-800 dark:text-gray-100"
                    : ""
                }`}
              >
                Reels
              </button> */}
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

          {/* Posts Section */}
          <div className="w-full max-w-5xl grid grid-cols-3 gap-[5px] justify-center">
            {activeTab === "posts" && posts.length > 0 ? (
              [...posts].reverse().map((post, index) => (
                <div
                  key={post._id || index}
                  className="aspect-square bg-gray-300 dark:bg-gray-700 overflow-hidden"
                >
                  <img
                    src={post.image}
                    alt={post.body}
                    className="w-full h-full object-cover cursor-pointer"
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
            {activeTab === "reels" && (
              <p>Reels content will be displayed here.</p>
            )}
            {activeTab === "tagged" && (
              <p>Tagged content will be displayed here.</p>
            )}
          </div>
        </div>

        <BottomNav />
      </div>

      {/* Edit Profile Modal */}
     
    </>
  );
}

export default UserProfile;
