const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    items: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product', 
            required: true,
          },
          quantity: {
            type: Number,
            default: 1,
          },
        },
      ],
    status:{
        default : 0,
        type: Number,
    },
    deliveryFees: {
        type: Number,
    },
    taxes:{
        type: Number,
    },
    total: {
        type: Number,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('Cart', CartSchema);