import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import Checkout from './checkout/Checkout';


function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<ProductPage/>} />
    <Route path="/cart" element={<CartPage/>} />
    <Route path="/checkout" element={<Checkout/>} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
