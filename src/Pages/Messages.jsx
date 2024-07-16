import React, { useState } from "react";
import ChatsSidebar from "../components/ChatsSidebar";
import ChatWindow from "../components/ChatWindow";
import profile1 from "../assets/profile1.jpg";
import profile2 from "../assets/profile2.jpg";
import profile3 from "../assets/profile3.jpg";
import "./Messages.css";

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  const [chats, setChats] = useState([
    {
      id: 1,
      type: "private",
      name: "יעל כהן",
      lastMessage: "שלום",
      profile: profile1,
      time: "1 שעה",
      status: "נקראה",
      messages: [
        { sender: "user", text: "שלום" },
        { sender: "reply", text: "שלום, מה שלומך?" },
      ],
    },
    {
      id: 2,
      type: "private",
      name: "דני כהן",
      lastMessage: "מה שלומך?",
      profile: profile2,
      time: "3 שעות",
      status: "נשלחה",
      messages: [
        { sender: "user", text: "מה שלומך?" },
        { sender: "reply", text: "אני בסדר, תודה" },
      ],
    },
    {
      id: 3,
      type: "group",
      name: "משמרת דוכן בוקר",
      lastMessage: "ברוך הבא!",
      profile: profile3,
      time: "5 דקות",
      status: "נקראה",
      messages: [
        { sender: "user", text: "ברוך הבא!" },
        { sender: "reply", text: "תודה רבה:)" },
      ],
    },
  ]);

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
  };

  const handleSendMessage = (chatId, message) => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: [...chat.messages, message],
              lastMessage: message.text,
              time: "עכשיו",
              status: "נשלחה",
            }
          : chat
      )
    );
    // Update the selected chat immediately
    if (selectedChat && selectedChat.id === chatId) {
      setSelectedChat((prevSelectedChat) => ({
        ...prevSelectedChat,
        messages: [...prevSelectedChat.messages, message],
        lastMessage: message.text,
        time: "עכשיו",
        status: "נשלחה",
      }));
    }
  };

  const handleCreateChat = (newChat) => {
    const newChatObject = {
      id: chats.length + 1,
      type: newChat.id < 3 ? "private" : "group", // Assuming id less than 3 are volunteers and others are groups
      name: newChat.name,
      lastMessage: "",
      profile: newChat.profile,
      time: "",
      status: "",
      messages: [],
    };

    setChats((prevChats) => [...prevChats, newChatObject]);
    setSelectedChat(newChatObject);
  };

  return (
    <div className="messages-container">
      <ChatsSidebar
        privateChats={chats.filter((chat) => chat.type === "private")}
        groupChats={chats.filter((chat) => chat.type === "group")}
        onSelectChat={handleSelectChat}
        onCreateChat={handleCreateChat}
      />
      <ChatWindow chat={selectedChat} onSendMessage={handleSendMessage} />
    </div>
  );
};

export default Messages;
