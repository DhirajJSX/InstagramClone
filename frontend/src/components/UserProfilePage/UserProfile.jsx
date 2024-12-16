import React, { useState, useEffect } from "react";
import LeftSidebar from "../HomePage/LeftSidebar";
import BottomNav from "../HomePage/BottomNav";
import Mobilelogout from "./MobileHeader/Mobilelogout";
import EditProfileModal from "./EditProfileModal/EditProfileModal"; // Import the modal
import noProfile from "../../img/noImageProfile.jpg";

function UserProfile() {
  const [activeTab, setActiveTab] = useState("posts");
  const [posts, setPosts] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleEditProfile = () => {
    setIsModalOpen(true);
  };

  const handleSaveProfile = (updatedData) => {
    setUserInfo(updatedData);
    // console.log(updatedData);
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
          setUserInfo(result[0].postedBy);
        }
      })
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  return (
    <>
      <div className="flex h-screen flex-row">
        <LeftSidebar />
        <div className="flex-1 flex flex-col items-center overflow-y-auto">
          <Mobilelogout />
          <div className="w-full max-w-5xl px-3 py-4">
            <div className="flex items-center space-x-8">
              {/* Profile Image */}
              <div className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] md:w-[150px] md:h-[150px] lg:w-[200px] lg:h-[200px] rounded-full bg-gray-300 dark:bg-gray-700 overflow-hidden">
                <img
                  src={noProfile}
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                <div className="flex items-center ml-5 space-x-4 mb-4">
                  <h2 className="text-[16px] font-semibold text-gray-800 dark:text-gray-100">
                    {userInfo.userName || "Loading..."} {/* Dynamic Name */}
                  </h2>
                  <button
                    onClick={handleEditProfile}
                    className="px-4 py-1 border rounded-md text-sm font-medium"
                  >
                    Edit Profile
                  </button>
                </div>
                <div className="flex justify-around items-center w-full max-w-sm">
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                      {posts.length}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Posts
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                      500
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Followers
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                      300
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Following
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio and Website */}
            <div className="mt-4">
              <p className="font-semibold text-gray-800 dark:text-gray-100">
                {userInfo.name}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Photographer | Traveler | Nature Lover
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
              <button
                onClick={() => handleTabChange("reels")}
                className={`hover:text-gray-800 dark:hover:text-gray-100 ${
                  activeTab === "reels"
                    ? "text-gray-800 dark:text-gray-100"
                    : ""
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
      <EditProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userInfo={userInfo}
        onSave={handleSaveProfile}
      />
    </>
  );
}

export default UserProfile;
