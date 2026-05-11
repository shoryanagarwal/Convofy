const Request=require('../Model/request.js')


const sendRequest=async(req,res)=>{

    const {sender,receiver}=req.body;


    try {
        
        // if request already exists
        const existingRequest=await Request.findOne({sender,receiver});
        
         if(sender==receiver){
            return res.status(400).json({
                message:"You cannot send request to yourself",
                data:{},    
                err:{},
                success:false
            })
        }


        if(existingRequest){
            return res.status(400).json({
                message:"Request already sent",
                data:existingRequest,
                err:{},
                success:false
            })
        }

        // if request already exists in reverse order-> means reciever has already sent request to sender
        const reverseRequest = await Request.findOne({
            sender:receiver,
            receiver:sender
        })


        if(reverseRequest){
            return res.status(400).json({
                message:`Request already sent by ${reverseRequest.sender} to ${reverseRequest.reciever}`,
                data:reverseRequest,
                err:{},
                success:false
            })
        }


        // create new Request

        const newRequest= await Request.create({
            sender,
            receiver
        })


        return res.status(200).json({
            message:"Request sent successfully",
            data:newRequest,
            err:{},
            success:true
        })


        

       

    } 
    catch (error) {
        console.log("failed to send request");
        console.log(error);
        
            
    }



}



const acceptRequest=async(req,res)=>{

        try {

            //user will get the request from the sender and then will accept the request

            const {requestId}=req.body;
            const request = await Request.findById(requestId);

            if(!request){
                return res.status(404).json({
                    message:"Request not found",
                    data:{},
                    err:{},
                    success:false
                })
            }

            request.status='accepted';
            await request.save();


            return res.status(200).json({
                message:"Request accepted successfully",
                data:request,
                err:{},
                success:true
            })

            
        } 
        catch (error) {
            console.log("error while accepting request");
            console.log(error);
            
               
        }

}

const rejectRequest = async(req,res)=>{

    try {
        
        //if request is rejected we will delte the requestv from db

        const {requestId}=req.body;
        const request = await Request.findById(requestId);

        if(!request){
            return res.status(404).json({
                message:"Request not found",
                data:{},
                err:{},
                success:false
            })
        }

        await Request.findByIdAndDelete(requestId);
        return res.status(200).json({
            message:"Request rejected successfully",
            data:{},
            err:{},
            success:true
        })





    } 
    catch (error) {
        console.log("error while rejecting the request");
        console.log(error);
        
           
    }
    
}



const getRequest=async(req,res)=>{
    try {
            const {userId}=req.params;// params-> /request/:userId

            const requests = await Request.find({receiver:userId}).populate('sender','name email');
            return res.status(200).json({
                message:"Request fetched successfully",
                data:requests,
                err:{},
                success:true
            })



    } 
    catch (error) {
        console.log("error while getting the request");
        console.log(error);
        
            
    }
}

module.exports={sendRequest,acceptRequest,rejectRequest,getRequest}