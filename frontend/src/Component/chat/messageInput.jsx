import React from "react";
import api from "../../Api/axios";

const MessageInput = ({
  input,
  setInput,
  selectedChat,
  setMessages
}) => {

  const sendMessage = async () => {

    if (!input.trim()) return;
    if (!selectedChat) return;

    try {

      const response = await api.post(
        "/message",
        {
          chatId: selectedChat._id,
          content: input
        }
      );

      setMessages((prev) => [
        ...prev,
        response.data.data
      ]);

      setInput("");

    } catch (error) {

      console.log(error);
    }
  };

  return (
    <div className="h-[80px] border-t border-[#1f1f1f] flex items-center px-4 gap-3">

      <input
        type="text"
        placeholder="Type a message..."
        value={input}
        onChange={(e) =>
          setInput(e.target.value)
        }
        className="flex-1 h-[50px] bg-[#1a1a1a] rounded-lg px-4 outline-none"
      />

      <button
        onClick={sendMessage}
        className="h-[50px] px-6 bg-yellow-500 text-black rounded-lg font-medium hover:opacity-90"
      >
        Send
      </button>

    </div>
  );
};

export default MessageInput;