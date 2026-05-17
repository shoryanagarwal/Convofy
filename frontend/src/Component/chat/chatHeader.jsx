import React from "react";

const ChatHeader = ({ selectedUser ,setActivePanel }) => {
  return (
    <div className="h-[72px] border-b border-white/10 flex items-center justify-between px-6 bg-[#070b18]/70 backdrop-blur-xl">
      <div className="flex items-center gap-3">

           <button
              onClick={() => setActivePanel("chats")}
              className="md:hidden w-9 h-9 rounded-xl bg-white/[0.06] text-white flex items-center justify-center"
            >
              ←
            </button>
        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#1c2b58] to-[#0b1020] border border-white/10 flex items-center justify-center text-sm font-semibold">
          {selectedUser ? selectedUser.username?.charAt(0).toUpperCase() : "?"}
        </div>

        <div>
          <h2 className="font-medium text-white">
            {selectedUser ? selectedUser.username : "Select a User"}
          </h2>

          <p className="text-xs text-gray-500">Start chatting</p>
        </div>
      </div>

      <div className="flex gap-3 text-lg text-gray-400">
        <button className="w-9 h-9 rounded-xl hover:bg-white/[0.06] transition">
          📞
        </button>

        <button className="w-9 h-9 rounded-xl hover:bg-white/[0.06] transition">
          🎥
        </button>

        <button className="w-9 h-9 rounded-xl hover:bg-white/[0.06] transition">
          ⋮
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;