import React, { useContext, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { TextField, Button, Grid, Container, Typography, Divider } from '@mui/material';
import MovieContext from '../context/MovieContext';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser, setUserData } = useContext(MovieContext)

  // console.log(user)


  const onLogin = (e) => {

    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {

        const user = userCredential.user;
        sessionStorage.setItem("user",JSON.stringify(user))
        setUserData(user)
        navigate("/home")

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
        setError(errorCode)
      });



  }
  const googleLoginIn = (e) => {

    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {

        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        setUser(token)
        const user = result.user;
        sessionStorage.setItem("user",JSON.stringify(user))
        console.log(user)
        setUserData(user)
        navigate('/home')


      }).catch((error) => {

        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage)

        const email = error.customData.email;

        const credential = GoogleAuthProvider.credentialFromError(error);

      });


  }

  return (
    <>

      <Container maxWidth="xs" sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}>
        <form>
          <Typography variant="h4" align="center" gutterBottom>
            Login
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
          {error ? <Typography mt={2} style={{ color: 'red' }} variant='body1'>{error}</Typography> : ''}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            style={{ marginTop: '16px', marginBottom: '16px' }}
            onClick={onLogin}
          >
            Login
          </Button>
          <Divider >OR</Divider>
          <Button onClick={googleLoginIn}>login with Google</Button>
        </form>
        <Grid item xs={12} sx={{ marginTop: '4px' }}>
          <Typography mt={3} variant='body'>Don't have any account ?<Link to='/signUp'> signUp</Link></Typography>
        </Grid>
      </Container>
    </>
  )
}

export default Login