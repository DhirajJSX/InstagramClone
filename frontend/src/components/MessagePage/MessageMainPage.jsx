import React from "react";

function MessagePage() {
  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700">
        <button className="text-xl text-gray-800 dark:text-white">
          <i className="fa fa-arrow-left"></i> {/* Back arrow icon */}
        </button>
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Direct</h1>
        <button className="text-xl text-gray-800 dark:text-white">
          <i className="fa fa-pencil-alt"></i> {/* New message icon */}
        </button>
      </header>

      {/* Search bar */}
      <div className="p-4 border-b border-gray-300 dark:border-gray-700">
        <input
          type="text"
          placeholder="Search"
          className="w-full p-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg"
        />
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          {/* Example Conversation */}
          <div className="flex items-center p-2 border-b border-gray-300 dark:border-gray-700">
            <img
              src="https://via.placeholder.com/40"
              alt="User"
              className="w-10 h-10 rounded-full mr-4"
            />
            <div className="flex-1">
              <h2 className="text-gray-800 dark:text-white font-semibold">John Doe</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Hey, how are you?</p>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">2m</span>
          </div>

          {/* Another Example Conversation */}
          <div className="flex items-center p-2 border-b border-gray-300 dark:border-gray-700">
            <img
              src="https://via.placeholder.com/40"
              alt="User"
              className="w-10 h-10 rounded-full mr-4"
            />
            <div className="flex-1">
              <h2 className="text-gray-800 dark:text-white font-semibold">Jane Smith</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Let's meet tomorrow!</p>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">1d</span>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700">
        <button className="text-gray-800 dark:text-white">
          <i className="fa fa-home"></i> {/* Home icon */}
        </button>
        <button className="text-gray-800 dark:text-white">
          <i className="fa fa-search"></i> {/* Search icon */}
        </button>
        <button className="text-gray-800 dark:text-white">
          <i className="fa fa-camera"></i> {/* Camera icon */}
        </button>
        <button className="text-gray-800 dark:text-white">
          <i className="fa fa-heart"></i> {/* Activity icon */}
        </button>
        <button className="text-gray-800 dark:text-white">
          <i className="fa fa-user"></i> {/* Profile icon */}
        </button>
      </div>
    </div>
  );
}

export default MessagePage;
