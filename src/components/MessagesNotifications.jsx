import React, { useState } from "react";
import { ReactComponent as CloseIcon } from "../assets/close icon.svg";
import { ReactComponent as SendIcon } from "../assets/send icon.svg";
import "./MessagesNotifications.css";

import profile1 from "../assets/profile1.jpg";
import profile2 from "../assets/profile2.jpg";

const messages = [
  {
    id: 1,
    sender: "דני לוזון",
    profilePic: profile1,
    content:
      "שלום, רציתי לשאול לגבי ההתנדבות בכיכר החטופים ביום שני הבא אם אפשר לבוא לשעתיים במקום 3 שעות ?",
    timestamp: "1 שעות",
    type: "received",
  },
];

const MessagesNotifications = ({ onClose, style }) => {
  const [messageContent, setMessageContent] = useState("");

  const handleInputChange = (e) => {
    setMessageContent(e.target.value);
  };

  const handleSendMessage = () => {
    // Logic to send message
    setMessageContent("");
  };

  return (
    <div className="messages-notifications-modal" style={style}>
      <div className="messages-notifications-modal-header">
        <h2>הודעות</h2>
        <button
          className="messages-notifications-close-button"
          onClick={onClose}
        >
          <CloseIcon />
        </button>
      </div>
      <div className="messages-notifications-modal-content">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message-notifications-item ${message.type}`}
          >
            <img
              src={message.profilePic}
              alt={message.sender}
              className="message-notifications-profile-pic"
            />
            <div className="message-notifications-info">
              <div className="message-notifications-sender">
                {message.sender}
              </div>
              <div className="message-notifications-content-wrapper">
                <div className="message-notifications-content">
                  {message.content}
                  <span className="message-notifications-timestamp">
                    {message.timestamp}
                  </span>
                </div>
              </div>
              <div className="messages-notifications-input-wrapper">
                <input
                  type="text"
                  value={messageContent}
                  onChange={handleInputChange}
                  placeholder="השב"
                />
                <button
                  onClick={handleSendMessage}
                  className="send-icon-button"
                >
                  <SendIcon />
                </button>
              </div>
            </div>
            <div className="message-notifications-footer"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessagesNotifications;
