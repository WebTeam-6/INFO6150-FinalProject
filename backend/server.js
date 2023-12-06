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

// app.post("/api/create-checkout-session", async (req, res) => {
//     const items = req.body.items;
//     console.log(items)
//     try {
//         const lineItems = items.map(product =>({
//             price_data: {
//                 currency: "usd", 
//                 product_data: {
//                     name: product.title,
//                 },
//                 unit_amount: product.price 
//             },
//             quantity: product.quantity,
//         }
//         ));

//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ["card"],
//             line_items: lineItems,
//             mode: "payment",
//             success_url: "http://localhost:3000/success",
//             cancel_url: "http://localhost:3000/cancel",
//             invoice_creation: {
//                 enabled: true,
//             },
//         });

//         console.log(session);
//         res.json({ id: session.id });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

app.post("/api/create-checkout-session", async (req, res) => {
    const  order  = req.body;
    const items = order.items;

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
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel",
            invoice_creation: {
                enabled: true,
            }
        });

        console.log(session);
        res.json({ id: session.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
