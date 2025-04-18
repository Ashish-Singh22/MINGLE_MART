
const Stripe = require('../../config/stripe')
const addToCartModel = require('../../models/cartProduct')
const orderModel = require('../../models/orderProductModel')

const endpointSecret = process.env.STRIPE_ENDPOINT_WEBHOOK_SECRET_KEY

async function getLineItems(lineItems){
    let ProductItems = []

    if(lineItems?.data?.length){
        for(const item of lineItems.data){
            const product = await Stripe.products.retrieve(item.price.product)
            const productId = product.metadata.productId

            const productData = {
                productId: productId,
                name : product.name,
                price : item.price.unit_amount / 100,
                quantity : item.quantity,
                image : product.images
            }
            ProductItems.push(productData)
        }
    }

    return ProductItems
}

const webhooks = async(req,res)=>{
    const sig = req.headers['stripe-signature']

    const payloadString = JSON.stringify(req.body)

    const header = Stripe.webhooks.generateTestHeaderString({
        payload : payloadString,
        secret : endpointSecret,
    });

    let event;

    try{
        event = Stripe.webhooks.constructEvent(payloadString,header,endpointSecret)

    }catch(err){
        res.status(400).send(`Webhook Error: ${err.message}`)
        return;
    }

     // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
        const session = event.data.object;
        const lineItems = await Stripe.checkout.sessions.listLineItems(session.id)

        const productDetails = await getLineItems(lineItems)
     
        // console.log(productDetails)

        const orderDetails = {
            ProductDetails : productDetails,
            email : session.customer_email,
            userId : session.metadata.userId,
            paymentDetails : {
                paymentId : session.payment_intent,
                payment_method_type : session.payment_method_types,
                payment_status : session.payment_status,
            },
            shipping_options : session.shipping_options.map(s=>{
                return{
                    ...s,
                    shipping_amount : s.shipping_amount / 100
                }
            }),
            totalAmount : session.amount_total / 100
        }

        const order = new orderModel(orderDetails)
        const saveOrder = await order.save()

        if(saveOrder?._id){
            const deleteCartItem = await addToCartModel.deleteMany({ userId : session.metadata.userId})
        }

      break;
   
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

    res.status(200).send();


}

module.exports = webhooks