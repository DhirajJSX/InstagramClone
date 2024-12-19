import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import SendIcon from "@mui/icons-material/Send";
import "react-toastify/dist/ReactToastify.css";

function UserMediaUpload({ closeModal }) {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [url, setUrl] = useState(""); // To store the uploaded image URL
  const [loading, setLoading] = useState(false);

  // Function to handle file upload when the user clicks "Upload"
  const handleUpload = () => {
    if (!file) {
      toast.error("Please select an image or video to upload!"); // If no file selected, show an error
      return; // Don't proceed if no file is selected
    }

    setLoading(true); // Start loading when the file is selected

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "CLoneDAta");
    data.append("cloud_name", "igcloudclone");

    // Upload the file to Cloudinary
    fetch("https://api.cloudinary.com/v1_1/igcloudclone/image/upload", {
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

        // Successfully uploaded the file, get the image URL
        setUrl(data.url); // Save the URL to state
        console.log("Image URL:", data.url); // Log the image URL
      })
      .catch((err) => {
        console.error("File upload failed:", err);
        toast.error("Failed to upload file!"); // Show error toast
        setLoading(false);
      });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Validate file size and type
      if (selectedFile.size > 50000000) {
        // 5MB size limit
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

  // Effect to handle post creation after URL is set
  useEffect(() => {
    if (url) {
      // Proceed only if the URL is available (after file upload to Cloudinary)
      console.log("Sending post request to server with caption:", caption);

      fetch("http://localhost:5000/createPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("JWT"),
        },
        body: JSON.stringify({
          body: caption,
          pic: url, // Use the uploaded URL here
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
          toast.success("Post uploaded successfully!"); // Show success toast
          setTimeout(() => {
            closeModal(); // Close modal after 3 seconds
            window.location.reload();
          }, 1000);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error saving post:", err);
          toast.error("Something Wents Wrong,Please Login your Account Again"); // Show error toast
          setLoading(false);
        });
    }
  }, [url, caption, closeModal]); // Only run this effect when `url` is updated

  return (
    <div className="fixed font-Poppins inset-0 p-3 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#262626] p-6 rounded-lg w-full sm:w-[400px] md:w-[450px] lg:w-[500px] xl:w-[550px] shadow-lg flex flex-col space-y-4">
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

      {/* Toast Container for showing notifications */}
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default UserMediaUpload;
