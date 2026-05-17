import React, { useEffect, useState } from "react";
import api from "../../Api/axios.js";

const RequestPanel = () => {
  const [requests, setRequests] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await api.get(`request/${currentUser._id}`);
      setRequests(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const acceptRequest = async (requestId) => {
    try {
      await api.post("/request/accept", { requestId });
      fetchRequests();
    } catch (error) {
      console.log(error);
    }
  };

  const rejectRequest = async (requestId) => {
    try {
      await api.post("/request/reject", { requestId });
      fetchRequests();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex-1 bg-[#070b18]/70 flex flex-col backdrop-blur-xl">
      <div className="h-[72px] border-b border-white/10 flex items-center px-6">
        <div>
          <h1 className="text-xl font-medium text-white">
            Connection Requests
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage people who want to connect
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {requests.length === 0 && (
          <div className="h-full flex items-center justify-center text-gray-500">
            No Pending Requests
          </div>
        )}

        <div className="space-y-4">
          {requests.map((request) => (
            <div
              key={request._id}
            className="bg-white/[0.035] border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:bg-white/6 transition"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#1c2b58] to-[#0b1020] border border-white/10 flex items-center justify-center text-lg font-semibold">
                  {request.sender.username?.charAt(0).toUpperCase()}
                </div>

                <div>
                  <h2 className="font-medium text-white">
                    {request.sender.username}
                  </h2>

                  <p className="text-sm text-gray-500">
                    wants to connect with you
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => acceptRequest(request._id)}
                  className="flex-1 sm:flex-none px-4 py-2.5  rounded-xl bg-[#d6ad4a] text-black font-medium hover:opacity-90 transition"
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default RequestPanel;