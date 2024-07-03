import React from "react";
import { ReactComponent as EditIcon } from "../assets/edit icon.svg";
import { ReactComponent as ClockIcon } from "../assets/clock icon.svg";
import { ReactComponent as MessagesIcon } from "../assets/Messages icon.svg";
import { ReactComponent as AddTaskIcon } from "../assets/add_task icon.svg";
import "./ShiftCard.css";

const ShiftCard = ({ time, title, participants, totalParticipants }) => {
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
  const endTime = new Date();
  endTime.setHours(Number(time.split("-")[1].split(":")[0]));
  endTime.setMinutes(Number(time.split("-")[1].split(":")[1]));

  const isPast = currentTime.getTime() > endTime.getTime();

  return (
    <div
      className={`shift-card ${isPast ? "past" : ""}`}
      style={{ borderColor: color }}
    >
      <div className="header">
        <div className="edit-icon-container">
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
        <MessagesIcon className="messages-icon" />
        <AddTaskIcon className="add-task-icon" />
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
    </div>
  );
};

export default ShiftCard;
