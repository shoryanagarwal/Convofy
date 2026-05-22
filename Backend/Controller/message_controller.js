const Message = require('../Model/message.js')
const Chat = require('../Model/chat.js');



const deleteForMe = async(req,res)=>{

    const {messageId,userId}= req.body;


    try {

        const message= await Message.findByIdAndUpdate(
            messageId,
            {$addToSet:{deletedFor:userId}},
            {new:true}
        )
        return res.status(200).json({
            success:true,
            message:"Message deleted for you",
            data:message
        })


         if(!message){
            return res.status(404).json({
                success:false,
                message:"Message not found",
                data:{},
                err:{}
            })
        }
        
    } 
    
    
    catch (error) {
        res.status(500).json({  
            success:false,
            err:error,
            message:"Unable to delete message",
            data:{}
            });

    }



}



const deleteForEveryone = async(req,res)=>{

    const {messageId,chatId,recieverId} = req.body;

    try {




        const message = await Message.findById(messageId);

         if(!message){
            return res.status(404).json({
                success:false,
                message:"Message not found",
                data:{},
                err:{}
            })
        }


         if(message.sender.toString() !== req.user.id){
            return res.status(403).json({
                success:false,
                message:"You are not authorized to delete this message",
                data:{},
                err:{}
            })
          }


        const alreadySeen= message.seenBy?.some(id=>id.toString()===recieverId);
        if(alreadySeen){
            return res.status(400).json({
                success:false,
                message:"Message already seen",
                data:{},
                err:{}
            })
        }

        message.content="This message has been deleted";
        message.isDeletedEveryone=true;


        await message.save();





        const io=req.app.get('io');
        io.to(chatId).emit('message-deleted',message);


        
        
       
    
        return res.status(200).json({
            success:true,
            message:"Message deleted for everyone",
            data:message,
            err:{}
        })


        
        
    } 
    catch (error) {
        res.status(500).json({
            success:false,
            message:"Unable to delete message for everyone",
            data:{},
            err:error
        })
        
    }
    

}


const sendMessage = async (req, res) => {

    try {

        const { content, chatId } = req.body;

        if (!content || !chatId) {

            return res.status(400).json({
                success: false,
                message: "All fields required"
            });
        }

        // CREATE MESSAGE

        let message = await Message.create({

            sender: req.user.id,
            content: content,
            chat: chatId

        });

        // POPULATE SENDER

        message = await message.populate(
            "sender",
            "username "
        );

        // POPULATE CHAT

        message = await message.populate("chat");

        // UPDATE LATEST MESSAGE

        await Chat.findByIdAndUpdate(chatId, {

            latestMessage: message._id

        });

        return res.status(201).json({

            success: true,
            data: message

        });

    } 
    
    catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,
            message: "Unable to send message"

        });
    }
};



const getMessage = async (req, res) => {

    try {

        const { chatId } = req.params;

        const messages = await Message.find({

            chat: chatId,
            deletedFor: { $ne: req.user.id },

        })
        .populate("sender", "username ")
        .sort({ createdAt: 1 });

        return res.status(200).json({

            success: true,
            data: messages

        });

    } 
    
    catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,
            message: "Unable to fetch messages"

        });
    }
};


module.exports ={
    sendMessage,
    getMessage,
    deleteForMe,
    deleteForEveryone
}