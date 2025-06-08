import React, { useState } from "react";
import IGimg from "./../img/LoginPage/instagram.png";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import { FooterTerms, Languages, imgButton } from "./../Data/dataButtons.js";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../utils/config.js";
import { Visibility, VisibilityOff } from "@mui/icons-material";

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
      body: JSON.stringify({
        email,
        password,
      }),
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
        console.error("Error:", error);
        setErrorMessage("Something went wrong. Please try again later.");
      });
  };

  return (
    <div className="flex items-center flex-col justify-center min-h-screen bg-black px-4 py-7">
      <div className="border border-gray-700 text-white p-6 w-full max-w-sm rounded-lg">
        <div className="flex justify-center py-6">
          <img className="w-[150px]" src={IGimg} alt="Instagram" />
        </div>

        <div className="flex flex-col text-[14px] relative">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-3 bg-[#121212] py-2.5 px-3 w-full rounded-lg outline-none border border-slate-300"
            placeholder="Phone number, username, or email"
            type="text"
          />

          <div className="relative mt-3">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#121212] py-2.5 px-3 w-full rounded-lg outline-none border border-slate-300 pr-10"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </button>
          </div>
        </div>

        {errorMessage && (
          <div className="text-red-500 text-sm mt-3">{errorMessage}</div>
        )}

        <button
          onClick={postData}
          disabled={isLoading}
          className="mt-4 w-full rounded-[10px] font-semibold text-white bg-blue-500 hover:bg-blue-600 py-2 transition duration-200 disabled:opacity-50"
        >
          {isLoading ? "Logging in..." : "Log In"}
        </button>

        <div className="text-center text-sm text-gray-400 mt-4">
          <Link to="/forgot-password" className="text-blue-400 hover:underline">
            Forgot password?
          </Link>
        </div>

        <div className="text-center text-sm text-gray-400 mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
