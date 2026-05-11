import React from "react";

const ChatHeader = ({ selectedUser }) => {

  return (
    <div className="h-[70px] border-b border-[#1f1f1f] flex items-center justify-between px-6">

      <div className="flex items-center gap-3">

        <div className="w-11 h-11 rounded-full bg-gray-700"></div>

        <div>

          <h2 className="font-semibold">
            {selectedUser
              ? selectedUser.username
              : "Select a User"}
          </h2>

          <p className="text-sm text-gray-400">
            Start chatting
          </p>

        </div>
      </div>

      <div className="flex gap-4 text-xl">

        <button>📞</button>

        <button>🎥</button>

        <button>⋮</button>

      </div>
    </div>
  );
};

export default ChatHeader;