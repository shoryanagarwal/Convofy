import React, { useEffect, useState } from "react";
import api from "../Api/axios";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [messages, setMessages] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  const currentUser = JSON.parse(
  localStorage.getItem("user")
);

  const [input, setInput] = useState("");

  // FETCH USERS
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users");
        console.log(response.data.data);
        
          const currentUser = JSON.parse(
        localStorage.getItem("user")
      );
      
      

      // remove logged in user from list
      const filteredUsers = response.data.data.filter(
        (user) => user._id !== currentUser?._id
      );

      setUsers(filteredUsers);

      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);


  useEffect(() => {

  const loadMessages = async () => {

    if (!selectedChat?._id) return;

    try {

      const response = await api.get(
        `/message/${selectedChat._id}`
      );

      console.log("MESSAGES:", response.data.data);

      setMessages(response.data.data || []);

    } catch (error) {

      console.log(error);
      setMessages([]);
    }
  };

  loadMessages();

}, [selectedChat?._id]);

  // SEND MESSAGE
 const sendMessage = async () => {

  if (!input.trim()) return;
  if (!selectedChat) return;

  try {

    const response = await api.post("/message", {
      chatId: selectedChat._id,
      content: input
    })

    console.log(response.data);

    setMessages((prev) => [
      ...prev,
      response.data.data,
    ]);

    setInput("");

  } catch (error) {
    console.log(error);
  }
};
  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");

    window.location.href = "/auth";
  };

  return (
    <div className="h-screen bg-[#0b0b0c] text-white flex overflow-hidden">
      
      {/* LEFT SIDEBAR */}
      <div className="w-[220px] bg-[#111111] border-r border-[#1f1f1f] flex flex-col justify-between">
        
        <div>
          <div className="h-[70px] flex items-center px-6 border-b border-[#1f1f1f]">
            <h1 className="text-2xl font-bold">
              Convo<span className="text-yellow-400">fy</span>
            </h1>
          </div>

          <div className="flex flex-col gap-2 p-4">
            <button className="h-[45px] rounded-lg bg-[#1a1a1a] text-left px-4 hover:bg-[#222]">
              Chats
            </button>

            <button className="h-[45px] rounded-lg text-left px-4 hover:bg-[#1a1a1a]">
              Groups
            </button>

            <button className="h-[45px] rounded-lg text-left px-4 hover:bg-[#1a1a1a]">
              Calls
            </button>

            <button className="h-[45px] rounded-lg text-left px-4 hover:bg-[#1a1a1a]">
              Settings
            </button>
          </div>
        </div>

        <div className="p-4 border-t border-[#1f1f1f]">
          <button
            onClick={handleLogout}
            className="w-full h-[45px] rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
          >
            Logout
          </button>
        </div>
      </div>

      {/* CHAT LIST */}
      <div className="w-[300px] bg-[#0f0f10] border-r border-[#1f1f1f] flex flex-col">
        
        <div className="p-4">
          <input
            type="text"
            placeholder="Search chats..."
            className="w-full h-[45px] rounded-lg bg-[#1a1a1a] px-4 outline-none"
          />
        </div>

        {/* USERS */}
        <div className="flex-1 overflow-y-auto px-2">

          {users.map((user) => (
            <div
              key={user._id}
              onClick={async () => {

  try {

    setMessages([]);
    setSelectedUser(user);

    const response = await api.post(
      "/chat/oneonone",
      {
        userId: user._id,
      }
    );

    const chatData = response.data.data;

    setSelectedChat(chatData);

  } catch (error) {
    console.log(error);
  }
}}

              className={`p-3 rounded-lg mb-2 cursor-pointer transition ${
                  selectedUser?._id === user._id
                    ? "bg-[#1f1f1f]"
                    : "hover:bg-[#181818]"
                }`}
            >
              <div className="flex items-center gap-3">
                
                {/* PROFILE */}
                <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-lg font-bold">
                  {user.username?.charAt(0).toUpperCase()}
                </div>

                {/* USER INFO */}
                <div>
                  <h3 className="font-medium">
                    {user.username}
                  </h3>

                  
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* CHAT WINDOW */}
      <div className="flex-1 flex flex-col bg-[#0b0b0c]">
        
        {/* TOPBAR */}
        <div className="h-[70px] border-b border-[#1f1f1f] flex items-center justify-between px-6">
          
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gray-700"></div>

            <div>
              <h2 className="font-semibold">
                {selectedUser
                    ? selectedUser.username
                    : "Select a User"}
              </h2>

              <p className="text-sm text-gray-400">
                Start chatting
              </p>
            </div>
          </div>

          <div className="flex gap-4 text-xl">
            <button>📞</button>
            <button>🎥</button>
            <button>⋮</button>
          </div>
        </div>

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 && (
              <div className="h-full flex items-center justify-center text-gray-500">
                No messages yet
              </div>
            )}
          {messages.map((msg) => {

  const senderId =
    typeof msg.sender === "object"
      ? msg.sender._id
      : msg.sender;

  return (
    <div
      key={msg._id}
      className={`flex ${
        senderId === currentUser._id
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={`max-w-[300px] px-4 py-3 rounded-xl ${
          senderId === currentUser._id
            ? "bg-yellow-500 text-black"
            : "bg-[#1a1a1a]"
        }`}
      >
        {msg.content}
      </div>
    </div>
  );
})}
        </div>

        {/* INPUT */}
        <div className="h-[80px] border-t border-[#1f1f1f] flex items-center px-4 gap-3">
          
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 h-[50px] bg-[#1a1a1a] rounded-lg px-4 outline-none"
          />

          <button
            onClick={sendMessage}
            className="h-[50px] px-6 bg-yellow-500 text-black rounded-lg font-medium hover:opacity-90"
          >
            Send
          </button>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-[260px] bg-[#0f0f10] border-l border-[#1f1f1f] p-5 hidden lg:block">
        
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gray-700"></div>

          <h2 className="mt-4 text-xl font-semibold">
            Convofy
          </h2>

          <p className="text-green-400 text-sm mt-1">
            Online
          </p>
        </div>

        <div className="mt-8">
          <h3 className="font-semibold mb-2">
            About
          </h3>

          <p className="text-gray-400 text-sm leading-6">
            Building realtime chat application 🚀
          </p>
        </div>

        <div className="mt-8">
          <h3 className="font-semibold mb-3">
            Shared Media
          </h3>

          <div className="grid grid-cols-2 gap-2">
            <div className="h-20 bg-[#1a1a1a] rounded-lg"></div>
            <div className="h-20 bg-[#1a1a1a] rounded-lg"></div>
            <div className="h-20 bg-[#1a1a1a] rounded-lg"></div>
            <div className="h-20 bg-[#1a1a1a] rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;