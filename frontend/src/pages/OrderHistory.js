import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { jwtDecode } from "jwt-decode";
import {
  AppBar,
  Box,
  CssBaseline,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import axios from "axios";

function OrderHistory() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const drawerWidth = isMobile ? 200 : 280;

  const token = localStorage.getItem("token");
  console.log("token", token);
  const decodedToken = jwtDecode(token);
  // const userId = decodedToken.id;
  const userId = decodedToken.id;
  console.log("userId ", userId);

  const [orderData, setOrderData] = useState([]);
  const [error, setError] = useState("");

  var getMyOrderUrl = `http://localhost:8000/orders/myOrders/${userId}`;
  console.log("The url is" + getMyOrderUrl);

  useEffect(() => {
    const getOrdersByUser = async () => {
      try {
        const orderDataResponse = await axios.get(getMyOrderUrl);
        setOrderData(orderDataResponse.data);
        console.log("orderDataResponse.data ", orderDataResponse.data);
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      }
    };

    getOrdersByUser();
  }, []);


  const handleTrackOrder = (status) =>{
    navigate(`/track/${status}`);
  }


  return (
    <>
      <NavBar />
      <div className="wrapp">
      <h2 style={{textAlign: "center"}}>Order History</h2>
      {orderData.length===0 ? (
        <div className="cart-empty">
          <p>You have not placed any orders</p>
          <div className="start-shopping">
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
              <span>Start Shopping</span>
            </Link>
          </div>
        </div>
      ) : (
      <div className="history-cards">
        {orderData &&
          orderData?.map((order) => (
            <>
            <div className="history-card">
            <div className="history-card2">
              {order.cartId?.items?.map((cartItem) => (
                <>
                
                <div className="history">
                    <div className="history-items">
                    <div className="item-image">
                        <img
                          src={cartItem.product.image}
                          alt={cartItem.product.title}
                        />
                      </div>
                  <div className="titlePrice">
                  <div className="item">
                        <h3>{cartItem.product.title}</h3>
                      </div>
                  <div className="Total">
                      {/* <h4>Total</h4> */}
                      <p> ${cartItem.product.price * cartItem.quantity}</p>
                    </div>  
                  </div>


                    </div>  
               </div>
                
                
                </>
              )
              
              
              
              )}
              
              </div>
              <div className="history2">
                  <div className="orderPrice">
                      <h6>Total Price</h6> 
                      <p> ${order.cartId?.total + order.cartId?.taxes + order.cartId?.deliveryFees }</p>
                    </div>  
                  </div>
                  <div>
                    <button id="trackBtn" onClick={() =>handleTrackOrder(order.status)} >Track Your Order</button>
                  </div>
              </div>
            </>
          ))}
      </div>)}
      </div>
    </>
  );
}

export default OrderHistory;
