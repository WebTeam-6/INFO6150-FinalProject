import React, { useState } from "react";
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'


function Success() {
  const sessionId = localStorage.getItem('sessionId');
  console.log('Session ID:', sessionId);
  const getSessionDetailsUrl = `http://localhost:8000/payment/get-session-details/${sessionId}`;
  const addOrderUrl = `http://localhost:8000/orders/`

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
      <div className="card">
        <img 
          src="https://funtura.in/lko/wp-content/themes/funtura/assets/images/success.svg"
          alt="Success Illustration"
          style={{ maxWidth: '400px', height: 'auto' }}
        />
        <h4 style={{ textAlign: 'center', marginTop: '20px' }}>
          Thanks for your order!<br/>
          Your payment is successful.
          <br/>
          We appreciate your time!<br/>
          If you have any questions, please email us at<br/>
          <a href="mailto:orders@example.com">orders@example.com</a>.
        </h4>
      </div>
    </>
  );
}

export default Success;
