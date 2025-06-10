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

  const addToHistory = (item) => {
    const trimmed = item.trim().toLowerCase();
    if (!trimmed) return;
    setSearchHistory((prev) => {
      const filtered = prev.filter((i) => i.toLowerCase() !== trimmed);
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
        `${BASE_URL}/searchuser?query=${encodeURIComponent(
          trimmedQuery.toLowerCase()
        )}`
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
      addToHistory(trimmedQuery);
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
            <mark key={i} className="bg-blue-600 text-white rounded px-1">
              {part}
            </mark>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </>
    );
  };

  return (
    <>
      <div className="lg:flex min-h-screen bg-black text-white">
        <LeftSidebar />
        <main className="w-full lg:ml-[250px] p-4 max-w-2xl mx-auto">
          <div className="flex items-center bg-white/5 backdrop-blur border border-white/10 rounded-xl px-4 py-2">
            <SearchIcon className="text-white opacity-80 mr-2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search users"
              className="bg-transparent outline-none text-white w-full placeholder:text-gray-400"
            />
          </div>
          {searchHistory.length > 0 && !query && (
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-white font-medium text-lg">
                  Recent Searches
                </h3>
                <button
                  onClick={clearHistory}
                  className="text-sm text-[#dadada]"
                >
                  Clear All
                </button>
              </div>
              <ul className="space-y-2">
                {searchHistory.map((item) => (
                  <li
                    key={item}
                    className="flex justify-between items-center backdrop-blur-md px-4 py-2 rounded-lg transition"
                  >
                    <button
                      onClick={() => setQuery(item)}
                      className="text-white text-sm truncate text-left w-full"
                      title={item}
                    >
                      {item}
                    </button>
                    <ClearIcon
                      className="text-gray-400 hover:text-red-400 cursor-pointer"
                      onClick={() => removeFromHistory(item)}
                      fontSize="small"
                      aria-label={`Remove ${item} from history`}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-6">
            {isLoading ? (
              <div className="flex items-center justify-center min-h-screen">
                <ProfilePostLoader />
              </div>
            ) : error ? (
              <p className="text-[#dadada] text-sm text-center">{error}</p>
            ) : (
              results.length > 0 && (
                <ul className="space-y-4">
                  {results.map((user) => (
                    <li key={user._id}>
                      <Link
                        to={`/user/${user.userName}`}
                        className="flex items-center space-x-4 backdrop-blur rounded-xl p-3 transition"
                      >
                        <img
                          src={user.profilePhoto || "/default-profile.png"}
                          alt={`${user.userName}'s profile`}
                          className="w-12 h-12 rounded-full object-cover"
                          loading="lazy"
                        />
                        <div>
                          <p className="font-semibold text-white truncate">
                            <HighlightedText
                              text={user.userName}
                              highlight={query}
                            />
                          </p>
                          <p className="text-gray-400 text-sm truncate max-w-xs">
                            <HighlightedText
                              text={user.name || ""}
                              highlight={query}
                            />
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )
            )}
          </div>
        </main>
      </div>
      <BottomNav />
    </>
  );
}

export default UserSearch;
