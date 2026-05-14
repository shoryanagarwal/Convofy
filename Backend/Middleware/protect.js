const jwt=require('jsonwebtoken')

const User=require('../Model/user.js')

const {JWT_SECRET}=require('../Config/server_config.js')


const protect = async(req,res,next)=>{

    try {

        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {

        return res.status(401).json({
        message: "Not authorized",
        status: false
            });
    }

    const token = authHeader.split(" ")[1];

        const decoded=jwt.verify(token,JWT_SECRET)
        console.log("decoded", decoded);

        const user= await User.findById(decoded.id).select('-password')

        console.log("user from db", user);


        if(!user){
            return res.status(401).json({message:'Not authorized',
                status:'false'
            })

        }
        

        req.user=user;

        next();


    } 
    
    catch (error) {
        console.log(error)
        res.status(401).json({message:'Not authorized'})    
    }



}


module.exports=protect