import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import IGimg from "../../img/LoginPage/instagram.png";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import SearchIcon from "@mui/icons-material/Search";

function MobileHeader() {
  const navigate = useNavigate();

  const [query, setQuery] = useState(""); // Search query state
  const [results, setResults] = useState([]); // Search results state
  const [isLoading, setIsLoading] = useState(false); // Loading state for search
  const [debounceTimeout, setDebounceTimeout] = useState(null); // For debounce

  const handleMessageClick = () => {
    navigate("/messages");
  };

  const notificationBtn = () => {
    navigate("/notification");
  };

  // Debounce function to prevent multiple API calls in quick succession
  const handleSearchInputChange = (event) => {
    setQuery(event.target.value);

    // Clear the previous timeout
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    // Set a new timeout for the API call after 500ms
    const timeout = setTimeout(() => {
      fetchSearchResults(event.target.value);
    }, 500);

    setDebounceTimeout(timeout); // Save the timeout id
  };

  // Fetch search results from API
  const fetchSearchResults = async (searchQuery) => {
    if (searchQuery.trim() === "") {
      setResults([]); // Clear results if query is empty
      setIsLoading(false);
      return;
    }

    setIsLoading(true); // Set loading state while fetching results

    try {
      const response = await fetch(`http://localhost:5000/searchuser?query=${searchQuery}`); // Replace with your actual API endpoint

      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }

      const data = await response.json();
      setResults(data.users); // Set the fetched users to state
      console.log(data);
      
    } catch (error) {
      console.error("Error fetching search results:", error);
      setResults([]); // Clear results in case of error
    } finally {
      setIsLoading(false); // Stop loading when API call is complete
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedRight: () => handleMessageClick(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
    trackTouch: true,
  });

  return (
    <header
      {...swipeHandlers}
      className="lg:hidden top-0 z-50 px-4 py-3 border-b-[1px] border-gray-700 flex items-center justify-between"
    >
      <img src={IGimg} alt="Instagram Logo" className="h-8 mt-1" />
      <div className="flex items-center space-x-4">
        {/* Search Bar */}
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search"
            className="px-4 py-2 text-sm rounded-2xl bg-black border-gray-700 border focus:outline-none w-full pr-10"
            value={query}
            onChange={handleSearchInputChange}
          />
          <button className="px-1 absolute right-2 top-1/2 transform -translate-y-1/2 text-white">
            <SearchIcon style={{ fontSize: "24px" }} />
          </button>

          {/* Show search results as a dropdown */}
          {query && results.length > 0 && (
            <div className="absolute left-0 right-0 bg-black text-white shadow-lg max-h-64 overflow-y-auto z-10 mt-2 rounded-lg">
              {isLoading ? (
                <p className="text-center py-2">Loading...</p>
              ) : (
                results.map((user) => (
                  <div
                    key={user._id}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-700"
                    onClick={() => navigate(`/profile/${user._id}`)} // Navigate to user profile
                  >
                    <p className="text-sm">{user.userName}</p>
                    <p className="text-xs">{user.name}</p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Icons for notifications and messages */}
        <div className="flex justify-between px-1">
          <button onClick={notificationBtn} className="text-gray-600 pr-3 mr-2 dark:text-gray-300">
            <NotificationsNoneOutlinedIcon style={{ fontSize: "30px" }} />
          </button>
          <button
            className="text-gray-600 dark:text-gray-300"
            onClick={handleMessageClick}
          >
            <MailOutlinedIcon style={{ fontSize: "30px" }} />
          </button>
        </div>
      </div>
    </header>
  );
}

export default MobileHeader;
