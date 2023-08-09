import React, { useContext } from 'react';
import MovieContext from '../context/MovieContext';
import { Box, Button, Grid, Typography, Container } from '@mui/material';
import MovieCard from '../components/MovieCard';

const Favorites = () => {
  const { favorites, setFavorites } = useContext(MovieContext);

  const handleRemove = (idx) => {
    let temp = [...favorites];
    temp.splice(idx, 1);
    setFavorites(temp);
  };

  return (
    <Container mb={10}>
      <Box sx={{ textAlign: 'center', marginTop: '50px',marginBottom:'50px' }}>
        {favorites.length === 0 ? (
          <Typography variant="h6" sx={{ color: '#888888' }}>
            No movies added to favorites.
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {favorites?.length > 0 && favorites.map((movie, index) => (
              <Grid key={movie.id} item xs={12} md={3}>
                <MovieCard
                  title={movie.title}
                  posterUrl={`http://image.tmdb.org/t/p/w780${movie.poster_path}`}
                  releaseYear={movie.release_date}
                  // movieId={movie.id}
                />
                <Button variant="contained" onClick={() => handleRemove(index)}>
                  Remove
                </Button>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default Favorites;
