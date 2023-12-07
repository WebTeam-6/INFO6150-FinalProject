import { AiOutlineHeart } from "react-icons/ai";
import { BiShoppingBag } from "react-icons/bi";
import ReactImageGallery from "react-image-gallery";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import '../styles/productDetailPage.css';
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import Reviews from "../components/Reviews";
import NavBar from "../components/NavBar";
import { jwtDecode } from "jwt-decode";
import Footer from '../components/Footer';


function ProductDetailPage(){

    const {productId} = useParams();
    console.log("productId", productId);
    const getProductByIdUrl=`http://localhost:8000/product/getbyId/${productId}`;
    const addToCartUrl = `http://localhost:8000/cart/addToCart`;
    const [productDetails, setProdDetails] = useState([]);
    const [prodQuantity, setProdQuantity]=useState(1);

    //localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NmYyNzYxM2NmMzJhOGIwNzcyMTVkNiIsImlhdCI6MTcwMTc4NDQyOSwiZXhwIjoxNzA0Mzc2NDI5fQ.kzptTAPhYLTqjxsdibF8vDK9b5eQ9Wp19Dht9tO7ChY');
    const token = localStorage.getItem('token');
    console.log("token", token);
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;
    console.log("userId ", userId);
  
    const handleAddToCart = async() =>{

        const req = {
            "userId": userId,
            "productId": productId,
            "quantity": prodQuantity
        }
        if(prodQuantity <=0){
            alert('Minimum product quantity should be 1');
        }else{
            const response = await axios.post(addToCartUrl, req);

            console.log("addToCart response ", response.data);
        }

    }

    useEffect(()=>{
        
        const getProdById = async() =>{
            console.log("in use effect");
        try {
            console.log("getProductByIdUrl ", getProductByIdUrl);
          const prodDetailResponse = await axios.get(getProductByIdUrl);
          console.log("prodDetailResponse ", prodDetailResponse.data.product.reviews.length);
          setProdDetails(prodDetailResponse.data.product);
        //   console.log("productDetails ", productDetails);
         } catch (error) {
            console.log(error.message);
          }
        }

        getProdById();
      },[])

    
    // const plusMinusButton =
    // "flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500";
    return(
    <>
    <NavBar/>
   <section className="mainSection">
    <div  id="prodImage">
        <img src={productDetails.image}>
        </img>
    </div>
      {/* <div className="mx-auto px-5 lg:px-5 prodDesc"> */}
      <div id="prodDesc">
        <h2 className="pt-3 text-2xl font-bold lg:pt-0">
          {productDetails.title}
        </h2>
        <div className="mt-1">
          <div className="flex items-center">
            <Rater
              style={{ fontSize: "20px" }}
              total={5}
              interactive={false}
              rating={productDetails.averageRating}
            />

            <p className="ml-3 text-sm text-gray-400">
              ({productDetails.reviews?.length})
            </p>
          </div>
        </div>
        <p className="mt-5 font-bold">
          {/* Availability:{" "}
          {productDetailItem.availability ? ( */}
            <span className="text-green-600">In Stock </span>
        {/* //   ) : (
        //     <span className="text-red-600">Expired</span>
        //   )} */}
        </p>
        {/* <p className="font-bold">
          Brand: <span className="font-normal">{productDetailItem.brand}</span>
        </p> */}
        <p >
          <span style={{fontWeight:"500"}}>Category:{" "}</span>
          <span className="font-normal">{productDetails.category}</span>
        </p>
        {/* <p className="font-bold">
          SKU: <span className="font-normal">{productDetailItem.sku}</span>
        </p> */}
        <p id="prodPrice" className="mt-4 text-4xl">
          ${productDetails.price}
        </p>
        <p className="pt-1 text-sm leading-5 text-gray-500">
          {productDetails.description}
        </p>
        {/* <div className="mt-6">
          <p className="pb-2 text-xs text-gray-500">Size</p>
          <div className="flex gap-1">
            {productDetails.size.map((x, index) => {
              return (
                <div
                  key={index}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500"
                >
                  {x}
                </div>
              );
            })}
          </div>
        </div> */}
        <div className="mt-6">
          <p className="pb-2 text-xs text-gray-500">Color</p>
          <div className="flex gap-1">
            {productDetails.color?.map((x, index) => {
              return (
                <div
                  key={index}
                  className={`h-8 w-8 cursor-pointer border border-white bg-${x}-600 focus:ring-2 focus:ring-${x}-500 active:ring-2 active:ring-${x}-500`}
                />
              );
            })}
          </div>
        </div>
        <div className="mt-6">
          <p className="pb-2 text-xs text-gray-500">Quantity</p>
          <div className="alterQuantityBtnGrp">
            {/* <button className={`${plusMinusButton}`}>−</button> */}
            <button class="incDecBtn" 
           onClick={()=>setProdQuantity(prevQuantity => prevQuantity>0?prevQuantity-1:0)} 
            >−</button>
            <div style={{marginRight:"10px"}}>
              {prodQuantity}
            </div>
            <button class="incDecBtn" onClick={()=>setProdQuantity(prevQuantity => prevQuantity+1)}> +</button>
          </div>
        </div>
        <div className="mt-7 flex flex-row items-center gap-6">
          {/* <button className="flex h-12 w-1/3 items-center justify-center bg-violet-900 text-white duration-100 hover:bg-blue-800"> */}
            <button id="addToCartBtn" onClick={handleAddToCart}>
            <BiShoppingBag className="mx-2" />
            Add to cart
          </button>
          {/* <button className="flex h-12 w-1/3 items-center justify-center bg-amber-400 duration-100 hover:bg-yellow-300"> */}
        </div>
      </div>
    </section>

    {productDetails?.reviews?.length !==0 ? ( <div>
        <Reviews reviews={productDetails.reviews} />
    </div>) :<></>}
    <Footer/>
    </>
    );
}

export default ProductDetailPage;