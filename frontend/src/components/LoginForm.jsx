import React, { useState } from "react";
import IGimg from "./../img/LoginPage/instagram.png";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../utils/config.js";
import { motion } from "framer-motion";

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const postData = () => {
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email");
      return;
    }
    setIsLoading(true);
    fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        if (data.error) {
          setErrorMessage(data.error);
        } else {
          toast.success("Successfully Logged In!", {
            position: "bottom-right",
            autoClose: 3000,
            theme: "dark",
          });
          localStorage.setItem("JWT", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          navigate("/home");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setErrorMessage("Something went wrong. Please try again later.");
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white/5 backdrop-blur-xl border border-white/10 text-white w-full max-w-sm p-8 rounded-2xl shadow-xl shadow-white/5"
      >
        <div className="flex justify-center mb-6">
          <img className="w-[150px]" src={IGimg} alt="Instagram" />
        </div>

        <div className="flex flex-col text-sm space-y-4">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl bg-white/10 border border-gray-600 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-600"
            placeholder="Phone number, username, or email"
            type="text"
          />

          <div className="relative">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl bg-white/10 border border-gray-600 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-600"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </button>
          </div>

          {errorMessage && (
            <div className="text-red-400 text-xs text-center -mt-2">{errorMessage}</div>
          )}

          <button
            onClick={postData}
            disabled={isLoading}
            className={`w-full mt-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold transition duration-200 ${
              isLoading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Logging in..." : "Log In"}
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <Link to="/signup" className="text-pink-500 hover:underline">
            Sign up
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default LoginForm;
