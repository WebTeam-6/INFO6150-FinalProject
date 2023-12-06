import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import '../Products/Product.css'
import Card from "../components/Card";
import NavBar from '../components/NavBar';

function WishListPage() {
  const [productData, setProductData] = useState([]);
  const [wishlistData, setWishlistData] = useState([]);
  const token = localStorage.getItem('token');
  console.log("token", token);
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productDataUrl = 'http://localhost:8000/product/getAll';
        const response = await axios.get(productDataUrl);
        const filteredDataWithUserId = response.data.product.map((p) => ({
            ...p,
            containsUserId: p.wishlist.includes(userId),
        }));
        setProductData(filteredDataWithUserId);
        setWishlistData(wishlist=> filteredDataWithUserId.filter(product => product.wishlist.includes(userId)));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [wishlistData]); 
  console.log(productData)

  return (
    <>
     <NavBar/>
    <div className='card-container'>
      {/* {productData
        .filter(product => product.wishlist.includes(userId)) */}
        {wishlistData
        .map((product) => (
            <Card
            key={product.id}
            productId={product._id}
            image={product.image}
            title={product.title}
            value={product.averageRating}
            price={product.price}
            count = {product.count}
            containsUserId = {product.containsUserId}
          />
        ))}
    </div>
    </>
  );
}

export default WishListPage;
