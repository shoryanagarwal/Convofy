import React, { useEffect, useState, useRef } from "react";

import ChatHeader from "./chatHeader.jsx";
import MessageBubble from "./messageBubble.jsx";
import MessageInput from "./messageInput.jsx";

import socket from "../../Socket/socket.js";

const ChatWindow = ({
  selectedUser,
  selectedChat,
  messages,
  setMessages,
  currentUser,
  setActivePanel,
  online,
  activeUser
}) => {

// Check if the selected user is in the same chat as the active user
  const isSelectedUserInSameChat= selectedUser && selectedChat?._id && activeUser?.[selectedUser._id] === selectedChat._id //.[selectedUser._id] === selectedChat._id -> iska matlab hai ki activeUser object me selectedUser ka id key ke roop me hai ya nahi aur uska value selectedChat ka id ke barabar hai ya nahi. Agar dono conditions true hain to iska matlab hai ki selected user aur active user same chat me hain.




  const [input, setInput] = useState("");
  const messageRef= useRef(null);

  const [typing,setTyping]=useState(false);
  const [openMenu, setOpenMenu]=useState(false);


  useEffect(()=>{

    const user= JSON.parse(localStorage.getItem("user"));

    if(!selectedChat?._id || !user?._id) return;
    
    
    socket.emit('active-chat',{chatId:selectedChat._id, userId:user._id});

    return ()=>{
      socket.emit('leave-chat',user._id)
    }


  },[selectedChat?._id])


  useEffect(()=>{

      socket.on('typing',()=>{
          setTyping(true);
      })

      socket.on('stop-typing',()=>{
          setTyping(false);
      })

      return ()=>{
          socket.off('typing');
          socket.off('stop-typing');
      }


  },[])



  useEffect(()=>{

    messageRef.current?.scrollIntoView({behavior:"smooth"}); // Scroll to the bottom of the chat when messages change 



  },[messages])



  useEffect(() => {
    const handleMessage = (newMessage) => {
      setMessages((prev) => {
        const exists = prev.find((msg) => msg._id === newMessage._id);
        if (exists) return prev;
        return [...prev, newMessage];
      });
    };

    socket.off("message received");
    socket.on("message received", handleMessage);

    return () => {
      socket.off("message received", handleMessage);
    };
  }, []);

  useEffect(()=>{
        socket.on("message-deleted",(updatedmsg)=>{

          setMessages((prev)=>// Update the messages state by replacing the deleted message with the updated message
               prev.map((message)=> //
                  message._id === updatedmsg._id ?updatedmsg:message
               )
          )

        })

        return ()=>{
          socket.off("message-deleted");
        }

  },[])








  



  useEffect(() => {
    if (!selectedChat?._id) return;

    socket.emit("join chat", selectedChat._id);
  }, [selectedChat]);

 return (
  <div className="flex-1 flex flex-col h-full bg-[#040712]/60">

    <ChatHeader selectedUser={selectedUser} setActivePanel={setActivePanel} online={online} activeUser={activeUser} selectedChat={selectedChat} isSelectedUserInSameChat={isSelectedUserInSameChat}/>

    <div 
     onClick={() => setOpenMenu(null)}
    className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
      
      {(messages || []).length === 0 ? (
        <div className="h-full flex items-center justify-center text-gray-500">
          No messages yet
        </div>
      ) : (
        (messages || []).map((msg) => (
          <MessageBubble
            key={msg._id}
            msg={msg}
            currentUser={currentUser}
            setMessages={setMessages}
            isSelectedUserInSameChat={isSelectedUserInSameChat}
            selectedUser={selectedUser}
            setOpenMenu={setOpenMenu}
            openMenu={openMenu}
          />
        ))
      )}

      <div ref={messageRef} />
    </div>

    {typing && (
          <div className="text-xs text-gray-400 px-6 pb-2">
        {selectedUser?.username} is typing...
      </div>
    )}

    <div className="border-t border-white/10">
      <MessageInput
        input={input}
        setInput={setInput}
        selectedChat={selectedChat}
        setMessages={setMessages}
      />
    </div>

  </div>
);
};

export default ChatWindow;