import React from "react";

function BottomNav() {
  return (
    <nav className="fixed bottom-0 w-full bg-black border-t border-gray-300 dark:border-gray-700 flex justify-around items-center py-5 lg:hidden z-50">
      <button className="text-gray-600 dark:text-gray-300">🏠</button>
      <button className="text-gray-600 dark:text-gray-300">🔍</button>
      <button className="text-gray-600 dark:text-gray-300">🎥</button>
      <button className="text-gray-600 dark:text-gray-300">❤️</button>
      <button className="text-gray-600 dark:text-gray-300">👤</button>
    </nav>
  );
}

export default BottomNav;
