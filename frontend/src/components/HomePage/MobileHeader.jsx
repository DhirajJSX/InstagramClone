import React from "react";
import { useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import IGimg from "../../img/LoginPage/instagram.png";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";

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
        <input
          type="text"
          placeholder="Search"
          className="hidden md:block px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none"
        />
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
