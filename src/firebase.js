// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBs664nLYEqT4-faK4d4Wt2pWU9NZbeX7E",
  authDomain: "moviesapp-9671d.firebaseapp.com",
  projectId: "moviesapp-9671d",
  storageBucket: "moviesapp-9671d.appspot.com",
  messagingSenderId: "637392430727",
  appId: "1:637392430727:web:7f3d04fd34fe972d1efa22"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;