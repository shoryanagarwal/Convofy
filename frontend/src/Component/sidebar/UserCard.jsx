import React, { useState } from "react";
import api from "../../Api/axios.js";

const UserCard = ({
  user,
  selectedUser,
  setSelectedUser,
  setSelectedChat,
  setMessages
}) => {
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const [requestSent, setRequestSent] = useState(false);
  const [sending, setSending] = useState(false);

  const openChat = async () => {
    try {
      setMessages([]);
      setSelectedUser(user);

      const response = await api.post("/chat/oneonone", {
        userId: user._id
      });

      setSelectedChat(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const sendRequest = async (e) => {
    e.stopPropagation();

    if (requestSent || sending) return;

    try {
      setSending(true);
      setRequestSent(true);

      const response = await api.post("request/send", {
        sender: currentUser._id,
        receiver: user._id
      });

      console.log(response.data.data);
    } catch (error) {
      console.log(error);

      // agar request fail hui to button wapas pehle jaisa
      setRequestSent(false);
    } finally {
      setSending(false);
    }
  };

  return (
    <div
      onClick={openChat}
      className={`p-3 rounded-2xl mb-2 cursor-pointer transition border ${
        selectedUser?._id === user._id
          ? "bg-white/[0.07] border-[#d6ad4a]/30"
          : "bg-white/[0.025] border-white/5 hover:bg-white/[0.06]"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#1c2b58] to-[#0b1020] border border-white/10 flex items-center justify-center text-sm font-semibold text-white">
            {user.username?.charAt(0).toUpperCase()}
          </div>

          <div className="min-w-0">
            <h3 className="font-medium text-sm text-white truncate">
              {user.username}
            </h3>

            <p className="text-xs text-gray-500">
              {requestSent ? "Request sent" : "Tap to open chat"}
            </p>
          </div>
        </div>

        <button
          onClick={sendRequest}
          disabled={requestSent || sending}
          className={`w-9 h-9 rounded-full border flex items-center justify-center transition ${
            requestSent
              ? "bg-white/[0.04] border-white/10 text-gray-500 cursor-not-allowed"
              : "bg-[#d6ad4a]/10 border-[#d6ad4a]/25 text-[#d6ad4a] hover:bg-[#d6ad4a] hover:text-black"
          }`}
        >
          {requestSent ? "✓" : "+"}
        </button>
      </div>
    </div>
  );
};

export default UserCard;