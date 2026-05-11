import React from "react";
import api from "../../Api/axios";




const UserCard = ({
  user,
  selectedUser,
  setSelectedUser,
  setSelectedChat,
  setMessages
}) => {

    const currentUser = JSON.parse(localStorage.getItem("user"));

  const openChat = async () => {

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

    } catch (error) {

      console.log(error);
    }
  };

  const sendRequest = async(e) => {

      e.stopPropagation();

      try {
        
        const response=await api.post("request/send",{
          sender: currentUser._id,
          receiver: user._id

        })

        console.log(response.data.data);

        
          

      } 
      
      catch (error) {
        console.log(error);

      }

  };

  return (
    <div
      
      className={`p-3 rounded-xl mb-2 cursor-pointer transition border ${
        selectedUser?._id === user._id
          ? "bg-[#1a1a1a] border-[#2a2a2a]"
          : "hover:bg-[#181818] border-transparent"
      }`}
    >

      <div className="flex items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-lg font-bold">
            {user.username?.charAt(0).toUpperCase()}
          </div>

          <div>

            <h3 className="font-medium">
              {user.username}
            </h3>

            <p className="text-xs text-gray-500">
              Tap to open profile
            </p>

          </div>
        </div>

        {/* REQUEST BUTTON */}
        <button
          onClick={sendRequest}
          className="
            w-10 h-10
            rounded-full
            bg-yellow-500/10
            border border-yellow-500/20
            text-yellow-400
            flex items-center justify-center
            hover:bg-yellow-500
            hover:text-black
            transition
          "
        >
          +
        </button>

      </div>
    </div>
  );
};

export default UserCard;