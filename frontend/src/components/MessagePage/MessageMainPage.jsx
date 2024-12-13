import React from "react";
import LeftSidebar from "../HomePage/LeftSidebar";
import BottomNav from "../HomePage/BottomNav";

function MessagePage() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <LeftSidebar />

      {/* Messages Section */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700">
          <button className="text-xl text-gray-800 dark:text-white">
            <i className="fa fa-arrow-left"></i>
          </button>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white">Direct</h1>
          <button className="text-xl text-gray-800 dark:text-white">
            <i className="fa fa-pencil-alt"></i>
          </button>
        </header>

        {/* Search Bar */}
        <div className="p-4 border-b border-gray-300 dark:border-gray-700">
          <input
            type="text"
            placeholder="Search"
            className="w-full p-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-4">
            {/* Example Conversation */}
            <div className="flex items-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition">
              <img
                src="https://via.placeholder.com/40"
                alt="User"
                className="w-10 h-10 rounded-full mr-4"
              />
              <div className="flex-1">
                <h2 className="text-gray-800 dark:text-white font-semibold">John Doe</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">Hey, how are you?</p>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">2m</span>
            </div>

            {/* Another Example Conversation */}
            <div className="flex items-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition">
              <img
                src="https://via.placeholder.com/40"
                alt="User"
                className="w-10 h-10 rounded-full mr-4"
              />
              <div className="flex-1">
                <h2 className="text-gray-800 dark:text-white font-semibold">Jane Smith</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  Let's meet tomorrow!
                </p>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">1d</span>
            </div>
          </div>
        </div>

        {/* Bottom Navigation Bar */}
        <nav className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700 sm:hidden lg:flex">
          <button className="text-xl text-gray-800 dark:text-white">
            <i className="fa fa-home"></i>
          </button>
          <button className="text-xl text-gray-800 dark:text-white">
            <i className="fa fa-search"></i>
          </button>
          <button className="text-xl text-gray-800 dark:text-white">
            <i className="fa fa-camera"></i>
          </button>
          <button className="text-xl text-gray-800 dark:text-white">
            <i className="fa fa-heart"></i>
          </button>
          <button className="text-xl text-gray-800 dark:text-white">
            <i className="fa fa-user"></i>
          </button>
        </nav>
      </div>
      <BottomNav/ >
    </div>
  );
}

export default MessagePage;
