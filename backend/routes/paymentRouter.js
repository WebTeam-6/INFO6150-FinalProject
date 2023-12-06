const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.get('/get-session-details/:sessionId',paymentController.getSessionDetails);

module.exports = router;
