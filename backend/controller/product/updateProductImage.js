const productModel = require("../../models/productModel");

const updateProductImagesController = async (req, res) => {
    try {
        // Fetch all products
        const allProducts = await productModel.find();
        
        for (let product of allProducts) {
            // Check if productImage exists and is an array
            if (!product.productImage || !Array.isArray(product.productImage)) {
                console.log(`⚠️ Skipping product ${product._id}: No valid images found.`);
                continue; // Skip this product
            }

            // Update only URLs that start with "http://"
            let updated = false;
            product.productImage = product.productImage.map(imgUrl => {
                if (typeof imgUrl === "string" && imgUrl.startsWith("http://")) {
                    updated = true;
                    return imgUrl.replace("http://", "https://");
                }
                return imgUrl; // Keep original if not "http://"
            });

            // Save only if any image was updated
            if (updated) {
                await product.save();
                console.log(`✅ Updated product ${product._id}`);
            } else {
                console.log(`⚠️ No updates needed for product ${product._id}`);
            }
        }

        res.status(200).json({
            message: "Product images updated successfully",
            success: true,
            error: false
        });

    } catch (err) {
        console.error("❌ Error updating product images:", err);
        res.status(500).json({
            message: "Error updating product images",
            error: true,
            success: false,
            details: err.message
        });
    }
};

module.exports = { updateProductImagesController };
