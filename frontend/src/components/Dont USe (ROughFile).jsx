import React from "react";
import IGimg from "./../img/LoginPage/instagram.png";

function HomePage() {
  return (
    <div className="min-h-screen text-white bg-black">
      {/* Top Navigation Bar (Visible only on mobile) */}
      <header className="lg:hidden top-0 z-50 px-4 py-3 border-b-[1px] border-gray-700 flex items-center justify-between">
        <img src={IGimg} alt="Instagram Logo" className="h-8 mt-1" />
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search"
            className="hidden md:block px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none"
          />
          <button className="text-gray-600 dark:text-gray-300">🔔</button>
          <button className="text-gray-600 dark:text-gray-300">✉️</button>
          <img
            src="/profile.jpg"
            alt="Profile"
            className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600"
          />
        </div>
      </header>

      <div className="flex flex-col lg:flex-row justify-between">
        {/* Left Sidebar (Desktop Only) */}
       

        {/* Stories Section */}
        <div className="flex flex-col w-full lg:w-[50%] justify-center items-center">
          <div className="py-4 w-full lg:w-[80%] flex justify-center flex-row shadow-md">
            <div className="flex overflow-x-auto space-x-4">
              {Array(20)
                .fill(null)
                .map((_, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center space-y-2"
                  >
                    <div className="w-16 h-16 rounded-full border-2 border-indigo-500 p-1 flex items-center justify-center">
                      <img
                        src={`/profile.jpg`}
                        alt={`User ${idx + 1}`}
                        className="w-full h-full rounded-full"
                      />
                    </div>
                    <p className="text-sm text-white">User {idx + 1}</p>
                  </div>
                ))}
            </div>
          </div>
          {/* Main Content */}
          <main className="flex-1 mb-16 max-w-[600px] w-full px-3 pb-4 space-y-6">
            {Array(5)
              .fill(null)
              .map((_, idx) => (
                <div
                  key={idx}
                  className=" rounded-lg shadow-md overflow-hidden"
                >
                  <div className="flex justify-between items-center px-4 py-2">
                    <div className=" flex">
                      <img
                        src="/profile.jpg"
                        alt="Profile"
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="ml-3">
                        <p className="font-semibold text-gray-700 dark:text-gray-300">
                          User {idx + 1}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          2 hours ago
                        </p>
                      </div>
                    </div>
                    <div className=" flex justify-center items-center cursor-pointer">
                      <span>---</span>
                    </div>
                  </div>
                  <div className="w-full ">
                    <img
                      className="w-full h-auto max-h-[500px] object-cover"
                      src="https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Image"
                    />
                  </div>

                  <div className="px-4 py-2">
                    <div className="flex items-center space-x-4">
                      <button>❤️</button>
                      <button>💬</button>
                      <button>📤</button>
                    </div>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                      Liked by 120 people
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      View all 10 comments
                    </p>
                  </div>
                </div>
              ))}
          </main>
        </div>

        {/* Right Sidebar (Desktop Only) */}
        <aside className="w-[20%] hidden lg:block p-4">
          <div className="space-y-4">
            <div className="flex items-center">
              <img
                src="/profile.jpg"
                alt="Profile"
                className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-600"
              />
              <div className="ml-4">
                <p className="font-semibold text-gray-700 dark:text-gray-300">
                  dhiraj.bhawsar_
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Dhiraj
                </p>
              </div>
            </div>
            <div>
              <p className="font-semibold text-white mb-2">Suggested for you</p>
              <ul className="space-y-4">
                {Array(5)
                  .fill(null)
                  .map((_, idx) => (
                    <li key={idx} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img
                          src="/profile.jpg"
                          alt="Profile"
                          className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600"
                        />
                        <p className="ml-4 text-sm text-gray-700 dark:text-gray-300">
                          User {idx + 1}
                        </p>
                      </div>
                      <button className="text-blue-500 text-sm">Follow</button>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>

      {/* Bottom Navigation Bar (Mobile) */}
      <nav className="fixed bottom-0 w-full bg-black border-t border-gray-300 dark:border-gray-700 flex justify-around items-center py-5 lg:hidden z-50">
        <button className="text-gray-600 dark:text-gray-300">🏠</button>
        <button className="text-gray-600 dark:text-gray-300">🔍</button>
        <button className="text-gray-600 dark:text-gray-300">🎥</button>
        <button className="text-gray-600 dark:text-gray-300">❤️</button>
        <button className="text-gray-600 dark:text-gray-300">👤</button>
      </nav>
    </div>
  );
}

export default HomePage; 