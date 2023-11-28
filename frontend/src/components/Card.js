import { Rating } from "@mui/material";
import { BsFillBagFill } from "react-icons/bs";
import FavoriteIcon from '@mui/icons-material/Favorite';
function Card({ image, title, value, price, count }) {
  return (
    <>
        <div className="card">
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
              <div className="bag">
              <BsFillBagFill className="bag-icon" />
              </div>
            </div>
          </div>
        </div>
    </>
  );
}

export default Card;
