import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import noProfile from "../../img/noImageProfile.jpg";
import DeskTopRIghtSiderLoader from "../Loaders/deskTopRIghtSiderLoader";

function RightSidebar() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(""); // To store user details dynamically
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    // Fetch user info from the backend
    fetch("http://localhost:5000/profile", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("JWT"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setUserInfo(result.user);
        setImg(result.profile);
        setTimeout(() => {
          setLoading(false)
        }, 3000); // Data is loaded, set loading to false
      })
      .catch((err) => {
        console.error("Error fetching user info:", err);
        setLoading(false); // In case of error, stop loading
      });
  }, []);

  const userInfoButton = () => {
    navigate("/profile", { state: { userId: userInfo?._id } });
  };

  // If loading, show a loading placeholder
  if (loading) {
    return (
    <>
    <DeskTopRIghtSiderLoader  />
    </>
      
    );
  }

  return (
    <aside onClick={userInfoButton} className="w-[20%] cursor-pointer hidden mr-20 lg:block px-5 py-6">
      <div className="space-y-4">
        <div className="flex items-center">
          <img
            src={img?.profileImage && noProfile} // Fallback image if no profile picture
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="ml-4">
            <p className="font-semibold">{userInfo?.userName}</p>
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
