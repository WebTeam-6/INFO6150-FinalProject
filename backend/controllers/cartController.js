const Cart = require('../models/cart');

const CartController = {

  async addToCart(req, res){
  try {
    const { userId, productId, quantity } = req.body;
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      newCart = new Cart({ userId, items: [{ productId, quantity }] });
      await newCart.save();
      return res.json(newCart);
    }

    const existingItem = cart.items.find(item => item.productId.equals(productId));

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    return res.json(cart);
  } catch (error) {
    console.error(error);
    throw new Error('Error adding item to cart');
  }
},

  async getCart (req, res) {
    try {
        const userId = req.params.userId;
        const cart = await Cart.findOne({ userId }).populate('items.productId');
    
        if (!cart) {
          return res.status(404).json({ error: 'Cart not found' });
        }
    
        res.json(cart);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
  }
};

  module.exports = CartController;