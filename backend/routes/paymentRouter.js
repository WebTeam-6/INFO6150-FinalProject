const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.get('/get-session-details/:sessionId',paymentController.getSessionDetails);
router.post('/create-checkout-session',paymentController.postPayment);

module.exports = router;
