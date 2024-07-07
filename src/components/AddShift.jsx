import React, { useState } from "react";
import { ReactComponent as CloseIcon } from "../assets/close icon.svg";
import { ReactComponent as ShiftsIcon } from "../assets/shifts icon.svg";
import { ReactComponent as ShiftManagerIcon } from "../assets/shift manager icon.svg";
import { ReactComponent as VolunteersIcon } from "../assets/volunteers icon.svg";
import { ReactComponent as LocationIcon } from "../assets/location icon.svg";
import { ReactComponent as DescriptionIcon } from "../assets/description icon.svg";
import { ReactComponent as ArrowDownIcon } from "../assets/errow down icon.svg";
import "./AddShift.css";

const AddShift = ({ onClose }) => {
  const [detailText, setDetailText] = useState({
    shiftType: "בחר משמרת",
    date: "",
    manager: "",
    participants: "",
    location: "",
    description: "",
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const shiftTypes = ["מנהרה", "דוכן", "הסברה"];

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSelectShiftType = (type) => {
    setDetailText((prev) => ({ ...prev, shiftType: type }));
    setDropdownOpen(false);
  };

  const handleChange = (field, value) => {
    setDetailText((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddShift = () => {
    const { shiftType, date, manager, participants, location, description } =
      detailText;
    if (
      shiftType !== "בחר משמרת" &&
      date &&
      manager &&
      participants &&
      location &&
      description
    ) {
      onClose(); // Close the window if all fields are filled
    } else {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000); // Hide the toast after 3 seconds
    }
  };

  return (
    <div className="add-shift">
      <div className={`toast ${showToast ? "show" : ""}`}>
        אנא מלאו את כל השדות.{" "}
      </div>
      <div className="add-shift-header">
        <button className="close-button" onClick={onClose}>
          <CloseIcon />
        </button>
      </div>
      <div className="add-shift-content">
        <div className="select-shift" onClick={handleDropdownToggle}>
          <span>{detailText.shiftType}</span> <ArrowDownIcon />
        </div>
        {dropdownOpen && (
          <div className="dropdown">
            {shiftTypes.map((type, index) => (
              <div
                key={index}
                className="dropdown-item"
                onClick={() => handleSelectShiftType(type)}
              >
                {type}
              </div>
            ))}
          </div>
        )}
        <div className="detail-entry">
          <ShiftsIcon />
          <input
            type="text"
            placeholder="הוספת תאריך ושעה"
            value={detailText.date}
            onChange={(e) => handleChange("date", e.target.value)}
          />
        </div>
        <div className="detail-entry">
          <ShiftManagerIcon />
          <input
            type="text"
            placeholder="אחראי/ת משמרת"
            value={detailText.manager}
            onChange={(e) => handleChange("manager", e.target.value)}
          />
        </div>
        <div className="detail-entry">
          <VolunteersIcon />
          <input
            type="text"
            placeholder="הוספת כמות/משתתפים"
            value={detailText.participants}
            onChange={(e) => handleChange("participants", e.target.value)}
          />
        </div>
        <div className="detail-entry">
          <LocationIcon />
          <input
            type="text"
            placeholder="מיקום"
            value={detailText.location}
            onChange={(e) => handleChange("location", e.target.value)}
          />
        </div>
        <div className="detail-entry">
          <DescriptionIcon />
          <input
            type="text"
            placeholder="הוספת תיאור"
            value={detailText.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </div>
      </div>
      <div className="add-shift-footer">
        <button className="add-button" onClick={handleAddShift}>
          הוספה
        </button>
      </div>
    </div>
  );
};

export default AddShift;
