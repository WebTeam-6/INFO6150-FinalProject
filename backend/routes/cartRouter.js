var Router =require('express') ;
const router = Router();
const cartController = require('../controllers/cartController.js') ;

console.log("In cart router");
router.post('/addToCart', cartController.addToCart);
router.post('/getCart/:userId', cartController.getCart);
router.post('/modifyProduct', cartController.modifyCartProduct);

module.exports= router;