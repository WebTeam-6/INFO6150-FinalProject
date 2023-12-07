import { Avatar, Box, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import * as React from "react";
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import ManImage from '../assets/man.png';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import logo from "../images/shilpkalaLogo.png";
import { jwtDecode } from "jwt-decode";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "grey",
    '&:hover': {
      backgroundColor: "grey",
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));


function NavBar({cartSize}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
    const navigate = useNavigate();
    const [tokenDefined,setTokenDefined] = React.useState(false);

    const token = localStorage.getItem("token");
    let isAuthenticated = false;
  
    console.log(token);
  
    if (token !=='undefined' && token !==null) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken)
      console.log(decodedToken.exp)
          const currentTime = Math.floor(Date.now() / 1000);
          if (decodedToken.exp < currentTime) {
            isAuthenticated = false;
          }
          else{
            isAuthenticated = true;
          }
    } else {
      isAuthenticated = false;
    }


    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
      };

      const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
      };

      const handleCloseUserMenu = () => {
        setAnchorElUser(null);
      };

      function goToProductsPage(){
        navigate("/shop");
      }

      function goToCart(){
        navigate("/cart");
      }

      function goToHome(){
        navigate("/");
      }
      
      const handleOrders = () =>{
        navigate('/orderHistory')
      }

      const handleAccount = ()=>{

      }

      const handleLogout = () =>{
        localStorage.removeItem("token");
        navigate('/');
      }

      const goList = () =>{
        navigate('/wishlist')
      }

      const goHome =()=>{
        navigate('/')
      }
      
      const openLogin = () =>{
        navigate('/login')
      }

      
  return (
    <>
  
        <Toolbar className="tool-bar" style={{boxShadow: "0 2px 4px rgba(0, 0, 0, 0.5)"}} >
        <Typography component="div" className="logo">
          <img src={logo} alt="Shilpkala" style={{ height: '80px', marginRight: '0px' }} 
          onClick={goToHome} />
        </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { md: "flex" ,sm:"block"} }}>
          <Button onClick={goHome} sx={{color: '#754e85', fontWeight: 'bold'}}>
                Home
              </Button>
          {isAuthenticated && (
            <>
             <Button onClick={goToProductsPage} sx={{color: '#754e85', fontWeight: 'bold'}}>
                Shop
              </Button>
              <Button onClick={goList} sx={{color: '#754e85', fontWeight: 'bold'}}>
                WishList
              </Button>
              <Button onClick={goToCart} sx={{color: '#754e85',  fontWeight: 'bold'}}>
                Cart
              </Button>
              <Button onClick={handleOrders} sx={{color: '#754e85',  fontWeight: 'bold'}}>
                Orders
              </Button>
            </>
               )}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
          {isAuthenticated && (
            <>
                        <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={ManImage} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleLogout}>
                Logout
              </MenuItem>
            </Menu>
            </>
          )}
           {!isAuthenticated && (
            <>
            <Button onClick={openLogin} sx={{color: '#754e85',  fontWeight: 'bold'}}>
                Login
              </Button>
            </>
           )}
          </Box>
        </Toolbar>
    </>
  );
}

export default NavBar;
