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
  shiftId,
  initialName,
  iniitalOrganizationId,
  initialStartDate,
  onShiftDeleted,
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formattedDate = formatDate(detailText.date);

  const handleSaveShift = async () => {
    console.log("Save button clicked");
    const { manager, participants, location, description } = detailText;

    if (manager && participants && location && description) {
      const updatedShift = {
        description: description,
        max_volunteers: parseInt(participants, 10), // Convert participants to an integer
        shift_manager: String(manager),
        organization_id: iniitalOrganizationId,
        name: initialName,
        start_date: initialStartDate,
        organization: iniitalOrganizationId,
      };

      console.log("Request Payload:", updatedShift); // Log the request payload

      try {
        console.log("Attempting to save shift...");
        const response = await fetch(
          `http://127.0.0.1:8000/api/shifts/${shiftId}/`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedShift),
          }
        );
        console.log("All fields filled");

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error response data:", errorData); // Log error response
          throw new Error("Failed to update shift");
        }

        const data = await response.json();
        console.log("Shift updated successfully:", data);

        setToastMessage("השינויים נשמרו בהצלחה");
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
          onClose();
        }, 3000);
      } catch (error) {
        console.error("Error updating shift:", error);
      }
    } else {
      console.log("Some fields are missing");
      setToastMessage("אנא מלאו את כל השדות");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const handleDeleteShift = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/shifts/${shiftId}/`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete shift");
      }

      setToastMessage("המשמרת נמחקה בהצלחה");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        onClose();
        onShiftDeleted(shiftId); // Notify parent component about the deletion
      }, 3000);
    } catch (error) {
      console.error("Error deleting shift:", error);
      setToastMessage("מחיקת המשמרת נכשלה");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
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
            placeholder={`${formattedDate} ${detailText.startTime} - ${detailText.endTime}`}
            value={`${formattedDate} ${detailText.startTime} - ${detailText.endTime}`}
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
