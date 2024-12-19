import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import components
import LoginPage from "./pages/LoginPage";
import SignUpForm from "./components/SignUpForm";
import MainPage from "./pages/MainPage";


// Lazy load other components for code splitting
const MessageMainPage = lazy(() => import("./components/MessagePage/MessageMainPage"));
const UserProfile = lazy(() => import("./components/UserProfilePage/UserProfile"));
const UserNoticationPage = lazy(() => import("./components/NotificationPage/UserNoticationPage"));
const UserSearch = lazy(() => import("./components/UserSeach/UserSearch"));
const UserExplorePage = lazy(() => import("./components/ExplorePage/UserExplorePage"));
const UserReelPage = lazy(() => import("./components/Reels/UserReelPage"));

function App() {
  return (
    <div className="min-h-screen font-Poppins text-white bg-black">
      <Router>
        <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/home" element={<MainPage />} />
            <Route path="/messages" element={<MessageMainPage />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/notification" element={<UserNoticationPage />} />
            <Route path="/search" element={<UserSearch />} />
            <Route path="/explore" element={<UserExplorePage />} />
            <Route path="/reels" element={<UserReelPage />} />
            <Route path="*" element={<div className="text-center mt-10">Page Not Found</div>} />
          </Routes>
        </Suspense>
        <ToastContainer />
      </Router>
    </div>
  );
}

export default App;
