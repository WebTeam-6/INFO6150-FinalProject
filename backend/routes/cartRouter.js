var Router =require('express') ;
const router = Router();
const cartController = require('../controllers/cartController.js') ;

console.log("In cart router");
router.post('/addToCart', cartController.addToCart);
router.get('/getCart/:userId', cartController.getCart);
router.post('/modifyProduct', cartController.modifyCartProduct);
router.get('/',cartController.getAllCarts);

module.exports= router;