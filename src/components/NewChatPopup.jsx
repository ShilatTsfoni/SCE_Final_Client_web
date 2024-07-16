import React from "react";
import profile1 from "../assets/profile1.jpg";
import profile2 from "../assets/profile2.jpg";
import profile3 from "../assets/profile3.jpg";
import "./NewChatPopup.css";

const volunteers = [
  { id: 1, name: "יעל כהן", profile: profile1 },
  { id: 2, name: "דני כהן", profile: profile2 },
];

const groups = [{ id: 3, name: "משמרת דוכן בוקר", profile: profile3 }];

const NewChatPopup = ({ onClose, onCreateChat, currentCategory }) => {
  const handleCreateChat = (chat) => {
    onCreateChat(chat);
    onClose();
  };

  const list = currentCategory === "private" ? volunteers : groups;

  return (
    <div className="new-chat-popup">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>בחר {currentCategory === "private" ? "מתנדב" : "קבוצה"}</h2>
        <div className="chat-list">
          {list.map((item) => (
            <div
              key={item.id}
              className="chat-item"
              onClick={() => handleCreateChat(item)}
            >
              <div className="chat-avatar">
                <img src={item.profile} alt={item.name} />
              </div>
              <div className="chat-details">
                <div className="chat-name">{item.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewChatPopup;
