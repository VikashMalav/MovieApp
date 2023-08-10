import { getAuth, onAuthStateChanged ,signOut} from "firebase/auth";
import React, { useContext, useEffect } from 'react';
import { Navigate } from "react-router-dom";
import MovieContext from "../context/MovieContext";
import Nav from "./Nav";

const ProtectedRoute = ({ children }) => {
  const { setUser, user } = useContext(MovieContext);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        sessionStorage.setItem('UID',uid)
        setUser(uid)
      } else {
        signOut(auth)
          .then(() => {
            console.log('Sign-out successful.')
            sessionStorage.removeItem('user')
            sessionStorage.removeItem('UID')
            setUser(null)
            Navigate('/')
          })
          .catch((error) => {
            console.log(error);
          })
      }
    });

    return () => unsubscribe()
  }, [auth, setUser])

  if (user !== null) {
    return (
      <>
        {children}
        <Nav />
      </>
    );
  } else {
    return <Navigate to='/' />;
  }
};

export default ProtectedRoute;
