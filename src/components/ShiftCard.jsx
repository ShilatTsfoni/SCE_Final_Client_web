import React, { useRef, useEffect, useState } from "react";
import Approval from "./Approval";
import { ReactComponent as EditIcon } from "../assets/edit icon.svg";
import { ReactComponent as ClockIcon } from "../assets/clock icon.svg";
import { ReactComponent as MessagesIcon } from "../assets/Messages icon.svg";
import { ReactComponent as AddTaskIcon } from "../assets/add_task icon.svg";
import "./ShiftCard.css";

const ShiftCard = ({
  date,
  time,
  title,
  participants,
  totalParticipants,
  type,
  onEdit,
  approvalRequests = [],
}) => {
  const cardRef = useRef(null);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const getColor = (current, total) => {
    const ratio = current / total;
    if (ratio === 1) return "#078727";
    if (ratio > 0.5) return "#C26B01";
    return "#CC1B00";
  };

  const color = getColor(participants.length, totalParticipants);
  const filledPart = (participants.length / totalParticipants) * 360;

  // Time Handling
  const currentTime = new Date();
  const [startHour, startMinute] = time.split("-")[0].split(":").map(Number);
  const [endHour, endMinute] = time.split("-")[1].split(":").map(Number);

  const endTime = new Date(currentTime);
  endTime.setHours(endHour, endMinute, 0, 0);

  // Correctly handle time comparison
  const isPast = currentTime > endTime;

  /*   useEffect(() => {
    console.log("Current time:", currentTime);
    console.log("End time:", endTime);
    console.log("Is past:", isPast);
  }, [currentTime, endTime, isPast]); */

  const handleEditClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const position = {
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
    };
    onEdit(position, date, time, title, type);
  };

  const handleAddTaskClick = () => {
    if (approvalRequests.length === 0) {
      setToastMessage("אין בקשות הממתינות לאישור");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } else {
      setShowApprovalModal(true);
    }
  };

  const handleApprove = () => {
    setToastMessage("הבקשה אושרה בהצלחה");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleDeny = () => {
    setToastMessage("הבקשה נדחתה בהצלחה");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div
      ref={cardRef}
      className={`shift-card ${isPast ? "past" : ""}`}
      style={{ borderColor: color }}
    >
      <div className="header">
        <div className="edit-icon-container" onClick={handleEditClick}>
          <EditIcon className="edit-icon" />
        </div>
        <div className="time-and-clock">
          <ClockIcon className="clock-icon" />
          <span>{time}</span>
        </div>
      </div>
      <div className="title">{title}</div>
      <div className="participant-status">
        <div className="participant-text">
          {participants.length}/{totalParticipants}
          <br />
          משתתפים
        </div>
        <div
          className="circle-wrap"
          style={{ "--percentage": `${filledPart}deg`, "--color": color }}
        >
          <div className="circle">
            <div className="mask full">
              <div className="fill"></div>
            </div>
            <div className="mask half">
              <div className="fill"></div>
            </div>
            <div className="inside-circle"></div>{" "}
            {/* This is to ensure the circle remains white in the center */}
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="add-task-icon-container" onClick={handleAddTaskClick}>
          <AddTaskIcon className="add-task-icon" />
          {approvalRequests.length > 0 && (
            <div className="notification-badge">{approvalRequests.length}</div>
          )}
        </div>
        <MessagesIcon className="messages-icon" />
        <div className="participants">
          {participants.length > 4 && (
            <div className="extra-participants">{`+${
              participants.length - 4
            }`}</div>
          )}
          {participants.slice(0, 4).map((participant, index) => (
            <img
              key={index}
              src={participant.photo}
              alt={participant.name}
              className="participant-photo"
            />
          ))}
        </div>
      </div>
      {showApprovalModal && (
        <>
          <div
            className="approval-backdrop"
            onClick={() => setShowApprovalModal(false)}
          ></div>
          <Approval
            onClose={() => setShowApprovalModal(false)}
            requests={approvalRequests}
            onApprove={handleApprove}
            onDeny={handleDeny}
          />
        </>
      )}
      <div className={`shift-card-toast ${showToast ? "show" : ""}`}>
        {toastMessage}
      </div>
    </div>
  );
};

export default ShiftCard;
