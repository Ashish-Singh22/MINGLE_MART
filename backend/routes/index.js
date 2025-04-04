const express = require("express")

const router = express.Router()

const userSignUpController = require("../controller/user/userSignUp")
const userSignInController = require('../controller/user/userSignIn')
const userDetailsController = require('../controller/user/userDetails')
const authToken = require('../middleware/authToken')
const userLogout = require('../controller/user/userLogout')
const allUsers = require('../controller/user/allUsers')
const updateUser = require('../controller/user/updateUser')
const UploadProductController = require('../controller/product/uploadProduct')
const getProductController = require('../controller/product/getProduct')
const updateProductController = require('../controller/product/updateProduct')
const getCategoryProduct = require('../controller/product/getCategoryproductone')
const getCategoryWiseProduct = require("../controller/product/getCategoryWiseProduct")
const getProductDetails = require("../controller/product/getProductDetails")
const addToCartController = require("../controller/user/addToCartController")
const countAddToCartProduct = require("../controller/user/countAddToCartProduct")
const addToCartViewProduct = require("../controller/user/addToCardViewProduct")
const updateAddToCartProduct = require("../controller/user/updateAddToCartProduct")
const deleteAddToCartProduct = require("../controller/user/deleteAddToCartProduct")
const searchProduct = require("../controller/product/searchProduct")
const filterProduct = require("../controller/product/filterProduct")
const paymentController = require("../controller/order/paymentController")
const webhooks = require("../controller/order/webhook")
const orderController = require("../controller/order/orderController")
const allOrderController = require("../controller/order/allOrderController")
const addReview = require("../controller/review/addReview")
const checkProductInOrder = require("../controller/order/checkProductInOrder")
const allReview = require("../controller/review/allReview")
const myReview = require("../controller/review/myReview")
const userById = require("../controller/user/userById")
const editReview = require("../controller/review/editReview")
const deleteReview = require("../controller/review/deleteReview")
const { updateOrderImagesController } = require("../controller/order/updateImageOrderController")
const { updateProductImagesController } = require("../controller/product/updateProductImage")

router.post("/signup",userSignUpController)
router.post("/signin",userSignInController)
router.get("/user-details",authToken,userDetailsController)
router.get("/userLogout",userLogout)
router.post("user-by-id",userById)

//admin panel
router.get("/all-user",authToken,allUsers)
router.post("/update-user",authToken,updateUser)

//product
router.post("/upload-product",authToken,UploadProductController)
router.get("/get-product",getProductController)
router.post("/update-product",authToken,updateProductController)
router.get("/get-categoryProduct",getCategoryProduct)
router.post("/category-product",getCategoryWiseProduct)
router.post("/product-details",getProductDetails)
router.get("/search",searchProduct)
router.post("/filter-product",filterProduct)

//user add to cart
router.post("/addtocart",authToken,addToCartController)
router.get("/countAddToCartProduct",authToken,countAddToCartProduct)
router.get("/view-card-product",authToken,addToCartViewProduct)
router.post("/update-cart-product",authToken,updateAddToCartProduct)
router.post("/delete-cart-product",authToken,deleteAddToCartProduct)

//payment
router.post('/checkout',authToken,paymentController)
router.post('/webhook',webhooks)// api/webhook
router.get('/order-list',authToken,orderController)
router.get('/all-order',authToken,allOrderController)
router.post('/check-product-in-order',authToken,checkProductInOrder)

//review
router.post("/add-review",authToken,addReview)
router.post("/all-review",allReview)
router.post("/my-review",myReview)
router.post("/edit-review",authToken,editReview)
router.delete("/delete-review",authToken,deleteReview)



router.put("/update-image-order",authToken,updateOrderImagesController)
router.put("/update-image-product",authToken,updateProductImagesController)


module.exports = router