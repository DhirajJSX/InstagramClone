// StoriesSection.jsx
import React from "react";

function StoriesSection() {
  return (
    <div className="py-4 w-full lg:w-[80%] flex justify-center flex-row shadow-md">
      <div className="flex overflow-x-auto space-x-4">
        {Array(20).fill(null).map((_, idx) => (
          <div key={idx} className="flex flex-col items-center space-y-2">
            <div className="w-16 h-16 rounded-full border-2 border-indigo-500 p-1 curso flex items-center justify-center">
              <img src="https://img.freepik.com/free-photo/close-up-portrait-young-african-man-with-stubble_171337-1296.jpg" alt={`User ${idx + 1}`} className="w-full h-full rounded-full object-cover " />
            </div>
            <p className="text-sm text-white">User {idx + 1}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StoriesSection;
