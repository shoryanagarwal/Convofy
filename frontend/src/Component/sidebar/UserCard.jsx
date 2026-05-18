import React, { useState } from "react";
import api from "../../Api/axios.js";

const UserCard = ({
  user,
  selectedUser,
  setSelectedUser,
  setSelectedChat,
  setMessages,
  online = []
}) => {
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const [requestSent, setRequestSent] = useState(false);
  const [sending, setSending] = useState(false);

  const sendRequest = async (e) => {
    e.stopPropagation();

    if (requestSent || sending) return;

    try {
      setSending(true);

      const response = await api.post("/request/send", {
        sender: currentUser._id,
        receiver: user._id
      });

      console.log(response.data);
      setRequestSent(true);
    } catch (error) {
      console.log(error);
    } finally {
      setSending(false);
    }
  };

  return (
    <div
      className={`p-3 rounded-2xl mb-2 transition border ${
        selectedUser?._id === user._id
          ? "bg-white/[0.07] border-[#d6ad4a]/30"
          : "bg-white/[0.025] border-white/5 hover:bg-white/[0.06]"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          
          <div className="relative">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#1c2b58] to-[#0b1020] flex items-center justify-center text-white">
              {user.username?.charAt(0).toUpperCase()}
            </div>

            <span
              className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#070b18] ${
                online.includes(user._id)
                  ? "bg-green-400"
                  : "bg-red-500"
              }`}
            />
          </div>

          <div>
            <h3 className="text-white text-sm">{user.username}</h3>
            <p className="text-xs text-gray-500">
              {requestSent ? "Request sent" : "Send request"}
            </p>
          </div>
        </div>

        <button
          onClick={sendRequest}
          disabled={requestSent || sending}
          className="w-9 h-9 rounded-full border flex items-center justify-center text-[#d6ad4a]"
        >
          {requestSent ? "✓" : "+"}
        </button>
      </div>
    </div>
  );
};

export default UserCard;