import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Settings.css";

const Settings = ({ onLogout }) => {
  const [organization, setOrganization] = useState({
    name: "",
    description: "",
    contact_name: "",
    contact_phone: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrganization = async () => {
      const orgId = localStorage.getItem("orgId");
      if (!orgId) return;

      try {
        const orgResponse = await fetch(
          `http://127.0.0.1:8000/api/organizations/${orgId}/`
        );
        const orgData = await orgResponse.json();
        console.log("Organization Data:", orgData); //checking organization data
        setOrganization(orgData);
      } catch (error) {
        console.error("Failed to fetch organization details:", error);
      }
    };

    fetchOrganization();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "description") {
      const wordCount = value.trim().split(/\s+/).length;
      if (wordCount > 50) {
        return; //limit to 50 words
      }
    } else if (name === "contact_name") {
      const wordCount = value.trim().split(/\s+/).length;
      if (wordCount > 5) {
        return; //limit to 5 words
      }
    } else if (name === "contact_phone") {
      if (value === "") {
        setOrganization((prevOrg) => ({
          ...prevOrg,
          [name]: "",
        }));
        return;
      }

      const phoneRegex = /^[0-9\b]+$/;
      if (!phoneRegex.test(value) || value.length > 10) {
        return;
      }
    }

    setOrganization((prevOrg) => ({
      ...prevOrg,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const orgId = localStorage.getItem("orgId");
    console.log("orgid", orgId);
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/organizations/${orgId}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(organization),
        }
      );
      if (response.ok) {
        setIsEditing(false);
        setToast({
          show: true,
          message: "פרטי הארגון עודכנו בהצלחה",
          type: "success",
        });
      } else {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        setToast({
          show: true,
          message: "לא הצלחנו לשמור את השינויים, נסה שוב.",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Failed to update organization details:", error);
      setToast({
        show: true,
        message: "לא הצלחנו לשמור את השינויים, נסה שוב.",
        type: "error",
      });
    }
  };

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ show: false, message: "", type: "" });
      }, 3000); // הסתרה אחרי 3 שניות

      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <div className="settings-container">
      <div className="logout-button-container">
        <button onClick={handleLogout} className="logout-button">
          התנתק
        </button>
      </div>
      <h1>פרטי הארגון</h1>
      <div className="settings-field">
        <label>שם הארגון:</label>
        <input type="text" value={organization.name} disabled />
      </div>
      <div className="settings-field">
        <label>תיאור:</label>
        <textarea
          name="description"
          value={organization.description || ""}
          onChange={handleInputChange}
          disabled={!isEditing}
        />
      </div>
      <div className="settings-field">
        <label>שם איש קשר:</label>
        <input
          type="text"
          name="contact_name"
          value={organization.contact_name || ""}
          onChange={handleInputChange}
          disabled={!isEditing}
        />
      </div>
      <div className="settings-field">
        <label>טלפון איש קשר:</label>
        <input
          type="text"
          name="contact_phone"
          value={organization.contact_phone || ""}
          onChange={handleInputChange}
          disabled={!isEditing}
        />
      </div>
      <div className="edit-button-container">
        {isEditing ? (
          <button className="edit-button" onClick={handleSave}>
            שמור
          </button>
        ) : (
          <button className="edit-button" onClick={() => setIsEditing(true)}>
            עריכת נתונים
          </button>
        )}
      </div>
      {/* Toast notification */}
      <div
        className={`toast settingsPage-toast ${toast.show ? "show" : ""} ${
          toast.type
        }`}
      >
        {toast.message}
      </div>
    </div>
  );
};

export default Settings;
