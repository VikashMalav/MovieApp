import React, { useContext } from 'react';
import { Box, List, ListItem, ListItemButton, Typography, Paper } from '@mui/material';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import MovieContext from '../context/MovieContext';

const SignOut = () => {
    const { setUser, userData } = useContext(MovieContext);
    const Navigate = useNavigate();

    const handleSignOut = () => {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                console.log('Sign-out successful.');
                sessionStorage.removeItem('accessToken');
                setUser('');
                Navigate('/');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <Paper elevation={3} sx={{ padding: '20px', borderRadius: '10px' }}>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <Typography variant="body1">User: {userData?.displayName}</Typography>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <Typography variant="body1">Email: {userData?.email}</Typography>
                        </ListItemButton>
                    </ListItem>
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
