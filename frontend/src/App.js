import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import OrderTracking from "./pages/OrderTracking";
import Success from "./components/Success";
import Cancel from "./components/Cancel";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import Checkout from "./checkout/Checkout";
import LoginScreen from "./pages/LoginScreen";
import AddProductPage from "./pages/AddProductPage";
import WishListPage from "./pages/wishListPage";
import DashBoardPage from "./pages/DashBoardPage";
import UpdateOrders from "./pages/UpdateOrders";
import OrderHistory from "./pages/OrderHistory";
import RegistrationPage from "./pages/RegistrationPage";
import PrivateRoutes from "./components/PrivateRoute";
import ProtectedRoutes from "./components/ProtectedRoute";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/shop" element={<ProductPage />} />
          <Route path="/shop/product/:productId" element={<ProductDetailPage />} />
          <Route path="/track/:orderStatus" element={<OrderTracking />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="/orderHistory" element={<OrderHistory />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/wishlist" element={<WishListPage />} />
          <Route path="/register" element={<RegistrationPage />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<DashBoardPage />} />
          <Route path="/addProduct" element={<AddProductPage />} />
          <Route path="/orderStatus" element={<UpdateOrders />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
