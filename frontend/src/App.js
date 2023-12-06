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
import Dashboard from './components/Dashboard';
import Admin from './components/Admin';
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';
import AddProductPage from './pages/AddProductPage';
import OrderHistory from './pages/OrderHistory';


function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<ProductPage/>} />
    <Route path="/product/:productId" element={<ProductDetailPage/>} />
    <Route path="/track" element={<OrderTracking/>} />
    <Route path="/pay" element={<StripePayment/>}/>
    <Route path="/success" element={<Success />} /> 
    <Route path="/cancel" element={<Cancel />} /> 
    <Route path='/home' element={<Home/>}/>
    <Route path="/login" element={<LoginScreen/>} />
    <Route path="/register" element={<RegisterScreen/>} />
    <Route path="/orderHistory" element={<OrderHistory/>} />
    <Route path="/cart" element={<CartPage/>} />
    <Route path="/checkout" element={<Checkout/>} />
    <Route path="/dashboard" element={<Admin/>} />
    <Route path="/addProduct" element={<AddProductPage/>} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
