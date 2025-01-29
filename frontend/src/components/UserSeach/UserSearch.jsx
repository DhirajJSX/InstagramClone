import React, { useState, useEffect } from "react";
import LeftSidebar from "../HomePage/LeftSidebar";
import BottomNav from "../HomePage/BottomNav";
import SearchIcon from "@mui/icons-material/Search";
import ProfilePostLoader from "../Loaders/ProfilePostLoader";

function UserSearch() {
  const [query, setQuery] = useState(""); // State for the search query
  const [results, setResults] = useState([]); // State for storing search results
  const [isLoading, setIsLoading] = useState(false); // State to track loading
  const [error, setError] = useState(null); // State to store any errors

  // Function to handle search input change
  const handleSearchInputChange = (event) => {
    setQuery(event.target.value);
  };

  // Function to fetch users from the API
  const fetchSearchResults = async () => {
    if (query.trim() === "") {
      setResults([]); // Clear results if query is empty
      setIsLoading(false);
      setError(null);
      return;
    }

    setIsLoading(true); // Show loader
    setError(null); // Reset previous errors

    try {
      // Simulating 2-second delay for the loader
      setTimeout(async () => {
        const response = await fetch(
          `http://localhost:5000/searchuser?query=${encodeURIComponent(query)}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch search results");
        }

        const data = await response.json();
        setResults(data.users || []); // Update results
      }, 2000); // 2-second delay
    } catch (err) {
      setError("Unable to fetch search results. Please try again.");
      setResults([]); // Clear results in case of an error
    } finally {
      setTimeout(() => setIsLoading(false), 2000); // Stop loader after 2 seconds
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
        {/* Search Bar */}
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

        {/* Search Results */}
        <div className="relative w-full max-w-5xl mx-auto px-6 pt-1 pb-16">
          {/* Loader */}
          {isLoading && (
            <div className="absolute inset-0 flex justify-center items-center">
              <ProfilePostLoader />
            </div>
          )}

          {/* Error Message */}
          {!isLoading && error && (
            <p className="text-center text-red-500">{error}</p>
          )}

          {/* No Results Message */}
          {!isLoading && !error && query.trim() && results.length === 0 && (
            <p className="text-center text-gray-500">No users found</p>
          )}

          {/* Render Results */}
          {!isLoading &&
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
