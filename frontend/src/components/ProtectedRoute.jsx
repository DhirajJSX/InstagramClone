import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("JWT"); // check JWT

  if (!isAuthenticated) {
    
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center text-white px-4">
        <h2 className="text-2xl font-bold mb-4">You must log in first</h2>
        <a href="/" className="text-blue-400 underline text-lg">
          Go to Login
        </a>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
