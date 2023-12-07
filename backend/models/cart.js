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
          required: true,
          default: 1,
        },
        product: {
          type: Object,
        },
      },
      ],
    status:{
        default : 0,
        type: Number,
    },
    deliveryFees: {
        default : 0,
        type: Number,
    },
    taxes:{
      default : 0,
        type: Number,
    },
    total: {
      default : 0,
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