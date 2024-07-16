import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Notifications from "./components/Notifications";
import MessagesNotifications from "./components/MessagesNotifications";
import Sidebar from "./components/Sidebar";
import Shifts from "./Pages/Shifts";
import Volunteers from "./Pages/Volunteers";
import Messages from "./Pages/Messages";
import { Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [notificationPosition, setNotificationPosition] = useState({});
  const [messagePosition, setMessagePosition] = useState({});

  const handleNotificationsClick = (position) => {
    setNotificationPosition({
      top: position.top,
      left: position.left + 150, // Adjust this value to move it slightly to the right
    });
    setShowNotifications((prev) => !prev);
  };

  const handleMessagesClick = (position) => {
    setMessagePosition({
      top: position.top,
      left: position.left - 150, // Adjust this value to position it to the left of the messages icon
    });
    setShowMessages((prev) => !prev);
  };

  return (
    <div className="app-container">
      <Navbar
        onNotificationsClick={handleNotificationsClick}
        onMessagesClick={handleMessagesClick}
      />
      <Sidebar />
      <div
        className="content"
        style={{ marginLeft: "100px", marginTop: "64px" }}
      >
        {" "}
        {/* Adjust these values based on actual dimensions */}
        <Routes>
          <Route path="/" element={<Shifts />} />
          <Route path="/shifts" element={<Shifts />} />
          <Route path="/volunteers" element={<Volunteers />} />
          <Route path="/messages" element={<Messages />} />
          {/* Additional routes can be defined here */}
        </Routes>
      </div>
      {showNotifications && (
        <>
          <div
            className="navbar-notifications-backdrop"
            onClick={() => setShowNotifications(false)}
          ></div>
          <Notifications
            onClose={() => setShowNotifications(false)}
            style={{
              position: "absolute",
              top: `${notificationPosition.top}px`,
              left: `${notificationPosition.left}px`,
              zIndex: 1000, // Ensure it is above the backdrop
            }}
          />
        </>
      )}
      {showMessages && (
        <>
          <div
            className="navbar-messages-backdrop"
            onClick={() => setShowMessages(false)}
          ></div>
          <MessagesNotifications
            onClose={() => setShowMessages(false)}
            style={{
              position: "absolute",
              top: `${messagePosition.top}px`,
              left: `${messagePosition.left}px`,
              zIndex: 1000, // Ensure it is above the backdrop
            }}
          />
        </>
      )}
    </div>
  );
}

export default App;
