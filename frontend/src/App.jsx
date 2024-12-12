import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import MessageMainPage from './components/MessagePage/MessageMainPage';
import SignUpForm from './components/SignUpForm';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserProfile from './components/UserProfilePage/UserProfile';
import UserNoticationPage from './components/NotificationPage/UserNoticationPage';
import UserSearch from './components/UserSeach/UserSearch';
import UserExplorePage from './components/ExplorePage/UserExplorePage';
import UserReelPage from './components/Reels/UserReelPage';
function App() {
  return (
    <div className="min-h-screen font-Poppins text-white bg-black">
     <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/home" element={<MainPage />} />
        <Route path="/messages" element={<MessageMainPage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/notification" element={<UserNoticationPage />} />
        <Route path="/search" element={<UserSearch />} />
        <Route path="/explore" element={<UserExplorePage/>} />
        <Route path="/reels" element={<UserReelPage />} />
      </Routes>
      <ToastContainer />
    </Router>
   </div>
  );
}

export default App;
