import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LeftSidebar from "../HomePage/LeftSidebar";
import BottomNav from "../HomePage/BottomNav";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

function MessagePage() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");
  const chatEndRef = useRef(null);

  const users = [
    {
      name: "John Doe",
      email: "johndoe@example.com",
      image:
        "https://andrewstuder.com/wp-content/uploads/2020/04/AF3I3830-scaled.jpg",
    },
    {
      name: "Jane Smith",
      email: "janesmith@example.com",
      image:
        "https://andrewstuder.com/wp-content/uploads/2020/04/AF3I3830-scaled.jpg",
    },
  ];

  const chatMessages = [
    { sender: "John Doe", message: "Hey! How are you?", time: "10:00 AM" },
    { sender: "You", message: "I'm good! What about you?", time: "10:05 AM" },
    { sender: "John Doe", message: "Doing well!", time: "10:10 AM" },
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  return (
    <div className="flex h-screen bg-[#121212] text-white ">
      {/* Sidebar */}
      <div className="hidden sm:block">
        <LeftSidebar />
      </div>

      <div className="flex-1 flex flex-col">
        {!selectedUser && (
          <header className="flex items-center justify-between p-4 border-b border-gray-700">
            <h1 className="text-2xl font-semibold">Direct</h1>
          </header>
        )}

        <div className="flex flex-1 overflow-hidden">
          {/* User List */}
          <AnimatePresence>
            {!selectedUser && (
              <motion.div
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-100%", opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute sm:relative pb-12 border-r border-[#374151] overflow-y-auto w-full h-full bg-[#1A1A1A]"
              >
                {users.map((user, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-4 flex items-center space-x-3 cursor-pointer rounded-md transition-all duration-300 hover:bg-[#242424]"
                    onClick={() => setSelectedUser(user)}
                  >
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-12 h-12 rounded-full border-2 border-gray-500"
                    />
                    <div>
                      <h2 className="font-semibold">{user.name}</h2>
                      <p className="text-sm text-gray-400">{user.email}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Chat Area */}
          <AnimatePresence>
            {selectedUser && (
              <motion.div
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col"
              >
                {/* Chat Header */}
                <motion.div
                  layout
                  className="flex items-center p-4 border-b border-gray-700 bg-[#1A1A1A] sticky top-0 z-10"
                >
                  <button
                    className="block text-white mr-3"
                    onClick={() => setSelectedUser(null)}
                  >
                    <ArrowBackIosIcon />
                  </button>
                  <img
                    src={selectedUser.image}
                    alt={selectedUser.name}
                    className="w-10 h-10 rounded-full mr-3 border border-gray-600"
                  />
                  <h2 className="text-lg font-semibold">{selectedUser.name}</h2>
                </motion.div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {chatMessages.map((msg, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.1 }}
                      className={`flex ${
                        msg.sender === "You" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`p-3 rounded-2xl max-w-[75%] text-sm ${
                          msg.sender === "You"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-800 text-gray-300"
                        }`}
                      >
                        <p>{msg.message}</p>
                        <span className="text-xs text-gray-400 block mt-1">
                          {msg.time}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                  <div ref={chatEndRef} />
                </div>

                {/* Message Input - Fixed at Bottom */}
                <motion.div
                  layout
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="p-4 border-t border-gray-700 bg-[#1A1A1A] sticky bottom-0 z-10 flex items-center"
                >
                  <input
                    type="text"
                    placeholder="Message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-2 bg-[#242424] rounded-full focus:outline-none px-4 text-white placeholder-gray-500"
                  />
                  <motion.button
                    whileTap={{ scale: 0.4}}
                    className="ml-3 text-white bg-blue-500 p-2 rounded-full hover:bg-blue-600 transition"
                  >
                    <SendIcon  className="ml-1" />
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

export default MessagePage;
