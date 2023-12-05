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
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
},
{timestamps: true}
)

module.exports = mongoose.model('orders', OrderSchema);