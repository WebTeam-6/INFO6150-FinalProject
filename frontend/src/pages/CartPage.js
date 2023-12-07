import React, { useState, useEffect } from 'react';
import '../styles/cartPage.css'
import {useMediaQuery, useTheme } from '@mui/material';
import NavBar from '../components/NavBar';
import { jwtDecode } from 'jwt-decode'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { loadStripe } from "@stripe/stripe-js";


function CartPage(){
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const drawerWidth = isMobile ? 200 : 280; 

    //localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NmYyNzYxM2NmMzJhOGIwNzcyMTVkNiIsImlhdCI6MTcwMTc4NDQyOSwiZXhwIjoxNzA0Mzc2NDI5fQ.kzptTAPhYLTqjxsdibF8vDK9b5eQ9Wp19Dht9tO7ChY');
    const token = localStorage.getItem('token');
    console.log("token", token);
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;
    console.log("userId ", userId);
    const [cartData, setCartData] = useState([]);
    const [cartAltered, setCartAltered] = useState(false);
    var getCartUrl = `http://localhost:8000/cart/getCart/${userId}`;
   // var deleteProdFromCartUrl = `http://localhost:8000/cart/deleteProduct?userId=${userId}`;
    const [modifyProdFromCartUrl, setModifyProdFromCartUrl] = useState(
      `http://localhost:8000/cart/modifyProduct?userId=${userId}`
    );


    useEffect(()=>{
        
        const getCartByUser = async() =>{
        try {
          //console.log("getCartUrl ", getCartUrl);
          const cartDataResponse = await axios.get(getCartUrl);
          console.log("getCart response ", cartDataResponse.data);
          setCartData(cartDataResponse.data);
          console.log("getCartByUser cartData ", cartData);
         } catch (error) {
            console.log(error.message);
          }
        }

        getCartByUser();
      },[cartAltered])
      
      const handlemodifyProdFromCart = async(prodCartId, action) => {
        try {
            const url = `${modifyProdFromCartUrl}&prodCartId=${prodCartId}&action=${action}`;
            console.log("deleteProdFromCartUrl ", url);
            const cartDataResponse = await axios.post(url);
            console.log("getCart response ", cartDataResponse.data.cart);
            if (cartDataResponse.status === 200) {
              setCartData(cartDataResponse.data.cart);
              setCartAltered(!cartAltered);
            } else {
              console.error('Failed to remove product from cart');
            }
            console.log("cartData ", cartData);
            
           } catch (error) {
              console.log(error.message);
            }
      };

      // const handleAlterProductQuantity = async(prodCartId, addQuantity) => {
      //   try {
      //       const url = `${deleteProdFromCartUrl}&prodCartId=${prodCartId}&add=${addQuantity}`;
      //       console.log("deleteProdFromCartUrl ", url);
      //       const cartDataResponse = await axios.delete(url);
      //       console.log("getCart response ", cartDataResponse.data);
      //       if (cartDataResponse.status === 200) {
      //         setCartData(cartDataResponse.data.items);
      //         setCartAltered(!cartAltered);
      //       } else {
      //         console.error('Failed to remove product from cart');
      //       }
      //       console.log("cartData ", cartData);
      //      } catch (error) {
      //         console.log(error.message);
      //       }
      // };

      async function payment(){
        console.log(cartData)
        const stripe = await loadStripe("pk_test_51OJQvKAPl4YpXYxVSr574FTvLGc2z0tjGI3sduAAU3uGJM1udasMYr5uSOcLr1HegsI6wb9NoXjft3UQ0NNWgAqr00hWz5S9SX");
  const body = { cartData };

  const headers = {
    "Content-Type": "application/json",
  };

  const response = await fetch(
    "http://localhost:8000/api/create-checkout-session",
    {
      method: "POST",
      headers: headers,
      body: JSON.stringify(cartData),
    }
  );

  const session = await response.json();
  localStorage.setItem("sessionId", session.id);

  const result = stripe.redirectToCheckout({
    sessionId: session.id
  });

  console.log("result ", result);

  if (result.error) {
    console.log(result.error);
  }
      }
      

    return(
        <>
       <NavBar/>
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cartData.length===0 || cartData.items?.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is currently empty</p>
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
            <h3 className="product-title">Product</h3>
            <h3 className="price">Price</h3>
            <h3 className="quantity">Quantity</h3>
            <h3 className="total">Total</h3>
          </div>
          <div className="cart-items">
            {cartData &&
              cartData.items?.map((cartItem) => (
                <div className="cart-item" key={cartItem._id}>
                  <div className="cart-product">
                    <img src={cartItem.product.image} alt={cartItem.product.title} />
                    <div>
                      <h3>{cartItem.product.title}</h3>
                      {/* <p>{cartItem.productId.description}</p> */}
                      <button onClick={() => handlemodifyProdFromCart(cartItem._id, 'remove')}>Remove</button>
                    </div>
                  </div>
                  <div className="cart-product-price">${cartItem.product.price}</div>
                  <div className="cart-product-quantity">
                    <button onClick={() => handlemodifyProdFromCart(cartItem._id, 'decrease')}>
                      -
                    </button>
                    <div className="count">{cartItem.quantity}</div>
                    <button onClick={() => handlemodifyProdFromCart(cartItem._id, 'increase')}>+</button>
                    {/* <button >+</button> */}
                  </div>
                  <div className="cart-product-total-price">
                    ${cartItem.product.price * cartItem.quantity}
                  </div>
                </div>
              ))}
          </div>
          <div className="cart-summary">
            {/* <button className="clear-btn" onClick={() => handleClearCart()}> */}
            {/* <button className="clear-btn">
              Clear Cart
            </button> */}
             <div className="continue-shopping">
                <Link to="/shop">
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
            <div className="cart-checkout">
              <div className="taxes">
              <span>Taxes</span>
              <span>${cartData.taxes}</span>
              </div>
              <div className="deliveryfees">
              <span>Delivery Fees</span>
              <span>${cartData.deliveryFees}</span>
              </div>
              <div className="subtotal">
                <span>Subtotal</span>
                <span className="amount">${cartData.total + cartData.deliveryFees + cartData.taxes}</span>
              </div>
              {/* <p>Taxes and shipping calculated at checkout</p> */}
              {/* {auth._id ? ( */}
                <button onClick={()=>payment()}>Check out</button>
              {/* ) : (
                <button
                  className="cart-login"
                  onClick={() => navigate("/login")}
                >
                  Login to Check out
                </button>
              ) */}
              {/* } */}
{/* 
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
              </div> */}
            </div>
          </div>
        </div>
      )}
    </div>
    <Footer/>
        </>
    );
}

export default CartPage;