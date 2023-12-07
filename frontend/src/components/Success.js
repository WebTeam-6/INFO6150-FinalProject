import React from "react";
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

function Success() {
  const navigate = useNavigate();
  const sessionId = localStorage.getItem('sessionId');
  console.log('Session ID:', sessionId);
  const getSessionDetailsUrl = `http://localhost:8000/payment/get-session-details/${sessionId}`;
  const addOrderUrl = `http://localhost:8000/orders/`;

  function viewOrders(){
    navigate('/orderHistory')
  }

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(getSessionDetailsUrl);
        const sessionDetails = response.data.sessionData;

        console.log("sessionDetails ", sessionDetails);
        console.log(sessionDetails)
        const { userId, cartId } = sessionDetails?.metadata;

        console.log("userId ", userId);
        console.log("cartId ", cartId);
           const addOrderReq = {
              "userId": userId,
              "cartId": cartId,
          }

          const addOrderResponse = await axios.post(addOrderUrl, addOrderReq);
          console.log("addOrderResponse ", addOrderResponse.data);
      } catch (error) {
        console.error('Error fetching session details:', error);
      }
    };

    fetchOrderDetails();
  }, []);
  return (
    <>
    <NavBar/>
       <div class="success-wrapper">
        <div class="success-card">
            <div class="success-content">
                <img 
                    src="https://funtura.in/lko/wp-content/themes/funtura/assets/images/success.svg"
                    alt="Success Illustration"
                />
                <h4>Your Payment is Successful</h4>
                <p>Thank you for the payment.</p>
                <p onClick={viewOrders} style={{color: 'blue', textDecoration: 'underline'}}>View Your Orders</p>
            </div>
        </div>
    </div>
    <Footer/>
    </>
  );
}

export default Success;
