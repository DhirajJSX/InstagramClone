import React, { useRef } from "react";

function StoriesSection() {
  const scrollContainerRef = useRef(null);

  const handleScroll = (direction) => {
    const container = scrollContainerRef.current;
    const scrollAmount = 200; 
    if (container) {
      container.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="py-4 pl-2 w-full lg:w-[80%] flex justify-center items-center relative">
      <button
        onClick={() => handleScroll("left")}
        className="absolute left-2 bg-gray-800 text-white rounded-full p-2 outline-none hover:bg-gray-700 hidden sm:block "
      >
      {"<"}
      </button>
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto space-x-4 no-scrollbar w-full"
      >
        {Array(20)
          .fill(null)
          .map((_, idx) => (
            <div key={idx} className="flex flex-col items-center space-y-2">
              <div className="w-[75px] h-[75px] rounded-full border-2 border-indigo-500 p-1 cursor-pointer flex items-center justify-center">
                <img
                  src="https://img.freepik.com/free-photo/close-up-portrait-young-african-man-with-stubble_171337-1296.jpg"
                  alt={`User ${idx + 1}`}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <p className="text-sm text-white">User {idx + 1}</p>
            </div>
          ))}
      </div>
      <button
        onClick={() => handleScroll("right")}
        className="absolute right-2 z-10 bg-gray-800 text-white rounded-full outline-none p-2 hover:bg-gray-700 hidden sm:block"
      >
      {">"}
      </button>
    </div>
  );
}

export default StoriesSection;
