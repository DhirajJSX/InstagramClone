import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { BASE_URL, CLOUD_NAME, CLOUD_PRESET } from "../../../utils/config";
import noProfile from "../../../img/noImageProfile.jpg";

function EditProfileModal({ userInfo, profile, setProfile, setUserInfo, onClose, onUpdateProfile }) {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [url, setUrl] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(noProfile);
  const [isSaving, setIsSaving] = useState(false);
  const isDirty = useRef(false);

  useEffect(() => {
    gsap.fromTo(
      ".modal-container",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
    );

    setUsername(userInfo?.userName || "");
    setName(userInfo?.name || "");
    setBio(profile?.bio || "");
    setUrl(profile?.link || "");
    setProfileImage(profile?.profileImage || null);
    setImagePreviewUrl(profile?.profileImage || noProfile);
    isDirty.current = false;

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [userInfo, profile, onClose]);

  useEffect(() => {
    if (profileImage instanceof File) {
      const url = URL.createObjectURL(profileImage);
      setImagePreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else if (typeof profileImage === "string" && profileImage) {
      setImagePreviewUrl(profileImage);
    } else {
      setImagePreviewUrl(noProfile);
    }
  }, [profileImage]);

  const markDirty = () => {
    isDirty.current = true;
  };

  const handleUsernameChange = (e) => {
    markDirty();
    setUsername(e.target.value);
  };
  const handleNameChange = (e) => {
    markDirty();
    setName(e.target.value);
  };
  const handleBioChange = (e) => {
    markDirty();
    setBio(e.target.value);
  };
  const handleUrlChange = (e) => {
    markDirty();
    setUrl(e.target.value);
  };

  const handleImageChange = (e) => {
    markDirty();
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleClose = () => {
    if (isDirty.current) {
      const confirmClose = window.confirm("You have unsaved changes. Are you sure you want to close?");
      if (!confirmClose) return;
    }
    gsap.to(".modal-container", { opacity: 0, duration: 0.3, y: 50, ease: "power3.out" });
    setTimeout(() => onClose(), 300);
  };

  const handleBackdropClick = (e) => {
    if (e.target.id === "backdrop") handleClose();
  };

  const uploadImageToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", CLOUD_PRESET);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: data,
    });

    const json = await res.json();

    if (res.ok) return json.secure_url;
    throw new Error(json.error?.message || "Cloudinary upload failed");
  };

  const handleSaveChanges = async () => {
    if (!username.trim()) {
      alert("Username cannot be empty.");
      return;
    }

    setIsSaving(true);
    try {
      let uploadedImageUrl = profile?.profileImage || null;

      if (profileImage && profileImage instanceof File) {
        uploadedImageUrl = await uploadImageToCloudinary(profileImage);
      }

      const updatedProfileData = {
        userName: username.trim(),
        name: name.trim(),
        bio: bio.trim(),
        url: url.trim(),
        profileImage: uploadedImageUrl,
      };

      const res = await fetch(`${BASE_URL}/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("JWT"),
        },
        body: JSON.stringify(updatedProfileData),
      });

      if (!res.ok) throw new Error("Update failed");

      const updatedProfile = await res.json();

      onUpdateProfile({ userName: updatedProfile.userName, name: updatedProfile.name }, updatedProfile);

      isDirty.current = false;
      handleClose();
      setTimeout(() => {
        window.location.reload();
      }, 350);
    } catch (error) {
      alert("Failed to save profile changes: " + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      id="backdrop"
      onClick={handleBackdropClick}
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 px-10 sm:px-6 lg:px-30"
      aria-modal="true"
      role="dialog"
      aria-labelledby="edit-profile-title"
      tabIndex={-1}
    >
      <div
        className="modal-container bg-[#1e1e1f] text-white rounded-xl p-6 w-full max-w-xl relative shadow-lg shadow-black/70"
      >
        <h2 id="edit-profile-title" className="text-2xl sm:text-3xl font-bold mb-6 text-center tracking-wide">
          Edit Profile
        </h2>

        <div className="flex flex-col items-center mb-6">
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-blue-600 shadow-md shadow-blue-700/50">
            <img
              src={imagePreviewUrl}
              alt="Profile Preview"
              className="w-full h-full object-cover"
            />
          </div>
          <label
            htmlFor="profileImageInput"
            className="mt-3 cursor-pointer text-blue-500 hover:text-blue-400 font-semibold transition"
          >
            Change Profile Picture
          </label>
          <input
            type="file"
            id="profileImageInput"
            accept="image/*"
            onChange={handleImageChange}
            disabled={isSaving}
            className="hidden"
          />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSaveChanges();
          }}
          className="space-y-5"
          noValidate
        >
          <div>
            <label htmlFor="username" className="block mb-1 text-sm font-medium text-gray-300">
              Username <span className="text-red-500">*</span>
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={handleUsernameChange}
              className="w-full p-3 rounded-md bg-[#2c2c2e] text-white text-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter new username"
              disabled={isSaving}
              required
              autoComplete="username"
            />
          </div>

          <div>
            <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-300">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={handleNameChange}
              className="w-full p-3 rounded-md bg-[#2c2c2e] text-white text-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter new name"
              disabled={isSaving}
              autoComplete="name"
            />
          </div>

          <div>
            <label htmlFor="bio" className="block mb-1 text-sm font-medium text-gray-300">
              Bio
            </label>
            <textarea
              id="bio"
              value={bio}
              onChange={handleBioChange}
              className="w-full p-3 rounded-md bg-[#2c2c2e] text-white text-lg placeholder:text-gray-400 resize-none h-24 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter bio"
              disabled={isSaving}
            />
          </div>

          <div>
            <label htmlFor="url" className="block mb-1 text-sm font-medium text-gray-300">
              Website / URL
            </label>
            <input
              id="url"
              type="url"
              value={url}
              onChange={handleUrlChange}
              className="w-full p-3 rounded-md bg-[#2c2c2e] text-white text-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Add your url"
              disabled={isSaving}
              autoComplete="url"
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-3 mt-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSaving}
              className="w-full sm:w-auto px-6 py-3 border border-gray-600 rounded-md text-gray-300 hover:bg-gray-700 transition focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 rounded-md text-white font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfileModal;
