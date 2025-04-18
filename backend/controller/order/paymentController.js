
const Stripe = require("../../config/stripe")
const userModel = require("../../models/userModel")

const paymentController = async(req,res) => {
    try{
        const {cartItems} = req.body

        console.log(cartItems)

        const user = await userModel.findOne({_id : req.userId})

        const params = {
            submit_type : "pay",
            mode : "payment",
            payment_method_types : ['card'],
            billing_address_collection : "auto",
            shipping_options : [
                {
                    shipping_rate : 'shr_1Qmg4BGAhuugmtMBVB4YSIx8'
                }
            ],
            customer_email : user.email,
            metadata : {
                userId : req.userId
            },
            line_items : cartItems.map((item,index)=>{
                return{
                    price_data : {
                        currency : 'inr',
                        product_data : {
                            name : item.productId.productName,
                            images : item.productId.productImage,
                            metadata : {
                                productId : item.productId._id
                            }
                        },
                        unit_amount : item.productId.sellingPrice * 100
                    },
                    adjustable_quantity : {
                        enabled : true,
                        minimum : 1
                    },
                    quantity : item.quantity

                }
            }),
            success_url : "https://mingle-mart-1v8t.vercel.app/success",
            cancel_url : "https://mingle-mart-1v8t.vercel.app/cancel",
        }

        
        const session = await Stripe.checkout.sessions.create(params)

        res.status(303).json(session)

        console.log(session)


    }catch(err){
        res.json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = paymentController

