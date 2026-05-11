const Message = require('../Model/message.js')
const Chat = require('../Model/chat.js');






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

            chat: chatId

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
    getMessage
}