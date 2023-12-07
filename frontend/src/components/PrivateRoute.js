import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const PrivateRoutes = () => {
    const token = localStorage.getItem('token');
    let auth = false;

    console.log(token);

    if (token) {
        const decodedToken = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        console.log(decodedToken.exp)
        if (decodedToken.exp < currentTime) {
          auth = false;
        }
        else{
          auth = true;
        }
    }
    else{
        auth = false;
    }

    console.log(auth);

    return auth ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;
