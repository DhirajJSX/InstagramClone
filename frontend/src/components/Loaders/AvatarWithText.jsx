import React from "react";

const AvatarWithText = () => {
  return (
    <div className="animate-pulse space-y-4 pb-[20px]">
      {/* Header: Profile Picture and User Info */}
      <div className="flex items-center space-x-8">
        <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56 bg-[#252625] rounded-full"></div>

        <div className="flex-1 space-y-4">
          <div className="h-5 bg-[#252625] rounded w-[200px] sm:w-48 md:w-64 lg:w-72"></div>
          <div className="h-5 bg-[#252625] rounded w-[150px] sm:w-32 md:w-40 lg:w-48"></div>
        </div>
      </div>

      {/* Statistics (Posts, Followers, Following) */}
     

      {/* Bio and Link */}
      <div className="mt-4">
        <div className="h-4 bg-[#252625] rounded w-[200px]  sm:w-48 md:w-64 lg:w-72"></div>
        <div className="h-3 bg-[#252625] rounded w-[160px]  sm:w-32 md:w-40 lg:w-48 mt-2"></div>
        <div className="h-3 bg-[#252625] rounded w-[150px]  sm:w-32 md:w-40 lg:w-48 mt-2"></div>
      </div>
    </div>
  );
};

export default AvatarWithText;
