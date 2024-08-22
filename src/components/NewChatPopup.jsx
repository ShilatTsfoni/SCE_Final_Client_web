import React from "react";
import { ReactComponent as CloseIcon } from "../assets/close icon.svg";
import "./NewChatPopup.css";
import profile1 from "../assets/profile1.jpg";

/* const volunteers = [
  { id: 1, name: "יעל כהן", profile: profile1 },
  { id: 2, name: "דני כהן", profile: profile2 },
];

const groups = [{ id: 3, name: "משמרת דוכן בוקר", profile: profile3 }];
 */
const NewChatPopup = ({ onClose, onCreateChat, currentCategory, friends }) => {
  const handleCreateChat = (chat) => {
    onCreateChat(chat);
    onClose();
  };

  const list =
    currentCategory === "private"
      ? friends
      : [{ id: 3, name: "משמרת דוכן בוקר", profile: "../assets/profile3.jpg" }];

  return (
    <div className="new-chat-popup">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>
          <CloseIcon />
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
                <img src={profile1} className="message-avatar" />
              </div>
              <div className="chat-details">
                <div className="chat-name">{`${item.first_name} ${item.last_name}`}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewChatPopup;
