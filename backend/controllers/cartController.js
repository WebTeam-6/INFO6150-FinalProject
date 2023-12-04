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
  },

  async modifyCartProduct(req, res){
    try{
      const { userId, prodCartId, action } = req.query;
      const cart = await Cart.findOne({ userId });
  
      if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });
      }
  
      const cartItem = cart.items.find(item => item._id.equals(prodCartId));
  
      if (!cartItem) {
        return res.status(404).json({ error: 'Product not found in the cart' });
      }
  
      switch (action) {
        case 'increase':
          cartItem.quantity += 1;
          break;
        case 'decrease':
          cartItem.quantity = Math.max(cartItem.quantity - 1, 0);
          if(cartItem.quantity <= 0){
            cart.items = cart.items.filter(item => !item._id.equals(prodCartId));
          }
          break;
        case 'remove':
         
          cart.items = cart.items.filter(item => !item._id.equals(prodCartId));
          break;
        default:
          return res.status(400).json({ error: 'Invalid action' });
      }
  
      await cart.save();
  
      res.status(200).json({ success: true, items: cart.items });
    }catch(error){
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

};

  module.exports = CartController;