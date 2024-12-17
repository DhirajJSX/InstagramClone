import React, { useState, useEffect } from "react";
import LeftSidebar from "../HomePage/LeftSidebar";
import BottomNav from "../HomePage/BottomNav";
import SearchIcon from "@mui/icons-material/Search";

function UserSearch() {
  const [query, setQuery] = useState(""); // State for the search query
  const [results, setResults] = useState([]); // State for storing search results
  const [isSearching, setIsSearching] = useState(false); // State to track if search has been initiated
  const [error, setError] = useState(null); // State to store any errors

  // Function to handle search input change
  const handleSearchInputChange = (event) => {
    setQuery(event.target.value);
  };

  // Function to fetch users from the API based on the search query
  const fetchSearchResults = async () => {
    if (query.trim() === "") {
      setResults([]); // Clear results if query is empty
      setIsSearching(false);
      setError(null);
      return;
    }

    setIsSearching(true); // Set searching state
    setError(null); // Reset previous errors

    try {
      const response = await fetch(
        `http://localhost:5000/searchuser?query=${encodeURIComponent(query)}`
      );

      // Check if the response is successful
      if (!response.ok) {
        console.error("Server responded with:", response.statusText);
        throw new Error("Failed to fetch search results");
      }

      const data = await response.json();

      // Ensure data structure is correct
      setResults(data.users || []);
    } catch (err) {
      console.error("Error fetching search results:", err.message);
      setError("Unable to fetch search results. Please try again.");
      setResults([]);
    } finally {
      setIsSearching(false); // Stop the loading state
    }
  };

  // useEffect to trigger search whenever the query changes
  useEffect(() => {
    fetchSearchResults();
  }, [query]);

  return (
    <div className="flex h-screen flex-row">
      {/* Sidebar */}
      <LeftSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Search Bar - Sticky */}
        <div className="w-full max-w-5xl mx-auto px-1 py-2 sticky top-0 border-b border-gray-500 bg-black z-10 sm:border-b-0">
          <div className="flex items-center rounded-lg px-4 py-2">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-black text-sm ml-2 focus:outline-none outline-0"
              value={query}
              onChange={handleSearchInputChange}
            />
            <SearchIcon className="text-gray-200 p-1" />
          </div>
        </div>

        {/* Search Results - Column Layout */}
        <div className="w-full max-w-5xl mx-auto px-6 pt-1 pb-16">
          {/* Loading State */}
          {isSearching && (
            <p className="text-center text-gray-500">Searching...</p>
          )}

          {/* Error Message */}
          {error && <p className="text-center text-red-500">{error}</p>}

          {/* Results */}
          {!isSearching && !error && query.trim() && results.length === 0 && (
            <p className="text-center text-gray-500">No users found</p>
          )}

          {/* Map Results */}
          {!isSearching &&
            results.map((user) => (
              <div
                key={user._id}
                className="flex items-center space-x-4 py-3"
              >
                <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
                  <img
                    src={`https://via.placeholder.com/150?text=${user.name}`}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                    {user.userName}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {user.name}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}

export default UserSearch;
