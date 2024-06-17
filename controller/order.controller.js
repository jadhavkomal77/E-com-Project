const asyncHandler = require("express-async-handler")
const Order = require("../models/Order")

exports.placeOrder = asyncHandler(async (req, res) => {
    await Order.create(req.body)
    res.json({ message: "Order Placed Success" })
})

exports.GetUserOrderDetails = asyncHandler(async (req, res) => {
    const { id } = req.params
    const result = await Order.find({ customer: id }).populate("products")
    res.json({ message: "Order Fetch Success", result })
})

// exports.GetOrderDetails = asyncHandler(async () => {})