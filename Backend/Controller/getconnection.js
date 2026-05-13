const Request = require('../Model/request.js')

const getConnection = async(req,res) => {

   

    try {
       
        const {userId} = req.params;

        const connection = await Request.find({
            status: 'accepted',
            $or:[
                {sender: userId},
                {receiver: userId}
            ]




        }).populate('sender','username').populate('receiver','username');


        const formattedConnection = connection.map((connect)=>{ // connection is an array of request objects 

            if(connect.sender._id.toString()==userId){ // if the sender is the user then we need to return the reciever details
                    console.log(connect.receiver);
                    
                return connect.receiver;

            }
            else{
                return connect.sender; // if the reciever is the user then we need to return the sender details
            }


        })

        return res.status(200).json({
            message:"Connection fetched successfully",
            data:formattedConnection,
            err:{},
            success:true
        })


    } 
    
    catch (error) {
        
        console.log("error while getting the connection");
        console.log(error);

        
        return res.status(500).json({ success: false, message: "Unable to fetch connections" });

    }


}

module.exports = {getConnection}