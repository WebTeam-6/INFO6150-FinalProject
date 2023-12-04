import { AppBar } from "@mui/material";
import NavBar from "../components/NavBar";
import Track from "../components/Track";

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
    </>
    )
}

export default OrderTracking;