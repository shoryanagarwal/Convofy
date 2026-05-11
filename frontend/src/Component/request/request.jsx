
import React, { useEffect, useState } from "react";
import api from "../../Api/axios";

const RequestPanel = () => {

  const [requests, setRequests] = useState([]);

  const currentUser = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {

    fetchRequests();

  }, []);

  const fetchRequests = async () => {

    try {

      const response = await api.get(
        `/request/${currentUser._id}`
      );

      setRequests(response.data.data);

    } catch (error) {

      console.log(error);
    }
  };

  const acceptRequest = async (requestId) => {

    try {

      await api.post(
        "/request/accept",
        {
          requestId
        }
      );

      fetchRequests();

    } catch (error) {

      console.log(error);
    }
  };

  const rejectRequest = async (requestId) => {

    try {

      await api.post(
        "/request/reject",
        {
          requestId
        }
      );

      fetchRequests();

    } catch (error) {

      console.log(error);
    }
  };

  return (
    <div className="p-4">

      <h2 className="text-xl font-semibold mb-4">
        Requests
      </h2>

      <div className="space-y-3">

        {requests.map((request) => (

          <div
            key={request._id}
            className="
              bg-[#151515]
              border border-[#222]
              rounded-2xl
              p-4
              flex items-center justify-between
            "
          >

            <div className="flex items-center gap-3">

              <div
                className="
                  w-12 h-12
                  rounded-full
                  bg-[#222]
                  flex items-center justify-center
                  font-bold
                "
              >
                {request.sender.username
                  ?.charAt(0)
                  .toUpperCase()}
              </div>

              <div>

                <h3 className="font-medium">
                  {request.sender.username}
                </h3>

                <p className="text-sm text-gray-500">
                  Sent you a request
                </p>

              </div>
            </div>

            <div className="flex gap-2">

              <button
                onClick={() =>
                  acceptRequest(request._id)
                }
                className="
                  px-4 py-2
                  rounded-xl
                  bg-green-500
                  text-black
                  font-medium
                "
              >
                Accept
              </button>

              <button
                onClick={() =>
                  rejectRequest(request._id)
                }
                className="
                  px-4 py-2
                  rounded-xl
                  bg-red-500/20
                  text-red-400
                "
              >
                Reject
              </button>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default RequestPanel;

