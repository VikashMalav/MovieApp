import React, { useState } from 'react'
import Box from '@mui/material/Box'
import BottomNavigation from '@mui/material/BottomNavigation'
import FavoriteIcon from '@mui/icons-material/Favorite'
import HomeIcon from '@mui/icons-material/Home'
import WatchLaterIcon from '@mui/icons-material/WatchLater'
import PersonIcon from '@mui/icons-material/Person'
import { BottomNavigationAction } from '@mui/material'
import { Link, NavLink } from 'react-router-dom'

export default function Nav() {
  const [value, setValue] = useState(0)

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
          setValue(newValue)
        }}
      >
       
        <NavLink to="/home" >
          <BottomNavigationAction label="Movies" icon={<HomeIcon />} />
        </NavLink>
        <NavLink to="/favorites" >
          <BottomNavigationAction  label="Favorites" icon={<FavoriteIcon />} />
        </NavLink>
        <NavLink to="/watchlist" >
          <BottomNavigationAction label="Watchlist" icon={<WatchLaterIcon />} />
        </NavLink>
        <NavLink to="/user" >
          <BottomNavigationAction label="User" icon={<PersonIcon />} />
        </NavLink>
      </BottomNavigation>
    </Box>
  );
}
