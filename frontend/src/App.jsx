import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import MessageMainPage from './components/MessagePage/MessageMainPage';
import SignUpForm from './components/SignUpForm';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/home" element={<MainPage />} />
        <Route path="/messages" element={<MessageMainPage />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
