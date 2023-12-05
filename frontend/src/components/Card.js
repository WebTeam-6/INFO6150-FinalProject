import { Rating } from "@mui/material";
import { BsFillBagFill } from "react-icons/bs";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { jwtDecode } from 'jwt-decode'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

function Card({ productId, image, title, value, price, count, containsUserId }) {
  const [exists,setExists] = useState(containsUserId); 
  console.log(exists)
  console.log()

  const addToCartUrl = `http://localhost:8000/cart/addToCart`;
  const navigate = useNavigate();
  localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NmYyNzYxM2NmMzJhOGIwNzcyMTVkNiIsImlhdCI6MTcwMTc4NDQyOSwiZXhwIjoxNzA0Mzc2NDI5fQ.kzptTAPhYLTqjxsdibF8vDK9b5eQ9Wp19Dht9tO7ChY');
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
    }

    function product(){
      navigate(`product/${productId}`);
    }


    async function addToFav(productId){
      console.log(productId.productId)
      const req={
        "userId": "6563cc81b198c2de022e2661"
      }
      const res = await axios.put(`http://localhost:8000/product/${productId.productId}`,req)
      console.log(res)
      if(res.data.product.wishlist.includes('6563cc81b198c2de022e2661')){
        setExists(true)
      }
      else{
        setExists(false);
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
