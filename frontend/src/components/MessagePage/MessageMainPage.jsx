import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import LeftSidebar from "../HomePage/LeftSidebar";

const userListVariants = {
  initial: { x: "-100%", opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: "-100%", opacity: 0 },
};

const chatBoxVariants = {
  initial: { x: "100%", opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: "100%", opacity: 0 },
};

function MessagePage() {
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { sender: "John Doe", message: "Hey! How are you?", time: "10:00 AM" },
    { sender: "You", message: "I'm good! What about you?", time: "10:05 AM" },
    { sender: "John Doe", message: "Doing well!", time: "10:10 AM" },
  ]);
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

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const sendMessage = () => {
    if (message.trim() === "") return;
    setChatMessages((prev) => [
      ...prev,
      {
        sender: "You",
        message: message.trim(),
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const backButton = () => {
    navigate("/home");
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-black via-[#0e0e0e] to-[#1a1a1a] text-white overflow-hidden">
      <div className="hidden lg:flex w-[15.5rem] bg-white/5 backdrop-blur-xl border-r border-white/10">
        <LeftSidebar />
      </div>

      <div className="flex flex-1 flex-col min-w-0">
        <header className="flex items-center gap-2 p-4 border-b border-white/10 backdrop-blur-md bg-white/5">
          <button onClick={backButton} className="lg:hidden">
            <ArrowBackIosIcon />
          </button>
          <h1 className="text-2xl font-semibold text-white/90">
            {selectedUser ? selectedUser.name : "Inbox"}
          </h1>
        </header>

        <div className="flex flex-1 min-w-0 overflow-hidden relative">
          <AnimatePresence mode="wait">
            {!selectedUser && (
              <motion.div
                variants={userListVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="absolute sm:relative w-full pb-20 border-r border-white/10 overflow-y-auto h-full bg-white/5 backdrop-blur-md"
              >
                {users.map((user, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedUser(user)}
                    className="flex items-center gap-4 p-4 border-b border-white/10 cursor-pointer hover:bg-white/10"
                  >
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h2 className="text-lg font-medium">{user.name}</h2>
                      <p className="text-sm text-white/60">{user.email}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {selectedUser && (
              <motion.div
                variants={chatBoxVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="absolute sm:relative w-full h-full flex flex-col bg-white/5 backdrop-blur-md"
              >
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {chatMessages.map((msg, i) => (
                    <div
                      key={i}
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        msg.sender === "You"
                          ? "ml-auto bg-blue-600"
                          : "bg-gray-700"
                      }`}
                    >
                      <p>{msg.message}</p>
                      <span className="block text-xs text-white/60 mt-1 text-right">
                        {msg.time}
                      </span>
                    </div>
                  ))}
                  <div ref={chatEndRef}></div>
                </div>

                <div className="p-4 border-t border-white/10 bg-white/5 flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 px-4 py-2 rounded-full bg-white/10 text-white placeholder-white/60 focus:outline-none"
                  />
                  <button
                    onClick={sendMessage}
                    className="p-2 bg-blue-600 rounded-full hover:bg-blue-700"
                  >
                    <SendIcon />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default MessagePage;
