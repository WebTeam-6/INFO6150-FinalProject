import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { jwtDecode } from 'jwt-decode';
import { AppBar, Box, CssBaseline, useMediaQuery, useTheme } from '@mui/material';
import axios from 'axios';


function OrderHistory(){
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const drawerWidth = isMobile ? 200 : 280; 

    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NmVkYzkyZTdhZGQ0YTgzYzY3YzRhMiIsImlhdCI6MTcwMTc2NDI0MiwiZXhwIjoxNzA0MzU2MjQyfQ.LtsnYHs3kQutBLNVFXveQ2yunnkRPRIbpoBFkvZwmmc');
    const token = localStorage.getItem('token') || ''; 
    console.log("token", token);
    const decodedToken = jwtDecode(token);
    // const userId = decodedToken.id;
    const userId = '656f27613cf32a8b077215d6';
    console.log("userId ", userId);


    const [orderData, setOrderData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    var getMyOrderUrl = `http://localhost:8000/orders/myOrders/${userId}`;
    console.log("The url is"+getMyOrderUrl);

    
  useEffect(()=>{
        
    const getOrdersByUser = async() =>{
    try {
     
      const orderDataResponse = await axios.get(getMyOrderUrl);
      console.log("getMyOrders response ", orderDataResponse.data);
      setOrderData(orderDataResponse.data);
      console.log("final order data ",orderData);
      setLoading(false);
     } catch (error) {
        console.log(error.message);
        setError(error.message);
        setLoading(false);
      }
    };

    getOrdersByUser();
    // console.log("the length "+orderData);
  },[])

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     try {
//       setLoadingUpdate(true);

//       // Simulate updating user details through an API
//       const response = await fetch(`/api/users/${userId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ name, email }),
//       });

//       const data = await response.json();

//       if (data.success) {
//         setSuccessUpdate(true);
//         Navigate('/');
//       } else {
//         setErrorUpdate(data.message);
//       }
//     } catch (error) {
//       setErrorUpdate('Error updating user details');
//     } finally {
//       setLoadingUpdate(false);
//     }
//   };

return(
    <>
   <NavBar/>
<div className="cart-container">
  <h2>My Orders</h2>
  { orderData?.length  === 0  ? (
    <div className="cart-empty">
      <p>Your order history is empty.</p>
      <div className="start-shopping">
        <Link to="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-arrow-left"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
            />
          </svg>
          <span>Start Shopping</span>
        </Link>
      </div>
    </div>
  ) : (
    <div>
      <div className="titles">
        {/* <h3 className="order-title">Order</h3> */}
        <h3 className="Product-title">Product</h3>
        <h3 className="price">Price</h3>
        <h3 className="quantity">Quantity</h3>
        <h3 className="total">Total</h3>
      </div>
      <div className="order-items">
  {orderData &&
    orderData?.map((order) => (
      <>
        {order.cartId?.items?.map((cartItem) => (
          <div className="cart-item" key={cartItem.productId}>
            <div className="cart-product">
              <img src={cartItem.product.image} alt={cartItem.product.title} />
              <div>
                <h3>{cartItem.product.title}</h3>
                {/* <p>{cartItem.productId.description}</p> */}
                {/* <button onClick={() => handlemodifyProdFromCart(cartItem._id, 'remove')}>Remove</button> */}
              </div>
            </div>
            <div className="cart-product-price">${cartItem.product.price}</div>
            <div className="cart-product-quantity">
              {/* <button onClick={() => handlemodifyProdFromCart(cartItem._id, 'decrease')}>
                -
              </button> */}
              <div className="count">{cartItem.quantity}</div>
              {/* <button onClick={() => handlemodifyProdFromCart(cartItem._id, 'increase')}>+</button> */}
              {/* <button >+</button> */}
            </div>
            <div className="cart-product-total-price">
              ${cartItem.product.price * cartItem.quantity}
            </div>
          </div>
        ))}
        <div className="cart-summary">
          {/* <button className="clear-btn" onClick={() => handleClearCart()}> */}
          {/* <button className="clear-btn">
            Clear Cart
          </button> */}
          <div className="cart-checkout">
            <div className="taxes">
              <span>Taxes</span>
              <span>${order.taxes}</span>
            </div>
            <div className="deliveryfees">
              <span>Delivery Fees</span>
              <span>${order.deliveryFees}</span>
            </div>
            <div className="subtotal">
              <span>Subtotal</span>
              <span className="amount">${order.total + order.deliveryFees + order.taxes}</span>
            </div>
          </div>
        </div>
      </>
    ))}
</div>

            <div className="continue-shopping">
                 <Link to="/">
                   <svg
                     xmlns="http://www.w3.org/2000/svg"
                     width="20"
                     height="20"
                     fill="currentColor"
                     className="bi bi-arrow-left"
                     viewBox="0 0 16 16"
                   >
                     <path
                       fillRule="evenodd"
                       d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                     />
                   </svg>
                   <span>Continue Shopping</span>
                 </Link>
               </div>
        </div>
       
    
  )}
</div>
    </>
);
};

export default OrderHistory;
