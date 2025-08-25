import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHendler } from "../utils/asyncHendler.js";
import { Orders } from "../models/orders.models.js";
import { User } from "../models/user.models.js";
import { Product } from "../models/product.models.js";

const createOrders = asyncHendler( async (req, res) => {
    //! : collect The All fildes Form The req.body (oderItems,)
    //? : So Add The VAlidation For The all fildes
    //* : form THe Req.body collect The User
    //? : after Using The oderItems Collect The Procut and find THe Prices of Each Prodcts 
    //* : collect The Total Price
    //! : create THe New Object using Orders.create
    //? : return The Responce

    const {oderItems} = req.body;

    if(!oderItems){
        throw new ApiError(400, "OderItems Are Empty")
    }

    const user = req.user;

    console.log(user);
    

    if (!user) {
        throw new ApiError(400, "User Not Found")
    }

    let totalPrice = 0;
    for (const item of oderItems) {
        const product = await Product.findById(item.productName);

        if (!product) {
            throw new ApiError(404, `Product with ID ${item.productName} not found`);
        }

        totalPrice += product.price * item.quantity;
    }

    const order = await Orders.create({
        user : user,
        oderItems,
        shippingAddress : user?.address[0],
        totalPrice : totalPrice
    })

    const createOrder = await Orders.findById(order._id)

    if(!createOrder){
        throw new ApiError(500, "Creating Order Error: Somting Went Wrong")
    }

    if (!user.orders) {
        user.orders = [];
    }

    user.orders.push(createOrder?._id);
    await user.save();

    return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    createOrder,
                    "Order Create Sussfully"
                )
            )
})

const deleteOrders = asyncHendler( async (req, res) => {
    //? : Collect The Username Form The -> req.params
    //! : Collect The OrderId Form The req.params
    //* : Check The OrderId And Username Order Ad Must Be The Same Or Not 
    //TODO : If THe Same USing HTe OrderId Delate The Order
    //? : Res THe Deleted Order

    const {username, orderId} = req.params;

    if (!orderId || !username) {
        throw new ApiError(400, "Order ID and owner are required");
    }

    const user = await User.findOne({username : username.toLowerCase()})

    if(!user){
        throw new ApiError(400, "User Can't Found")
    }

    const order = await Orders.findById(orderId);

    if(!order){
        throw new ApiError(400, "Order Can Not Found ")
    }

    if(String(order.user) !== String(user._id)){
        throw new ApiError(400, "You are not the owner of this Order")
    }

    await Orders.findByIdAndDelete(order?._id)


    return res.status(200).json(new ApiResponse(200,{}, "Order Sussfully Deleted"))
})

const updateOrders = asyncHendler( async (req, res) => {
    //* : Collect The Data {username , orderId} -> req.body
    //? : Check The Order Must Be A User Or Not?
    //TODO : new Order Items Collect Form req->body 
    //! : update The Price 
    //* : update The Order 
    //! check The Order update Or Not?
    //? : Return The Updated Order

    const {oderItems} = req.body;

    if(!oderItems){
        throw new ApiError(400, "Order Items Must Require")
    }

    const {username, orderId} = req.params;

    if (!orderId || !username) {
        throw new ApiError(400, "Order ID and owner are required");
    }

    const user = await User.findOne({username : username.toLowerCase()})

    if(!user){
        throw new ApiError(400, "User Can't Found")
    }

    const order = await Orders.findById(orderId);

    if(!order){
        throw new ApiError(400, "Order Can Not Found ")
    }

    if(String(order.user) !== String(user._id)){
        throw new ApiError(400, "You are not the owner of this Order")
    }

    let totalPrice = 0;

    for(let item of oderItems){
        const product = await Product.findById(item.productName);

        if (!product) {
            throw new ApiError(404, `Product with ID ${item.productName} not found`);
        }

        totalPrice += product.price * item.quantity;
    }

    const updatedOrder = await Orders.findByIdAndUpdate(
        order?.id,
        {
            $set : {
                oderItems,
                totalPrice
            }
        },
        {new : true}
    )



    if(!updateOrders){
        throw new ApiError(400, "Order can't Updated")
    }

    return res.status(200).json(
                new ApiResponse(
                    200,
                    updatedOrder,
                    "Order Update Sussfully"
                )
            )
})  

const getOrderById = asyncHendler( async (req, res) => {
    //* : Get The Id -> req.params
    //? : Check the id can have or not ?
    //! : find The Order 
    //? : Add The VAlidation If Order Not Found Given The Error
    //* : Return The Res

    const {orderId} = req.params;

    if(!orderId){
        throw new ApiError(400, "Order Id Can not Found")
    }

    const order  = await Orders.findById(orderId);

    if(!order){
        throw new ApiError(400, "Order Can Not Found")
    }

    return res.status(200).json(new ApiResponse(200, order, "Order Find Sussfully"))
})

const getMonthlySales = asyncHendler(async (_, res) => {
    const order = await Orders.aggregate([
        {
            $group: {
                _id: {
                    year: { $year: "$createdAt" },
                    month: { $month: "$createdAt" }
                },
                totalSales: { $sum: "$totalPrice" },
                orderCount: { $sum: 1 }
            }
        },
        {
            $sort: { "_id.year": -1, "_id.month": -1 }
        }
    ]);

    if(order.length <= 0){
        throw new ApiError(404, "Order Monthly Sales Can't Found")
    }

    return res.status(200).json(new ApiResponse(200, order, "Monthly Sales Find"));
});

const getAverageOrderValue = asyncHendler(async (_, res) => {
    const result = await Orders.aggregate([
        {
            $group : {
                _id : null,
                averageOrderValue : { $avg : "$totalPrice" },
                orderCount : { $sum : 1 }
            }
        }
    ])

    const avgValue = result[0]?.averageOrderValue || 0;
    const orderCount = result[0]?.orderCount || 0;

    if(orderCount === 0){
        throw new ApiError(404 ,"Order Value Can't find" )
    }

    return res.status(200).json(
        new ApiResponse(200, { averageOrderValue: avgValue, orderCount }, "Average order value fetched successfully")
    );
})

export {createOrders, deleteOrders, updateOrders, getOrderById,getMonthlySales ,getAverageOrderValue}