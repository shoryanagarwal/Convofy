import React, { useState } from "react";
import UserCard from "./UserCard.jsx";

const SearchPanel = ({
  users,
  selectedUser,
  setSelectedUser,
  setSelectedChat,
  setMessages
}) => {
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-[340px] bg-[#070b18]/70 border-r border-white/10 flex flex-col backdrop-blur-xl">
      <div className="h-[72px] border-b border-white/10 flex items-center px-5">
        <div>
          <h1 className="text-xl font-medium text-white">Search</h1>
          <p className="text-xs text-gray-500 mt-1">Find people to connect</p>
        </div>
      </div>

      <div className="p-4">
        <input
          type="text"
          placeholder="Search username..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-[46px] rounded-xl bg-white/[0.04] border border-white/10 px-4 outline-none text-sm text-white placeholder:text-gray-500 focus:border-[#d6ad4a]/40 transition"
        />
      </div>

      <div className="flex-1 overflow-y-auto px-3 pb-3">
        {search.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-500 text-sm text-center px-6">
            Search users to start chatting
          </div>
        ) : (
          filteredUsers.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
              setSelectedChat={setSelectedChat}
              setMessages={setMessages}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default SearchPanel;