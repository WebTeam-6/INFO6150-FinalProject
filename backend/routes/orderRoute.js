const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.put("/:id", orderController.updateOrderStatus);
router.get('/',orderController.getAllOrders);
router.get('/:id',orderController.getOrderById);
router.post('/',orderController.AddOrder);
router.get("/myOrders/:userId", orderController.getOrderByUser);

module.exports = router;
