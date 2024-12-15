import React, { useState, useEffect } from "react";

function RightSidebar() {
  const [userInfo, setUserInfo] = useState(null); // To store user details dynamically

  useEffect(() => {
    // Fetch user info from the backend
    fetch("http://localhost:5000/me", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("JWT"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // Assuming the response contains the array and the first item has the 'postedBy' object
        if (result && result.length > 0) {
          setUserInfo(result[0].postedBy); // Set the 'postedBy' object as userInfo
        }
      })
      .catch((err) => console.error("Error fetching user info:", err));
  }, []);

  return (
    <aside className="w-[20%] cursor-pointer hidden mr-20 lg:block px-5 py-6">
      <div className="space-y-4">
        <div className="flex items-center">
          <img
            src="https://dhirajbhawsar-portfolio.vercel.app/assets/Untitled-3-Cd6rMY_V.png" // Fallback image if no profile picture
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover bg-gray-300 dark:bg-gray-600"
          />
          <div className="ml-4">
            <p className="font-semibold ">
              {userInfo?.userName} 
            </p>
            {/* Dynamic Full Name */}
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {userInfo?.name}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default RightSidebar;
