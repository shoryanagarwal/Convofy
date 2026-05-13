import React, { useEffect, useState } from "react";
import api from "../Api/axios";

import LeftSidebar from "../Component/sidebar/LeftSidebar.jsx";
import SearchPanel from "../Component/sidebar/SearchPanel.jsx";

import ChatWindow from "../Component/chat/chatWindow.jsx";
import ProfilePanel from "../Component/rightPanel/profilePanel.jsx";

import RequestPanel from "../Component/request/request.jsx";
import ChatList from "../Component/chat/chatList.jsx";
const Dashboard = () => {

  const [users, setUsers] = useState([]);
  const[connections,setConnections]=useState([]);

  const [selectedUser, setSelectedUser] =
    useState(null);

  const [selectedChat, setSelectedChat] =
    useState(null);

  const [messages, setMessages] = useState([]);

  // NEW
  const [activePanel, setActivePanel] =
    useState("search");

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

  useEffect(()=>{
      
    const fetchConnections=async()=>{

        try{

          const response = await api.get(`/connections/${currentUser._id}`);

          console.log(response.data.data);


          setConnections(response.data.data)
          

        }

        catch(error){
          console.log(error);


          
        }

          


      }

      fetchConnections();

  },[])


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

      {/* SIDEBAR */}
      <LeftSidebar
        setActivePanel={setActivePanel}
      />

      {/* SEARCH PANEL */}
      {activePanel === "search" && (

        <SearchPanel
          users={users}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          setSelectedChat={setSelectedChat}
          setMessages={setMessages}
          setActivePanel={setActivePanel}
        />
      )}

     

      {/* REQUEST PANEL */}
      {activePanel === "requests" && (
        <RequestPanel />
      )}


      {activePanel === "chats" && (
        <ChatList
            connections={connections}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            setSelectedChat={setSelectedChat}
            setMessages={setMessages}
            setActivePanel={setActivePanel}
        />
      )}

      {/* CHAT MODE */}
      {activePanel === "chat" && (
        <>

          <ChatWindow
            selectedUser={selectedUser}
            selectedChat={selectedChat}
            messages={messages}
            setMessages={setMessages}
            currentUser={currentUser}
          />

          <ProfilePanel />

        </>
      )}

    </div>
  );
};

export default Dashboard;