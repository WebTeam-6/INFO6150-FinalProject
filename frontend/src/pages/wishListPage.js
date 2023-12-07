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
  const [favToggle, setFavToggle] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productDataUrl = 'http://localhost:8000/product/getAll';
        const response = await axios.get(productDataUrl);
        // const filteredDataWithUserId = response.data.product.map((p) => ({
        //     ...p,
        //     containsUserId: p.wishlist.includes(userId),
        // }));
        const filteredDataWithUserId = response.data.product.filter((p) =>
                                        p.wishlist.includes(userId)
                                      );
        setProductData(filteredDataWithUserId);
        //setWishlistData(wishlist=> filteredDataWithUserId.filter(product => product.wishlist.includes(userId)));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [favToggle]); 

  const containsUserId=  (event) =>{
    const wishlistArray = event;
    //setFavToggle(prevFavToggle => !prevFavToggle);
    return wishlistArray.includes(userId);
  
  }

  const handleRemoveFromWishlist = async (productId) => {
    // Logic to remove product from wishlist
    // ...

    // Toggle the favToggle to trigger re-render

    console.log("productId ", productId);
    console.log("favToggle ", favToggle);
    setFavToggle((prevFavToggle) => !prevFavToggle);
  };




  console.log(productData)

  return (
    <>
     <NavBar/>
     <h2 style={{   fontWeight: "400", marginTop:"20px",
    fontSize: "30px",
    textAlign: "center"}}>WishList</h2>
    <div className='card-container'>
      {/* {productData
        .filter(product => product.wishlist.includes(userId)) */}
        {productData
        .map((product) => (
            <Card
            key={product.id}
            productId={product._id}
            image={product.image}
            title={product.title}
            value={product.averageRating}
            price={product.price}
            count = {product.count}
            containsUserId = {containsUserId(product.wishlist)}
            onRemoveFromWishlist={() => handleRemoveFromWishlist(product._id)}
            
          />
        ))}
    </div>
    </>
  );
}

export default WishListPage;
