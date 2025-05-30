import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../../utils/config";
import noProfile from "../../../img/noImageProfile.jpg";

function ViewUserProfile() {
  const { username } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/user/${username}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("JWT"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result);
      })
      .catch((err) => console.error(err));
  }, [username]);

  if (!data) return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  const { user, profile, posts } = data;

  return (
    <div className="flex justify-center mt-8 px-4 sm:px-6 md:px-8">
      <div className="w-full max-w-5xl bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-10">
          <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600">
            <img
              src={profile?.profileImage || noProfile}
              alt="Profile"
              className="object-cover w-full h-full"
            />
          </div>

          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{user.userName}</h1>

            <div className="flex space-x-8 mt-3 text-gray-700 dark:text-gray-400 font-medium">
              <div>
                <span className="font-semibold text-gray-900 dark:text-gray-200">{posts?.length || 0}</span> posts
              </div>
              <div>
                <span className="font-semibold text-gray-900 dark:text-gray-200">{profile?.followers?.length || 0}</span> followers
              </div>
              <div>
                <span className="font-semibold text-gray-900 dark:text-gray-200">{profile?.following?.length || 0}</span> following
              </div>
            </div>

            <div className="mt-4 text-gray-800 dark:text-gray-300">
              <p className="text-lg font-semibold">{user.name}</p>
              <p className="mt-1 whitespace-pre-wrap">{profile?.bio || "No bio available."}</p>

              {profile?.link && (
                <a
                  href={profile.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-3 text-blue-600 hover:underline break-all"
                >
                  {profile.link}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewUserProfile;
