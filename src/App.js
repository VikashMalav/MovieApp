import React, { useContext } from 'react'
import Signup from './pages/Signup'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Movies from './pages/Movies'
import Watchlist from './pages/Watchlist'
import Favorites from './pages/Favorites'
import SignOut from './pages/SignOut'
import ProtectedRoute from './pages/ProtectedRoute'
import MovieContext from './context/MovieContext'
import Nav from './pages/Nav'
const App = () => {
  const { user } = useContext(MovieContext)
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />

          <Route path='/home' element={<ProtectedRoute><Movies /></ProtectedRoute>} />
          <Route path='/Watchlist' element={<ProtectedRoute><Watchlist /></ProtectedRoute>} />
          <Route path='/favorites' element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
          <Route path='/user' element={<ProtectedRoute><SignOut /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App