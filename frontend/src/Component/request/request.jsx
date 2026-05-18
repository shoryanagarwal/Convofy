import React, { useEffect, useState } from "react";
import api from "../../Api/axios.js";

const RequestPanel = ({ setActivePanel }) => {
  const [requests, setRequests] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const fetchRequests = async () => {
    try {
      const res = await api.get(`/request/${currentUser._id}`);
      setRequests(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const acceptRequest = async (id) => {
    try {
      await api.post("/request/accept", { requestId });
      setActivePanel("chats");
    } catch (error) {
      console.log(error);
    }
  };

  const rejectRequest = async (id) => {
    try {
      await api.post("/request/reject", { requestId: id });
      fetchRequests();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex-1 p-6 text-white">
      <h1 className="text-xl mb-4">Requests</h1>

      {requests.length === 0 && <p>No requests</p>}

      {requests.map((req) => (
        <div key={req._id} className="mb-3 flex justify-between">
          <span>{req.sender?.username}</span>

          <div className="flex gap-2">
            <button onClick={() => acceptRequest(req._id)}>Accept</button>
            <button onClick={() => rejectRequest(req._id)}>Reject</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RequestPanel;