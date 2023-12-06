import { Box, CssBaseline } from "@mui/material";
import AdminNav from "../components/AdminNav";
import DashBoard from "../components/Dashboard";
const drawerWidth = 240;

function DashBoardPage(){
    return(
        <>
         <Box sx={{ display: "flex"}}>
            <CssBaseline />
          <AdminNav/>
        <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <DashBoard/>
      </Box>
      </Box>
        </>
    )
}

export default DashBoardPage;