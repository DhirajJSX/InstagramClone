import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import LeftSidebar from "../HomePage/LeftSidebar";
import BottomNav from "../HomePage/BottomNav";
import Mobilelogout from "./MobileHeader/Mobilelogout";
import ProfileAbout from "./ProfileAbout/ProfileAbout";
import ProfilePostLoader from "../Loaders/ProfilePostLoader";
import { BASE_URL } from "../../utils/config";

function UserProfile() {
  const [activeTab, setActiveTab] = useState("posts");
  const [posts, setPosts] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const postsRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`${BASE_URL}/profile`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("JWT") },
      }).then((res) => res.json()),
      fetch(`${BASE_URL}/me`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("JWT") },
      }).then((res) => res.json()),
    ])
      .then(([profileData, postsData]) => {
        setUserInfo(profileData.user);
        setProfile(profileData.profile);
        setPosts(postsData);
        setTimeout(() => setLoading(false), 1000);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!loading && activeTab === "posts") {
      gsap.fromTo(
        postsRef.current?.children,
        { opacity: 0, y: 50, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
      );
    }
  }, [loading, activeTab]);

  return (
    <div className="flex h-screen flex-row">
      <LeftSidebar />
      <div className="flex-1 flex flex-col items-center overflow-y-auto">
        <Mobilelogout />
        <ProfileAbout
          userInfo={userInfo}
          profile={profile}
          posts={posts}
          loading={loading}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          setProfile={setProfile}
        />

        <div className="w-full max-w-5xl border-t border-b py-2 border-gray-300 dark:border-gray-700">
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

        {loading ? (
          <div className="flex justify-center items-center w-full h-64">
            <ProfilePostLoader />
          </div>
        ) : (
          <div
            className="w-full max-w-5xl grid grid-cols-3 gap-[5px] py-2 pb-16"
            ref={postsRef}
          >
            {activeTab === "posts" && posts.length > 0 ? (
              [...posts]
                .reverse()
                .map((post, index) => (
                  <div
                    key={post._id || index}
                    className="aspect-square bg-gray-300 dark:bg-gray-700 overflow-hidden relative"
                  >
                    <img
                      onClick={() => console.log(`Navigating to post: ${post._id}`)}
                      src={post.image}
                      alt={post.body}
                      className="w-full h-full object-cover cursor-pointer"
                      loading="lazy"
                    />
                  </div>
                ))
            ) : (
              <p className="col-span-3 text-center text-gray-600 dark:text-gray-400">
                No posts to show.
              </p>
            )}
          </div>
        )}

        <BottomNav />
      </div>
    </div>
  );
}

export default UserProfile;
