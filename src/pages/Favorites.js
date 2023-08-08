import React, { useContext } from 'react'
import MovieContext from '../context/MovieContext'
import { Grid, Typography } from '@mui/material'
import MovieCard from '../components/MovieCard'

const Favorites = () => {
  const { favorites } = useContext(MovieContext)
  return (<>
    <Grid container >
      <Grid item xs={12}>
        <Typography variant='subtitle'>List of Favorite Movies</Typography>
      </Grid>
      {favorites?.length > 0 && favorites.map((movie) => {
        <Grid item key={1}>
          <MovieCard title='' posterUrl='' releaseYear='' />
        </Grid>
      })

      }
    </Grid>
  </>
  )
}

export default Favorites