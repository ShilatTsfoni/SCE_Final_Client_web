import React, { useState, useEffect } from "react";
import ChatsSidebar from "../components/ChatsSidebar";
import ChatWindow from "../components/ChatWindow";
import "./Messages.css";

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    console.log("Selected chat in Messages:", selectedChat);
  }, [selectedChat]);

  return (
    <div className="messages-container">
      <ChatsSidebar onSelectChat={setSelectedChat} />
      <ChatWindow chat={selectedChat} />
    </div>
  );
};

export default Messages;
