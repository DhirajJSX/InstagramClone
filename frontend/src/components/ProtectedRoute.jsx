import React from "react";
import { Link } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("JWT");

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black px-4">
        <div className="bg-zinc-900 p-6 rounded-2xl shadow-lg w-full max-w-sm text-center">
          <h2 className="text-white text-2xl font-semibold mb-4">
            You must log in first
          </h2>
          <Link
            to="/"
            className="inline-block mt-2 text-blue-500 font-medium text-lg underline hover:text-blue-400 transition"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
