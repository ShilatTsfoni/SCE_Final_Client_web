import React, { useState } from "react";
import "./ChatsSidebar.css";
import { ReactComponent as SearchIcon } from "../assets/search icon.svg";
import { ReactComponent as NewChatIcon } from "../assets/new chat icon.svg";
import NewChatPopup from "./NewChatPopup";
const ChatsSidebar = ({
  privateChats,
  groupChats,
  onSelectChat,
  onCreateChat,
}) => {
  const [currentCategory, setCurrentCategory] = useState("private");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [showNewChatPopup, setShowNewChatPopup] = useState(false);

  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
    setSelectedChatId(null); // Reset selected chat when category changes
  };

  const handleSelectChat = (chat) => {
    setSelectedChatId(chat.id);
    onSelectChat(chat);
  };

  const filteredChats = (
    currentCategory === "private" ? privateChats : groupChats
  ).filter((chat) =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNewChatClick = () => {
    setShowNewChatPopup(true);
  };

  const handleClosePopup = () => {
    setShowNewChatPopup(false);
  };

  return (
    <div className="chats-sidebar">
      <div className="header">
        <h3>הודעות</h3>
        <NewChatIcon className="new-chat-icon" onClick={handleNewChatClick} />
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="חיפוש הודעות"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchIcon className="search-icon" />
      </div>
      <div className="chat-categories">
        <button
          onClick={() => handleCategoryChange("private")}
          className={currentCategory === "private" ? "active" : ""}
        >
          פרטי
        </button>
        <button
          onClick={() => handleCategoryChange("group")}
          className={currentCategory === "group" ? "active" : ""}
        >
          קבוצתי
        </button>
      </div>
      <div className="chat-list">
        {filteredChats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => handleSelectChat(chat)}
            className={`chat-item ${
              chat.id === selectedChatId ? "selected" : ""
            }`}
          >
            <div className="chat-avatar">
              <img src={chat.profile} alt={chat.name} />
            </div>
            <div className="chat-details">
              <div className="chat-name">{chat.name}</div>
              <div className="chat-message-preview">
                <span>{chat.lastMessage}</span>
                <span className="chat-meta">
                  <span className="chat-time">{chat.time}</span>
                  <span className="chat-status">{chat.status}</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showNewChatPopup && (
        <NewChatPopup
          onClose={handleClosePopup}
          onCreateChat={onCreateChat}
          currentCategory={currentCategory}
        />
      )}
    </div>
  );
};

export default ChatsSidebar;
