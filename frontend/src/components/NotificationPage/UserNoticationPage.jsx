import React from "react";
import LeftSidebar from "../HomePage/LeftSidebar";
import BottomNav from "../HomePage/BottomNav";
import { motion } from "framer-motion";

function UserNotificationPage() {
  return (
    <div className="min-h-screen w-full flex bg-gradient-to-br from-black via-[#0e0e0e] to-[#1a1a1a] text-white">
      <div className="hidden lg:flex w-[15.5rem] bg-white/5 backdrop-blur-xl border-r border-white/10">
        <LeftSidebar />
      </div>
      <div className="flex-1 flex flex-col w-full">
        <div className="w-full px-4 md:px-6 py-4 border-b border-white/10 backdrop-blur-md bg-white/5">
          <h2 className="text-2xl font-semibold text-gray-100">
            Notifications
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4 space-y-4 pb-24 md:pb-6">
          {Array(10)
            .fill(null)
            .map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-center space-x-4 py-3 px-4 rounded-xl 
                  border border-white/10 bg-white/5 backdrop-blur-md 
                  shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full overflow-hidden border border-white/20">
                  <img
                    src={`https://via.placeholder.com/150?text=User+${index + 1}`}
                    alt={`User ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <p className="text-sm text-white/90">
                    <span className="font-semibold text-white">
                      user_{index + 1}
                    </span>{" "}
                    liked your post
                  </p>
                  <p className="text-xs text-white/50 mt-1">2 hours ago</p>
                </div>

                <div className="w-12 h-12 rounded-md overflow-hidden border border-white/20">
                  <img
                    src={`https://via.placeholder.com/150?text=Post+${index + 1}`}
                    alt={`Post ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            ))}
        </div>
      </div>

    
      <div className="lg:hidden fixed bottom-0 left-0 w-full z-50 backdrop-blur-md bg-white/5 border-t border-white/10">
        <BottomNav />
      </div>
    </div>
  );
}

export default UserNotificationPage;
