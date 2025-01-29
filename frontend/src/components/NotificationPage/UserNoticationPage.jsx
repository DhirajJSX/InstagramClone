import React from "react";
import LeftSidebar from "../HomePage/LeftSidebar";
import BottomNav from "../HomePage/BottomNav";

function UserNotificationPage() {
  return (
    <div className="flex h-screen flex-row">
      {/* Sidebar */}
      <LeftSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Header */}
        <div className="w-full max-w-5xl mx-auto px-6 py-4 border-b border-gray-300 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Notifications
          </h2>
        </div>

        {/* Notifications List */}
        <div className="w-full max-w-5xl mx-auto px-6 py-4">
          {Array(10)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 py-3  cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-700 overflow-hidden">
                  <img
                    src={`https://via.placeholder.com/150?text=User+${index + 1}`}
                    alt={`User ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                    user_{index + 1} liked your post
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    2 hours ago
                  </p>
                </div>
                <div className="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-md overflow-hidden">
                  <img
                    src={`https://via.placeholder.com/150?text=Post+${index + 1}`}
                    alt={`Post ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}

export default UserNotificationPage;
