import React, { useState } from "react";
import IGimg from "./../img/LoginPage/instagram.png";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../utils/config.js";
import { motion } from "framer-motion";

function SignUpForm() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const postData = () => {
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email");
      return;
    } else if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Password must be 8+ chars with uppercase, lowercase, number, and special char"
      );
      return;
    }

    setIsLoading(true);

    fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        userName: username,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        if (data.error) {
          setErrorMessage(data.error);
        } else {
          toast.success("Successfully Registered!", {
            position: "top-right",
            autoClose: 3000,
            theme: "dark",
          });
          navigate("/");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setErrorMessage("Something went wrong. Please try again.");
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0e0e0e] to-[#1a1a1a] flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white/5 backdrop-blur-xl border border-white/10 text-white w-full max-w-sm p-8 rounded-2xl shadow-xl shadow-white/5"
      >
        <div className="flex justify-center mb-6">
          <img className="w-[160px]" src={IGimg} alt="Instagram" />
        </div>

        <h2 className="text-center font-semibold text-gray-200 mb-4">
          Sign up to see photos and videos from your friends.
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl bg-white/10 border border-gray-600 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-600"
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-xl bg-white/10 border border-gray-600 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-600"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl bg-white/10 border border-gray-600 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-600"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl bg-white/10 border border-gray-600 px-4 py-3 pr-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-600"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-300 hover:text-white"
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
            className="w-full mt-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold transition duration-200"
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </div>

        <p className="text-center text-gray-400 text-sm mt-6">
          Already have an account?{" "}
          <Link to="/" className="text-pink-500 hover:underline">
            Log in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default SignUpForm;
