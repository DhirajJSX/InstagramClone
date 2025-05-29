import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import noProfile from "../../img/noImageProfile.jpg";
import DeskTopRIghtSiderLoader from "../Loaders/DeskTopRIghtSiderLoader";
import { BASE_URL } from "../../Data/config";

function RightSidebar() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState("");
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_URL}/profile`, {
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
        }, 3000);
      })
      .catch((err) => {
        console.error("Error fetching user info:", err);
        setLoading(false); 
      });
  }, []);

  const userInfoButton = () => {
    navigate("/profile", { state: { userId: userInfo?._id } });
  };

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
            src={img?.profileImage && noProfile} 
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="ml-4">
            <p className="font-semibold">{userInfo?.userName}</p>

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
