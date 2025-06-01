import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

import LeftSidebar from "../../HomePage/LeftSidebar";
import BottomNav from "../../HomePage/BottomNav";

import api from "../../../utils/ViewUserapi";
import noProfile from "../../../img/noImageProfile.jpg";
import ViewUserPost from "./viewUserPost/ViewUserPost";

const ViewUserProfile = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loadingFollow, setLoadingFollow] = useState(false);

  // This is current logged-in user ID (for demo purpose, replace with your auth context)
  const currentUserId = "currentLoggedInUserId";

  useEffect(() => {
    if (!username) return;

    api
      .get(`/user/${username}`)
      .then((res) => {
        const result = res.data;
        setPosts(result.posts || []);
        setProfileData(result.profile || null);
        setUserData(result.user || null);

        // Check if current user is following the profile user
        const followers = result.profile?.followers || [];
        setIsFollowing(followers.includes(currentUserId));
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setPosts([]);
        setProfileData(null);
        setUserData(null);
        setError("Failed to load user data");
      });
  }, [username]);

  // Dummy follow/unfollow functions, replace with your API calls
  const handleFollowToggle = async () => {
    if (!profileData || !userData) return;

    setLoadingFollow(true);
    try {
      if (isFollowing) {
        // Call your unfollow API here
        await api.post(`/user/${username}/unfollow`, {
          followerId: currentUserId,
        });
        setIsFollowing(false);
        setProfileData((prev) => ({
          ...prev,
          followers: prev.followers.filter((id) => id !== currentUserId),
        }));
      } else {
        // Call your follow API here
        await api.post(`/user/${username}/follow`, {
          followerId: currentUserId,
        });
        setIsFollowing(true);
        setProfileData((prev) => ({
          ...prev,
          followers: [...(prev.followers || []), currentUserId],
        }));
      }
    } catch (error) {
      console.error("Error following/unfollowing user", error);
    } finally {
      setLoadingFollow(false);
    }
  };

  // Normalize link to include https if missing
  const formattedLink =
    profileData?.link && !profileData.link.startsWith("http")
      ? `https://${profileData.link}`
      : profileData?.link;

  // Animation variants for different sections
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (customDelay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: customDelay, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <div className="flex h-screen">
      <LeftSidebar />
      <main className="flex-1 overflow-y-auto px-3 py-4 max-w-5xl mx-auto">
        <div className="flex items-center space-x-8">
          <motion.div
            className="profile-img w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56 rounded-full overflow-hidden"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "backOut" }}
          >
            <img
              src={profileData?.profilePicture || noProfile}
              alt={`${userData?.userName || "User"} profile`}
              className="object-cover w-full h-full rounded-full"
            />
          </motion.div>

          <div className="flex-1">
            <motion.div
              className="flex items-center ml-5 space-x-4 mb-4 profile-info"
              initial="hidden"
              animate="visible"
              custom={0.2}
              variants={variants}
            >
              <h2 className="text-[20px] font-semibold text-gray-800 dark:text-gray-100">
                {userData?.userName || username || ""}
              </h2>

              {userData?._id !== currentUserId && (
                <button
                  onClick={handleFollowToggle}
                  disabled={loadingFollow}
                  className={`
        px-5 py-1.5 rounded-md text-sm font-semibold
        transition-colors duration-300
        ${
          isFollowing
            ? "bg-red-500 text-white hover:bg-red-600"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
                >
                  {loadingFollow ? "..." : isFollowing ? "Unfollow" : "Follow"}
                </button>
              )}
            </motion.div>

            <motion.div
              className="flex justify-around items-center w-full max-w-sm profile-stats"
              initial="hidden"
              animate="visible"
              custom={0.4}
              variants={variants}
            >
              <div className="flex flex-col items-center">
                <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  {profileData?.postCount ?? posts.length}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Posts
                </span>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  {profileData?.followers?.length ?? 0}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Followers
                </span>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  {profileData?.following?.length ?? 0}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Following
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="mt-4 profile-description"
          initial="hidden"
          animate="visible"
          custom={0.6}
          variants={variants}
        >
          <p className="font-semibold text-gray-800 dark:text-gray-100">
            {userData?.name || ""}
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            {profileData?.bio || ""}
          </p>
          <a
            href={formattedLink || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 dark:text-blue-400"
          >
            {profileData?.link || "No Link Yet"}
          </a>
        </motion.div>

        <ViewUserPost posts={posts} />
      </main>

      <BottomNav />
    </div>
  );
};

export default ViewUserProfile;
