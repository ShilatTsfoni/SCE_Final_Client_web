import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ReactComponent as ShiftsIcon } from "../assets/shifts icon.svg";
import { ReactComponent as VolunteersIcon } from "../assets/volunteers icon.svg";
import { ReactComponent as MessagesIcon } from "../assets/Messages icon.svg";
import { ReactComponent as SettingsIcon } from "../assets/settings icon.svg";
import "./Sidebar.css";

const Sidebar = () => {
  const [active, setActive] = useState("משמרות");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/shifts":
        setActive("משמרות");
        break;
      /* case "/volunteers":
        setActive("מתנדבים");
        break; */
      case "/messages":
        setActive("הודעות");
        break;
      case "/settings":
        setActive("הגדרות");
        break;
      default:
        setActive("");
        break;
    }
  }, [location.pathname]);

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
            <ShiftsIcon />
          </div>
          <span>משמרות</span>
        </li>
        {/*<li
          className="sidebar-item"
          onClick={() => handleNavigation("מתנדבים", "/volunteers")}
        >
          <div
            className={`icon-container ${active === "מתנדבים" ? "active" : ""}`}
          >
            <VolunteersIcon />{" "}
          </div>
          <span>צוותים</span>
        </li>*/}
        <li
          className="sidebar-item"
          onClick={() => handleNavigation("הודעות", "/messages")}
        >
          <div
            className={`icon-container ${active === "הודעות" ? "active" : ""}`}
          >
            <MessagesIcon />{" "}
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
            <SettingsIcon />{" "}
          </div>
          <span>הגדרות</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
