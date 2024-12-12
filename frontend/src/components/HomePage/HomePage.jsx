import React from "react";
// import IGimg from "./../img/LoginPage/instagram.png";
import MobileHeader from "./MobileHeader";
import LeftSidebar from "./LeftSidebar";
import Stories from "./StoriesSection";
import MainContent from "./MainContent";
import RightSidebar from "./RightSidebar";
import BottomNav from "./BottomNav";

function HomePage() {
  return (
    <div className="min-h-screen font-Poppins text-white bg-black">
      <MobileHeader />
      <div className="flex flex-col lg:flex-row justify-between">
        <LeftSidebar />
        <div className="flex flex-col w-full lg:w-[50%] justify-center items-center">
          <Stories />
          <MainContent />
        </div>
        <RightSidebar />
      </div>
      <BottomNav />
    </div>
  );
}

export default HomePage;
