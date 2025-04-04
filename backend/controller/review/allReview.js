const reviewModel = require('../../models/reviewModel')

const allReview = async(req,res)=>{

    try{
        const { productId } = req.body

        const allReview = await reviewModel.find({productId}).sort({ createdAt : -1 })


        res.json({
            message : "All Reviews",
            error : false,
            success : true,
            data : allReview
        })

    }catch(err){

        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })

    }

}

module.exports = allReview