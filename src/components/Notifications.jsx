import React, { useState } from "react";
import { ReactComponent as CloseIcon } from "../assets/close icon.svg";
import "./Notifications.css";
import profile1 from "../assets/profile1.jpg";
import profile2 from "../assets/profile2.jpg";
import profile3 from "../assets/profile3.jpg";

const notifications = [
  {
    id: 1,
    message: "אייל בכור ביקש להצטרף למשמרת הערב בהסברה.",
    time: "5 דק'",
    profilePic: profile1,
    type: "חדש",
  },
  {
    id: 2,
    message: "שירה מנור ביקשה להצטרף למערך.",
    time: "50 דק'",
    profilePic: profile2,
    type: "חדש",
  },
  {
    id: 3,
    message: "איילת שמש שלחה הודעה.",
    time: "2 שעות",
    profilePic: profile3,
    type: "חדש",
  },
  {
    id: 4,
    message: "אוהד דויד ביקש להצטרף למשמרת בוקר במנהרה.",
    time: "שבוע",
    profilePic: profile1,
    type: "עבר",
  },
];

const Notifications = ({ onClose, style }) => {
  const newNotifications = notifications.filter(
    (notification) => notification.type === "חדש"
  );
  const oldNotifications = notifications.filter(
    (notification) => notification.type === "עבר"
  );

  return (
    <div className="notifications-modal" style={style}>
      <div className="notifications-modal-header">
        <h2>התראות</h2>
        <button className="notifications-close-button" onClick={onClose}>
          <CloseIcon />
        </button>
      </div>
      <div className="notifications-modal-content">
        <h3>חדש</h3>
        {newNotifications.map((notification) => (
          <div key={notification.id} className="notification-item">
            <img
              src={notification.profilePic}
              alt={notification.name}
              className="notification-profile-pic"
            />
            <div className="notification-info">
              <div className="notification-message">{notification.message}</div>
              <div className="notification-time">{notification.time}</div>
            </div>
          </div>
        ))}
        <h3>עבר</h3>
        {oldNotifications.map((notification) => (
          <div key={notification.id} className="notification-item">
            <img
              src={notification.profilePic}
              alt={notification.name}
              className="notification-profile-pic"
            />
            <div className="notification-info">
              <div className="notification-name">{notification.name}</div>
              <div className="notification-message">{notification.message}</div>
              <div className="notification-time">{notification.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
