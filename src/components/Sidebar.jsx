import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const [active, setActive] = useState("משמרות");
  const navigate = useNavigate();

  const handleNavigation = (item, path) => {
    setActive(item);
    navigate(path);
  };

  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        <li
          className="sidebar-item"
          onClick={() => handleNavigation("משמרות", "/shifts")}
        >
          <div
            className={`icon-container ${active === "משמרות" ? "active" : ""}`}
          >
            <i className="fas fa-calendar-alt"></i>
          </div>
          <span>משמרות</span>
        </li>
        <li
          className="sidebar-item"
          onClick={() => handleNavigation("מתנדבים", "/volunteers")}
        >
          <div
            className={`icon-container ${active === "מתנדבים" ? "active" : ""}`}
          >
            <i className="fas fa-users"></i>
          </div>
          <span>צוותים</span>
        </li>
        <li
          className="sidebar-item"
          onClick={() => handleNavigation("הודעות", "/messages")}
        >
          <div
            className={`icon-container ${active === "הודעות" ? "active" : ""}`}
          >
            <i className="fas fa-envelope"></i>
          </div>
          <span>הודעות</span>
        </li>
        <li
          className="sidebar-item"
          onClick={() => handleNavigation("הגדרות", "/settings")}
        >
          <div
            className={`icon-container ${active === "הגדרות" ? "active" : ""}`}
          >
            <i className="fas fa-cog"></i>
          </div>
          <span>הגדרות</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
