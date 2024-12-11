import React from "react";

function RightSidebar() {
  return (
    <aside className="w-[20%] hidden lg:block p-10">
      <div className="space-y-4">
        <div className="flex items-center">
          <img src="/profile.jpg" alt="Profile" className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-600" />
          <div className="ml-4">
            <p className="font-semibold text-gray-700 dark:text-gray-300">dhiraj.bhawsar_</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Dhiraj</p>
          </div>
        </div>
        <div>
          <p className="font-semibold text-white mb-2">Suggested for you</p>
          <ul className="space-y-4">
            {Array(5).fill(null).map((_, idx) => (
              <li key={idx} className="flex items-center justify-between">
                <div className="flex items-center">
                  <img src="/profile.jpg" alt="Profile" className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600" />
                  <p className="ml-4 text-sm text-gray-700 dark:text-gray-300">User {idx + 1}</p>
                </div>
                <button className="text-blue-500 text-sm">Follow</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}

export default RightSidebar;
