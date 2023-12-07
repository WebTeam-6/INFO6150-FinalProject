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
      </div>
      </div>
    </>
  );
}

export default OrderHistory;
