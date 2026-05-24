const mongoose=require('mongoose');


const messageSchema=mongoose.Schema({


    chat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Chat',
        required:true
    },


    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },

    content:{
        type:String,
        
        trim:true
        
    },


    messageType:{
        type:String,
        enum:['text','image','video','file'],
        default:'text'



    },

    status:{
        type:String,
        enum:['sent','delivered','read'],
        default:'sent'
    },


    deletedFor:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',

    }],


    isDeletedEveryone:{
        type:Boolean,
        default:false
    },

    seenBy:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ],

    mediaUrl: {
        type: String,
        default: ""
    }










},{ timestamps: true })



const Message= mongoose.model('Message',messageSchema);

module.exports=Message