import React, { useState, useEffect } from "react";
import LeftSidebar from "../HomePage/LeftSidebar";
import BottomNav from "../HomePage/BottomNav";

function MessagePage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  useEffect(() => {
    if (selectedUser) {
      fetch(`http://localhost:5000/messages/${selectedUser._id}`)
        .then((res) => res.json())
        .then((data) => setMessages(data.messages))
        .catch((err) => console.error("Error fetching messages:", err));
    }
  }, [selectedUser]);

  const sendMessage = async () => {
    if (newMessage.trim() && selectedUser) {
      try {
        const res = await fetch("http://localhost:5000/sendMessage", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ receiver: selectedUser._id, message: newMessage }),
        });

        const data = await res.json();
        setMessages([...messages, data.savedMessage]);
        setNewMessage("");
      } catch (error) {
        console.error("Send message error:", error);
      }
    }
  };

  return (
    <div className="flex h-screen">
      <div className="hidden sm:block">
        <LeftSidebar />
      </div>

      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700">
          <button className="text-xl text-gray-800 dark:text-white">
            <i className="fa fa-arrow-left"></i>
          </button>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white">Direct</h1>
          <button className="text-xl text-gray-800 dark:text-white">
            <i className="fa fa-pencil-alt"></i>
          </button>
        </header>

        <div className="p-4 border-b border-gray-300 dark:border-gray-700">
          <input
            type="text"
            placeholder="Search"
            className="w-full p-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className="w-1/3 border-r border-gray-300 dark:border-gray-700 overflow-y-auto">
            {users.length > 0 ? (
              users.map((user) => (
                <div
                  key={user._id}
                  className={`p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 ${
                    selectedUser?._id === user._id ? "bg-gray-300 dark:bg-gray-600" : ""
                  }`}
                  onClick={() => setSelectedUser(user)}
                >
                  <h2 className="font-semibold text-gray-800 dark:text-white">{user.userName}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 p-4">No users found</p>
            )}
          </div>

          <div className="w-2/3 flex flex-col">
            {selectedUser ? (
              <>
                <div className="p-4 bg-gray-100 dark:bg-gray-900 flex-1 overflow-y-auto">
                  {messages.length > 0 ? (
                    messages.map((msg, index) => (
                      <div
                        key={index}
                        className={`p-2 my-1 rounded-lg max-w-xs ${
                          msg.sender === selectedUser._id ? "bg-gray-300 dark:bg-gray-700" : "bg-blue-500 text-white"
                        }`}
                      >
                        {msg.message}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400">No messages yet</p>
                  )}
                </div>

                <div className="p-4 border-t border-gray-300 dark:border-gray-700">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="w-full p-2 border rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  />
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center flex-1">
                <p className="text-gray-500 dark:text-gray-400">Select a user to chat</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

export default MessagePage;
