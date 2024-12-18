import React, { useState, useEffect } from "react";
import noProfile from "../../../img/noImageProfile.jpg";
import AvatarWithText from "../../Loaders/AvatarWithText"; // Import the AvatarWithText loader

function ProfileAbout() {
  // State variables to store user, profile, and posts data
  const [userInfo, setUserInfo] = useState(null);
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Simulate a 2-second delay before fetching data
    setTimeout(() => {
      // Fetch profile data
      fetch("http://localhost:5000/profile", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("JWT"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUserInfo(data.user); // Set user info (name, email, etc.)
          setProfile(data.profile);
        })
        .catch((err) => {
          console.error(err);
        });

      // Fetch posts data
      fetch("http://localhost:5000/me", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("JWT"),
        },
      })
        .then((res) => res.json())
        .then((result) => {
          setPosts(result); // Set posts data (an array of posts)
          setLoading(false); // Set loading to false once data is fetched
        })
        .catch((err) => console.error("Error fetching posts:", err));
    }, 2000); // 2-second delay
  }, []);

  // Show the loader while loading data
  return (
    <div className="w-full max-w-5xl px-3 py-4">
      {loading ? (
        <AvatarWithText /> // Show the loader during the 2-second delay
      ) : (
        <div>
          <div className="flex items-center space-x-8">
            {/* Profile Image */}
            <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56 rounded-full overflow-hidden">
              <img
                src={profile?.profileImage && noProfile} // Use profileImage from the fetched data, or fallback to noProfile
                className="object-fill rounded-full"
                alt="Profile"
              />
            </div>

            <div className="flex-1">
              <div className="flex items-center ml-5 space-x-4 mb-4">
                <h2 className="text-[16px] font-semibold text-gray-800 dark:text-gray-100">
                  {userInfo?.userName || "Loading..."} {/* Conditional rendering */}
                </h2>
                <button className="px-4 py-1 border rounded-md text-sm font-medium">
                  Edit Profile
                </button>
              </div>
              <div className="flex justify-around items-center w-full max-w-sm">
                <div className="flex flex-col items-center">
                  <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                    {posts.length || 0}{" "}
                    {/* Display number of posts or 0 if not available */}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Posts</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                    {profile?.followers.length || 0} {/* Display number of followers */}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Followers</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                    {profile?.following.length || 0} {/* Display number of following */}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Following</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bio and Website */}
          <div className="mt-4">
            <p className="font-semibold text-gray-800 dark:text-gray-100">
              {userInfo?.name || "Name not available"} {/* Bio */}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              {profile?.bio || "Bio not available"} {/* Bio */}
            </p>
            <a
              href={profile?.link || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 dark:text-blue-400"
            >
              {profile?.link || "No Link Yet"} {/* Display website link */}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileAbout;
