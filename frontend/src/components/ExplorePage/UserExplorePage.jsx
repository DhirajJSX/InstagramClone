import React from "react";
import LeftSidebar from "./../HomePage/LeftSidebar";
import BottomNav from "../HomePage/BottomNav";

const posts = [
  { id: 1, image: "https://via.placeholder.com/300x300", isLiked: false },
  { id: 2, image: "https://via.placeholder.com/300x300", isLiked: true },
  { id: 3, image: "https://via.placeholder.com/300x300", isLiked: false },
  { id: 4, image: "https://via.placeholder.com/300x300", isLiked: true },
  { id: 5, image: "https://via.placeholder.com/300x300", isLiked: false },
  { id: 6, image: "https://via.placeholder.com/300x300", isLiked: false },
];

function UserExplorePage() {
  return (
    <div className="flex h-screen flex-row">
      {/* Sidebar */}
      <LeftSidebar />
      <BottomNav />
    </div>

  );
}

export default UserExplorePage;