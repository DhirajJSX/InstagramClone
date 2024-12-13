import React from "react";
import LeftSidebar from "../HomePage/LeftSidebar";
import BottomNav from "../HomePage/BottomNav";

function UserProfile() {
  return (
    <>
      <div className="flex h-screen flex-row">
        {/* Sidebar */}
        <LeftSidebar />

        {/* Profile Content */}
        <div
          className="flex-1 flex flex-col items-center 
        
        overflow-y-auto"
        >
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
                    johndoe
                  </h2>
                  <button className="px-4 py-1 border rounded-md text-sm font-medium dark:text-gray-300">
                    Edit Profile
                  </button>
                  <button className="px-3 py-1 border rounded-md text-sm font-medium dark:text-gray-300 hidden sm:inline-block">
                    Settings
                  </button>
                </div>
                <div className="flex space-x-6">
                  <p>
                    <span className="font-semibold text-gray-800 dark:text-gray-100">
                      24
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
                John Doe
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

          {/* Tab Navigation */}
          <div className="w-full max-w-5xl border-t border-b border-gray-300 dark:border-gray-700">
            <div className="flex justify-center space-x-10 text-gray-500 dark:text-gray-400 py-2">
              <button className="hover:text-gray-800 dark:hover:text-gray-100">
                <i className="fas fa-th"></i> Posts
              </button>
              <button className="hover:text-gray-800 dark:hover:text-gray-100">
                <i className="fas fa-video"></i> Reels
              </button>
              <button className="hover:text-gray-800 dark:hover:text-gray-100">
                <i className="fas fa-user-tag"></i> Tagged
              </button>
            </div>
          </div>

          {/* Posts Section (Flexbox) */}
          <div className="w-full max-w-5xl px-6 py-4 flex flex-wrap justify-start gap-4">
            {Array(12)
              .fill(null)
              .map((_, index) => (
                <div className="w-[30%] aspect-square bg-gray-300 dark:bg-gray-700 rounded-md overflow-hidden">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsjGRSLZ4Hl455aXB6QgpijhQujfDyopXXJ7v0S8HD1LgldIhbAMQqGgRxIzej6KfzAyFLUjgtZr6ScYR0UZlunn1zWen8nOfWag2G7A"
                    alt={`Post ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
          </div>
        </div>
        <BottomNav />
      </div>
    </>
  );
}

export default UserProfile;
