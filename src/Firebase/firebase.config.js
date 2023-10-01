// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLPVJ3Np2hH-Bks_JwlUbt9gUZdoI0xHc",
  authDomain: "login-signup-firebase-241d6.firebaseapp.com",
  projectId: "login-signup-firebase-241d6",
  storageBucket: "login-signup-firebase-241d6.appspot.com",
  messagingSenderId: "632300618863",
  appId: "1:632300618863:web:c925f4950a0828ae1f799a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export default auth;