import React, { useState, useEffect } from 'react';
import '../styles/cartPage.css'
import { AppBar, Box, CssBaseline, useMediaQuery, useTheme } from '@mui/material';
import NavBar from '../components/NavBar';
import { jwtDecode } from 'jwt-decode'
import axios from 'axios';


function CartPage(){
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const drawerWidth = isMobile ? 200 : 280; 

    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NmQxNmU3MzM4MGRlYjM3Mjg4YWRkYiIsImlhdCI6MTcwMTY0ODM4MiwiZXhwIjoxNzAxNzM0NzgyfQ.bZa0mNKoY8KrvqHsulc-ppsNGStr8k4g1PpAMmZwo1Q');
    const token = localStorage.getItem('token');
    console.log("token", token);
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;
    const [cartData, setCartData] = useState();
    var getCartUrl = `http://localhost:8000/cart/getCart/${userId}`;


    useEffect(()=>{
        
        const getCartByUser = async() =>{
        try {
          console.log("getCartUrl ", getCartUrl);
          const cartDataResponse = await axios.post(getCartUrl);
          console.log("getCart response ", cartDataResponse.data);
          setCartData(cartDataResponse.data);
         } catch (error) {
            console.log(error.message);
          }
        }

        getCartByUser();
      },[])

    return(
        <>
        <Box sx={{ display: "flex"}}>
        <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`  ,backgroundColor: 'white',}}
      >
       <NavBar/>
       <section class="h-100 h-custom" id = "mainSection" >
    <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12">
            <div class="card card-registration card-registration-2">
            <div class="card-body p-0">
                <div class="row g-0">
                <div class="col-lg-8">
                    <div class="p-5">
                    <div class="d-flex justify-content-between align-items-center mb-5">
                        <h1 class="fw-bold mb-0 text-black">Shopping Cart</h1>
                        <h6 class="mb-0 text-muted">3 items</h6>
                    </div>
                    <hr class="my-4"></hr>

                    <div class="row mb-4 d-flex justify-content-between align-items-center">
                        <div class="col-md-2 col-lg-2 col-xl-2">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img5.webp"
                            class="img-fluid rounded-3" alt="Cotton T-shirt"></img>
                        </div>
                        <div class="col-md-3 col-lg-3 col-xl-3">
                        <h6 class="text-muted">Shirt</h6>
                        <h6 class="text-black mb-0">Cotton T-shirt</h6>
                        </div>
                        <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                        <button class="btn btn-link px-2"
                            onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                            <i class="fas fa-minus"></i>
                        </button>

                        <input id="form1" min="0" name="quantity" value="1" type="number"
                            class="form-control form-control-sm" />

                        <button class="btn btn-link px-2"
                            onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                            <i class="fas fa-plus"></i>
                        </button>
                        </div>
                        <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                        <h6 class="mb-0">€ 44.00</h6>
                        </div>
                        <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                        <a href="#!" class="text-muted"><i class="fas fa-times"></i></a>
                        </div>
                    </div>

                    <hr class="my-4"></hr>

                    <div class="row mb-4 d-flex justify-content-between align-items-center">
                        <div class="col-md-2 col-lg-2 col-xl-2">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img6.webp"
                            class="img-fluid rounded-3" alt="Cotton T-shirt"></img>
                        </div>
                        <div class="col-md-3 col-lg-3 col-xl-3">
                        <h6 class="text-muted">Shirt</h6>
                        <h6 class="text-black mb-0">Cotton T-shirt</h6>
                        </div>
                        <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                        <button class="btn btn-link px-2"
                            onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                            <i class="fas fa-minus"></i>
                        </button>

                        <input id="form1" min="0" name="quantity" value="1" type="number"
                            class="form-control form-control-sm" />

                        <button class="btn btn-link px-2"
                            onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                            <i class="fas fa-plus"></i>
                        </button>
                        </div>
                        <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                        <h6 class="mb-0">€ 44.00</h6>
                        </div>
                        <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                        <a href="#!" class="text-muted"><i class="fas fa-times"></i></a>
                        </div>
                    </div>

                    <hr class="my-4"></hr>

                    <div class="row mb-4 d-flex justify-content-between align-items-center">
                        <div class="col-md-2 col-lg-2 col-xl-2">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img7.webp"
                            class="img-fluid rounded-3" alt="Cotton T-shirt"></img>
                        </div>
                        <div class="col-md-3 col-lg-3 col-xl-3">
                        <h6 class="text-muted">Shirt</h6>
                        <h6 class="text-black mb-0">Cotton T-shirt</h6>
                        </div>
                        <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                        <button class="btn btn-link px-2"
                            onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                            <i class="fas fa-minus"></i>
                        </button>

                        <input id="form1" min="0" name="quantity" value="1" type="number"
                            class="form-control form-control-sm" />

                        <button class="btn btn-link px-2"
                            onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                            <i class="fas fa-plus"></i>
                        </button>
                        </div>
                        <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                        <h6 class="mb-0">€ 44.00</h6>
                        </div>
                        <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                        <a href="#!" class="text-muted"><i class="fas fa-times"></i></a>
                        </div>
                    </div>

                    <hr class="my-4"></hr>

                    <div class="pt-5">
                        <h6 class="mb-0"><a href="#!" class="text-body"><i
                            class="fas fa-long-arrow-alt-left me-2"></i>Back to shop</a></h6>
                    </div>
                    </div>
                </div>
                <div class="col-lg-4 bg-grey">
                    <div class="p-5">
                    <h3 class="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                    <hr class="my-4"></hr>

                    <div class="d-flex justify-content-between mb-4">
                        <h5 class="text-uppercase">items 3</h5>
                        <h5>€ 132.00</h5>
                    </div>

                    <h5 class="text-uppercase mb-3">Shipping</h5>

                    <div class="mb-4 pb-2">
                        <select class="select">
                        <option value="1">Standard-Delivery- €5.00</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                        <option value="4">Four</option>
                        </select>
                    </div>

                    <h5 class="text-uppercase mb-3">Give code</h5>

                    <div class="mb-5">
                        <div class="form-outline">
                        <input type="text" id="form3Examplea2" class="form-control form-control-lg" />
                        <label class="form-label" for="form3Examplea2">Enter your code</label>
                        </div>
                    </div>

                    <hr class="my-4"></hr>

                    <div class="d-flex justify-content-between mb-5">
                        <h5 class="text-uppercase">Total price</h5>
                        <h5>€ 137.00</h5>
                    </div>

                    <button type="button" class="btn btn-dark btn-block btn-lg"
                        data-mdb-ripple-color="dark">Register</button>

                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
    </section>    
       
       </AppBar>
 
</Box>
        </>
    );
}

export default CartPage;