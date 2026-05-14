import React from "react";
import api from "../../Api/axios";
import socket from "../../Socket/socket.js";
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

      const newMessage = {
        content: input,
        chatId: selectedChat._id,
        sender:{
          _id: JSON.parse(localStorage.getItem("user"))._id,
          username: JSON.parse(localStorage.getItem("user")).username
        }
      }

      setMessages((prev) => [
        ...prev,
        {
          ...newMessage,
          _id: Date.now()
        }
       
      ]);

      

          socket.emit(
              "new message",
              newMessage
        );

    // CLEAR INPUT
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
        onKeyDown={(e) => {

          if (e.key === "Enter") {

            sendMessage();

          }
        }}
        className="
          flex-1
          h-[50px]
          bg-[#1a1a1a]
          rounded-2xl
          px-5
          outline-none
          text-sm
          border
          border-[#222]
          focus:border-yellow-500/30
          transition
        "
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