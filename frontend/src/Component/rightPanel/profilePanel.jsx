import React from "react";

const ProfilePanel = ({
  online = [],
  selectedUser,
  activeUser = {},
  messages = [],
}) => {
  console.log("messages",messages);
  const sharedImage= messages.filter((msg)=>msg.messageType==="image" && msg.mediaUrl)

  const isOnline = selectedUser && online.includes(selectedUser._id);

  const isInSameChat =selectedUser && activeUser?.[selectedUser._id];


  return (
    <div className="w-[270px] bg-[#070b18]/70 border-l border-white/10 p-5 hidden lg:block backdrop-blur-xl">
      <div className="flex flex-col items-center rounded-3xl bg-white/[0.035] border border-white/10 p-6">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#1c2b58] to-[#0b1020] border border-white/10 flex items-center justify-center text-3xl font-light">
          {selectedUser?.username?.charAt(0)?.toUpperCase() || "U"}
        </div>

        <h2 className="mt-4 text-xl font-medium text-white">{selectedUser?.username}</h2>

                <p
          className={`text-sm mt-1 ${
            isInSameChat
              ? "text-blue-400"
              : isOnline
              ? "text-green-400"
              : "text-red-400"
          }`}
        >
          {isInSameChat
            ? "Active in this chat"
            : isOnline
            ? "Online"
            : "Offline"}
        </p>
      </div>

      <div className="mt-6 rounded-3xl bg-white/[0.035] border border-white/10 p-5">
          <h3 className="font-medium mb-2 text-white">About</h3>

          <p className="text-gray-400 text-sm leading-6">
              {selectedUser?.bio || "Hey there! I am using Convofy 🚀"}
          </p>
        </div>



        <div className="mt-6 rounded-3xl bg-white/[0.035] border border-white/10 p-5">

      <h3 className="font-medium mb-4 text-white">
        Shared Images
      </h3>

      {sharedImage.length === 0 ? (

        <p className="text-sm text-gray-500">
          No shared images yet
        </p>

      ) : (

        <div className="grid grid-cols-2 gap-3">

          {sharedImage.map((msg) => (
            <img
              key={msg._id}
              src={msg.mediaUrl}
              alt="shared"
              className="w-full h-28 object-cover rounded-xl"
            />
          ))}

        </div>

      )}

    </div>



    </div>
  );
};

export default ProfilePanel;