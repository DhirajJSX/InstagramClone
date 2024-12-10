import React, { useState, useEffect } from "react";
import IGimg from "./../img/LoginPage/instagram.png";

function HomePage() {
  // State to store if the user is on mobile or desktop
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  // Update the state when the window is resized
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      {/* Header with Instagram logo (Visible only on mobile view) */}
      {!isDesktop && (
        <header className="flex justify-between items-center p-4 border-b border-gray-700">
          <img className="w-[100px]" src={IGimg} alt="Instagram" />
          <div className="flex justify-center items-center space-x-6">
            <button className="text-2xl cursor-pointer hover:text-white">❤️</button>
            <button className="text-2xl cursor-pointer hover:text-white">✉️</button>
          </div>
        </header>
      )}

      {/* Main content container */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar (Left side) - visible only on desktop */}
        {isDesktop && (
          <aside className="w-1/5 text-white border-r p-4 hidden lg:block shadow-md h-screen">
            <div className="flex items-center justify-center my-6">
              <img className="w-[120px]" src={IGimg} alt="Instagram" />
            </div>
            <ul className="space-y-6">
              {[
                { name: "Home", icon: "🏠" },
                { name: "Search", icon: "🔍" },
                { name: "Explore", icon: "🗺️" },
                { name: "Reels", icon: "🎥" },
                { name: "Messages", icon: "✉️" },
                { name: "Notifications", icon: "🔔" },
                { name: "Create", icon: "➕" },
                { name: "Profile", icon: "👤" },
              ].map((item, index) => (
                <li key={index} className="flex items-center space-x-4 px-4 py-2 rounded-md hover:bg-[#1A1A1A] hover:text-white transition cursor-pointer">
                  <span className="text-2xl">{item.icon}</span>
                  <p className="text-lg">{item.name}</p>
                </li>
              ))}
            </ul>
          </aside>
        )}

        {/* Main Content - Posts Feed */}
        <main className="w-full lg:w-3/5 px-4 py-2 space-y-6 overflow-auto">
          {/* Stories Section */}
          <div className="flex space-x-4 overflow-x-auto py-1 scrollbar-none">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto border-4 border-blue-500 transition-transform transform hover:scale-110"></div>
                <p className="mt-2 text-sm">User {i + 1}</p>
              </div>
            ))}
          </div>

          {/* Posts */}
          {[...Array(3)].map((_, i) => (
            <div key={i} className="shadow-lg rounded-lg overflow-hidden mb-4 transition-shadow hover:shadow-xl">
              {/* Post Header */}
              <div className="flex items-center p-2 border-b">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <div className="ml-3">
                  <p className="font-bold text-white">User {i + 1}</p>
                  <p className="text-sm text-gray-500">21h ago</p>
                </div>
              </div>

              {/* Post Content */}
              <div className="w-full h-96">
                <img src="https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Post" className="object-cover w-full h-full" />
              </div>

              {/* Post Actions */}
              <div className="p-2">
                <div className="flex items-center space-x-6">
                  <button className="text-lg hover:text-red-500">❤️</button>
                  <button className="text-lg hover:text-blue-500">💬</button>
                  <button className="text-lg hover:text-green-500">🔗</button>
                </div>
                <p className="mt-4 text-sm">
                  <span className="font-bold text-white">User {i + 1}</span> This is a sample caption for post {i + 1}.
                </p>
              </div>
            </div>
          ))}
        </main>

        {/* Suggestions Sidebar - Right side - visible only on desktop */}
        {isDesktop && (
          <aside className="mt-4 w-1/5 bg-white p-4 hidden lg:block shadow-md h-screen overflow-auto">
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-gray-800">Suggested for you</h2>
              <div className="flex flex-col space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 transition-all">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                      <p className="ml-3 text-gray-800">User {i + 1}</p>
                    </div>
                    <button className="text-blue-500 hover:text-blue-700 transition">Follow</button>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        )}
      </div>

      {/* Bottom Navigation Bar (Visible only on mobile view) */}
      {!isDesktop && (
        <footer className="fixed bottom-0 left-0 w-full bg-black p-3 border-t border-gray-700 flex justify-around items-center">
          <div className="flex flex-col items-center">
            <span className="text-2xl">🏠</span>
            <p className="text-sm">Home</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl">🔍</span>
            <p className="text-sm">Search</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl">➕</span>
            <p className="text-sm">Create</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl">🔔</span>
            <p className="text-sm">Notifications</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl">👤</span>
            <p className="text-sm">Profile</p>
          </div>
        </footer>
      )}
    </div>
  );
}

export default HomePage;
