import { getAuth, onAuthStateChanged } from "firebase/auth";
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
        setUser(uid);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth, setUser]);

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
