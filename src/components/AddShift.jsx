import React, { useState } from "react";
import { ReactComponent as CloseIcon } from "../assets/close icon.svg";
import { ReactComponent as ShiftsIcon } from "../assets/shifts icon.svg";
import { ReactComponent as ShiftManagerIcon } from "../assets/shift manager icon.svg";
import { ReactComponent as VolunteersIcon } from "../assets/volunteers icon.svg";
import { ReactComponent as LocationIcon } from "../assets/location icon.svg";
import { ReactComponent as DescriptionIcon } from "../assets/description icon.svg";
import { ReactComponent as ArrowDownIcon } from "../assets/errow down icon.svg";
import "./AddShift.css";
const API_URL = "http://127.0.0.1:8000/api/shifts/";
const formatDateTime = (day, month, year, hour, minute) => {
  // Ensure two digits for day, month, hour, and minute
  const twoDigit = (num) => num.toString().padStart(2, "0");

  // Format the date and time
  return `${year}-${twoDigit(month)}-${twoDigit(day)}T${twoDigit(
    hour
  )}:${twoDigit(minute)}:00`;
};

const calculateDurationForDjango = (
  startHour,
  startMinute,
  endHour,
  endMinute
) => {
  // Create date objects for the start and end times
  const startDate = new Date();
  startDate.setHours(startHour);
  startDate.setMinutes(startMinute);
  startDate.setSeconds(0);
  startDate.setMilliseconds(0);

  const endDate = new Date();
  endDate.setHours(endHour);
  endDate.setMinutes(endMinute);
  endDate.setSeconds(0);
  endDate.setMilliseconds(0);

  // Calculate the difference in milliseconds
  const diffInMilliseconds = endDate - startDate;

  // Convert milliseconds to minutes
  const diffInMinutes = diffInMilliseconds / 1000 / 60;

  // Calculate hours and remaining minutes
  const diffHours = Math.floor(diffInMinutes / 60);
  const diffMinutes = diffInMinutes % 60;

  // Format as ISO 8601 duration string
  const durationString = `PT${diffHours}H${diffMinutes}M`;

  return durationString;
};
const prepareData = (
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
  description
) => {
  return {
    name: shiftType,
    start_date: formatDateTime(day, month, year, startHour, startMinute),
    duration: calculateDurationForDjango(
      startHour,
      startMinute,
      endHour,
      endMinute
    ),
    shift_manager: 2,
    max_volunteers: participants,
    location: location,
    description: description,
    organization: 1,
    recurring: false,
    organization_id: 1,
  };
};
const sendDataToApi = async (json_data) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(json_data),
  });

  if (!response.ok) {
    console.error("Failed to send data");
  } else {
    console.log("Data sent successfully");
  }
};
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
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
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
    if (
      shiftType !== "בחר משמרת" &&
      day &&
      month &&
      year &&
      startHour &&
      startMinute &&
      endHour &&
      endMinute &&
      //manager &&
      participants &&
      location &&
      description
    ) {
      let json_data = prepareData(
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
        description
      );
      console.log(json_data);
      let ans = sendDataToApi(json_data);
      console.log(ans);
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
