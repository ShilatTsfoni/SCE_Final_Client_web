import React, { useState } from "react";
import { ReactComponent as CloseIcon } from "../assets/close icon.svg";
import { ReactComponent as ClockIcon } from "../assets/clock icon.svg";
import { ReactComponent as ShiftManagerIcon } from "../assets/shift manager icon.svg";
import { ReactComponent as VolunteersIcon } from "../assets/volunteers icon.svg";
import { ReactComponent as LocationIcon } from "../assets/location icon.svg";
import { ReactComponent as DescriptionIcon } from "../assets/description icon.svg";
import { ReactComponent as ShiftsIcon } from "../assets/shifts icon.svg";
import "./EditShift.css";

const EditShift = ({
  onClose,
  shiftType,
  initialDate,
  initialStartTime,
  initialEndTime,
}) => {
  const [detailText, setDetailText] = useState({
    shiftType: shiftType,
    date: initialDate,
    startTime: initialStartTime,
    endTime: initialEndTime,
    manager: "",
    participants: "",
    location: "",
    description: "",
  });

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleChange = (field, value) => {
    setDetailText((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveShift = () => {
    const {
      date,
      startTime,
      endTime,
      manager,
      participants,
      location,
      description,
    } = detailText;
    if (
      date &&
      startTime &&
      endTime &&
      manager &&
      participants &&
      location &&
      description
    ) {
      setToastMessage("השינויים נשמרו בהצלחה");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        onClose();
      }, 3000);
    } else {
      setToastMessage("אנא מלאו את כל השדות");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const handleDeleteShift = () => {
    setToastMessage("המשמרת נמחקה בהצלחה");
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="edit-shift">
      <div className={`edit-toast ${showToast ? "show" : ""}`}>
        {toastMessage}
      </div>
      <div className="edit-shift-header">
        <button className="edit-close-button" onClick={onClose}>
          <CloseIcon />
        </button>
      </div>
      <div className="edit-shift-content">
        <div className="edit-shift-type">
          <span>{shiftType}</span>
        </div>
        <div className="edit-detail-entry">
          <ClockIcon />
          <input
            type="text"
            placeholder={`${detailText.date} ${detailText.startTime} - ${detailText.endTime}`}
            value={`${detailText.date} ${detailText.startTime} - ${detailText.endTime}`}
            onChange={(e) => handleChange("dateTime", e.target.value)}
          />
        </div>
        <div className="edit-detail-entry">
          <ShiftManagerIcon />
          <input
            type="text"
            placeholder="אחראי/ת משמרת"
            value={detailText.manager}
            onChange={(e) => handleChange("manager", e.target.value)}
          />
        </div>
        <div className="edit-detail-entry">
          <VolunteersIcon />
          <input
            type="text"
            placeholder="הוספת כמות/משתתפים"
            value={detailText.participants}
            onChange={(e) => handleChange("participants", e.target.value)}
          />
        </div>
        <div className="edit-detail-entry">
          <LocationIcon />
          <input
            type="text"
            placeholder="מיקום"
            value={detailText.location}
            onChange={(e) => handleChange("location", e.target.value)}
          />
        </div>
        <div className="edit-detail-entry">
          <DescriptionIcon />
          <input
            type="text"
            placeholder="הוספת תיאור"
            value={detailText.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </div>
      </div>
      <div className="edit-shift-footer">
        <button className="edit-delete-button" onClick={handleDeleteShift}>
          מחיקה
        </button>
        <button className="edit-save-button" onClick={handleSaveShift}>
          שמירה
        </button>
      </div>
    </div>
  );
};

export default EditShift;
