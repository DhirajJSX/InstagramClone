import React, { useState, useEffect } from "react";
import { toast, ToastContainer, Slide } from "react-toastify";
import SendIcon from "@mui/icons-material/Send";
import "react-toastify/dist/ReactToastify.css";

import { BASE_URL, CLOUD_NAME, CLOUD_PRESET } from "../../utils/config";

function UserMediaUpload({ closeModal }) {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        setUrl(data.url);
        setLoading(false);
      })
      .catch(() => {
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
        .then(() => {
          toast.success("Post uploaded successfully!");
          setTimeout(() => {
            closeModal();
            window.location.reload();
          }, 1000);
          setLoading(false);
        })
        .catch(() => {
          toast.error("Something went wrong, please login again.");
          setLoading(false);
        });
    }
  }, [url, caption, closeModal]);
  return (
  <div className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm z-50">
    <div className="w-full max-w-lg p-6 rounded-xl bg-white/10 backdrop-blur-md border border-white/30 shadow-xl flex flex-col space-y-6 font-Poppins">
      <h2 className="text-center text-2xl font-semibold text-white drop-shadow-md">
        Upload Media
      </h2>
      <label
        htmlFor="file-input"
        className="cursor-pointer rounded-lg border border-white/40 bg-white/20 py-3 text-center text-white text-sm font-medium transition-colors duration-300 hover:bg-white/30 active:bg-white/40 select-none"
      >
        {file ? file.name : "Select Image or Video"}
      </label>
      <input
        type="file"
        id="file-input"
        accept="image/*,video/*"
        className="hidden"
        onChange={handleFileChange}
      />

      <textarea
        value={caption}
        onChange={handleCaptionChange}
        placeholder="Write a caption..."
        rows={3}
        className="resize-none rounded-lg border border-white/30 bg-white/10 px-4 py-3 text-white placeholder-white/60 focus:outline-none"
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className={`flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-white font-medium transition-all duration-300 ${
          loading
            ? "bg-gray-500 cursor-not-allowed"
            : " bg-gradient-to-r from-pink-600 to-purple-600 hover:opacity-90"
        }`}
      >
        {loading ? "Uploading..." : "Upload"}
        {!loading && <SendIcon />}
      </button>

      <button
        onClick={closeModal}
        className="text-sm text-white hover:underline text-center"
      >
        Cancel
      </button>
    </div>

  </div>
);

}

export default UserMediaUpload;
