import { AppBar } from "@mui/material";
import NavBar from "../components/NavBar";
import Track from "../components/Track";
import Footer from '../components/Footer';
import { useParams } from "react-router-dom";

function OrderTracking(){

  const {orderStatus} = useParams();
  console.log("orderStatus ", orderStatus);

  function getOrderStatus(){
    return orderStatus;
  }
    return(
        <>
         <AppBar
        position="fixed"
        sx={{backgroundColor: 'white',}}
      >
       <NavBar/>
      </AppBar>
        <Track getOrderStatus={orderStatus} />
        <Footer/>
    </>
    )
}

export default OrderTracking;