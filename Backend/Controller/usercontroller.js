const User = require('../Model/user.js');


const getAllUsers=async(req,res)=>{

    try {
        
        const users= await User.find().select('-password');
        return res.status(200).json({
            success:true,
            message:'all users fetched successfully',
            data:users,
            err:{}
        })



    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'unable to fetch the users',
            data:{},
            err:error
        })
        

    }


}

module.exports ={getAllUsers}