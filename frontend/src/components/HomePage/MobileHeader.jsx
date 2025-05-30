import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import IGimg from "../../img/LoginPage/instagram.png";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { BASE_URL } from "../../utils/config";
function MobileHeader() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  const handleMessageClick = () => {
    navigate("/messages");
  };

  const notificationBtn = () => {
    navigate("/notification");
  };

  const handleSearchInputChange = (event) => {
    setQuery(event.target.value);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeout = setTimeout(() => {
      fetchSearchResults(event.target.value);
    }, 500);

    setDebounceTimeout(timeout);
  };

  const fetchSearchResults = async (searchQuery) => {
    if (searchQuery.trim() === "") {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `${BASE_URL}/searchuser?query=${searchQuery}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }

      const data = await response.json();
      setResults(data.users);
      console.log(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
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
          {query && results.length > 0 && (
            <div className="absolute left-0 right-0 bg-black text-white shadow-lg max-h-64 overflow-y-auto z-10 mt-2 rounded-lg">
              {isLoading ? (
                <p className="text-center py-2">Loading...</p>
              ) : (
                results.map((user) => (
                  <div
                    key={user._id}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-700"
                    onClick={() => navigate(`/profile/${user._id}`)}
                  >
                    <p className="text-sm">{user.userName}</p>
                    <p className="text-xs">{user.name}</p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
        <div className="flex justify-between px-1">
          <button
            onClick={notificationBtn}
            className="text-gray-600 pr-3 mr-2 dark:text-gray-300"
          >
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
