import React, { useContext, useEffect, useState } from 'react'
import MovieCard from '../components/MovieCard'
import axios from 'axios'
import MovieContext from '../context/MovieContext'
import { Container, Box, CircularProgress, Grid, TextField, Button, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'

const Movies = () => {
  const { setMovies, movies, setIsLoading, isLoading } = useContext(MovieContext)
  const api_key = process.env.REACT_APP_API_KEY

  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const theme = useTheme()
  const navigate=useNavigate()

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/3/discover/movie?sort_by=popularity.desc&api_key=${api_key}`
        )
        setMovies(response.data.results)
        setIsLoading(false)
      } catch (err) {
        //console(err);
      }
    }
    fetchMovies()
  }, [])

  const handleMovieClick = async (movieId) => {

    // console.log('vikas')
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}3/movie/${movieId}?api_key=${api_key}`)

      const searchResults = response.data
      //console(searchResults)
      navigate(`/home/${movieId}`)

    } catch (err) {
      //console(err);
    }
  }

  const handleSearchSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}3/search/movie?api_key=${api_key}&query=${searchQuery}`
      );

      const searchResults = response.data.results;
      setSearchResults(searchResults);
    } catch (err) {
      //console(err);
    }
  };

  return (
    <>
      {isLoading ?
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: '100vh' }}
        >
          <Grid item>
            <CircularProgress />
          </Grid>
        </Grid>
        : <>
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
                <Box key={movie.id} p={2} minWidth={200} onClick={() => handleMovieClick(movie.id)}>
                  <MovieCard
                    movieId={movie.id}
                    title={movie.title}
                    posterUrl={`http://image.tmdb.org/t/p/w780${movie.poster_path}`}
                    releaseYear={movie.release_date}
                  />
                </Box>
              ))}
            </Box>
          </Container>
        </>
      }
    </>
  );
};

export default Movies;
