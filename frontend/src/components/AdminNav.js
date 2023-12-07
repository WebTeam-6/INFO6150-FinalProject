import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

export default function AdminNav() {
  const navigate = useNavigate();

  function handleDashboardNavigation() {
    navigate(`/dashboard`);
  }

  function handleAddOrderNavigation() {
    navigate(`/addProduct`);
  }

  function handleUpdateStatusNavigation() {
    navigate(`/orderStatus`);
  }

  function handleSignout() {
    localStorage.removeItem('token');
    navigate(`/login`);
  }

  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#272c34', 
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1, textAlign: 'center', color: '#fff' }}>
            <h2 style={{marginTop: '10px'}}> Admin </h2>
          </Box>
        </Toolbar>
        <Divider />
        <List>
          <ListItem>
            <ListItemButton>
              <ListItemIcon sx={{ color: '#fff' }}>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" onClick={handleDashboardNavigation} sx={{ color: '#fff' }}/>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemIcon sx={{ color: '#fff' }}>
                <Inventory2Icon />
              </ListItemIcon>
              <ListItemText primary="Add Order" onClick={handleAddOrderNavigation} sx={{ color: '#fff' }}/>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemIcon sx={{ color: '#fff' }}>
                <PeopleAltIcon />
              </ListItemIcon>
              <ListItemText primary="Update Order Status" onClick={handleUpdateStatusNavigation} sx={{ color: '#fff' }} />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemIcon sx={{ color: '#fff' }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Sign Out" onClick={handleSignout} sx={{ color: '#fff' }}/>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
