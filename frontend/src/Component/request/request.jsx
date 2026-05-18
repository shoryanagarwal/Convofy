import React, { useEffect, useState } from "react";
import api from "../../Api/axios.js";

const RequestPanel = ({ setActivePanel }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const storedUser = localStorage.getItem("user");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;

  const fetchRequests = async () => {
    if (!currentUser?._id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const response = await api.get(`/request/${currentUser._id}`);
      const data = response.data.data;

      setRequests(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log("FETCH ERROR:", error.response?.data || error.message);
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const acceptRequest = async (requestId) => {
    try {
      await api.post("/request/accept", { requestId });

      setRequests((prev) =>
        prev.filter((request) => request._id !== requestId)
      );

      if (setActivePanel) {
        setActivePanel("chats");
      }
    } catch (error) {
      console.log("ACCEPT ERROR:", error.response?.data || error.message);
    }
  };

  const rejectRequest = async (requestId) => {
    try {
      await api.post("/request/reject", { requestId });

      setRequests((prev) =>
        prev.filter((request) => request._id !== requestId)
      );
    } catch (error) {
      console.log("REJECT ERROR:", error.response?.data || error.message);
    }
  };

  return (
    <div className="h-full w-full bg-[#070b18]/70 flex flex-col backdrop-blur-xl">
      <div className="h-[72px] border-b border-white/10 flex items-center px-6 shrink-0">
        <div>
          <h1 className="text-xl font-medium text-white">
            Connection Requests
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage people who want to connect
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        {loading ? (
          <div className="h-full flex items-center justify-center text-gray-500">
            Loading requests...
          </div>
        ) : requests.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-500">
            No Pending Requests
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => {
              const senderName = request.sender?.username || "Unknown User";
              const firstLetter = senderName.charAt(0).toUpperCase();

              return (
                <div
                  key={request._id}
                  className="bg-white/[0.035] border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:bg-white/[0.06] transition"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#1c2b58] to-[#0b1020] border border-white/10 flex items-center justify-center text-base font-semibold">
                      {firstLetter}
                    </div>

                    <div className="min-w-0">
                      <h2 className="font-medium text-white truncate">
                        {senderName}
                      </h2>

                      <p className="text-sm text-gray-500">
                        wants to connect with you
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                      onClick={() => acceptRequest(request._id)}
                      className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#d6ad4a] text-black font-medium hover:opacity-90 transition"
                    >
                      Accept
                    </button>

                    <button
                      onClick={() => rejectRequest(request._id)}
                      className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestPanel;