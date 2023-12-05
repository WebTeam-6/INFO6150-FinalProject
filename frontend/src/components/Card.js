import { Rating } from "@mui/material";
import { BsFillBagFill } from "react-icons/bs";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { jwtDecode } from 'jwt-decode'
import axios from 'axios';
import { Link } from 'react-router-dom';

function Card({ productId, image, title, value, price, count }) {

  const addToCartUrl = `http://localhost:8000/cart/addToCart`;
  
  localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NmQxNmU3MzM4MGRlYjM3Mjg4YWRkYiIsImlhdCI6MTcwMTY0ODM4MiwiZXhwIjoxNzAxNzM0NzgyfQ.bZa0mNKoY8KrvqHsulc-ppsNGStr8k4g1PpAMmZwo1Q');
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

  return (
    <>
      <Link to={`product/${productId}`}>
      <div className="card" >
          <div className="card-img">
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
              <FavoriteIcon className="fav-icon"/>
              </div>
              <div className="bag" onClick={addToCartHandler}>
              <BsFillBagFill className="bag-icon" />
              </div>
            </div>
          </div>
        </div>
      </Link>
  
    </>
  );
}

export default Card;
