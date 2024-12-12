import React from "react";
import LeftSidebar from "../HomePage/LeftSidebar";
import BottomNav from "../HomePage/BottomNav";

function UserSearch() {
  return (
    <div className="flex h-screen flex-row">
      {/* Sidebar */}
      <LeftSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-100 dark:bg-gray-900 overflow-y-auto">
        {/* Search Bar */}
        <div className="w-full max-w-5xl mx-auto px-6 py-4">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Grid of Search Results */}
        <div className="w-full max-w-5xl mx-auto px-6 py-4 grid grid-cols-3 gap-4">
          {Array(12)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="bg-gray-300 dark:bg-gray-700 rounded-md overflow-hidden"
              >
                <img
                  src={`https://via.placeholder.com/150?text=User+${index + 1}`}
                  alt={`User ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="p-2">
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                    user_{index + 1}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Full Name {index + 1}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

export default UserSearch;
