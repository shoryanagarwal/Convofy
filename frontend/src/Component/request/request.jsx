import React, { useEffect, useState } from "react";
import api from "../../Api/axios";

const RequestPanel = () => {

  const [requests, setRequests] = useState([]);

  const currentUser = JSON.parse(
    localStorage.getItem("user")
  );

  // FETCH ALL PENDING REQUESTS
  useEffect(() => {

    fetchRequests();

  }, []);

  const fetchRequests = async () => {

    try {

      const response = await api.get(
        `request/${currentUser._id}`
      );

      setRequests(response.data.data);

    } catch (error) {

      console.log(error);
    }
  };

  // ACCEPT REQUEST
  const acceptRequest = async (requestId) => {

    try {

      await api.post(
        "/request/accept",
        {
          requestId
        }
      );

      // REFRESH REQUESTS
      fetchRequests();

    } catch (error) {

      console.log(error);
    }
  };

  // REJECT REQUEST
  const rejectRequest = async (requestId) => {

    try {

      await api.post(
        "/request/reject",
        {
          requestId
        }
      );

      // REFRESH REQUESTS
      fetchRequests();

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="
      flex-1
      bg-[#0b0b0c]
      flex
      flex-col
    ">

      {/* TOPBAR */}
      <div className="
        h-[70px]
        border-b
        border-[#1f1f1f]
        flex
        items-center
        px-6
      ">

        <h1 className="text-2xl font-semibold">
          Connection Requests
        </h1>

      </div>

      {/* REQUEST LIST */}
      <div className="
        flex-1
        overflow-y-auto
        p-6
      ">

        {
          requests.length === 0 && (

            <div className="
              h-full
              flex
              items-center
              justify-center
              text-gray-500
            ">

              No Pending Requests

            </div>
          )
        }

        <div className="space-y-4">

          {
            requests.map((request) => (

              <div
                key={request._id}
                className="
                  bg-[#111111]
                  border
                  border-[#1f1f1f]
                  rounded-3xl
                  p-5
                  flex
                  items-center
                  justify-between
                  hover:bg-[#151515]
                  transition
                "
              >

                {/* LEFT */}
                <div className="flex items-center gap-4">

                  {/* AVATAR */}
                  <div className="
                    w-14
                    h-14
                    rounded-full
                    bg-[#1d1d1d]
                    flex
                    items-center
                    justify-center
                    text-lg
                    font-bold
                  ">

                    {
                      request.sender.username
                        ?.charAt(0)
                        .toUpperCase()
                    }

                  </div>

                  {/* INFO */}
                  <div>

                    <h2 className="font-semibold text-lg">
                      {request.sender.username}
                    </h2>

                    <p className="text-sm text-gray-500">
                      wants to connect with you
                    </p>

                  </div>

                </div>

                {/* BUTTONS */}
                <div className="flex items-center gap-3">

                  <button
                    onClick={() =>
                      acceptRequest(request._id)
                    }
                    className="
                      px-5
                      py-2.5
                      rounded-xl
                      bg-yellow-500
                      text-black
                      font-medium
                      hover:opacity-90
                      transition
                    "
                  >
                    Accept
                  </button>

                  <button
                    onClick={() =>
                      rejectRequest(request._id)
                    }
                    className="
                      px-5
                      py-2.5
                      rounded-xl
                      bg-red-500/10
                      text-red-400
                      border
                      border-red-500/20
                      hover:bg-red-500/20
                      transition
                    "
                  >
                    Reject
                  </button>

                </div>

              </div>
            ))
          }

        </div>

      </div>

    </div>
  );
};

export default RequestPanel;