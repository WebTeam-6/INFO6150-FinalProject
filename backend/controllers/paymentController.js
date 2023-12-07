
const Product = require("../models/product");
const Order = require("../models/ordersModel");
const User = require("../models/user");
const stripe = require('stripe')('sk_test_51OJQvKAPl4YpXYxVfgVmncSENwXYfKKTRMxuJDGp64hxD8f4tqwjphj9z55fVxywGsWWU1XGGQnlIADsur22kO0W00Yg3nytwu');


const getSessionDetails = async (req, res) =>{
        try {
            const { sessionId } = req.params;

            const sessionData = await stripe.checkout.sessions.retrieve(sessionId);
        
            //const { metadata } = session;
        
            res.json({ success: true, sessionData });
          } catch (error) {
            console.error(error);
            throw new Error('Error fetching product count by category');
          }
        }
        

        const postPayment = async (req, res) =>{
      const  order  = req.body;
      const items = order.items;
      console.log("req.body", order);
      try {
          const lineItems = items.map(item => ({
              price_data: {
                  currency: "usd", 
                  product_data: {
                      name: item.product.title,
                      images: [item.product.image],
                  },
                  unit_amount: item.product.price * 100, 
              },
              quantity: item.quantity,
          }));
    
          const session = await stripe.checkout.sessions.create({
              payment_method_types: ["card"],
              line_items: lineItems,
              mode: "payment",
              success_url: `http://localhost:3000/success`,
              cancel_url: "http://localhost:3000/cancel",
              invoice_creation: {
                  enabled: true,
              },
              metadata: {
                  userId: order.userId,
                  cartId: order._id,
              },
          });
    
          // session.success_url = `http://localhost:3000/success/${session.id}`;
    
           console.log("session ", session);
           
    
          return res.json({ id: session.id });
      } catch (error) {
          console.error(error);
          res.status(500).json({ error: error });
      }
    }

module.exports = {getSessionDetails,postPayment};


