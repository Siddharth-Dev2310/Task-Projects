import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHendler } from "../utils/asyncHendler.js";
import { Product } from "../models/product.models.js";
import { User } from "../models/user.models.js";
import { Orders } from "../models/orders.models.js";

const createProduct = asyncHendler(async (req, res) => {
    // req.body: {productName, descripstion, price, stock, productImage}
    // req.params: {owner}

    const { productName, descripstion, price, stock, productImage } = req.body;

    const { username } = req.params;

    if (!productName || !descripstion || !price || !stock) {
        throw new ApiError(400, "Please fill all details including owner");
    }

    const user = await User.findOne({username : username.toLowerCase()});

    // console.log("User :" , user);
    

    if (!user) {
        throw new ApiError(404, "Owner user not found");
    }

    const existingProduct = await Product.findOne({ productName: productName.toLowerCase() });

    if (existingProduct) {
        throw new ApiError(400, "Product already exists");
    }

    const product = await Product.create({
        productName: productName.toLowerCase(),
        descripstion,
        price,
        stock,
        productImage,
        onwer: user?._id
    });

    const createdProduct = await Product.findById(product?.id);

    if(!createProduct){
        throw new ApiError(400, "Product Can't Created Try Again")
    }


    return res.status(201).json(
        new ApiResponse(201,  createdProduct , "Product created successfully")
    );
});

const updateProduct = asyncHendler(async (req, res) => {
    // req.body: {productName, descripstion, price, stock, productImage}
    // req.params: {username, productId}
    const { productName, descripstion, price, stock, productImage } = req.body;
    const { username, productId } = req.params;

    if (!productName || !descripstion || !price || !stock) {
        throw new ApiError(400, "All fields (productName, descripstion, price, stock) are required");
    }

    if (!productId || !username) {
        throw new ApiError(400, "Product ID and owner are required");
    }

    const user = await User.findOne({ username: username.toLowerCase() });
    if (!user) {
        throw new ApiError(404, "Owner user not found");
    }

    const product = await Product.findById(productId);
    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    if (String(product.onwer) !== String(user._id)) {
        throw new ApiError(403, "You are not the owner of this product");
    }

    const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        {
            $set: {
                productName: productName.toLowerCase(),
                descripstion,
                price,
                stock,
                productImage
            }
        },
        { new: true, runValidators: true }
    );

    if (!updatedProduct) {
        throw new ApiError(500, "Something went wrong while updating product");
    }

    return res.status(200).json(
        new ApiResponse(200, { product: updatedProduct }, "Product updated successfully")
    );
});


const deleteProduct = asyncHendler(async (req, res) => {
    // req.params: {productId, owner}
    const { productId, username } = req.params;
    if (!productId || !username) {
        throw new ApiError(400, "Product ID and owner are required");
    }

    const user = await User.findOne({ username: username.toLowerCase() });
    if (!user) {
        throw new ApiError(404, "Owner user not found");
    }

    const product = await Product.findById(productId);
    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    if (String(product.onwer) !== String(user?._id)) {
        throw new ApiError(403, "You are not the owner of this product");
    }

    const deletedProdcut = await Product.findByIdAndDelete(product?._id)

    return res.status(200).json(
        new ApiResponse(200, deletedProdcut, "Product deleted successfully")
    );
});

const getAllProducts = asyncHendler(async (req, res) => {

    const products = await Product.find();

    return res.status(200).json(
        new ApiResponse(200, { products }, "All products fetched successfully")
    );
});

const getProductById = asyncHendler(async (req, res) => {
    const { productId } = req.params;

    if (!productId) {
        throw new ApiError(400, "Product ID is required");
    }
    const product = await Product.findById(productId);

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    return res.status(200).json(
        new ApiResponse(200, { product }, "Product fetched successfully")
    );
});

const getTopSellingProducts = asyncHendler(async (req, res) => {
    const result = await Orders.aggregate([
        { 
            $unwind: "$oderItems"
        },
        {
            $group: {
                _id: "$oderItems.productName",
                totalSold: { $sum: "$oderItems.quantity" }
            }
        },
        {
            $lookup: {
                from: "products",
                localField: "_id",
                foreignField: "_id",
                as: "productDetails"
            }
        },
        { 
            $unwind: "$productDetails"
        },
        { 
            $sort: { totalSold: -1 }
        },
        { 
            $limit: 5 
        },
        {
            $project: {
                _id: 0,
                productId: "$productDetails._id",
                productName: "$productDetails.productName",
                totalSold: 1
            }
        }
    ]);

    if (result.length === 0) {
        throw new ApiError(404, "Selling Products Can't Found");
    }

    return res.status(200).json(
        new ApiResponse(200, { topProducts: result }, "Top 5 best-selling products fetched successfully")
    );
});

export { createProduct, updateProduct, deleteProduct, getAllProducts, getProductById, getTopSellingProducts };