import React from "react";
import LeftSidebar from "../HomePage/LeftSidebar";
import BottomNav from "../HomePage/BottomNav";
import SearchIcon from "@mui/icons-material/Search";

function UserSearch() {
  return (
    <div className="flex h-screen flex-row">
      {/* Sidebar */}
      <LeftSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Search Bar - Sticky */}
        <div className="w-full max-w-5xl mx-auto px-6 py-4 sticky top-0 border-b border-gray-500 bg-black z-10 sm:border-b-0">
          <div className="flex items-center bg-gray-700 rounded-lg px-4 py-2">
            <SearchIcon className="text-gray-200"  />
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-gray-700  text-white ml-2 focus:outline-none outline-0"
            />
          </div>
        </div>

        {/* Search Results - Column Layout */}
        <div className="w-full max-w-5xl mx-auto px-6 pt-1 pb-16">
          {Array(10)
            .fill(null)
            .map((_, index) => (
              <div key={index} className="flex items-center space-x-4 py-3">
                <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-700 overflow-hidden">
                  <img
                    src={`https://via.placeholder.com/150?text=User+${index + 1}`}
                    alt={`User ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
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

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}

export default UserSearch;
