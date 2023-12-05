var Router =require('express') ;
const router = Router();
const productController = require('../controllers/productController.js') ;

console.log("In product router");
router.post('/create', productController.create_product);
router.get('/getbyId/:productId', productController.get_product);
// router.delete('/delete', userController.deleteUser);
router.get('/get', productController.get_productsByFiltering);
router.get('/getAll', productController.get_AllProducts);
router.delete('/delete', productController.delete_user);

module.exports= router;