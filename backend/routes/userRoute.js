var express =require('express') ;
const router = express.Router();
const  UserController  = require('../controllers/userController');

console.log("in router");

// router.get('/', UserController.get_users);
router.get('/getAll', UserController.get_users);
router.post('/register', UserController.create_user);
router.post('/login', UserController.login_user);
router.put('/update/:id', UserController.update_user);
router.put('/forgotPassword/:id', UserController.update_password);

module.exports = router;