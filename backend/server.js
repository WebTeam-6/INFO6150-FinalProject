var dotenv = require('dotenv');
dotenv.config();
var express = require("express");
var app = express();
var mongoose = require("mongoose");
var cors = require('cors');
var  productRouter  = require('./routes/productRouter.js') ;
var userRouter = require('./routes/userRoute')
var orderRoute = require('./routes/orderRoute.js')
var bodyParser = require("body-parser");
var cartRouter = require('./routes/cartRouter.js')
var adminRouter = require('./routes/adminRouter.js')
var paymentRouter = require('./routes/paymentRouter.js')
const orderController = require('./controllers/orderController.js');
const Stripe = require("stripe");
const stripe = Stripe('sk_test_51OJQvKAPl4YpXYxVfgVmncSENwXYfKKTRMxuJDGp64hxD8f4tqwjphj9z55fVxywGsWWU1XGGQnlIADsur22kO0W00Yg3nytwu')

// const uri = "mongodb+srv://" + process.env.DB_USERNAME  + ":" + process.env.DB_PASSWORD + "@cluster0.ql2dquw.mongodb.net/Shilpkala?retryWrites=true&w=majority";
const uri = "mongodb+srv://" + process.env.DB_USERNAME  + ":" + process.env.DB_PASSWORD + "@cluster0.ukrlfk9.mongodb.net/Shlipkala?retryWrites=true&w=majority";
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/user',userRouter);
app.use('/product', productRouter);
app.use('/orders',orderRoute);
app.use('/cart',cartRouter);
app.use('/admin',adminRouter);
app.use('/payment',paymentRouter);

async function connect(){
    try{
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    }
    catch(error){
        console.log(error);
    }
}

connect();

app.listen(8000,()=>{
    console.log("Server running");
})

app.post("/api/create-checkout-session", async (req, res) => {
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

    
});


// app.post("/webhook", async (req, res) => {
//     const sig = req.headers["stripe-signature"];
  
//     let event;
  
//     try {
//       event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
//     } catch (err) {
//       return res.status(400).send(`Webhook Error: ${err.message}`);
//     }
  
//     // Handle the event
//     if (event.type === "checkout.session.completed") {
//       const session = event.data.object;
//         console.log("payment successful ");
//       // Update your order status or perform other actions here
//       const addOrderReq = {
//         userId: session.metadata.userId,
//         cartId: session.metadata.cartId,
//       };
  
//       await orderController.AddOrder(addOrderReq);
//     }
  
//     res.json({ received: true });
//   });