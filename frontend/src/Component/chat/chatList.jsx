import React from "react";
import api from "../../Api/axios";
import socket from "../../Socket/socket.js";

const ChatList = ({
  connections,
  selectedUser,
  setSelectedUser,
  setSelectedChat,
  setMessages,
  setActivePanel
}) => {

  const openChat = async (user) => {

    try {

      setMessages([]);

      setSelectedUser(user);

      const response = await api.post(
        "/chat/oneonone",
        {
          userId: user._id
        }
      );
      
      
      setSelectedChat(response.data.data);


     


      // OPEN CHAT WINDOW
      setActivePanel("chat");

    } 
    
    catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="
      w-[340px]
      bg-[#0f0f10]
      border-r
      border-[#1f1f1f]
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

        <div>

          <h1 className="text-2xl font-semibold">
            Chats
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Your connections
          </p>

        </div>

      </div>

      {/* CHAT LIST */}
      <div className="
        flex-1
        overflow-y-auto
        p-3
      ">

        {
          connections.length === 0 && (

            <div className="
              h-full
              flex
              flex-col
              items-center
              justify-center
              text-center
              text-gray-500
              px-6
            ">

              <h2 className="text-lg font-medium">
                No Connections Yet
              </h2>

              <p className="text-sm mt-2 leading-6">
                Accept requests or search users
                to start chatting.
              </p>

            </div>
          )
        }

        <div className="space-y-2">

          {
            connections.map((user) => (

              <div
                key={user._id}
                onClick={() => openChat(user)}
                className={`
                  p-4
                  rounded-2xl
                  cursor-pointer
                  border
                  transition
                  ${
                    selectedUser?._id === user._id
                      ? "bg-[#1a1a1a] border-[#2a2a2a]"
                      : "bg-transparent border-transparent hover:bg-[#161616]"
                  }
                `}
              >

                <div className="
                  flex
                  items-center
                  gap-4
                ">

                  {/* AVATAR */}
                  <div className="
                    w-14
                    h-14
                    rounded-full
                    bg-[#222]
                    flex
                    items-center
                    justify-center
                    text-lg
                    font-bold
                  ">

                    {
                      user.username
                        ?.charAt(0)
                        .toUpperCase()
                    }

                  </div>

                  {/* USER INFO */}
                  <div className="flex-1">

                    <h2 className="
                      font-medium
                      text-[15px]
                    ">
                      {user.username}
                    </h2>

                    <p className="
                      text-sm
                      text-gray-500
                      mt-1
                    ">
                      Tap to chat
                    </p>

                  </div>

                  {/* ONLINE DOT */}
                  <div className="
                    w-3
                    h-3
                    rounded-full
                    bg-green-500
                  " />

                </div>

              </div>
            ))
          }

        </div>

      </div>

    </div>
  );
};

export default ChatList;