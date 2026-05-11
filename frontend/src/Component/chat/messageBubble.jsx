import React from "react";

const MessageBubble = ({
  msg,
  currentUser
}) => {

  const senderId =
    typeof msg.sender === "object"
      ? msg.sender._id
      : msg.sender;

  return (
    <div
      className={`flex ${
        senderId === currentUser._id
          ? "justify-end"
          : "justify-start"
      }`}
    >

      <div
        className={`max-w-[300px] px-4 py-3 rounded-xl ${
          senderId === currentUser._id
            ? "bg-yellow-500 text-black"
            : "bg-[#1a1a1a]"
        }`}
      >
        {msg.content}
      </div>

    </div>
  );
};

export default MessageBubble;