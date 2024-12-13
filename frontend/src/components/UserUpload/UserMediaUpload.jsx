import React, { useState } from "react";
import SendIcon from '@mui/icons-material/Send';
function UserMediaUpload({ closeModal }) {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(URL.createObjectURL(selectedFile));
    }
  };

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

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
            {file.includes("video") ? (
              <video
                src={file}
                controls
                className="w-full max-w-[350px] rounded-lg"
                alt="Preview"
              />
            ) : (
              <img
                src={file}
                alt="Preview"
                className="w-full max-w-[350px] rounded-lg"
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
          <button
            className=""
            onClick={closeModal}
          >
            <div className=" flex justify-center  items-center">
              <span className="text-[14px]">Cancel</span>
            </div>
          </button>
          <button className=" py-2 px-2">
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserMediaUpload;
