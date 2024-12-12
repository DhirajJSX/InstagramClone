import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // React Router navigation
import { useSwipeable } from "react-swipeable"; // Swipe detection library
import gsap from "gsap"; // GSAP for animations
import MobileHeader from "./MobileHeader";
import LeftSidebar from "./LeftSidebar";
import Stories from "./StoriesSection";
import MainContent from "./MainContent";
import RightSidebar from "./RightSidebar";
import BottomNav from "./BottomNav";

function HomePage() {
  const navigate = useNavigate(); // For navigation

  // Declare handleSwipeLeft function before using it
  const handleSwipeLeft = () => {
    // Animate the sliding effect before navigating
    gsap.to(".home-page-wrapper", {
      x: "-100%", // Move the container to the left
      duration: 0.5, // Duration of the slide animation
      ease: "power2.inOut", // Smooth easing effect
      onComplete: handleMessageClick, // Navigate after the animation
    });
  };

  const handleMessageClick = () => {
    navigate("/messages"); // Navigate to messages inbox
  };

  // Swipeable handlers for the entire page (HomePage)
  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleSwipeLeft, // Trigger swipe action
    preventDefaultTouchmoveEvent: true, // Prevent default touch scrolling
    trackTouch: true, // Track touch gestures
    trackMouseMove: true, // Track mouse
  });

  useEffect(() => {
    // Reset animation when navigating back
    return () => {
      gsap.set(".home-page-wrapper", { x: 0 });
    };
  }, []);

  return (
    <div {...swipeHandlers} className="min-h-screen font-Poppins text-white bg-black">
      <div className="home-page-wrapper">
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
    </div>
  );
}

export default HomePage;
