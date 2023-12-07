import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import PageNotFound from '../pages/PageNotFound';

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
          if(decodedToken.isAdmin == false){
            auth = true;
          }
          else{
            auth = false;
          }
        }
    }
    else{
        auth = false;
    }

    console.log(auth);

    return auth ? <Outlet /> : <PageNotFound/>;
}

export default PrivateRoutes;
