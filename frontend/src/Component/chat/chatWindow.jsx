import React, { useEffect, useState } from "react";

import ChatHeader from "./chatHeader.jsx";
import MessageBubble from "./messageBubble.jsx";
import MessageInput from "./messageInput.jsx";

import socket from "../../Socket/socket.js";

const ChatWindow = ({
  selectedUser,
  selectedChat,
  messages,
  setMessages,
  currentUser,
  setActivePanel
}) => {
  const [input, setInput] = useState("");

  useEffect(() => {
    const handleMessage = (newMessage) => {
      setMessages((prev) => {
        const exists = prev.find((msg) => msg._id === newMessage._id);
        if (exists) return prev;
        return [...prev, newMessage];
      });
    };

    socket.off("message received");
    socket.on("message received", handleMessage);

    return () => {
      socket.off("message received", handleMessage);
    };
  }, []);

  useEffect(() => {
    if (!selectedChat?._id) return;

    socket.emit("join chat", selectedChat._id);
  }, [selectedChat]);

 return (
  <div className="flex-1 flex flex-col h-full bg-[#040712]/60">

    <ChatHeader selectedUser={selectedUser} setActivePanel={setActivePanel} />

    <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
      {messages.length === 0 ? (
        <div className="h-full flex items-center justify-center text-gray-500">
          No messages yet
        </div>
      ) : (
        messages.map((msg) => (
          <MessageBubble
            key={msg._id}
            msg={msg}
            currentUser={currentUser}
          />
        ))
      )}
    </div>

    {/* INPUT (ALWAYS BOTTOM) */}
    <div className="border-t border-white/10">
      <MessageInput
        input={input}
        setInput={setInput}
        selectedChat={selectedChat}
        setMessages={setMessages}
      />
    </div>

  </div>
);
};

export default ChatWindow;