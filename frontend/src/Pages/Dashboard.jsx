import React, { useEffect, useState } from "react";
import api from "../Api/axios";

import LeftSidebar from "../Component/sidebar/LeftSidebar.jsx";
import SearchPanel from "../Component/sidebar/SearchPanel.jsx";

import ChatWindow from "../Component/chat/chatWindow.jsx";
import ProfilePanel from "../Component/rightPanel/profilePanel.jsx";

import RequestPanel from "../Component/request/request.jsx";
import ChatList from "../Component/chat/chatList.jsx";


import socket from "../Socket/socket.js";


  

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

const storage = localStorage.getItem("user");

let currentUser = null;

try {

  if (storage && storage !== "undefined") {
    currentUser = JSON.parse(storage);
  }

} catch (error) {

  console.log("Invalid user in localStorage");

  localStorage.clear();

  window.location.href = "/auth";
}
  useEffect(()=>{

      socket.connect(); // Connect the socket when the component mounts

     if(currentUser){
   socket.emit("setup", currentUser);
}


      socket.on("connected",()=>{
          console.log("socket connected frontend");
      })


      return ()=>{
        socket.disconnect();
      }

  },[])



  useEffect(()=>{

    socket.on("connectionAccepted",async()=>{
        // when the connection is accepted then fetch the connections again to update the connection list in the frontend
        try {
          
         const response = await api.get(`/connections/${currentUser._id}`);

          setConnections(response.data.data)

        } 
        
        catch (error) {
          console.log("error while fetching connections after accepting request");  
        }
    
      })


      return ()=>{
        socket.off("connectionAccepted");
      }


  },[currentUser])




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