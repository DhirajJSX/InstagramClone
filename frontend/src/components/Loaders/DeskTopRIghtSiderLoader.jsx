import React from 'react';

const DeskTopRightSiderLoader = () => (
  <aside className="w-[20%] cursor-pointer hidden mr-20 lg:block px-5 py-6">
    <div className="space-y-4 animate-pulse">
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full bg-[#252625]"></div> {/* Circular skeleton for image */}
        <div className="ml-4">
          <div className="w-32 h-4 bg-[#252625] rounded"></div> {/* Skeleton for username */}
          <div className="w-40 h-3 bg-[#252625] mt-2 rounded"></div> {/* Skeleton for name */}
        </div>
      </div>
    </div>
  </aside>
);

export default DeskTopRightSiderLoader;
