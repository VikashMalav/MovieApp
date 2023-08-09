import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Box, Typography, Card, CardMedia, CardContent, Chip, Grid, CircularProgress, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const SingleMoviePage = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [trailerKey,setTrailerKey] = useState(null)
  const theme = useTheme();
  const api_key = process.env.REACT_APP_API_KEY


  useEffect(() => {
    const fetchMovieDetails = async () => {

      const url = `${process.env.REACT_APP_BASE_URL}3/movie/${movieId}?api_key=${api_key}&language=en-US`;

      try {
        const response = await axios.get(url)
        setMovieDetails(response.data)
        setIsLoading(false)

      } catch (error) {
        console.error('Error fetching movie details:', error)
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const fetchTrailerKey = async () => {
    const url = `${process.env.REACT_APP_BASE_URL}3/movie/${movieId}/videos?api_key=${api_key}&language=en-US`

    try {
      const response = await axios.get(url);
      const trailers = response?.data?.results?.filter((video) =>
        video.type.toLowerCase().includes('trailer')
      )
      if (trailers.length > 0) {
        return trailers[0].key
      }
    } catch (error) {
      console.error('Error fetching trailer key:', error)
    }

    return null;
  }
  const loadTrailer = async () => {
    console.log("+++++++++++++++++++++++++++++++++yt----------")
    const trailerKey = await fetchTrailerKey()
    setTrailerKey(trailerKey)
  }
  console.log(trailerKey)
  

  if (!movieDetails) {
    return <div>Error loading movie details</div>;
  }

  const { title, poster_path, overview, release_date, genres, production_companies, vote_average, backdrop_path } = movieDetails;

  return (<>
    {isLoading ?
      <Grid container justifyContent="center"
        alignItems="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid item>
          <CircularProgress />
        </Grid>
      </Grid>
      : <>
        <Container maxWidth="md" style={{ marginTop: theme.spacing(3), marginBottom: theme.spacing(6) }}>
          <Card>
            <CardMedia
              component="img"
              alt={`${title} Poster`}
              src={`http://image.tmdb.org/t/p/w1280${backdrop_path}`}
              style={{ maxHeight: '90vh', objectFit: 'cover' }}
            />
            <CardContent>
              <Typography variant="h4">{title}</Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Released: {release_date}
              </Typography>
              <Typography variant="body1">{overview}</Typography>
              <Box mt={2}>
                <Typography variant="h6">Genres:</Typography>
                <Box display="flex" flexWrap="wrap">
                  {genres.map((genre) => (
                    <Chip key={genre.id} label={genre.name} variant="outlined" style={{ margin: theme.spacing(0.5) }} />
                  ))}
                </Box>
              </Box>
              <Box mt={2}>
                <Typography variant="h6">Production Companies:</Typography>
                <Box display="flex" flexWrap="wrap">
                  {production_companies.map((company) => (
                    <Chip key={company.id} label={company.name} variant="outlined" style={{ margin: theme.spacing(0.5) }} />
                  ))}
                </Box>
              </Box>
              <Box mt={2}>
                <Typography variant="h6">Rating: {vote_average}</Typography>
              </Box>

              {/* youtube trailer */}
              <Button
              variant="contained"
              color="primary"
              onClick={loadTrailer} 
            >
              Play Trailer
            </Button>

              {trailerKey && (
                <Box mt={2}>
                  <Typography variant="h6">Trailer:</Typography>
                  <Box width="100%" height="0" paddingBottom="56.25%" position="relative">
                    <iframe
                      title="Trailer"
                      src={`https://www.youtube.com/embed/${trailerKey}`}
                      frameBorder="0"
                      allowFullScreen
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                      }}
                    />
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>
        </Container>
      </>}
  </>
  );
};

export default SingleMoviePage;
