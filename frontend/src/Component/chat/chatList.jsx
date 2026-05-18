import React from "react";
import api from "../../Api/axios.js";

const ChatList = ({
  connections,
  selectedUser,
  setSelectedUser,
  setSelectedChat,
  setMessages,
  setActivePanel,
  online
}) => {
  const openChat = async (user) => {
    try {
      setMessages([]);
      setSelectedUser(user);

      const response = await api.post("/chat/oneonone", {
        userId: user._id
      });

      setSelectedChat(response.data.data);
      setActivePanel("chat");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[340px] bg-[#070b18]/70 border-r border-white/10 flex flex-col backdrop-blur-xl">
      <div className="h-[72px] border-b border-white/10 flex items-center px-6">
        <div>
          <h1 className="text-xl font-medium text-white">Chats</h1>
          <p className="text-xs text-gray-500 mt-1">Your connections</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        {connections.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 px-6">
            <h2 className="text-lg font-medium text-gray-300">
              No Connections Yet
            </h2>

            <p className="text-sm mt-2 leading-6">
              Accept requests or search users to start chatting.
            </p>
          </div>
        )}

        <div className="space-y-2">
          {connections.map((user) => (
            <div
              key={user._id}
              onClick={() => openChat(user)}
              className={`p-4 rounded-2xl cursor-pointer border transition ${
                selectedUser?._id === user._id
                  ? "bg-white/[0.07] border-[#d6ad4a]/30"
                  : "bg-white/[0.025] border-white/5 hover:bg-white/[0.06]"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1c2b58] to-[#0b1020] border border-white/10 flex items-center justify-center text-sm font-semibold">
                  {user.username?.charAt(0).toUpperCase()}
                </div>

                <div className="flex-1 min-w-0">
                  <h2 className="font-medium text-sm text-white truncate">
                    {user.username}
                  </h2>

                  <p className="text-xs text-gray-500 mt-1">Tap to chat</p>
                </div>

                <div
                    className={`w-2.5 h-2.5 rounded-full ${
                      online?.includes(user._id)
                        ? "bg-green-400 shadow-[0_0_12px_rgba(74,222,128,0.8)]"
                        : "bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.6)]"
                    }`}
                  />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatList;