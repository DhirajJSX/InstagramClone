import React, { useState } from "react";
import IGimg from "./../img/LoginPage/instagram.png";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import { FooterTerms, Languages, imgButton } from "./../Data/dataButtons.js";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../utils/config.js";

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const postData = () => {
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email");
      return;
    }
    fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setErrorMessage(data.error);
        } else {
          toast.success("Successfully Logged In!", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          navigate("/home");
          localStorage.setItem("JWT", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          // console.log(data.token);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setErrorMessage("Something went wrong. Please try again later.");
      });
  };

  return (
    <div className="flex items-center flex-col justify-center min-h-screen bg-black px-4 sm:px-6 lg:px-8 py-7">
      <div className="border-gray-700 border text-white p-6 sm:p-8 md:p-10 w-full max-w-sm md:max-w-md lg:max-w-lg rounded-lg">
        <div className="flex justify-center py-6">
          <img className="w-[150px] sm:w-[200px]" src={IGimg} alt="Instagram" />
        </div>
        <div className="flex flex-col text-[14px]">
          <input
            value={email}
            className="mt-3 bg-[#121212] py-2.5 px-3 w-full rounded-lg outline-none border-[1px] border-slate-300"
            placeholder="Phone number, username, or email"
            type="text"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            value={password}
            className="mt-3 bg-[#121212] py-2.5 px-3 w-full rounded-lg outline-none border-[1px] border-slate-300"
            placeholder="Password"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        {errorMessage && (
          <div className="text-red-500 text-sm mt-3">{errorMessage}</div>
        )}
        <div className="flex ">
          <button
            onClick={postData}
            className="mt-4 w-full rounded-[10px] font-semibold text-white bg-blue-600 hover:bg-blue-500 py-2 font-Poppins text-center"
          >
            Log in
          </button>
        </div>
        <div className="flex items-center px-2 mt-5 font-Poppins">
          <div className="flex-grow border-t border-gray-600"></div>
          <span className="mx-4 text-white opacity-70">OR</span>
          <div className="flex-grow border-t border-gray-600"></div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="p-5">
            <FacebookRoundedIcon
              fontSize="large"
              className="w-[50px] h-[50px] text-[#0095F6]"
            />
            <span className="ml-2 text-[#0095F6] hover:text-white cursor-pointer">
              Log in with Facebook
            </span>
          </div>
          <button className="text-center text-gray-200 hover:underline">
            Forgot Password?
          </button>
        </div>
      </div>

      {/* Sign Up Section */}
      <div className="border-gray-700 border text-white mt-4 w-full max-w-sm md:max-w-md lg:max-w-lg rounded-lg">
        <div className="p-5 text-[16px] flex justify-center">
          <span>
            Don&apos;t have an account?{" "}
            <Link
              to="/Signup"
              className="font-Poppins text-[#0095f6] hover:underline"
            >
              Sign up
            </Link>
          </span>
        </div>
      </div>

      {/* App Download Section */}
      <div className="text-white">
        <div className="text-center mt-6 mb-2">
          <span className="text-[16px]">Get the app.</span>
        </div>
        <div className="flex items-center justify-center gap-4">
          {imgButton.map((item, index) => (
            <a key={item.id || index} href={item.href}>
              <img
                className="w-[160px] sm:w-[170px] h-[55px] cursor-pointer"
                src={item.img}
                alt={item.alt}
              />
            </a>
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <div className="flex flex-col flex-wrap justify-around mt-10 text-[13px] gap-4 px-4">
        <div className="flex flex-wrap justify-center gap-2 px-4 py-6">
          {FooterTerms.map((term) => (
            <a
              key={term.label}
              href={term.href}
              className="p-2 text-sm text-gray-400 hover:text-gray-300 hover:underline"
            >
              {term.label}
            </a>
          ))}
        </div>
        <div className="flex justify-center">
          <select className="p-2 border rounded-md bg-black cursor-pointer outline-none text-gray-400">
            {Languages.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
          <div className="m-2 ml-3 flex justify-center items-center">
            <span className="text-gray-300">© 2024 Instagram from Meta</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
