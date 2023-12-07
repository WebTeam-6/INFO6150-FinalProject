import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductPage from './pages/ProductPage';
import ProductDetailPage from './pages/ProductDetailPage';
import OrderTracking from './pages/OrderTracking';
import StripePayment from './components/StripePayment';
import Success from './components/Success';
import Cancel from './components/Cancel';
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import Checkout from './checkout/Checkout';
import Dashboard from './components/AdminNav';
import Admin from './components/Dashboard';
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';
import AddProductPage from './pages/AddProductPage';
import WishListPage from './pages/wishListPage';
import DashBoardPage from './pages/DashBoardPage';
import UpdateOrders from './pages/UpdateOrders';
import OrderHistory from './pages/OrderHistory';
import RegistrationPage from './pages/RegistrationPage';


function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/shop" element={<ProductPage/>} />
    <Route path="/product/:productId" element={<ProductDetailPage/>} />
    <Route path="/track/:orderStatus" element={<OrderTracking/>} />
    <Route path="/pay" element={<StripePayment/>}/>
    <Route path="/success" element={<Success />} /> 
    <Route path="/cancel" element={<Cancel />} /> 
    <Route path='/' element={<Home/>}/>
    <Route path="/login" element={<LoginScreen/>} />
    <Route path="/register" element={<RegistrationPage/>} />
    <Route path="/orderHistory" element={<OrderHistory/>} />
    <Route path="/cart" element={<CartPage/>} />
    <Route path="/checkout" element={<Checkout/>} />
    <Route path="/dashboard" element={<DashBoardPage/>} />
    <Route path="/addProduct" element={<AddProductPage/>} />
    <Route path="/wishlist" element={<WishListPage/>} />
    <Route path="/orderStatus" element={<UpdateOrders/>} />
    <Route path='/register' element={<RegistrationPage/>}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
