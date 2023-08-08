import React from 'react';
import { NavLink } from 'react-router-dom';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

const NavLinkActions = ({ to, label, icon }) => {
  return (
    <NavLink to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
      <BottomNavigationAction mb={8}  label={label} icon={icon} />
    </NavLink>
  );
};

export default NavLinkActions;
