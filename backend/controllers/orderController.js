const orderService = require("../services/orderService");
const fs = require("fs").promises;
const Order = require("../models/ordersModel");
const Cart = require("../models/cart");
const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const status = req.body.status;
    console.log(orderId);
    const updatedOrder = await orderService.updateOrderStatusService(
      orderId,
      status
    );

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const AddOrder = async (req, res) => {
  try {
    const cartId = req.body.cartId;
    const cart = await Cart.findById(cartId);
    if (cart ) {
      const order = await Order.create({
        userId: cart.userId,
        cartId: cart._id,
      });
      //update cart status to 1
      cart.status = 1;
      await cart.save();
      return res.status(201).json({ success: true, order });
    } else {
      return res
        .status(400)
        .json({
          success: false,
          message: "Invalid cart status or cart not found",
        });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const getAllOrders = async(req,res) =>{
  try{
    const orders = await Order.find();
    return res.status(200).json({ success: true, orders });
  }
  catch(error){
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

const getOrderById = async(req,res) =>{
  try{
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    if (order) {
      return res.status(200).json({ success: true, order });
  } else {
      return res.status(404).json({ success: false, message: 'Order not found' });  }
  }
  catch(error){
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

module.exports = {
  updateOrderStatus,
  getOrderById,
  getAllOrders,
  AddOrder
};
