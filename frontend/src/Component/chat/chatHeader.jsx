import React from "react";

const ChatHeader = ({ selectedUser ,setActivePanel , online=[], activeUser , selectedChat }) => {

  const isOnline= selectedUser && online?.includes(selectedUser._id);

  const isInSameChat = selectedUser && selectedChat?._id && activeUser?.[selectedUser._id]=== selectedChat._id


  return (
    <div className="h-18px border-b border-white/10 flex items-center justify-between px-6 bg-[#070b18]/70 backdrop-blur-xl">
      <div className="flex items-center gap-3">

           <button
              onClick={() => setActivePanel("chats")}
              className="md:hidden w-9 h-9 rounded-xl bg-white/[0.06] text-white flex items-center justify-center"
            >
              ←
            </button>
        <div className="w-11 h-11 rounded-full bg-linear-to-br from-[#1c2b58] to-[#0b1020] border border-white/10 flex items-center justify-center text-sm font-semibold">
          {selectedUser ? selectedUser.username?.charAt(0).toUpperCase() : "?"}
        </div>

        <div>
          <h2 className="font-medium text-white">
            {selectedUser ? selectedUser.username : "Select a User"}
          </h2>

          <div className="flex items-center gap-2 mt-1">
          <span
            className={`w-2 h-2 rounded-full ${
              isInSameChat ? "bg-blue-400" : isOnline?"bg-green-400":"bg-red-500"
            }`}
          />

          <p className={`text-xs ${isInSameChat ? "text-blue-400" : isOnline?"text-green-400" : "text-red-500"}`}>
            {isInSameChat?"Active int this chat ":isOnline ? "Online" : "Offline"}
          </p>
</div>
        </div>
      </div>

      <div className="flex gap-3 text-lg text-gray-400">
        

        <button className="w-9 h-9 rounded-xl hover:bg-white/6 transition">
          ⋮
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;