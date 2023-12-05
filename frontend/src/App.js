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
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';


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
    <Route path="/cart" element={<CartPage/>} />
    <Route path="/checkout" element={<Checkout/>} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
