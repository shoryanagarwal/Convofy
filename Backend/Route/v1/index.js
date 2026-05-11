const express=require('express');

const router=express.Router();

const authMiddleware=require('../../Middleware/AuthMiddleware.js');
const {getAllUsers} = require('../../Controller/usercontroller.js')
const {registerUser,LoginUser} = require('../../Controller/auth_controller.js')

const {oneOnOneChat,userChat}=require('../../Controller/chatcontroller.js')
const {sendMessage,getMessage}=require('../../Controller/message_controller.js')




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
router.get('/request',authMiddleware,getRequest);
router.post('/request/accept',authMiddleware,acceptRequest);
router.post('/request/reject',authMiddleware,rejectRequest);




module.exports=router;