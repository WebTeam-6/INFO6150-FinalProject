const Cart = require('../models/cart');

const addToCart = async (userId, productId, quantity = 1) => {
  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find(item => item.productId.equals(productId));

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    return cart;
  } catch (error) {
    console.error(error);
    throw new Error('Error adding item to cart');
  }
};