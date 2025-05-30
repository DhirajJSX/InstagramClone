import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./pages/LoginPage";
import SignUpForm from "./components/SignUpForm";
import MainPage from "./pages/MainPage";
import Error404 from "./components/Error404";
import ProtectedRoute from "./components/ProtectedRoute"; 

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
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <MainPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/messages"
              element={
                <ProtectedRoute>
                  <MessageMainPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notification"
              element={
                <ProtectedRoute>
                  <UserNoticationPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/search"
              element={
                <ProtectedRoute>
                  <UserSearch />
                </ProtectedRoute>
              }
            />
            <Route
              path="/explore"
              element={
                <ProtectedRoute>
                  <UserExplorePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reels"
              element={
                <ProtectedRoute>
                  <UserReelPage />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Error404 />} />
          </Routes>
        </Suspense>
        <ToastContainer />
      </Router>
    </div>
  );
}

export default App;
