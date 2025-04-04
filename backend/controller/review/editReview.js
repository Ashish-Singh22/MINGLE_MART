const reviewModel = require('../../models/reviewModel')
const uploadProductPermission = require('../../helpers/permission')

async function editReview(req,res){
    try{

        if(!uploadProductPermission(req.userId)){
            throw new Error("Permission denied")
        }
       
        const {_id,...resBody} = req.body

        const updateProduct = await reviewModel.findByIdAndUpdate(_id,resBody)

        res.json({
            message : "Product updtae successfully",
            data : updateProduct,
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

module.exports = editReview