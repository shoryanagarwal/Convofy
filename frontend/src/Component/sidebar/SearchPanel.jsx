import React, { useState } from "react";
import UserCard from "./UserCard";

const SearchPanel = ({
  users,
  selectedUser,
  setSelectedUser,
  setSelectedChat,
  setMessages
}) => {

  const [search, setSearch] = useState("");

  const filteredUsers = users.filter((user) =>
    user.username
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="w-[300px] bg-[#0f0f10] border-r border-[#1f1f1f] flex flex-col">

      <div className="p-4">

        <input
          type="text"
          placeholder="Search username..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full h-[45px] rounded-lg bg-[#1a1a1a] px-4 outline-none"
        />

      </div>

      <div className="flex-1 overflow-y-auto px-2">

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