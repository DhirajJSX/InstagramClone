import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import SendIcon from "@mui/icons-material/Send";
import "react-toastify/dist/ReactToastify.css";

import { BASE_URL, CLOUD_NAME, CLOUD_PRESET } from "../../utils/config";
function UserMediaUpload({ closeModal }) {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [url, setUrl] = useState(""); 
  const [loading, setLoading] = useState(false);
const handleUpload = () => {
  if (!file) {
    toast.error("Please select an image or video to upload!");
    return;
  }

  setLoading(true);

  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", `${CLOUD_PRESET}`);

  fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: "POST",
    body: data,
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Cloudinary upload failed");
      }
      return res.json();
    })
    .then((data) => {
      console.log("File uploaded successfully, Cloudinary response:", data);

      setUrl(data.url);
      console.log("Image URL:", data.url);
      setLoading(false);
    })
    .catch((err) => {
      console.error("File upload failed:", err);
      toast.error("Failed to upload file!");
      setLoading(false);
    });
};


  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 50000000) {
        toast.error("File size is too large!");
        return;
      }
      if (
        !selectedFile.type.includes("image") &&
        !selectedFile.type.includes("video")
      ) {
        toast.error("Only images and videos are allowed!");
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  useEffect(() => {
    if (url) {
      // console.log("Sending post request to server with caption:", caption);

      fetch(`${BASE_URL}/createPost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("JWT"),
        },
        body: JSON.stringify({
          body: caption,
          pic: url, 
        }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Post creation failed");
          }
          return res.json();
        })
        .then((data) => {
          console.log("Post created successfully:", data);
          toast.success("Post uploaded successfully!"); 
          setTimeout(() => {
            closeModal();
            window.location.reload();
          }, 1000);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error saving post:", err);
          toast.error("Something Wents Wrong,Please Login your Account Again"); 
          setLoading(false);
        });
    }
  }, [url, caption, closeModal]);

  return (
    <div className="fixed font-Poppins inset-0 p-3 bg-black bg-opacity-50 flex justify-center items-center ">
      <div className="bg-[#262626] p-6 rounded-lg w-full sm:w-[400px] md:w-[450px] lg:w-[500px] xl:w-[550px] shadow-lg flex flex-col space-y-4 ">
        <h2 className="text-center text-xl font-semibold text-white">
          Upload Media
        </h2>

        <label
          htmlFor="file-input"
          className="text-white text-smbg-transparent text-center border-2 border-gray-600 p-2 rounded-lg cursor-pointer"
        >
          Select File
        </label>
        <input
          id="file-input"
          type="file"
          accept="image/*,video/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {file && (
          <div className="flex justify-center mb-4">
            {file.type.includes("video") ? (
              <video
                src={URL.createObjectURL(file)}
                controls
                className="w-full max-w-[350px] rounded-lg"
                alt="Preview"
              />
            ) : (
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="w-full max-w-[170px] rounded-lg"
              />
            )}
          </div>
        )}

        <div className="mb-4">
          <textarea
            value={caption}
            onChange={handleCaptionChange}
            placeholder="Write a caption..."
            rows="3"
            className="w-full p-3 text-white bg-transparent border border-gray-500 rounded-md focus:outline-none resize-none overflow-auto"
          />
        </div>

        <div className="flex justify-between space-x-4">
          <button className="" onClick={closeModal}>
            <div className="flex justify-center items-center">
              <span className="text-[14px]">Cancel</span>
            </div>
          </button>
          <button
            onClick={handleUpload}
            className={`py-2 px-2 ${loading ? "opacity-50" : ""}`}
            disabled={loading}
          >
            {loading ? "Uploading..." : <SendIcon />}
          </button>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default UserMediaUpload;
