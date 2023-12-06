
const Product = require("../models/product");
const Order = require("../models/ordersModel");
const User = require("../models/user");
const stripe = require('stripe')('sk_test_51OJQvKAPl4YpXYxVfgVmncSENwXYfKKTRMxuJDGp64hxD8f4tqwjphj9z55fVxywGsWWU1XGGQnlIADsur22kO0W00Yg3nytwu');

const PaymentController = {

    async getSessionDetails(req, res){
        try {
            const { sessionId } = req.params;

            const sessionData = await stripe.checkout.sessions.retrieve(sessionId);
        
            //const { metadata } = session;
        
            res.json({ success: true, sessionData });
          } catch (error) {
            console.error(error);
            throw new Error('Error fetching product count by category');
          }
        
    },

}

module.exports = PaymentController;


