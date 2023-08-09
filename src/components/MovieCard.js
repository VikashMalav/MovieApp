import React, { useContext, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, useTheme, IconButton, Snackbar, Alert, SnackbarContent } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MovieContext from '../context/MovieContext';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import Favorites from '../pages/Favorites';
import axios from 'axios';

const MovieCard = ({ title, posterUrl, releaseYear, movieId }) => {
  const theme = useTheme();
  const [isLiked, setIsLiked] = useState(false);
  const { favorites, setFavorites, watchlist, setWatchlist } = useContext(MovieContext)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [openWatchListSnackbar, setOpenWatchListSnackbar] = useState(false)
  const [addedToWatchList, setAddedToWatchList] = useState(false)

  const fevList = async (id, list) => {
    try {
      const api_key = process.env.REACT_APP_API_KEY
      const url = `${process.env.REACT_APP_BASE_URL}3/movie/${id}?api_key=${api_key}&language=en-US`
      const response = await axios.get(url)
      console.log(response.data)
      // setFavorites([...favorites, response.data])
      return [...list, response.data]
    }
    catch (err) {
      console.log(err)
    }
  }

  const handleLikeClick = async (event) => {
    event.stopPropagation()
    setIsLiked((like) => !like)
    setSnackbarOpen(true)
    if (isLiked !== true && movieId) {

      const movieById = await fevList(movieId, favorites)
      setFavorites(movieById)
    }
    else if (isLiked === true && movieId) {
      console.log("++++++++++++++chla")
      const fevList = (id) => {
        const temp = favorites.filter((movie) => { return movie.id !== movieId })
        setFavorites([...temp])
        console.log(favorites)
      }
      fevList(movieId)
    }



  }
  const handleAddToWatchlistClick = async (event) => {
    event.stopPropagation();
    setOpenWatchListSnackbar(true)
    setAddedToWatchList(!addedToWatchList)
    if (addedToWatchList !== true && movieId) {
      const movieById = await fevList(movieId, watchlist)
      setWatchlist(movieById)
      console.log(watchlist)
    }
    else if (addedToWatchList === true && movieId) {
      console.log("++++++++++++++chla")
      const watchListRemove = (id) => {
        const temp = watchlist.filter((movie) => { return movie.id !== movieId })
        setWatchlist([...temp])
        console.log(favorites)
      }
      watchListRemove(movieId)
    }


  }
  const handleSnackbarClose = () => {
    setSnackbarOpen(false)
  }
  const handleWatchListClose = () => {
    setOpenWatchListSnackbar(false)
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
        '&:hover': { transform: 'scale(1.1)' },
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
        loading='lazy'
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
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <IconButton
              color={isLiked ? 'warning' : 'default'}
              onClick={(event) => handleLikeClick(event)}
              aria-label="Like"
            >
              <FavoriteIcon />
            </IconButton>
            <IconButton
              color={addedToWatchList ? 'primary' : 'default'}
              onClick={handleAddToWatchlistClick}
              aria-label="Add to Watchlist"
            >
              <WatchLaterIcon />
            </IconButton>
          </div>
        </div>
        <Typography variant="body2" color="textSecondary">
          {releaseYear}
        </Typography>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity={isLiked ? "success" : 'warning'}>
            {isLiked ? 'Added to Favorites!' : 'Removed from Favorites!'}
          </Alert>
        </Snackbar>
        <Snackbar
          open={openWatchListSnackbar}
          autoHideDuration={3000}
          onClose={handleWatchListClose}
        >
          <Alert onClose={handleWatchListClose} severity={addedToWatchList ? "success" : 'warning'}>
            {addedToWatchList ? 'Added to WatchList!' : 'Removed from WatchList!'}
          </Alert>
        </Snackbar>
      </CardContent>

    </Card>

  );
};

export default MovieCard;
