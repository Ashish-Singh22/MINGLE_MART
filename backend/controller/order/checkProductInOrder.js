
const orderModel = require("../../models/orderProductModel");

const checkProductInOrder = async (req, res) => {
    try {
        // console.log(req.body)
        const { userId, productId } = req.body;

        const orderList = await orderModel.find({
            userId: userId,
            ProductDetails: { $elemMatch: { productId: productId } }
        }).sort({ createdAt: -1 });

        res.json({
            data: orderList,
            message: "Filtered Order List",
            success: true,
            error: false
        });

    } catch (err) {
        res.status(500).json({
            message: err.message || "Internal Server Error",
            error: true,
            success: false
        });
    }
};

module.exports = checkProductInOrder;
