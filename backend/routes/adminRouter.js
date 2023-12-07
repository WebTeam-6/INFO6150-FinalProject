var Router =require('express') ;
const router = Router();
const dashboardController = require('../controllers/dashboardController.js') ;

console.log("In admin router");
router.get('/dashboard/getProductsByCategory', dashboardController.getProductsByCategory);
router.get('/dashboard/getTotalOrders', dashboardController.getTotalNoOfOrders);
router.get('/dashboard/getTotalNoOfCustomers', dashboardController.getTotalNoOfCustomers);
router.get('/dashboard/getTotalAverageRatings', dashboardController.getTotalAverageRatings);
router.get('/dashboard/getOrdersByDay', dashboardController.getOrdersByDay);
router.get('/dashboard/getTotalProducts', dashboardController.getTotalProducts);

module.exports= router;