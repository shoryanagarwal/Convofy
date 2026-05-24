const express = require('express');
const app = express();
const { PORT } = require('./Config/server_config.js');
const connect = require('./Config/database_config.js');
const apiRoutes = require('./Route/index.js');
const { Server } = require('socket.io');
const cors=require('cors');
const Chat = require('./Model/chat.js');
const Message = require('./Model/message.js');






app.set('view engine', 'ejs');
app.set('views', './views');

const StartServer = async () => {

    try {

        
       const allowedOrigins = [
        "http://localhost:5173",
        "https://convofy-one.vercel.app"
        ];


        app.use(cors({
            origin: allowedOrigins,
            credentials: true,
            }));

       
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        app.use('/api', apiRoutes);

        app.get("/", (req, res) => {
            res.send("Server is working");
        });

        app.get('/test-chat/:userId', (req, res) =>{
            res.render('chat', {
            chatId: "69dd33872543a7329060e171",
            user: { _id: req.params.userId }, // 
            messages: []    
    });
});

        
        const server = app.listen(PORT, () => {
            console.log(`server started successfully on site http://localhost:${PORT}`);
            connect();
        });

        
        const io = new Server(server, {
            pingTimeout: 60000,
            transports: ["websocket"],
            cors: {
                origin: allowedOrigins,
                credentials: true,
            }
            });
        app.set("io", io);


        // adding the offline and online functionality using socket.io
            const userOnline= new Map();
            const socketToUser = new Map();
            const activeUser= new Map(); // Map to track active users in each chat room


        io.on('connection', (socket) => {


            socket.on('active-chat',async({userId,chatId})=>{

                if(!chatId || !userId) return;
                
                await Message.updateMany(
                    {
                        chat:chatId,
                        sender: { $ne: userId },
                        seenBy: { $ne: userId }

                    },
                    {
                        $addToSet:{seenBy:userId}
                    }



                )

                activeUser.set(userId.toString(), chatId.toString() ); // Set the active chat for the user in the activeUser map


                io.emit('active-chat',Object.fromEntries(activeUser));


                io.emit('message-seen',{chatId,userId})

            });


            socket.on('leave-chat',(userId)=>{
                if(!userId) return;

                activeUser.delete(userId.toString());

                io.emit('active-chat',Object.fromEntries(activeUser));
            })


            socket.on('disconnect', () => {
                console.log("user disconnected");

                const userId= socketToUser.get(socket.id); // get the userId from socketToUser map using the socket.id

                if(!userId) return;

                socketToUser.delete(socket.id);
                userOnline.delete(userId);
                activeUser.delete(userId.toString());

                io.emit('user-offline',userId);
                io.emit('active-chat',Object.fromEntries(activeUser));


            });


            //for typing indicator

            socket.on('typing',(chatId)=>{

                socket.to(chatId).emit('typing')


            })

            socket.on('stop-typing',(chatId)=>{
                socket.to(chatId).emit('stop-typing')
            })
            socket.on("setup", (userData) => {
                if (!userData?._id) return;

                const userId = userData._id.toString();

                userOnline.set(userId, socket.id);
                socketToUser.set(socket.id, userId);

                socket.join(userId);
                socket.emit("connected");

                socket.emit("online-users", Array.from(userOnline.keys()));
                socket.broadcast.emit("user-online", userId);
                });

            socket.on('join chat', (room) => {
                socket.join(room);
                console.log("user joined room ", room);
            });

            socket.on('new message', async (newMessage) => {
                try {
                    const { content, sender, chatId,mediaUrl,messageType } = newMessage;

                    if ((!content && !mediaUrl) || !sender || !chatId ) return;

                    let message = await Message.create({
                        sender: sender._id,
                        content,
                        chat: chatId,
                        mediaUrl: mediaUrl || "",
                        messageType: messageType || "text"
                    });

                    message = await message.populate('sender', 'username');
                    message = await message.populate('chat');

                    message = await Chat.populate(message, {
                        path: 'chat.users',
                        select: 'username'
                    });

                    await Chat.findByIdAndUpdate(chatId, {
                        latestMessage: message._id
                    });

                    socket.to(chatId).emit('message received', message);
                    

                } catch (error) {
                    console.log("SOCKET ERROR:", error);
                }
            });
        });

    } catch (error) {
        console.log("unable to start server");
    }
};

StartServer();