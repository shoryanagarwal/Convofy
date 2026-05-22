const express=require('express');
const protect = require('../../Middleware/protect.js')
const router=express.Router();

const authMiddleware=require('../../Middleware/AuthMiddleware.js');
const {getAllUsers} = require('../../Controller/usercontroller.js')
const {registerUser,LoginUser} = require('../../Controller/auth_controller.js')

const {oneOnOneChat,userChat}=require('../../Controller/chatcontroller.js')
const {sendMessage,getMessage,deleteForEveryone,deleteForMe}=require('../../Controller/message_controller.js')

const {getConnection} = require('../../Controller/getconnection.js')


// request routes
const {sendRequest,getRequest,acceptRequest,rejectRequest}=require('../../Controller/request_controller.js')



router.post('/signup',registerUser);
router.post('/login',LoginUser);


router.post('/chat/oneonone',authMiddleware,oneOnOneChat);
router.get('/chat',authMiddleware,userChat);

router.post('/message',authMiddleware,sendMessage);
router.get('/message/:chatId',authMiddleware,getMessage);


router.get('/users',getAllUsers);




// request routes

router.post('/request/send',authMiddleware,sendRequest);
router.get('/request/:userId',authMiddleware,getRequest);
router.post('/request/accept',authMiddleware,acceptRequest);
router.post('/request/reject',authMiddleware,rejectRequest);



//delete message routes
router.post('/message/deleteforme',authMiddleware,deleteForMe);
router.post('/message/deleteforeveryone', authMiddleware, (req,res,next)=>{
  console.log("DELETE ROUTE HIT");
  next();
}, deleteForEveryone);


router.get('/me',protect,(req,res)=>{
    return res.status(200).json({
    success: true,
    data: req.user,
  });

})

router.get('/connections/:userId',authMiddleware,getConnection)

module.exports=router;