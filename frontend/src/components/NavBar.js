import { Avatar, Badge, Box, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartCheckout from "@mui/icons-material/ShoppingCartCheckout";
import * as React from "react";
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import ManImage from '../assets/man.png';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';

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


    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
      };

      const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
      };

      const handleCloseUserMenu = () => {
        setAnchorElUser(null);
      };

      function goToCart(){
        navigate("/cart");
      }
      
      const handleOrders = () =>{
        navigate('/orders')
      }

      const handleAccount = ()=>{

      }

      const handleLogout = () =>{
        
      }

      const goList = () =>{
        navigate('/wishlist')
      }

      
  return (
    <>
  
        <Toolbar className="tool-bar" sx={{ boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)' }}>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { md: "flex" ,sm:"block"} }}>
                          <Button onClick={goList} sx={{color: '#754e85', fontWeight: 'bold'}}>
                WishList
              </Button>
              <Button onClick={goToCart} sx={{color: '#754e85',  fontWeight: 'bold'}}>
                Cart
              </Button>
              <Button onClick={handleOrders} sx={{color: '#754e85',  fontWeight: 'bold'}}>
                Orders
              </Button>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
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
              <MenuItem onClick={handleAccount}>
                Account
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
    </>
  );
}

export default NavBar;
