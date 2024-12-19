import React, { useState, useEffect } from "react";
import { gsap } from "gsap";

function EditProfileModal({ setIsModalOpen, userInfo, profile, setProfile }) {
  const [username, setUsername] = useState(userInfo?.userName || "");
  const [name, setName] = useState(userInfo?.name || "");
  const [bio, setBio] = useState(profile?.bio || "");
  const [profileImage, setProfileImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
    }
  };

  const handleClose = () => {
    gsap.to(".modal-container", { opacity: 0, duration: 0.3, y: 50, ease: "power3.out" });
    setTimeout(() => {
      setIsModalOpen(false);
      
    }, 300);
  };

  // Close modal if the user clicks outside the modal content
  const handleBackdropClick = (e) => {
    if (e.target.id === "backdrop") {
      handleClose();
    }
  };

  useEffect(() => {
    // Animate modal on mount (fade in and slide up)
    gsap.fromTo(
      ".modal-container",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
    );

    
  }, []);


  return (
    <div
      id="backdrop"
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4 sm:px-6 lg:px-10"
      onClick={handleBackdropClick}
    >
      <div className="modal-container bg-[#242524] text-white rounded-lg p-6 w-full sm:w-[90%] md:w-[80%] lg:w-[50%] xl:w-[35%] relative">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center">Edit Profile</h2>

        {/* Username input */}
        <div className="mt-4">
          <label className="block mb-2 text-sm">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-3 w-full outline-none rounded-md text-lg bg-[#3c3c3c] text-white"
            placeholder="Enter new username"
          />
        </div>

        {/* Name input */}
        <div className="mt-4">
          <label className="block mb-2 text-sm">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 w-full outline-none rounded-md text-lg bg-[#3c3c3c] text-white"
            placeholder="Enter new name"
          />
        </div>

        {/* Bio input */}
        <div className="mt-4">
          <label className="block mb-2 text-sm">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="p-3 w-full outline-none rounded-md text-lg bg-[#3c3c3c] text-white resize-none h-24"
            placeholder="Enter bio"
          />
        </div>

        {/* Profile picture input */}
        <div className="mt-4">
          {profileImage && (
            <div className="mt-2 flex justify-center">
              <img
                src={URL.createObjectURL(profileImage)}
                alt="Profile Preview"
                className="w-24 h-24 rounded-full object-cover"
              />
            </div>
          )}
          <label className="block mb-2 text-sm">Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-white outline-none file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:text-black transition-all duration-150 ease-in-out cursor-pointer hover:file:bg-black hover:file:text-white"
          />
        </div>

        {/* Save & Close buttons */}
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button onClick={handleClose}>Cancel</button>
          <button
            // onClick={handleSaveChanges}
            className="px-6 py-3 bg-blue-500 text-white rounded-md w-full sm:w-auto"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfileModal;
