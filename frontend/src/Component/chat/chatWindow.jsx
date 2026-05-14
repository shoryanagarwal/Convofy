import React, { useEffect, useState } from "react";

import ChatHeader from "./ChatHeader";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";

import socket from "../../Socket/socket";

const ChatWindow = ({
  selectedUser,
  selectedChat,
  messages,
  setMessages,
  currentUser
}) => {

  const [input, setInput] = useState("");


 useEffect(() => {

  const handleMessage = (newMessage) => {

    console.log(
      "realtime Message",
      newMessage
    );

    setMessages((prev) => {

      const exists = prev.find(
        (msg) => msg._id === newMessage._id
      );

      if (exists) {
        return prev;
      }

      return [

        ...prev,
        newMessage

      ];
    });
  };

  socket.off("message received");

  socket.on(
    "message received",
    handleMessage
  );

  return () => {

    socket.off(
      "message received",
      handleMessage
    );
  };

}, []);


useEffect(() => {

  if (!selectedChat?._id) return;

  socket.emit(
    "join chat",
    selectedChat._id
  );

  console.log(
    "joined room",
    selectedChat._id
  );

}, [selectedChat]);




  return (
    <div className="flex-1 flex flex-col bg-[#0b0b0c]">

      <ChatHeader
        selectedUser={selectedUser}
      />

      <div className="flex-1 overflow-y-auto p-6 space-y-4">

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

      <MessageInput
        input={input}
        setInput={setInput}
        selectedChat={selectedChat}
        setMessages={setMessages}
      />

    </div>
  );
};

export default ChatWindow;