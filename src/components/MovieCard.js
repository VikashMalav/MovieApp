import React, { useContext, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, useTheme, IconButton,Snackbar, Alert, SnackbarContent } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MovieContext from '../context/MovieContext';

const MovieCard = ({ title, posterUrl, releaseYear }) => {
  const theme = useTheme();
  const [isLiked, setIsLiked] = useState(false); 
  const{setFavorites}=useContext(MovieContext)


  const handleLikeClick = () => {
    setIsLiked(!isLiked);
   
    setFavorites()
  }



  return (
    <Card
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between', 
        borderRadius: theme.spacing(1),
        maxWidth: 300,
        minHeight: 300, 
        margin: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
          flexDirection: 'row',
        },
      }}
    >
      <CardMedia
        component="img"
        alt={`${title} Poster`}
        src={posterUrl}
        style={{
          width: '100%',
          height: 'auto',
          objectFit: 'cover',
          borderTopLeftRadius: theme.spacing(1),
          borderBottomLeftRadius: theme.spacing(1),
          borderTopRightRadius: theme.spacing(1), 
          borderBottomRightRadius: theme.spacing(1), 
          alignSelf: 'center', 
          [theme.breakpoints.up('md')]: {
            width: 150,
            height: 'auto',
            borderTopLeftRadius: theme.spacing(1),
            borderBottomLeftRadius: theme.spacing(1),
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          },
        }}
      />
      <CardContent
        style={{
          flex: '1 0 auto',
          padding: theme.spacing(1),
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          <IconButton
            color={isLiked ? 'warning' : 'default'}
            onClick={handleLikeClick}
            aria-label="Like"
          >
            <FavoriteIcon />
          </IconButton>
        </div>
        <Typography variant="body2" color="textSecondary">
          {releaseYear}
        </Typography>
      </CardContent>
     
    </Card>

  );
};

export default MovieCard;
