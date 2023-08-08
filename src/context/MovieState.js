import React, { useState } from 'react'
import MovieContext from './MovieContext'
const MovieState = (props) => {
    const [movies,setMovies]=useState([])
    const [user,setUser]=useState('')
    const [isLoading,setIsLoading]=useState(true)
    const [userData,setUserData]=useState({})
    const [favorites,setFavorites]=useState([])
  return (
    <MovieContext.Provider value={{movies,setMovies,user,setUser,isLoading,setIsLoading,setUserData,userData,favorites,setFavorites}}>
     {props.children}
    </MovieContext.Provider>
  )
}

export default MovieState