const orderService = require("../services/orderService");
const fs = require('fs').promises; 

const updateOrderStatus = async (req, res) => {
    try {
        const orderId  = req.params.id;
        const status  = req.body.status;
    console.log(orderId)
    const updatedOrder = await orderService.updateOrderStatusService(
      orderId,
      status
    );

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  updateOrderStatus,
};
