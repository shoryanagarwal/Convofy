const uploadImage=async(req,res)=>{
    try{


            if(!req.file){
               return res.status(400).json({
                    success:false,
                    message:"No file uploaded"

                })
            }


            return  res.status(200).json({
                success:true,
                message:"File uploaded successfully",
                imageUrl:req.file.location
            })


    }
    catch(error){

        console.log("Error uploading file:", error);

       return  res.status(500).json({
            success:false,
            message:"Error uploading file"
        })

    }



}



module.exports={uploadImage}