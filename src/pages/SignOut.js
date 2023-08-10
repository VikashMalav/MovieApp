import React, { useContext, useState } from 'react';
import { Box, List, ListItem, ListItemButton, Typography, Paper } from '@mui/material';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import MovieContext from '../context/MovieContext';

const SignOut = () => {
    const { setUser, userData } = useContext(MovieContext);
    const Navigate = useNavigate();
   const userinfo  =JSON.parse(sessionStorage.getItem('user'))
//console(userinfo)
   
    const handleSignOut = () => {
        const auth = getAuth()
        signOut(auth)
            .then(() => {
                //console('Sign-out successful.');
                sessionStorage.removeItem('user')
                sessionStorage.removeItem('UID')
              
                Navigate('/')
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <Paper elevation={3} sx={{ padding: '20px', borderRadius: '10px' }}>
                <List>
                   {userData? <><ListItem disablePadding>
                        <ListItemButton>
                            <Typography variant="body1">User: {userinfo.displayName || 'Not available'}</Typography>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <Typography variant="body1">Email: {userinfo.email}</Typography>
                        </ListItemButton>
                    </ListItem></>:''}
                    <ListItem disablePadding>
                        <ListItemButton onClick={handleSignOut}>
                            <Typography variant="body1">Logout</Typography>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Paper>
        </Box>
    );
};

export default SignOut;
