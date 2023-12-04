import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductPage from './pages/ProductPage';
import OrderTracking from './pages/OrderTracking';
import StripePayment from './components/StripePayment';
import Success from './components/Success';
import Cancel from './components/Cancel';
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import Checkout from './checkout/Checkout';


function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<ProductPage/>} />
    <Route path="/track" element={<OrderTracking/>} />
    <Route path="/pay" element={<StripePayment/>}/>
    <Route path="/success" element={<Success />} /> 
    <Route path="/cancel" element={<Cancel />} /> 
    <Route path='/home' element={<Home/>}/>
    <Route path="/cart" element={<CartPage/>} />
    <Route path="/checkout" element={<Checkout/>} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
