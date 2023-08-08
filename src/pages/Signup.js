import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
import { TextField, Button, Grid, Container, Typography, Divider } from '@mui/material';
import MovieContext from '../context/MovieContext';


const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {user,setUser,setUserData}=useContext(MovieContext)
  console.log(error)

  const onSubmit = async (e) => {
    e.preventDefault()

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
       
        navigate("/")
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setError(errorMessage)
        // ..
      });
  }
  const googleSignIn = (e) => {

    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
       
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        setUser(token)
        const user = result.user;
        console.log(user)
        setUserData(user)
        navigate('/home')
       
      }).catch((error) => {
       
        const errorCode = error.code;
        const errorMessage = error.message;
       
        const email = error.customData.email;
        
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });


  }

  return (
    <Container maxWidth="xs" sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
    }}>
      <form>
        <Typography variant="h4" gutterBottom>
          SignUp
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              required
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              required
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
        </Grid>
        {error ? (
          <Typography mt={2} style={{ color: 'red' }} variant="body1">
            {error}
          </Typography>
        ) : (
          ''
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          sx={{ marginTop: '16px', marginBottom: '16px' }}
          onClick={onSubmit}
        >
          Create an Account
        </Button>
        <Divider>OR</Divider>
        <Button onClick={googleSignIn}>SignIn with Google</Button>
      </form>
      <Typography mt={3} variant="body">
        already have an account ?<Link to="/"> login</Link>
      </Typography>
    </Container>
  )
}

export default Signup