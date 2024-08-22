import React, { useState, useEffect, useRef } from "react";
import { ReactComponent as SendMessageIcon } from "../assets/send message icon.svg";
import organizationLogo from "../assets/homePageLogo.png";
import "./ChatWindow.css";
import profile1 from "../assets/profile1.jpg";

const ChatWindow = ({ chat }) => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ws = useRef(null);
  const [userid, setUserid] = useState(localStorage.getItem("user_id"));

  console.log("Messages to render:", messages);

  useEffect(() => {
    const token = localStorage.getItem("userToken");

    if (!chat || !chat.related_chat) {
      console.error("Invalid chat data or related_chat is missing.");
      return;
    }

    console.log("==============END=============");
    console.log("line 22:", chat);
    console.log("chat id", chat.related_chat.id);

    ws.current = new WebSocket(
      `ws://127.0.0.1:8000/ws/chat/chat_${chat.related_chat.id}/?token=${token}`
    );
    //---------------------------------------------------------------------------

    ws.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      // console.log("line 32: Received Data:", data);

      if (data.history) {
        setMessages(data.history);
      } else if (data.message) {
        console.log("data.message", data.message);
        setMessages((prevMessages) => {
          // console.log("Before Update:", prevMessages);
          // console.log("Adding message:", data.message);
          return [...prevMessages, data.message];
        });
      }
      // console.log("line 42: After Update:", messages);
    };

    //---------------------------------------------------------------------------

    ws.current.onerror = (e) => {
      console.error("WebSocket Error:", e.message || e);
    };
    //---------------------------------------------------------------------------

    ws.current.onclose = (e) => {
      console.log("WebSocket connection closed");
    };
    //---------------------------------------------------------------------------

    // Clean up WebSocket connection when component unmounts
    return () => {
      ws.current.close();
    };
  }, [chat]);

  const handleSendMessage = async () => {
    const userid = localStorage.getItem("user_id");
    if (!chat || !chat.related_chat) {
      console.error("Invalid chat data or related_chat is missing.");
      return;
    }
    if (newMessage.trim() === "" || !chat || !chat.related_chat) return;
    //console.log(chat.related_chat.id);
    const message = {
      sender: { id: userid },
      related_chat: chat.related_chat.id,
      content: newMessage,
    };

    // Send message via WebSocket
    ws.current.send(JSON.stringify({ message }));
    // Add the message to the local state
    //setMessages((prevMessages) => [...prevMessages, message]);
    setNewMessage("");
  };

  // Helper function to get the chat name
  const getChatName = (chat) => {
    const userid = localStorage.getItem("user_id");

    if (!chat || !chat.related_chat) {
      return "Unknown Chat";
    }

    if (userid === chat.related_chat.member_1.id.toString()) {
      return chat.related_chat.member_2.name;
    } else {
      return chat.related_chat.member_1.name;
    }
  };

  const isMessageFromUser = (message) => {
    const isUserMessage = message.sender.id.toString() === userid;
    // console.log("isUserMessage Check:", isUserMessage);
    return isUserMessage;
    /* const senderId = parseInt(message.sender.id, 10);
    return senderId === parseInt(userid, 10); */
  };

  if (!chat) {
    return <div className="chat-window">בחר שיחה כדי להתחיל</div>;
  } else if (!chat.related_chat) {
    return <div>אין צ'אט נבחר או שהנתונים אינם תקינים</div>;
  }

  return (
    <div className="chat-window">
      <div className="chat-header">
        <img src={profile1} className="message-avatar" />
        <h2>{getChatName(chat)}</h2>
      </div>
      <div className="chat-messages">
        {Array.isArray(messages) && messages.length > 0 ? (
          messages.map((message, index) => {
            const isUserMessage = isMessageFromUser(message);
            {
              /* console.log(isUserMessage); */
            }
            return (
              <div
                key={index}
                className={`message ${
                  isUserMessage ? "message-user" : "message-reply"
                }`}
              >
                <div className="message-text">{message.content}</div>
                <img
                  src={isUserMessage ? organizationLogo : profile1}
                  alt={chat.name}
                  className="message-avatar"
                />
              </div>
            );
          })
        ) : (
          <div>No messages yet</div>
        )}
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
