import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(`/api/user/${username}`);
        setUserData(res.data);
      } catch (error) {
        console.error("Error fetching user profile", error);
      }
    };

    fetchUserProfile();
  }, [username]);

  if (!userData) return <p>Loading profile...</p>;

  const { user, profile } = userData;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{user.userName}</h1>
      <p>Email: {user.email}</p>
      <p>Bio: {profile.bio}</p>
    </div>
  );
};

export default UserProfile;
