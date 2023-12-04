var dotenv = require('dotenv');
dotenv.config();
var express = require("express");
var app = express();
var mongoose = require("mongoose");
var cors = require('cors');
var  productRouter  = require('./routes/productRouter.js') ;
var userRouter = require('./routes/userRoute')
var bodyParser = require("body-parser");
const Stripe = require("stripe");
const stripe = Stripe('sk_test_51OJQvKAPl4YpXYxVfgVmncSENwXYfKKTRMxuJDGp64hxD8f4tqwjphj9z55fVxywGsWWU1XGGQnlIADsur22kO0W00Yg3nytwu')

// const uri = "mongodb+srv://" + process.env.DB_USERNAME  + ":" + process.env.DB_PASSWORD + "@cluster0.ql2dquw.mongodb.net/Shilpkala?retryWrites=true&w=majority";
const uri = "mongodb+srv://" + process.env.DB_USERNAME  + ":" + process.env.DB_PASSWORD + "@cluster0.ukrlfk9.mongodb.net/Shlipkala?retryWrites=true&w=majority";
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/user',userRouter);
app.use('/product', productRouter);

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
    const { product } = req.body;
  
    try {
     const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "inr",
              product_data: {
                name: product.name,
              },
              unit_amount: product.price * 100,
            },
            quantity: product.quantity,
          },
        ],
        mode: "payment",
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel",
        invoice_creation: {
            enabled: true,
          },
      });
      console.log(session);
      res.json({ id: session.id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  