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

// const uri = "mongodb+srv://" + process.env.DB_USERNAME  + ":" + process.env.DB_PASSWORD + "@cluster0.ql2dquw.mongodb.net/Shilpkala?retryWrites=true&w=majority";
const uri = "mongodb+srv://" + process.env.DB_USERNAME  + ":" + process.env.DB_PASSWORD + "@cluster0.ukrlfk9.mongodb.net/Shlipkala?retryWrites=true&w=majority";
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/user',userRouter);
app.use('/product', productRouter);
app.use('/orders',orderRoute)

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
