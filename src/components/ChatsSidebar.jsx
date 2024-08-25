import React, { useState, useEffect } from "react";
import "./ChatsSidebar.css";
import { ReactComponent as SearchIcon } from "../assets/search icon.svg";
import { ReactComponent as NewChatIcon } from "../assets/new chat icon.svg";
import NewChatPopup from "./NewChatPopup";
import profile1 from "../assets/profile1.jpg";

const ChatsSidebar = ({ onSelectChat }) => {
  const [currentCategory, setCurrentCategory] = useState("private");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [showNewChatPopup, setShowNewChatPopup] = useState(false);
  const [chats, setChats] = useState([]);
  const [friendList, setFriendList] = useState([]);

  useEffect(() => {
    fetchInbox();
    fetchFriends();

    // Set up polling
    const intervalId = setInterval(() => {
      fetchInbox(); // Fetch the inbox every 5 seconds
    }, 5000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const fetchInbox = async () => {
    const token = localStorage.getItem("userToken");
    try {
      // console.log("token request", token);
      const response = await fetch(
        "http://127.0.0.1:8000/api/messages/inbox/",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.ok) {
        const data = await response.json();
        // console.log("54", token);
        // console.log("55", data[0].related_chat.member_1);
        // console.log("User Chats:", data);
        setChats(data);
      }
    } catch (error) {
      console.error("Error retrieving inbox data from server:", error);
    }
  };

  const fetchFriends = async () => {
    const token = localStorage.getItem("userToken");
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/account/users/friends/",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setFriendList(data);
        // console.log(data);
      }
    } catch (error) {
      console.error("Error retrieving friends data from server:", error);
    }
  };

  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
    setSelectedChatId(null); // Reset selected chat when category changes
  };

  const handleSelectChat = (chat) => {
    setSelectedChatId(chat.id);
    onSelectChat(chat);
  };

  const handleCreateChat = async (newChat) => {
    const token = localStorage.getItem("userToken");
    const userid = localStorage.getItem("user_id");

    const post_body = {
      member_1: { id: userid },
      member_2: { id: newChat.id },
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/chats/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(post_body),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        // הוספת הצ'אט החדש לרשימת הצ'אטים
        const newChatObject = {
          id: data.id,
          type: newChat.id < 3 ? "private" : "group", // מניחים ש-id פחות מ-3 הם פרטיים
          name: newChat.name,
          lastMessage: "",
          profile: newChat.profile,
          time: "",
          status: "",
          messages: [],
          related_chat: data,
        };

        setChats((prevChats) => [...prevChats, newChatObject]);
        setShowNewChatPopup(false);
        onSelectChat(newChatObject);
      } else {
        console.error("Error creating new chat:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating new chat:", error);
    }
  };

  // console.log("Current Category:", currentCategory);

  // Helper function to get the chat name
  const getChatName = (chat) => {
    const userid = localStorage.getItem("user_id");

    if (!chat || !chat.related_chat) {
      console.error("Invalid chat data or related_chat is missing.");
      return "Unknown Chat";
    }
    // console.log("User ID:", userid);
    // console.log("Member 1 ID:", chat.related_chat.member_1?.id);
    // console.log("Member 2 ID:", chat.related_chat.member_2?.id);

    if (userid === chat.related_chat.member_1.id.toString()) {
      return chat.related_chat.member_2.name;
    } else {
      return chat.related_chat.member_1.name;
    }
  };

  // Use chats to filter private and group chats directly
  const filteredChats = chats.filter((chat) => {
    const chatName = getChatName(chat);
    return chatName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // console.log("Filtered Chats:", filteredChats);

  const handleNewChatClick = () => {
    setShowNewChatPopup(true);
  };

  const handleClosePopup = () => {
    setShowNewChatPopup(false);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="chats-sidebar">
      <NewChatIcon className="new-chat-icon" onClick={handleNewChatClick} />
      <div className="header">
        <h3>הודעות</h3>
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
        {filteredChats.length === 0 ? (
          <div className="no-chats-message">
            צור שיחה ראשונה על מנת להתחיל לדבר
          </div>
        ) : (
          filteredChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => handleSelectChat(chat)}
              className={`chat-item ${
                chat.id === selectedChatId ? "selected" : ""
              }`}
            >
              <div className="chat-avatar">
                <img src={profile1} className="message-avatar" />
              </div>
              <div className="chat-details">
                <div className="chat-name">{getChatName(chat)}</div>
                <div className="chat-message-preview">
                  <span>{chat.content ? chat.content : ""}</span>
                  <span className="chat-meta">
                    <span className="chat-time">
                      {chat.timestamp ? formatDate(chat.timestamp) : ""}
                    </span>
                    <span className="chat-status">
                      {chat.read ? chat.read : ""}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {showNewChatPopup && (
        <NewChatPopup
          onClose={handleClosePopup}
          onCreateChat={handleCreateChat}
          currentCategory={currentCategory}
          friends={friendList}
        />
      )}
    </div>
  );
};

export default ChatsSidebar;
