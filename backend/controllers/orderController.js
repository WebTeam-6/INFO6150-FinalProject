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
    console.log("AddOrder req", req);
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
      console.log('IM CALLINGGGG')
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

//get all orders for any user
const getOrderByUser = async (req, res) => {
  console.log("In order by userid");

  try {
    const userId = req.params.userId;
    const orders = await Order.find({ userId }).populate('cartId');

    console.log("After item populate", orders);

    if (orders.length > 0) {
      for (const order of orders) {
        console.log(order._id);

        const existingCart = order.cartId;
        console.log(" Inside cart", existingCart);

        for (const cartItem of existingCart.items) {
          // Assuming you want to populate each product in the cart item
          console.log(".........."+cartItem);
          // await cartItem.populate('product').execPopulate();
          console.log("done");
        }

        // Now you can access the populated items
        console.log("Cart items"+existingCart.items);

        // If you want to modify the quantity of an existing item, you can do so here
        // Example: Increase quantity by 1 for the first item in the cart
        
        await order.save();
      }

      return res.status(200).json(orders);
    } else {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
  } catch (error) {
    console.error(error); // Log detailed error message
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};




module.exports = {
  updateOrderStatus,
  getOrderById,
  getAllOrders,
  AddOrder,
  getOrderByUser
};
