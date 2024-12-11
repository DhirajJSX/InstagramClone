import React from "react";

function MainContent() {
  return (
    <main className="flex-1 mb-16 max-w-[600px] w-full pb-4 space-y-6">
      {Array(5).fill(null).map((_, idx) => (
        <div key={idx} className="rounded-lg shadow-md overflow-hidden">
          <div className="flex justify-between items-center px-4 py-2">
            <div className=" flex cursor-pointer">
              <img src="https://img.freepik.com/free-photo/close-up-portrait-young-african-man-with-stubble_171337-1296.jpg" alt="Profile" className="w-11 h-11 rounded-full" />
              <div className="ml-3 ">
                <p className="font-semibold text-gray-700 dark:text-gray-300">User {idx + 1}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">2 hours ago</p>
              </div>
            </div>
            <div className="flex justify-center items-center cursor-pointer">
              <span>---</span>
            </div>
          </div>
          <div className="w-full ">
            <img className="w-full h-auto max-h-[500px] object-cover" src="https://img.freepik.com/free-photo/close-up-portrait-young-african-man-with-stubble_171337-1296.jpg  " alt="Image" />
          </div>

          <div className="px-4 py-2">
            <div className="flex justify-between items-center ">
              <div className="flex items-center space-x-4">
                <button>❤️</button>
                <button>💬</button>
                <button>📤</button>
              </div>

              <div className=" flex justify-center items-center px-3">
                <button>🚀</button>
              </div>
            </div>

            <p className="mt-2 text-gray-600 dark:text-gray-300">Liked by 120 people</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">View all 10 comments</p>
          </div>
        </div>
      ))}
    </main>
  );
}

export default MainContent;
