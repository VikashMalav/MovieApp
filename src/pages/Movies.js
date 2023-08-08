import React, { useContext, useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import axios from 'axios';
import MovieContext from '../context/MovieContext';
import { Container, Box, CircularProgress, Grid, TextField, Button, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Movies = () => {
  const { setMovies, movies, setIsLoading, isLoading } = useContext(MovieContext);
  const api_key = '3335fdc275d0590c2e9ec1539185ef40'

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${api_key}`
        );
        setMovies(response.data.results);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMovies();
  }, []);

  const handleMovieClick = async (movieId) => {
    // ... Existing code for handling movie click
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${searchQuery}`
      );

      const searchResults = response.data.results;
      setSearchResults(searchResults);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Container>
        <Box py={4}>
          <Typography variant="h4" align="center" gutterBottom>
            Discover Movies
          </Typography>
          <form onSubmit={handleSearchSubmit}>
            <Grid container spacing={2} justifyContent="center" alignItems="center">
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Search for a movie"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Search
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>

        <Box display="flex" flexWrap="wrap" justifyContent="center">
          {(searchResults.length > 0 ? searchResults : movies).map((movie) => (
            <Box key={movie.id} p={2} minWidth={200}>
              <MovieCard
                onClick={() => handleMovieClick(movie.id)}
                title={movie.title}
                posterUrl={`http://image.tmdb.org/t/p/w780${movie.poster_path}`}
                releaseYear={movie.release_date}
              />
            </Box>
          ))}
        </Box>
      </Container>
    </>
  );
};

export default Movies;
