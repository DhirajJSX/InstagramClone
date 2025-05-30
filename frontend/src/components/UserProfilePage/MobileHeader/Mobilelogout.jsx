import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function Mobilelogout() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userName = localStorage.getItem("userName") || "User";

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      dispatch({ type: "LOGOUT" }); // Make sure you have this action in your redux setup
      localStorage.clear();
      navigate("/login");
    }, 1500);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-1 text-gray-800 dark:text-gray-200 px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span>{userName}</span>
        <KeyboardArrowDownIcon />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-32 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg z-50">
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:text-white"
            disabled={loading}
          >
            {loading ? "Logging out..." : "Logout"}
          </button>
        </div>
      )}
    </div>
  );
}

export default Mobilelogout;
