import React, { useEffect, useState } from "react";
import api from "../Api/axios";
import LeftSidebar from "../Component/sidebar/LeftSidebar.jsx";
import SearchPanel from "../Component/sidebar/SearchPanel.jsx";

import ChatWindow from "../Component/chat/chatWindow.jsx";

import ProfilePanel from "../Component/rightPanel/profilePanel.jsx";

const Dashboard = () => {

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);

  const currentUser = JSON.parse(
    localStorage.getItem("user")
  );

  // FETCH USERS
  useEffect(() => {

    const fetchUsers = async () => {

      try {

        const response = await api.get("/users");

        const filteredUsers =
          response.data.data.filter(
            (user) =>
              user._id !== currentUser._id
          );

        setUsers(filteredUsers);

      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();

  }, []);

  // LOAD MESSAGES
  useEffect(() => {

    const loadMessages = async () => {

      if (!selectedChat?._id) return;

      try {

        const response = await api.get(
          `/message/${selectedChat._id}`
        );

        setMessages(response.data.data || []);

      } catch (error) {

        console.log(error);
        setMessages([]);
      }
    };

    loadMessages();

  }, [selectedChat?._id]);

  return (
    <div className="h-screen bg-[#0b0b0c] text-white flex overflow-hidden">

      <LeftSidebar />
      

      <SearchPanel
        users={users}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        setSelectedChat={setSelectedChat}
        setMessages={setMessages}
      />

      <ChatWindow
        selectedUser={selectedUser}
        selectedChat={selectedChat}
        messages={messages}
        setMessages={setMessages}
        currentUser={currentUser}
      />

      <ProfilePanel />

    </div>
  );
};

export default Dashboard;