const reviewModel = require('../../models/reviewModel')

const addReview = async(req,res)=>{

    try{
        console.log(req.body)
        const uploadReview = new reviewModel(req.body)
        const saveReview = await uploadReview.save()

        res.status(201).json({
            message : "Review added successfully",
            error : false,
            success : true,
            data : saveReview
        })

    }catch(err){

        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })

    }

}

module.exports = addReview