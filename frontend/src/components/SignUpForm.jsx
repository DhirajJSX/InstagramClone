import React, { useState } from "react";
import IGimg from "./../img/LoginPage/instagram.png";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../utils/config.js";

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
        "Password must be 8+ characters with uppercase, lowercase, number, and special char"
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
    <div className="flex items-center justify-center min-h-screen bg-black px-4 py-8">
      <div className="bg-[#121212] border border-gray-700 w-full max-w-sm rounded-xl p-6 text-white">
        <div className="flex justify-center mb-5">
          <img className="w-[180px]" src={IGimg} alt="Instagram" />
        </div>

        <h2 className="text-center font-semibold text-gray-300 text-sm mb-4">
          Sign up to see photos and videos from your friends.
        </h2>

        <div className="flex flex-col space-y-3">
          <input
            className="bg-black border border-gray-600 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="bg-black border border-gray-600 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="bg-black border border-gray-600 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="relative">
            <input
              className="bg-black border border-gray-600 px-4 py-2 pr-10 w-full rounded-md focus:outline-none focus:border-blue-500"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="absolute right-3 top-2.5 cursor-pointer text-gray-400"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </span>
          </div>
        </div>

        {errorMessage && (
          <p className="text-red-500 text-sm mt-3">{errorMessage}</p>
        )}

        <button
          onClick={postData}
          disabled={isLoading}
          className="w-full mt-5 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-semibold transition"
        >
          {isLoading ? "Creating Account..." : "Sign Up"}
        </button>

        <div className="text-center text-sm text-gray-400 mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-blue-400 hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
