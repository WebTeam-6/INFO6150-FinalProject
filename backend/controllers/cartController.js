const Cart = require('../models/cart');
const Product = require('../models/product');

const CartController = {

  async addToCart(req, res){
  try {
    console.log("addToCart ", req.body);
    const { userId, productId, quantity } = req.body;
    let cart = await Cart.findOne({ userId, status: 0, });
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (!cart) {

      newCart = new Cart({ userId, 
                          items: [{ 
                            productId: product._id,
                            product, 
                            quantity 
                          }],
                            total: 0,
                            taxes: 0,
                            deliveryFees: 0, 
                            status:0
                          });
      newCart.total = calculateTotalPrice(newCart);
      console.log("totalPrice ", newCart.total);
      newCart.taxes = calculateTaxes(newCart.total);
      console.log("taxes ", newCart.taxes);
      newCart.deliveryFees = calculateDeliveryFees(newCart.total);
      console.log("deliveryFees ", newCart.deliveryFees);

      await newCart.save();
      return res.json(newCart);
    }

    const existingItem = cart.items.find(item => item.productId.equals(productId));

    if (existingItem) {
      existingItem.quantity += quantity;
      console.log("existingItem.quantity ", existingItem.quantity);
    } else {
      cart.items.push({ 
        productId: product._id,
        product, 
        quantity 
      });
    }
    console.log("cart ", cart);
    // console.log("total ", cart.total);
    cart.total = calculateTotalPrice(cart);
    console.log("totalPrice ", cart.total);
    cart.taxes = calculateTaxes(cart.total);
    console.log("taxes ", cart.taxes);
    cart.deliveryFees = calculateDeliveryFees(cart.total);
    console.log("deliveryFees ", cart.deliveryFees);


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
        const cart = await Cart.findOne({
          userId,
          status: 0,
        }).populate('items.product');
    
        if (!cart) {
          return res.status(404).json({ error: 'Cart not found' });
        }
    
        res.json(cart);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
  },

  async  getAllCarts(req,res){
    try{
      const orders = await Cart.find();
      return res.status(200).json(orders);
    }
    catch(error){
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  async modifyCartProduct(req, res){
    try{
      const { userId, prodCartId, action } = req.query;
      const cart = await Cart.findOne({ userId, status: 0, });
  
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

      cart.total = calculateTotalPrice(cart);
      console.log("totalPrice ", cart.total);
      cart.taxes = calculateTaxes(cart.total);
      console.log("taxes ", cart.taxes);
      cart.deliveryFees = calculateDeliveryFees(cart.total);
      console.log("deliveryFees ", cart.deliveryFees);
  
      await cart.save();
  
      res.status(200).json({ success: true, cart: cart });
    }catch(error){
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // async updateCartStatus (req, res){

  // }

};

const calculateTotalPrice = (cart) => {
  cart.total=0;
  cart.items.map((item)=>{
    cart.total += item.product.price * item.quantity
 })
 return cart.total;
};

const calculateTaxes = (total) => {
  return Math.round(0.1 * total * 100)/100; 
};


const calculateDeliveryFees = (total) => {
  return total >= 35 ? 0 : 5; 
};

module.exports = CartController;