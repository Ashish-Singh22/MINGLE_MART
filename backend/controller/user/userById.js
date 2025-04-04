const userModel = require("../../models/userModel")

async function userById(req,res){

    try{
        
        const { userId } = req.body()

        const userIdDetails = await userModel.findById({ userId })

        res.json({
            message : "All User",
            data : userIdDetails,
            success : true,
            error : false
        })
    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }

}

module.exports = userById