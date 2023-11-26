var Router =require('express') ;
const router = Router();
const productController = require('../controllers/productController.js') ;

console.log("In router");
router.post('/create', productController.create_product);
// router.put('/edit', userController.editUser);
// router.delete('/delete', userController.deleteUser);
router.get('/get', productController.get_productsByFiltering);
router.get('/getAll', productController.get_AllProducts);

module.exports= router;