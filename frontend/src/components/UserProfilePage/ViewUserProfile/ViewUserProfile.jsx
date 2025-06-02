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
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loadingFollow, setLoadingFollow] = useState(false);

  // Get current logged-in user from localStorage
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const currentUserId = currentUser?._id;

  useEffect(() => {
    if (!username) return;

    setLoading(true);
    setError(null);

    api
      .get(`/user/${username}`)
      .then((res) => {
        const result = res.data;
        setPosts(result.posts || []);
        setProfileData(result.profile || {});
        setUserData(result.user || {});

        const followers = result.profile?.followers || [];
        setIsFollowing(followers.includes(currentUserId));
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
        setPosts([]);
        setProfileData(null);
        setUserData(null);
        setError("Failed to load user data");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [username, currentUserId]);

  const handleFollowToggle = async () => {
    if (!profileData || !userData) return;

    setLoadingFollow(true);
    try {
      if (isFollowing) {
        await api.post(`/user/${username}/unfollow`, {
          followerId: currentUserId,
        });
        setIsFollowing(false);
        setProfileData((prev) => ({
          ...prev,
          followers: (prev.followers || []).filter(
            (id) => id !== currentUserId
          ),
        }));
      } else {
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

  const formattedLink =
    profileData?.link && !profileData.link.startsWith("http")
      ? `https://${profileData.link}`
      : profileData?.link;

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (customDelay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: customDelay, duration: 0.6, ease: "easeOut" },
    }),
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 dark:text-gray-300">Loading profile...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );

  if (!userData || !profileData)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 dark:text-gray-300">No profile found.</p>
      </div>
    );

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
              src={profileData?.profileImage || noProfile}
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
          {profileData?.link && (
            <a
              href={formattedLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 dark:text-blue-400"
            >
              {profileData.link}
            </a>
          )}
        </motion.div>

        <ViewUserPost posts={posts} />
      </main>

      <BottomNav />
    </div>
  );
};

export default ViewUserProfile;
