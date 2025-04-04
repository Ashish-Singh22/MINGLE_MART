const orderModel = require("../../models/orderProductModel");

const updateOrderImagesController = async (req, res) => {
    try {
        // Fetch all orders
        const allOrders = await orderModel.find();

        for (let order of allOrders) {
            // Update each ProductDetails' image array
            order.ProductDetails = order.ProductDetails.map(product => ({
                ...product,
                image: product.image.map(imgUrl => imgUrl.replace('http://', 'https://'))
            }));

            // Save updated order
            await order.save();
        }

        res.status(200).json({
            message: "Order images updated successfully",
            success: true,
            error: false
        });

    } catch (err) {
        res.status(500).json({
            message: "Error updating order images",
            error: true,
            success: false,
            details: err.message
        });
    }
};

module.exports = { updateOrderImagesController };
