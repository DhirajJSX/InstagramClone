import React, { useState, useEffect, useRef } from "react";

function EditProfileModal({ isOpen, onClose, userInfo, onSave }) {
  const [formData, setFormData] = useState({
    userName: "",
    name: "",
    bio: "",
    profileImage: "", // This will store the image file
  });

  const [fileName, setFileName] = useState(""); // State to store the file name

  const modalRef = useRef(null); // Reference for the modal content

  useEffect(() => {
    // Populate form data with userInfo if available
    if (userInfo) {
      setFormData({
        userName: userInfo.userName || "",
        name: userInfo.name || "",
        bio: userInfo.bio || "",
        profileImage: userInfo.profileImage || "", // This will be a URL or file data
      });
    }
  }, [userInfo]);

  useEffect(() => {
    // Close the modal when clicked outside of it
    if (isOpen) {
      const handleClickOutside = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
          onClose();
        }
      };

      // Add event listener when modal is open
      document.addEventListener("mousedown", handleClickOutside);

      // Cleanup the event listener when modal is closed
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      // If it's the profile image input, store the file
      setFormData((prev) => ({
        ...prev,
        [name]: files[0], // Store the selected file
      }));
      setFileName(files[0].name); // Set the file name when a file is selected
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSave = () => {
    // You can send the form data as it is or handle file upload here
    onSave(formData); // Send updated data to parent
    onClose(); // Close modal after saving
  };

  const handleImagePreview = () => {
    if (formData.profileImage) {
      if (formData.profileImage instanceof Blob) {
        return URL.createObjectURL(formData.profileImage); // For image file
      }
      return formData.profileImage; // If it's a URL
    }
    return null;
  };

  return isOpen ? (
    <div className="fixed z-50 inset-0 text-[14px] bg-black bg-opacity-50 flex justify-center items-center">
      <div
        ref={modalRef}
        className="bg-[#171616] text-white p-4 sm:p-6 md:w-96 w-11/12 sm:w-96 rounded-lg shadow-xl"
      >
        <h2 className="text-xl font-semibold">Edit Profile</h2>
        <div className="mt-4">
          <label className="block text-sm font-medium">Username</label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            className="mt-1 p-2 w-full outline-none rounded-md text-black"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-2 w-full border outline-none rounded-md text-black"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium">Bio</label>
          <textarea
            name="bio"
            value={formData.bio || ""}
            onChange={handleChange}
            className="mt-1 py-2 px-3 w-full h-[100px] outline-none rounded-md text-black resize-none"
            rows="4"
          ></textarea>
        </div>

        {/* Profile Image Selection */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-300">
            Profile Image
          </label>

          <div className="relative mt-2">
            <input
              type="file"
              name="profileImage"
              onChange={handleChange}
              id="file-upload"
              className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
              accept="image/*"
            />
            <label
              htmlFor="file-upload"
              className="w-full py-3 px-6 bg-gray-800 text-white rounded-md shadow-md flex justify-center items-center cursor-pointer transition-all hover:bg-gray-700"
            >
              <span className="mr-2 text-[14px]">Choose Image</span>
            </label>
          </div>

          {/* Display the file name */}
          {fileName && (
            <p className="mt-2 text-sm text-gray-400">{fileName}</p>
          )}
        </div>

        <div className="mt-4 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 text-gray-300 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  ) : null;
}

export default EditProfileModal;
