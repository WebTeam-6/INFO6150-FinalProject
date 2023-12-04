import React from "react";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

function Success() {
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
