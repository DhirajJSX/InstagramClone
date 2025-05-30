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

  if (!data) return <p>Loading...</p>;

  const { user, profile, posts } = data;

  return (
    <div className="w-full max-w-5xl px-3 py-4">
      <div className="flex items-center space-x-8">
        <div className="w-24 h-24 rounded-full overflow-hidden">
          <img
            src={profile?.profileImage || noProfile}
            alt="Profile"
            className="object-cover w-full h-full"
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold">{user.userName}</h2>
          <div className="flex space-x-4 mt-2">
            <div>{posts?.length || 0} posts</div>
            <div>{profile?.followers?.length || 0} followers</div>
            <div>{profile?.following?.length || 0} following</div>
          </div>
          <div className="mt-2">
            <p>{user.name}</p>
            <p>{profile?.bio}</p>
            {profile?.link && (
              <a
                href={profile.link}
                className="text-blue-500"
                target="_blank"
                rel="noreferrer"
              >
                {profile.link}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewUserProfile;
