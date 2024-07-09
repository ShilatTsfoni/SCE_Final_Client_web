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
    day: "",
    month: "",
    year: "",
    startHour: "",
    startMinute: "",
    endHour: "",
    endMinute: "",
    manager: "",
    participants: "",
    location: "",
    description: "",
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const shiftTypes = ["מנהרה", "דוכן", "הסברה"];

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    "ינואר",
    "פברואר",
    "מרץ",
    "אפריל",
    "מאי",
    "יוני",
    "יולי",
    "אוגוסט",
    "ספטמבר",
    "אוקטובר",
    "נובמבר",
    "דצמבר",
  ];
  const years = Array.from(
    { length: 10 },
    (_, i) => new Date().getFullYear() + i
  );
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);
  const participants = Array.from({ length: 100 }, (_, i) => i + 1);

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
    const {
      shiftType,
      day,
      month,
      year,
      startHour,
      startMinute,
      endHour,
      endMinute,
      manager,
      participants,
      location,
      description,
    } = detailText;

    const allFieldsFilled =
      shiftType !== "בחר משמרת" &&
      day &&
      month &&
      year &&
      startHour &&
      startMinute &&
      endHour &&
      endMinute &&
      manager &&
      participants &&
      location &&
      description;

    if (allFieldsFilled) {
      console.log(detailText); // Print shift details to the console
      onClose(); // Close the window if all fields are filled
    } else {
      console.log("Validation failed, missing fields:", detailText);
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
          <div className="date-time-entry">
            <select
              value={detailText.day}
              onChange={(e) => handleChange("day", e.target.value)}
            >
              <option value="">יום</option>
              {days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
            <select
              value={detailText.month}
              onChange={(e) => handleChange("month", e.target.value)}
            >
              <option value="">חודש</option>
              {months.map((month, index) => (
                <option key={index} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <select
              value={detailText.year}
              onChange={(e) => handleChange("year", e.target.value)}
            >
              <option value="">שנה</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="detail-entry">
          <ShiftsIcon />
          <div className="date-time-entry">
            <select
              value={detailText.startHour}
              onChange={(e) => handleChange("startHour", e.target.value)}
            >
              <option value="">שעה התחלתית</option>
              {hours.map((hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
            </select>
            <select
              value={detailText.startMinute}
              onChange={(e) => handleChange("startMinute", e.target.value)}
            >
              <option value="">דקה התחלתית</option>
              {minutes.map((minute) => (
                <option key={minute} value={minute}>
                  {minute}
                </option>
              ))}
            </select>
            <span>-</span>
            <select
              value={detailText.endHour}
              onChange={(e) => handleChange("endHour", e.target.value)}
            >
              <option value="">שעה סופית</option>
              {hours.map((hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
            </select>
            <select
              value={detailText.endMinute}
              onChange={(e) => handleChange("endMinute", e.target.value)}
            >
              <option value="">דקה סופית</option>
              {minutes.map((minute) => (
                <option key={minute} value={minute}>
                  {minute}
                </option>
              ))}
            </select>
          </div>
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
          <select
            value={detailText.participants}
            onChange={(e) => handleChange("participants", e.target.value)}
          >
            <option value="">הוספת כמות/משתתפים</option>
            {participants.map((participant) => (
              <option key={participant} value={participant}>
                {participant}
              </option>
            ))}
          </select>
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
