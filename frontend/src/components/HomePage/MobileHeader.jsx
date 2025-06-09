import React from "react";
import { useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";

import IGimg from "../../img/LoginPage/instagram.png";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";

function MobileHeader() {
  const navigate = useNavigate();

  const handleMessageClick = () => navigate("/messages");
  const handleNotificationClick = () => navigate("/notification");

  const swipeHandlers = useSwipeable({
    onSwipedRight: () => handleMessageClick(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
    trackTouch: true,
  });

  return (
    <header
      {...swipeHandlers}
      className="lg:hidden fixed top-0 left-0 w-full z-50 px-4 py-3 bg-black/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between shadow-md"
    >
      <img src={IGimg} alt="Instagram" className="h-7 md:h-8" />
      <div className="flex items-center space-x-4">
        <button
          onClick={handleNotificationClick}
          className="p-2 rounded-full hover:bg-white/10 transition-all"
        >
          <NotificationsNoneOutlinedIcon style={{ fontSize: 24, color: "white" }} />
        </button>
        <button
          onClick={handleMessageClick}
          className="p-2 rounded-full hover:bg-white/10 transition-all"
        >
          <MailOutlinedIcon style={{ fontSize: 24, color: "white" }} />
        </button>
      </div>
    </header>
  );
}

export default MobileHeader;
