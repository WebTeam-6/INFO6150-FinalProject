const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    cartId:{
        type: String,
    },
    status: {
        type: String,
        default: "order placed"
    }
})

module.exports = mongoose.model('orders', OrderSchema);