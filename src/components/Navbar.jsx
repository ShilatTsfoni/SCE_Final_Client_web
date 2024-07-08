import React, { useState, useRef } from "react";
import homePageLogo from "../assets/homePageLogo.png";
import { ReactComponent as NotificationsIcon } from "../assets/notifications icon.svg";
import { ReactComponent as MessagesIcon } from "../assets/Messages icon.svg";
import "./Navbar.css";

const Navbar = ({ onNotificationsClick, onMessagesClick }) => {
  const [activeIcon, setActiveIcon] = useState(null); // State to track active icon
  const notificationIconRef = useRef(null);
  const messageIconRef = useRef(null);

  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return "בוקר טוב";
    else if (hours < 18) return "צהריים טובים";
    else if (hours < 21) return "ערב טוב";
    else return "לילה טוב";
  };

  const handleIconClick = (icon) => {
    if (icon === activeIcon) {
      setActiveIcon(null); // Deselect the active icon
    } else {
      setActiveIcon(icon); // Select the new icon
    }

    if (icon === "bell" && notificationIconRef.current) {
      const rect = notificationIconRef.current.getBoundingClientRect();
      onNotificationsClick({
        top: rect.bottom + window.scrollY + 10,
        left: rect.left + window.scrollX - 150,
      });
    }

    if (icon === "message" && messageIconRef.current) {
      const rect = messageIconRef.current.getBoundingClientRect();
      onMessagesClick({
        top: rect.bottom + window.scrollY + 130,
        left: rect.left + window.scrollX + 300,
      });
    }
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <NotificationsIcon
          ref={notificationIconRef}
          style={{ color: "#000000" }}
          className={`notification-icon ${
            activeIcon === "bell" ? "active" : ""
          }`}
          onClick={() => handleIconClick("bell")}
        />
        <MessagesIcon
          ref={messageIconRef}
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
