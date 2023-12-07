const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    cartId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
        required: true,
    },
    status: {
        type: String,
        default: "Order Placed"
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
},
{timestamps: true}
)

module.exports = mongoose.model('orders', OrderSchema);