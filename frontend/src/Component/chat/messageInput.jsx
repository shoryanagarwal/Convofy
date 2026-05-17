import React from "react";
import socket from "../../Socket/socket.js";

const MessageInput = ({ input, setInput, selectedChat, setMessages }) => {
  const sendMessage = async () => {
    if (!input.trim()) return;
    if (!selectedChat) return;

    try {
      const newMessage = {
        content: input,
        chatId: selectedChat._id,
        sender: {
          _id: JSON.parse(localStorage.getItem("user"))._id,
          username: JSON.parse(localStorage.getItem("user")).username
        }
      };

      setMessages((prev) => [
        ...prev,
        {
          ...newMessage,
          _id: Date.now()
        }
      ]);

      socket.emit("new message", newMessage);
      setInput("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-[82px] border-t border-white/10 flex items-center px-5 gap-3 bg-[#070b18]/70 backdrop-blur-xl">
      <input
        type="text"
        placeholder="Type a message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") sendMessage();
        }}
        className="flex-1 h-[50px] bg-white/[0.04] rounded-2xl px-5 outline-none text-sm text-white placeholder:text-gray-500 border border-white/10 focus:border-[#d6ad4a]/40 transition"
      />

      <button
        onClick={sendMessage}
        className="h-[50px] px-7 bg-[#d6ad4a] text-black rounded-xl font-medium hover:opacity-90 transition"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;