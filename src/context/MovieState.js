import React, { useState } from 'react'
import MovieContext from './MovieContext'
const MovieState = (props) => {
    const [movies,setMovies]=useState([])
    const [user,setUser]=useState( sessionStorage.getItem('UID')?sessionStorage.getItem('UID'):null)
    const [isLoading,setIsLoading]=useState(true)
    const [userData,setUserData]=useState({})
    const [favorites,setFavorites]=useState([])
    const [watchlist,setWatchlist]=useState([])

  return (
    <MovieContext.Provider value={{movies,setMovies,user,setUser,isLoading,setIsLoading,setUserData,userData,favorites,setFavorites,watchlist,setWatchlist}}>
     {props.children}
    </MovieContext.Provider>
  )
}

export default MovieState