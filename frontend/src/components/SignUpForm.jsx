import React, { useState } from "react";
import IGimg from "./../img/LoginPage/instagram.png";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import { FooterTerms, Languages, imgButton } from "./../Data/dataButtons.js";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignUpForm() {
  const navigate = useNavigate(); 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  const postData = () => {
    if (!emailRegex.test(email)) {
        setErrorMessage("Please enter a valid email");
        return;
    } else if (!passwordRegex.test(password)) {
        setErrorMessage("Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character");
        return;
    }

    fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            userName: username,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.error) {
                setErrorMessage(data.error);
            } else {
                // console.log(data);
                toast.success("Successfully Registered!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                navigate("/"); // Navigate to home or login page
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            setErrorMessage("Something went wrong. Please try again later.");
        });
  };

  return (
    <div className="flex items-center flex-col justify-center min-h-screen bg-black px-4 sm:px-6 lg:px-8">
      <div className="border-gray-700 mt-20 border text-white p-6 sm:p-8 md:p-10 w-full max-w-sm md:max-w-md lg:max-w-lg rounded-lg">
        <div className="flex justify-center pt-6 pb-3">
          <img className="w-[150px] sm:w-[200px]" src={IGimg} alt="Instagram" />
        </div>
        <div className="flex flex-col text-[18px] text-gray-400 font-bold text-center justify-center p-1">
          <h2 className="text-white">Sign up to see photos and videos</h2>
          <h2 className="text-center">from your friends.</h2>
        </div>
        <div className="flex mt-4 bg-blue-500 hover:bg-blue-600 font-semibold rounded-sm cursor-pointer flex-col justify-center items-center">
          <div className="flex justify-center items-center px-14">
            <button className="rounded-md py-1 text-white hover:text-white">
              <FacebookRoundedIcon
                fontSize="large"
                className="w-[50px] text-center flex justify-center h-[50px] text-white px-0.5 mr-2"
              />
              <span>Sign Up with Facebook</span>
            </button>
          </div>
        </div>
        <div className="flex items-center px-2 mt-5 font-Poppins">
          <div className="flex-grow border-t border-gray-600"></div>
          <span className="mx-4 text-white opacity-70">OR</span>
          <div className="flex-grow border-t border-gray-600"></div>
        </div>
        <div className="flex flex-col text-[14px]">
          <input
            className="mt-3 bg-[#121212] py-2.5 px-3 w-full rounded-lg outline-none border-[1px] border-slate-300"
            placeholder="Mobile Number or Email"
            type="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            className="mt-3 bg-[#121212] py-2.5 px-3 w-full rounded-lg outline-none border-[1px] border-slate-300"
            placeholder="Password"
            type="password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <input
            className="mt-3 bg-[#121212] py-2.5 px-3 w-full rounded-lg outline-none border-[1px] border-slate-300"
            placeholder="Full Name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            className="mt-3 bg-[#121212] py-2.5 px-3 w-full rounded-lg outline-none border-[1px] border-slate-300"
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>

        {/* Error Message */}
        <div className="flex items-center justify-center mt-2 text-red-500">
          {errorMessage && <p>{errorMessage}</p>} {/* Display error message if it exists */}
        </div>

        <div>
          <button
            onClick={() => {
              postData();
            }}
            className="mt-4 w-full rounded-[10px] text-white bg-blue-600 hover:bg-blue-500 py-2 font-Poppins"
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* Login Section */}
      <div className="border-gray-700 border text-white mt-4 w-full max-w-sm md:max-w-md lg:max-w-lg rounded-lg">
        <div className="p-5 text-[16px] flex justify-center">
          <span>
            Already have an account?{" "}
            <Link to="/" className="font-Poppins text-[#0095f6] hover:underline">
              Log in
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
      <div className="flex mb-5 flex-col flex-wrap justify-around mt-10 text-[13px] gap-4 px-4">
        <div className="flex flex-wrap justify-center gap-2">
          {FooterTerms.map((term, index) => (
            <div
              key={term.id || index}
              className="p-2 cursor-pointer text-gray-400 hover:text-gray-300 hover:underline"
            >
              {term.label}
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <select className="p-2 border rounded-md bg-black cursor-pointer outline-none text-gray-400">
            {Languages.map((lang, index) => (
              <option key={lang.value || index} value={lang.value}>
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

export default SignUpForm;
