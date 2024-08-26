import React, { useRef, useEffect, useState } from "react";
import Approval from "./Approval";
import { ReactComponent as EditIcon } from "../assets/edit icon.svg";
import { ReactComponent as ClockIcon } from "../assets/clock icon.svg";
import { ReactComponent as MessagesIcon } from "../assets/Messages icon.svg";
import { ReactComponent as AddTaskIcon } from "../assets/add_task icon.svg";
import profile1 from "../assets/profile1.jpg";
import "./ShiftCard.css";

// Retrieving information from the server about the user according to his id
const fetchUserById = async (userId) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/account/users/${userId}/`
    );
    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    return null;
  }
};

const ShiftCard = ({
  id,
  date,
  time,
  title,
  manager,
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
  const [approvalRequestsWithUserData, setApprovalRequestsWithUserData] =
    useState([]);

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

  // Extract the date part from the start_date
  const shiftDate = new Date(date);
  const shiftDay = shiftDate.getDate();
  const shiftMonth = shiftDate.getMonth();
  const shiftYear = shiftDate.getFullYear();

  // Extract current date details
  const currentDay = currentTime.getDate();
  const currentMonth = currentTime.getMonth();
  const currentYear = currentTime.getFullYear();

  // Check if the shift is on the current day
  const isCurrentDay =
    shiftDay === currentDay &&
    shiftMonth === currentMonth &&
    shiftYear === currentYear;

  // Determine if the shift is in the past only if it's the current day
  const isPast =
    (currentTime > endTime && isCurrentDay) || currentTime > shiftDate;

  // Correctly handle time comparison
  //const isPast = currentTime > endTime;

  /*   useEffect(() => {
    console.log("Current time:", currentTime);
    console.log("End time:", endTime);
    console.log("Is past:", isPast);
  }, [currentTime, endTime, isPast]); */

  useEffect(() => {
    const fetchApprovalRequestsData = async () => {
      const updatedRequests = await Promise.all(
        approvalRequests.map(async (request) => {
          const user = await fetchUserById(request.user);
          return {
            id: request.id,
            name: `${user.first_name} ${user.last_name}`,
            profilePic: profile1,
          };
        })
      );
      setApprovalRequestsWithUserData(updatedRequests);
    };

    if (showApprovalModal) {
      fetchApprovalRequestsData();
    }
  }, [showApprovalModal, approvalRequests]);

  const handleEditClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const position = {
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
    };
    onEdit(position, {
      id,
      date,
      time,
      title,
      type,
      manager,
      participants,
      totalParticipants,
    });
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

  const handleApprove = (requestId) => {
    setApprovalRequestsWithUserData((prevRequests) =>
      prevRequests.filter((request) => request.id !== requestId)
    );
    setToastMessage("הבקשה אושרה בהצלחה");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleDeny = (requestId) => {
    setApprovalRequestsWithUserData((prevRequests) =>
      prevRequests.filter((request) => request.id !== requestId)
    );
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
      <div className="shift-card-header">
        <div className="edit-icon-container" onClick={handleEditClick}>
          <EditIcon className="edit-icon" />
        </div>
        <div className="time-and-clock">
          <ClockIcon className="clock-icon" />
          <span>{time}</span>
        </div>
      </div>
      <div className="title">{manager}</div>
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
            requests={approvalRequestsWithUserData}
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
