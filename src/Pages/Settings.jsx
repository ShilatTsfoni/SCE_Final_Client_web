import React from "react";
import { useNavigate } from "react-router-dom";
import "./Settings.css";

const Settings = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <div className="settings-container">
      <h1>Settings</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Settings;
