const mongoose = require('mongoose')

const userReview = mongoose.Schema({
    productId : {
        ref : 'product',
        type : String,
    },
    rating : Number,
    comment : String,
    userId : String,
    name : String,
    profilePic : String,
    
},{
    timestamps : true
})

const userReviewModel = mongoose.model("userReview",userReview)

module.exports = userReviewModel