import React, { useState } from "react";
import "./Navbar.css";
//import notificationsIcon from "../assets/notifications icon.svg";
//import messagesIcon from "../assets/Messages icon.svg";
import homePageLogo from "../assets/homePageLogo.png";
import { ReactComponent as NotificationsIcon } from "../assets/notifications icon.svg";
import { ReactComponent as MessagesIcon } from "../assets/Messages icon.svg";

const Navbar = () => {
  const [activeIcon, setActiveIcon] = useState(null); // State to track active icon

  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return "בוקר טוב";
    else if (hours < 18) return "צהריים טובים";
    else if (hours < 21) return "ערב טוב";
    else return "לילה טוב";
  };

  const handleIconClick = (icon) => {
    setActiveIcon(icon === activeIcon ? null : icon); // Toggle active state
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <NotificationsIcon
          style={{ color: "#000000" }}
          className={`notification-icon ${
            activeIcon === "bell" ? "active" : ""
          }`}
          onClick={() => handleIconClick("bell")}
        />
        <MessagesIcon
          style={{ color: "#000000" }}
          className={`message-icon ${activeIcon === "message" ? "active" : ""}`}
          onClick={() => handleIconClick("message")}
        />
      </div>
      <div className="navbar-right">
        <span className="greeting-text">
          {getGreeting()},{" "}
          <span className="static-text">חמ"ל כיכר החטופים</span>
        </span>{" "}
        <img src={homePageLogo} alt="Logo" className="logo" />
      </div>
    </div>
  );
};

export default Navbar;
