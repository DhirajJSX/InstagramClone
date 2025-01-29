import React from 'react';
import LeftSidebar from '../HomePage/LeftSidebar';
import BottomNav from '../HomePage/BottomNav';

const reels = [
  {
    id: 1,
    video: "https://www.w3schools.com/html/mov_bbb.mp4", // Sample video URL
    user: "john_doe",
    userImage: "https://via.placeholder.com/50", // Profile image
    audio: "Happy Song",
    isLiked: false,
  },
  {
    id: 2,
    video: "https://www.w3schools.com/html/movie.mp4",
    user: "jane_doe",
    userImage: "https://via.placeholder.com/50",
    audio: "Dance Beats",
    isLiked: true,
  },
  // Add more reels here
];

function UserReelPage() {
  return (
    <div className="flex h-screen flex-row">
      {/* Sidebar */}
      <LeftSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Header */}
        <div className="w-full max-w-5xl mx-auto px-6 py-4 border-b border-gray-300 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Reels
          </h2>
        </div>

        {/* Reels List */}
        <div className="w-full max-w-5xl mx-auto px-6 py-4">
          {reels.map((reel) => (
            <div key={reel.id} className="relative mb-8">
              {/* Video Player */}
              <div className="relative w-full" style={{ paddingTop: '177.78%' }}> {/* 16:9 ratio in reverse for portrait */}
                <video
                  src={reel.video}
                  autoPlay
                  loop
                  muted
                  className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
                ></video>
              </div>

              {/* Overlay Controls */}
              <div className="absolute inset-0 flex justify-between items-center p-4">
                {/* User Info */}
                <div className="flex items-center space-x-2">
                  <img
                    src={reel.userImage}
                    alt="User Profile"
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="text-white font-semibold">{reel.user}</span>
                </div>

                {/* Audio Info */}
                <div className="absolute bottom-4 left-4 text-white text-sm">
                  <span>{reel.audio}</span>
                </div>

                {/* Reel Actions (Like, Comment, Share) */}
                <div className="flex flex-col items-center space-y-4">
                  {/* Like Button */}
                  <div>
                    {reel.isLiked ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-red-500 w-8 h-8"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-white w-8 h-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                        />
                      </svg>
                    )}
                  </div>

                  {/* Comment Button */}
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-white w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 4h16c1.104 0 2 .896 2 2v12c0 1.104-.896 2-2 2H4c-1.104 0-2-.896-2-2V6c0-1.104.896-2 2-2zM4 18h16V6H4v12z"
                      />
                    </svg>
                  </div>

                  {/* Share Button */}
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-white w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 4v7.48a3.993 3.993 0 0 1-1-2.07V7H8a4 4 0 0 0-4 4v5h3v-5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v5h3v-5a4 4 0 0 0-4-4h-3v2.41c-.21.15-.39.33-.58.54l-.92.93a1 1 0 1 0 1.42 1.42l.84-.85V7h2v7.48A3.993 3.993 0 0 1 12 4z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}

export default UserReelPage;
