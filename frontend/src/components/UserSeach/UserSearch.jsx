import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LeftSidebar from "../HomePage/LeftSidebar";
import BottomNav from "../HomePage/BottomNav";
import SearchIcon from "@mui/icons-material/Search";
import ProfilePostLoader from "../Loaders/ProfilePostLoader";
import { BASE_URL } from "../../utils/config";
import ClearIcon from "@mui/icons-material/Clear";

function UserSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("userSearchHistory"));
    if (storedHistory) setSearchHistory(storedHistory);
  }, []);

  useEffect(() => {
    localStorage.setItem("userSearchHistory", JSON.stringify(searchHistory));
  }, [searchHistory]);

  const handleSearchInputChange = (e) => setQuery(e.target.value);

  const addToHistory = (item) => {
    const trimmed = item.trim().toLowerCase();
    if (!trimmed) return;
    setSearchHistory((prev) => {
      const filtered = prev.filter(i => i.toLowerCase() !== trimmed);
      return [item, ...filtered].slice(0, 10);
    });
  };

  const fetchSearchResults = async () => {
    const trimmedQuery = query.trim();
    if (trimmedQuery.length < 1) {
      setResults([]);
      setIsLoading(false);
      setError(null);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${BASE_URL}/searchuser?query=${encodeURIComponent(trimmedQuery.toLowerCase())}`
      );
      if (!response.ok) throw new Error("Failed to fetch search results");
      const data = await response.json();
      const sortedUsers = (data.users || []).sort((a, b) => {
        const q = trimmedQuery.toLowerCase();
        const aName = (a.userName || "").toLowerCase();
        const bName = (b.userName || "").toLowerCase();
        const aFullName = (a.name || "").toLowerCase();
        const bFullName = (b.name || "").toLowerCase();
        if (aName.startsWith(q) && !bName.startsWith(q)) return -1;
        if (!aName.startsWith(q) && bName.startsWith(q)) return 1;
        if (aFullName.startsWith(q) && !bFullName.startsWith(q)) return -1;
        if (!aFullName.startsWith(q) && bFullName.startsWith(q)) return 1;
        return aName.localeCompare(bName);
      });
      setResults(sortedUsers);
    } catch {
      setError("User Not Found");
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(fetchSearchResults, 500);
    return () => clearTimeout(delayDebounce);
  }, [query]);

  const removeFromHistory = (item) => {
    setSearchHistory((prev) => prev.filter((entry) => entry !== item));
  };

  const clearHistory = () => {
    if (window.confirm("Are you sure you want to clear all search history?")) {
      setSearchHistory([]);
    }
  };

  const HighlightedText = ({ text, highlight }) => {
    if (!highlight) return <>{text}</>;
    const regex = new RegExp(`(${highlight})`, "gi");
    const parts = text.split(regex);
    return (
      <>
        {parts.map((part, i) =>
          regex.test(part) ? (
            <mark key={i} className="bg-blue-600 text-white rounded px-1">{part}</mark>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </>
    );
  };

  return (
    <div className="flex h-screen flex-row">
      <LeftSidebar />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <div className="w-full max-w-5xl mx-auto px-1 py-2 sticky top-0 border-b border-gray-500 bg-black z-10 sm:border-b-0">
          <div className="flex items-center rounded-lg px-4 py-2">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-black text-sm ml-2 text-white focus:outline-none"
              value={query}
              onChange={handleSearchInputChange}
            />
            <SearchIcon className="text-gray-200 p-1" />
          </div>
        </div>

        <div className="relative w-full max-w-5xl mx-auto px-6 pt-1 pb-16">
          {isLoading && (
            <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 rounded-lg">
              <ProfilePostLoader />
            </div>
          )}

          {!isLoading && error && (
            <p className="text-center text-red-500 mt-6">{error}</p>
          )}

          {!isLoading && !query.trim() && searchHistory.length > 0 && (
            <div className="mt-6 text-sm text-gray-300">
              <div className="flex justify-between items-center mb-3">
                <p className="font-semibold text-gray-400 tracking-wide uppercase">
                  Recent Searches
                </p>
                <button
                  onClick={clearHistory}
                  className="text-xs text-red-500 hover:text-red-600 font-semibold"
                  aria-label="Clear all search history"
                >
                  Clear
                </button>
              </div>
              <div className="space-y-3">
                {searchHistory.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-3 px-4 "
                  >
                    <button
                      onClick={() => setQuery(item)}
                      className="text-left text-[#dadfe8] font-medium hover:text-blue-400 truncate max-w-xs"
                      title={item}
                    >
                      {item}
                    </button>
                    <button
                      onClick={() => removeFromHistory(item)}
                      className="text-xs ml-3"
                      aria-label={`Remove ${item} from search history`}
                    >
                      <ClearIcon sx={{ fontSize: 17 }} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!isLoading && !error && query.trim() && results.length === 0 && (
            <p className="text-center text-gray-500 mt-6">No users found</p>
          )}

          {!isLoading &&
            results.length > 0 && (
              <ul className="mt-4 space-y-4">
                {results.map((user) => (
                  <li
                    key={user._id}
                    className="rounded-lg transition-colors cursor-pointer"
                  >
                    <Link
                      to={`/user/${user.userName}`}
                      className="flex items-center space-x-4 px-5 py-3"
                      onClick={() => addToHistory(user.userName)}
                    >
                      <div className="w-14 h-14 rounded-full bg-gray-700 overflow-hidden flex-shrink-0 border border-gray-600">
                        <img
                          src={`https://via.placeholder.com/150?text=${encodeURIComponent(
                            user.name || user.userName
                          )}`}
                          alt={user.name || user.userName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <p className="text-lg font-semibold text-white truncate">
                          <HighlightedText text={user.userName} highlight={query} />
                        </p>
                        <p className="text-sm text-gray-400 truncate">
                          <HighlightedText text={user.name} highlight={query} />
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

export default UserSearch;
