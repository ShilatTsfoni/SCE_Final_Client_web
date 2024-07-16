import React, { useState } from "react";
import { ReactComponent as SendMessageIcon } from "../assets/send message icon.svg";
import organizationLogo from "../assets/homePageLogo.png";
import "./ChatWindow.css";

const ChatWindow = ({ chat, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const message = { sender: "user", text: newMessage };

    // Update the parent state with the new message
    onSendMessage(chat.id, message);

    setNewMessage("");
  };

  if (!chat) {
    return <div className="chat-window">בחר שיחה כדי להתחיל</div>;
  }

  return (
    <div className="chat-window">
      <div className="chat-header">
        <img src={chat.profile} alt={chat.name} className="message-avatar" />
        <h2>{chat.name}</h2>
      </div>
      <div className="chat-messages">
        {chat.messages.map((message, index) => (
          <div
            key={index}
            className={`message ${
              message.sender === "user" ? "message-user" : "message-reply"
            }`}
          >
            <div className="message-text">{message.text}</div>
            <img
              src={message.sender === "user" ? organizationLogo : chat.profile}
              alt={chat.name}
              className="message-avatar"
            />
          </div>
        ))}
      </div>
      <div className="message-input-container">
        <SendMessageIcon
          onClick={handleSendMessage}
          className="send-message-icon"
        />
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="השב"
        />
      </div>
    </div>
  );
};

export default ChatWindow;
