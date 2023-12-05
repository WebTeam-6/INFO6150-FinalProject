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

const drawerWidth = 240;

export default function Dashboard() {
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
                <ListItemText primary="Dashboard"/>
                </ListItemButton>
            </ListItem>
            <ListItem>
                <ListItemButton>
                <ListItemIcon>
                    <Inventory2Icon/>
                </ListItemIcon>
                <ListItemText primary="Orders"/>
                </ListItemButton>
            </ListItem>
            <ListItem>
                <ListItemButton>
                <ListItemIcon>
                    <PeopleAltIcon/>
                </ListItemIcon>
                <ListItemText primary="Users"/>
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