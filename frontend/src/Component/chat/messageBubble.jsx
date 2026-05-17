import React from "react";

const MessageBubble = ({ msg, currentUser }) => {
  const senderId = typeof msg.sender === "object" ? msg.sender._id : msg.sender;
  const isMe = senderId === currentUser._id;

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[330px] px-4 py-3 rounded-2xl text-sm leading-6 border ${
          isMe
            ? "bg-[#d6ad4a] text-black border-[#d6ad4a]"
            : "bg-white/[0.055] text-gray-100 border-white/10"
        }`}
      >
        {msg.content}
      </div>
    </div>
  );
};

export default MessageBubble;