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

  function handleDashboardNavigation(){
    navigate(`/dashboard`);
  }

  function handleAddOrderNavigation(){
    navigate(`/addProduct`);
  }

  function handleUpdateStatusNavigation(){
    navigate(`/orderStatus`);
  }

  // function handleSignout(){

  // }


  return (
<>
  
<Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
            <ListItem>
                <ListItemButton>
                <ListItemIcon>
                    <DashboardIcon/>
                </ListItemIcon>
                <ListItemText primary="Dashboard" onClick={handleDashboardNavigation}/>
                </ListItemButton>
            </ListItem>
            <ListItem>
                <ListItemButton>
                <ListItemIcon>
                    <Inventory2Icon/>
                </ListItemIcon>
                <ListItemText primary="Add Order" onClick={handleAddOrderNavigation}/>
                </ListItemButton>
            </ListItem>
            <ListItem>
                <ListItemButton>
                <ListItemIcon>
                    <PeopleAltIcon/>
                </ListItemIcon>
                <ListItemText primary="Update Order Status" onClick={handleUpdateStatusNavigation}/>
                </ListItemButton>
            </ListItem>
            <ListItem>
                <ListItemButton>
                <ListItemIcon>
                    <LogoutIcon/>
                </ListItemIcon>
                <ListItemText primary="Sign Out"/>
                </ListItemButton>
            </ListItem>
        </List>
      </Drawer>
</>

  );
}

