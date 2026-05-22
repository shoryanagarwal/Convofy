import React, { useState } from "react";
import api from "../../Api/axios.js";
const MessageBubble = ({ msg, currentUser,setMessages,isSelectedUserInSameChat,selectedUser }) => {
  const senderId = typeof msg.sender === "object" ? msg.sender._id : msg.sender;
  const isMe = senderId === currentUser._id;

  const [menuOpen, setMenuOpen] = useState(false)
  const [deleteOption,setDeleteOption] = useState(false)

  const hasRecieverSeen = msg.seenBy?.some((id)=>id.toString()===selectedUser?._id)


  const deleteForMe = async()=>{

      try {

        const response= await api.post("message/deleteforme",{
            messageId:msg._id,
            userId:currentUser._id
        })



        setMessages((prev)=>
           prev.map((message)=>
                message._id === msg._id ? {
                  ...message,
                  deletedFor:[...(message.deletedFor || []), currentUser._id]
                }
                :
                message
           )
        )

        setMenuOpen(false);
        setDeleteOption(false);



      } 
      catch (error) {
          console.log(error);  
      }



  }


  const deleteForEveryone = async()=>{

      try{

        const response= await api.post('/message/deleteforeveryone',{
            messageId:msg._id,
            chatId:typeof msg.chat === "object" ? msg.chat._id: msg.chat,
            recieverId:selectedUser?._id
        
        }
        )


        setDeleteOption(false);
        setMenuOpen(false);
      }
      catch(error){
        console.log(error);
      }


  }




  return (
    <div className={`group relative flex ${isMe ? "justify-end" : "justify-start"}`}>
      {isMe && (
        <button onClick={()=>{
            setMenuOpen(!menuOpen);
            setDeleteOption(false);
        }}  
        className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition text-gray-400 hover:text-white px-2">
           ⋮
        </button>
      )}
      <div
        className={`max-w-[330px] px-4 py-3 rounded-2xl text-sm leading-6 border ${
          isMe
            ? "bg-[#d6ad4a] text-black border-[#d6ad4a]"
            : "bg-white/[0.055] text-gray-100 border-white/10"
        }`}
      >
        {msg.isDeletedEveryone || msg.deletedFor?.includes(currentUser._id)  ? (
            <span className="italic text-gray-500">
              This message was deleted
            </span>


        ):
        (msg.content)        
        }
      </div>


      {!isMe && (
          <button className ="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition text-gray-400 hover:text-white px-2"
          onClick={()=>{
            setMenuOpen(!menuOpen);
            setDeleteOption(false);
          }}> ⋮</button>
      )} 

      {menuOpen && (
        <div className={`absolute top-9 z-50 w-44 rounded-xl bg-[#0b1020] border border-white/10 shadow-xl overflow-hidden ${
            isMe ? "right-0" : "left-0"}`}>

              {!deleteOption ? (
                <>
                <button onClick={()=>navigator.clipboard.writeText(msg.content)}
                   className=" w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-white/[0.06]"

                  >Copy</button>

                <button
                  onClick={()=>setDeleteOption(true)}
                  className=" w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-white/[0.06]"
                
                >Delete</button>

                </>

              ): (
                  <>
                    <button onClick={deleteForMe} 
                    className="w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-white/[0.06]">

                      Delete for me

                    </button>
                    
                    {isMe  && !hasRecieverSeen && (
                      <button 
                      onClick={deleteForEveryone}
                      className="w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-white/[0.06]">

                      Delete for everyone
                    </button>
                    )}
                  

                    <button 
                     className="w-full text-left px-4 py-2 text-sm text-gray-400 hover:bg-white/[0.06]"
                    onClick={()=>setDeleteOption(false)}>Back</button>
                  
                  </>
              )}
              
            </div>

      )}


    </div>
  );
};

export default MessageBubble;