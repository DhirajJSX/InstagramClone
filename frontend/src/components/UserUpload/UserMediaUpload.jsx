import React, { useState } from 'react';

function UserMediaUpload() {
  const [file, setFile] = useState(null);

  // Function to handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(URL.createObjectURL(selectedFile)); // Preview the file
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-center text-2xl font-bold mb-4">Upload Your Photo or Video</h2>

        <div className="flex justify-center mb-4">
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
            className="hidden"
            id="file-input"
          />
          <label
            htmlFor="file-input"
            className="cursor-pointer bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600"
          >
            Choose File
          </label>
        </div>

        {file && (
          <div className="flex justify-center mb-4">
            {file.includes("video") ? (
              <video
                src={file}
                controls
                className="w-full max-w-xs rounded-md"
                alt="Preview"
              />
            ) : (
              <img
                src={file}
                alt="Preview"
                className="w-full max-w-xs rounded-md"
              />
            )}
          </div>
        )}

        <div className="flex justify-between items-center">
          <button
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-full hover:bg-gray-400"
            onClick={() => setFile(null)} // Clear selected file
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserMediaUpload;
