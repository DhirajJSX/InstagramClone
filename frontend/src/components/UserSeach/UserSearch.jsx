import React, { useState, useEffect } from "react";
import LeftSidebar from "../HomePage/LeftSidebar";
import BottomNav from "../HomePage/BottomNav";
import SearchIcon from "@mui/icons-material/Search";

function UserSearch() {
  const [query, setQuery] = useState(""); // State for the search query
  const [results, setResults] = useState([]); // State for storing search results
  const [isSearching, setIsSearching] = useState(false); // State to track if search has been initiated

  // Function to handle search input change
  const handleSearchInputChange = (event) => {
    setQuery(event.target.value);
  };

  // Function to fetch users from the API based on the search query
  const fetchSearchResults = async () => {
    if (query.trim() === "") {
      setResults([]); // Clear results if query is empty
      setIsSearching(false); // Reset searching flag if query is empty
      return;
    }

    setIsSearching(true); // Set searching flag when query is not empty

    try {
      const response = await fetch(
        `http://localhost:5000/searchuser?query=${query}` // Replace with your actual API endpoint
      );

      // Check if the response is successful
      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }

      const data = await response.json();
      setResults(data.users); // Set the users to state
    } catch (error) {
      console.error("Error fetching search results:", error);
      setResults([]); // Clear results if there is an error
    }
  };

  // Use useEffect to trigger search whenever the query changes
  useEffect(() => {
    fetchSearchResults();
  }, [query]); // The effect runs whenever 'query' changes

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
              onChange={handleSearchInputChange} // Update query on input change
            />
            <SearchIcon className="text-gray-200 p-1" />
          </div>
        </div>

        {/* Search Results - Column Layout */}
        <div className="w-full max-w-5xl mx-auto px-6 pt-1 pb-16">
          {query.trim() && !isSearching ? (
            <p className="text-center text-gray-500">Start typing to search...</p> // Display this message before searching starts
          ) : (
            <>
              {results.length > 0 ? (
                results.map((user) => (
                  <div key={user._id} className="flex items-center space-x-4 py-3">
                    <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-700 overflow-hidden">
                      <img
                        src={`https://via.placeholder.com/150?text=${user.name}`} // Dynamic placeholder based on user name
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
                ))
              ) : (
                query.trim() && <p className="text-center text-gray-500">No users found</p> // Show this message if no results found after a search
              )}
            </>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}

export default UserSearch;
