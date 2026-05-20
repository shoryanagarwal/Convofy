import React, { useEffect, useState } from "react";
import api from "../Api/axios.js";

import LeftSidebar from "../Component/sidebar/LeftSidebar.jsx";
import SearchPanel from "../Component/sidebar/SearchPanel.jsx";

import ChatWindow from "../Component/chat/chatWindow.jsx";
import ProfilePanel from "../Component/rightPanel/profilePanel.jsx";

import RequestPanel from "../Component/request/request.jsx";
import ChatList from "../Component/chat/chatList.jsx";


import socket from "../Socket/socket.js";


  

const Dashboard = () => {
 


const [online ,setOnline]=useState([]);

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

  const [activeUser,setActiveUser]=useState({});  

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
     socket.on('active-chat',(data)=>{
        setActiveUser(data || {});

        return ()=>{
          socket.off('active-chat');
        }
     })
  })


  useEffect(()=>{

    socket.on('user-online',(userId)=>{

       setOnline((prevOnline) =>
  prevOnline.includes(userId)
    ? prevOnline
    : [...prevOnline, userId]
);


    })


    socket.on("user-offline", (userId) => {
  setOnline((prevOnline) =>
    prevOnline.filter((id) => id !== userId)
  );
});


    return ()=>{

      socket.off('user-online');
      socket.off('user-offline');

    }




  },[])





 useEffect(() => {
  const fetchConnections = async () => {
    if (!currentUser?._id) return;

    try {
      const response = await api.get(`/connections/${currentUser._id}`);
      setConnections(response.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  fetchConnections();

  socket.on("connectionAccepted", fetchConnections);

  return () => {
    socket.off("connectionAccepted", fetchConnections);
  };

}, []);


useEffect(() => {
  socket.on("online-users", (users) => {
    setOnline(users);
  });

  return () => {
    socket.off("online-users");
  };
}, []);




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
  <div className="relative h-screen w-full overflow-hidden bg-[#02040c] text-white">
    {/* background */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(35,70,150,0.28),transparent_35%),radial-gradient(circle_at_85%_80%,rgba(190,135,35,0.14),transparent_30%),linear-gradient(135deg,#02040c,#050816,#02030a)]" />

    <div className="absolute -left-48 top-20 h-130px w-130px rounded-full border border-blue-400/25 shadow-[0_0_90px_rgba(59,130,246,0.25)]" />

    <div className="absolute -right-56 bottom-40px h-140px w-140px rounded-full border border-yellow-500/20 shadow-[0_0_90px_rgba(212,175,55,0.12)]" />

    <div className="absolute inset-0 opacity-30 bg-[radial-gradient(rgba(255,255,255,0.6)_1px,transparent_1px)] bg-size-[120px_120px]" />

    <div className="relative z-10 flex h-screen w-full overflow-hidden">
      {/* SIDEBAR */}
      <div className="border-r border-white/10 bg-black/20 backdrop-blur-xl">
        <LeftSidebar setActivePanel={setActivePanel} />
      </div>

    
      <div className={`${activePanel==="chat" ? "hidden md:block" : "block" } h-full w-[calc(100vw-64px)] md:w-[340px] border-r border-white/10 bg-[#070b18]/60 backdrop-blur-xl`}>
        {activePanel === "search" && (
          <SearchPanel
            users={users}
            online={online}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            setSelectedChat={setSelectedChat}
            setMessages={setMessages}
            setActivePanel={setActivePanel}
            activeUser={activeUser}
          />
        )}

      {activePanel==="requests" && (
  <RequestPanel setActivePanel={setActivePanel} />
)}
        {activePanel==="chats" && (
          <ChatList
            connections={connections}
            online={online}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            setSelectedChat={setSelectedChat}
            setMessages={setMessages}
            setActivePanel={setActivePanel}
            online={online}
            activeUser={activeUser}
          />
        )}
      </div>

      <div className={` ${activePanel==="chat" ? "flex" : "hidden md:flex"} flex flex-1 overflow-hidden bg-black/10`}>
        {activePanel==="chat" ? (
          <>
            <div className="flex-1">
              <ChatWindow
                selectedUser={selectedUser}
                selectedChat={selectedChat}
                messages={messages}
                setMessages={setMessages}
                currentUser={currentUser}
                setActivePanel={setActivePanel}
                online={online}
                activeUser={activeUser}
              />
            </div>

            <div className="hidden lg:block border-l border-white/10 bg-[#070b18]/60 backdrop-blur-xl">
              <ProfilePanel />
            </div>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center px-6">
            <div className="max-w-md rounded-3xl border border-white/10 bg-white/4 p-10 text-center backdrop-blur-xl shadow-2xl">
              <h1 className="text-4xl font-light tracking-wide">
                Convo<span className="text-[#d6ad4a]">fy</span>
              </h1>

              <p className="mt-4 text-sm leading-6 text-gray-400">
                Select a chat or search users to start a conversation.
              </p>

              <div className="mt-7 h-px w-full bg-linear-to-r from-transparent via-white/20 to-transparent" />

              <p className="mt-5 text-xs text-gray-500">
                Premium private messaging space
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);
};

export default Dashboard;