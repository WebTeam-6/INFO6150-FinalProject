const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        // required: true
    },
    category: {
        type: Array,
    },
    color:{
        type: Array,
    },
    price: {
        type: Number,
        required: true
    },
    owner:{
        type: String,
    },
    averageRating: {
        type: Number,
        min: 0,
        max:5,
        // required: true
    },
    reviews: { 
        type: Array, //array of ratings(number) and reviews(string)
    },
    wishlist : {
        type: Array,
        default: []
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);