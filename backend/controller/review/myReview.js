const reviewModel = require('../../models/reviewModel')

const myReview = async(req,res)=>{

    try{

        const { userId } = req.body

        const myReview = await reviewModel.findById(userId)


        res.json({
            message : "All Reviews",
            error : false,
            success : true,
            data : myReview
        })

    }catch(err){

        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })

    }

}

module.exports = myReview