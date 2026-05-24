import React from "react";
import socket from "../../Socket/socket.js";
import { useRef,useState } from "react";

import api from "../../Api/axios.js";

const MessageInput = ({ input, setInput, selectedChat, setMessages }) => {
    const typingTimeoutRef = useRef(null);
    const [selectedImage,setSelectedImage]=useState(null);
    const imageInputRef=useRef(null);

 
   const handleTyping=(e)=>{

        setInput(e.target.value);

        if(!selectedChat?._id) return;


        socket.emit('typing',selectedChat._id)

        if(typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current); // Clear the previous timeout if it exists

        typingTimeoutRef.current= setTimeout(()=>{
            socket.emit('stop-typing',selectedChat._id)
        },2000) // Emit 'stop-typing' after 2 seconds of inactivity


    }



    const uploadImage =async()=>{

      if(!selectedImage) return;

      const formData= new FormData() ; // Create a FormData object to send the image file

      formData.append('image',selectedImage);


      try {

          const response=await api.post('/upload/image',formData,{
              headers:{
                  'Content-Type':'multipart/form-data'

              }

          })


          return response.data.imageUrl

      }
      catch(error){
        console.log("Error uploading image:",error);
      }


    }
 
 
 
  const sendMessage = async () => {


    const imageUrl = await uploadImage();

    console.log(imageUrl);
    if (!input.trim()) return;
    if (!selectedChat) return;

    try {
      const newMessage = {
        content: input,
        chatId: selectedChat._id,
        sender: {
          _id: JSON.parse(localStorage.getItem("user"))._id,
          username: JSON.parse(localStorage.getItem("user")).username
        }
      };

      setMessages((prev) => [
        ...prev,
        {
          ...newMessage,
          _id: Date.now()
        }
      ]);

      socket.emit("new message", newMessage);
      setInput("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-[82px] border-t border-white/10 flex items-center px-5 gap-3 bg-[#070b18]/70 backdrop-blur-xl">
      
      <button
          type="button"
          onClick={() => imageInputRef.current.click()} // Trigger the hidden file input when the button is clicked
        >
          +
      </button>


      <input type="file"
        ref={imageInputRef}
        accept="image/*"
        className="hidden"
        onChange={(e)=>{
          const file=e.target.files[0]; // Get the selected file


          if(file){
            console.log("Selected file:", file);
            setSelectedImage(file);
          }
        }}
      >
        
      </input>
      
      <input
        type="text"
        placeholder="Type a message..."
        value={input}
        onChange={handleTyping}
        onKeyDown={(e) => {
          if (e.key === "Enter") sendMessage();
        }}
        className="flex-1 h-[50px] bg-white/[0.04] rounded-2xl px-5 outline-none text-sm text-white placeholder:text-gray-500 border border-white/10 focus:border-[#d6ad4a]/40 transition"
      />

      

      <button
        onClick={sendMessage}
        className="h-[50px] px-7 bg-[#d6ad4a] text-black rounded-xl font-medium hover:opacity-90 transition"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;