import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductPage from './pages/ProductPage';
import OrderTracking from './pages/OrderTracking';
import StripePayment from './components/StripePayment';
import Success from './components/Success';
import Cancel from './components/Cancel';
import Home from './pages/Home';


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
    </Routes>
  </BrowserRouter>
  );
}

export default App;
