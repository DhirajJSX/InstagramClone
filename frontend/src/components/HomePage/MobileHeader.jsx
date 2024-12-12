import React from "react";
import { useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import IGimg from "../../img/LoginPage/instagram.png";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import SearchIcon from "@mui/icons-material/Search";

function MobileHeader() {
  const navigate = useNavigate();

  const handleMessageClick = () => {
    navigate("/messages");
  };

  const swipeHandlers = useSwipeable({
    onSwipedRight: () => handleMessageClick(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
    trackTouch: true,
  });

  return (
    <header
      {...swipeHandlers}
      className="lg:hidden top-0 z-50 px-4 py-3 border-b-[1px] border-gray-700 flex items-center justify-between"
    >
      <img src={IGimg} alt="Instagram Logo" className="h-8 mt-1" />
      <div className="flex items-center space-x-4">
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search"
            className="px-4 py-2 text-sm rounded-2xl bg-black border-gray-700 border  focus:outline-none w-full pr-10"
          />
          <button className="px-1 absolute right-2 top-1/2 transform -translate-y-1/2 text-white">
            <SearchIcon style={{ fontSize: "24px" }} />
          </button>
        </div>

        {/* Icons for notifications and messages */}
        <div className="flex justify-between px-1">
          <button className="text-gray-600 pr-3 mr-2 dark:text-gray-300">
            <NotificationsNoneOutlinedIcon style={{ fontSize: "30px" }} />
          </button>
          <button
            className="text-gray-600 dark:text-gray-300"
            onClick={handleMessageClick}
          >
            <MailOutlinedIcon style={{ fontSize: "30px" }} />
          </button>
        </div>
      </div>
    </header>
  );
}

export default MobileHeader;
