import { Rating } from "@mui/material";
import { BsFillBagFill } from "react-icons/bs";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { jwtDecode } from 'jwt-decode'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

function Card({ productId, image, title, value, price, count, containsUserId, onRemoveFromWishlist }) {
  const [exists,setExists] = useState(containsUserId); 
  console.log(exists)

  useEffect(() => {
    setExists((prevExists) => {
      if (!containsUserId) {
        onRemoveFromWishlist && onRemoveFromWishlist(productId);
      }
      return containsUserId;
    });
  }, [containsUserId, onRemoveFromWishlist, productId]);


  const addToCartUrl = `http://localhost:8000/cart/addToCart`;
  
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  console.log("token", token);
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.id;
  console.log("userId ", userId);

    const addToCartHandler = async() =>{

      const req = {
        "userId": userId,
        "productId": productId,
        "quantity": 1
      }

      const response = await axios.post(addToCartUrl, req);

      console.log("addToCart response ", response.data);
      if(response.status === 200){
        alert("Product added to the Cart!!");
      }
    }

    function product(){
      navigate(`product/${productId}`);
    }


    async function addToFav(productId){
      console.log(productId.productId);      
      const req={
        "userId": userId
      }
      console.log(req);
      const res = await axios.put(`http://localhost:8000/product/${productId.productId}`,req)
      console.log(res)
      if(res.data.product.wishlist.includes(userId)){
        setExists(true)
      }
      else{
        setExists(false);
        onRemoveFromWishlist && onRemoveFromWishlist(productId);
      }
    }

  return (
    <>
      <div className="card-p">
          <div className="card-img" onClick={product}>
            <img src={image}></img>
          </div>
          <div className="name">
            <h1>{title}</h1>
          </div>
          <div className="ratings">
          <Rating
        name="simple-controlled"
        value={value}
        readOnly
      /><span>({count})</span>
          </div>
          <div className="p-c">
            <div className="price">
              <p>${price}</p>
            </div>
            <div className="p-c-left">
              <div className="fav">
              <FavoriteIcon style={{ color: exists ? 'red' : 'inherit' }}  onClick={() => addToFav({ productId })} />
              </div>
              <div className="bag" onClick={addToCartHandler}>
              <BsFillBagFill className="bag-icon" />
              </div>
            </div>
          </div>
        </div>  
    </>
  );
}

export default Card;
