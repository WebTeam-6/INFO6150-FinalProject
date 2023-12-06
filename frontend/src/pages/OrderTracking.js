import { AppBar } from "@mui/material";
import NavBar from "../components/NavBar";
import Track from "../components/Track";
import Footer from '../components/Footer';

function OrderTracking(){
    return(
        <>
         <AppBar
        position="fixed"
        sx={{backgroundColor: 'white',}}
      >
       <NavBar/>
      </AppBar>
        <Track />
        <Footer/>
    </>
    )
}

export default OrderTracking;