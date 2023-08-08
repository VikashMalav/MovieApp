import React, { useState } from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import NavLinkActions from '../components/NavLinkActions';
import PersonIcon from '@mui/icons-material/Person';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
export default function Nav() {
  const [value, setValue] = useState(0)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen) 
  };


  return (
    <Box style={{
      position: 'fixed',
      bottom: 0,
      width: '100%',
    }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <NavLinkActions to='/home' label="Movies" icon={<HomeIcon />} />
      <NavLinkActions to="/favorites" label="Favorites" icon={<FavoriteIcon />} />
      <NavLinkActions to="/watchlist" label="Watchlist" icon={<WatchLaterIcon />} />
      <NavLinkActions to='/user' label="Settings" onclick={toggleDrawer} icon={<PersonIcon />} />
      </BottomNavigation>
      <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
        <List>
          <ListItem button>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Settings" />
          </ListItem>
          
        </List>
      </Drawer>
    </Box>
  );
}