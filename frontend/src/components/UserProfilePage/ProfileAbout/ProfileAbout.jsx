import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import noProfile from "../../../img/noImageProfile.jpg";
import AvatarWithText from "../../Loaders/AvatarWithText";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

function ProfileAbout({
  userInfo,
  setUserInfo,
  profile,
  setProfile,
  posts,
  loading,
  onUpdateProfile,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!loading) {
      gsap.from(".profile-img", {
        opacity: 0,
        scale: 0.8,
        duration: 1,
        ease: "back.out(1.7)",
      });
      gsap.from(".profile-info", {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
      });
      gsap.from(".profile-stats", {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.4,
        ease: "power3.out",
      });
      gsap.from(".profile-description", {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.6,
        ease: "power3.out",
      });
    }
  }, [loading]);

  const handleEditProfileClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="w-full max-w-5xl px-3 py-4">
      {loading ? (
        <AvatarWithText />
      ) : (
        <>
          <div className="flex items-center space-x-8">
            <div className="profile-img w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56 rounded-full overflow-hidden">
              <img
                src={profile?.profileImage || noProfile}
                alt="Profile"
                className="object-cover w-full h-full rounded-full"
              />
            </div>

            <div className="flex-1">
              <div className="flex items-center ml-5 space-x-4 mb-4 profile-info">
                <h2 className="text-[16px] font-semibold text-gray-800 dark:text-gray-100">
                  {userInfo?.userName || "Loading..."}
                </h2>
                <button
                  onClick={handleEditProfileClick}
                  className="px-4 py-1 border rounded-md text-sm font-medium"
                >
                  Edit Profile
                </button>
              </div>
              <div className="flex justify-around items-center w-full max-w-sm profile-stats">
                <div className="flex flex-col items-center">
                  <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                    {posts?.length || 0}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Posts
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                    {profile?.followers?.length || 0}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Followers
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                    {profile?.following?.length || 0}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Following
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 profile-description">
            <p className="font-semibold text-gray-800 dark:text-gray-100">
              {userInfo?.name || "Name not available"}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              {profile?.bio || ""}
            </p>
            <a href={profile.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 dark:text-blue-400">{profile.link}</a>
          </div>

          {isModalOpen && (
            <EditProfileModal
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              profile={profile}
              setProfile={setProfile}
              onClose={() => setIsModalOpen(false)}
              onUpdateProfile={onUpdateProfile}
            />
          )}
        </>
      )}
    </div>
  );
}

export default ProfileAbout;
