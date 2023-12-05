import { Rating } from "@mui/material";
import { BsFillBagFill } from "react-icons/bs";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { jwtDecode } from 'jwt-decode'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Card({ productId, image, title, value, price, count }) {

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
    }

    function product(){
      navigate(`product/${productId}`);
    }

  return (
    <>
      <div className="card-p" onClick={product}>
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
    </>
  );
}

export default Card;
