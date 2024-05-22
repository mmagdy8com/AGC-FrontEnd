// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAvpLAI7CwNKAeRYWplboPOMGNP_nS3wCo",
  authDomain: "social-auth-305d2.firebaseapp.com",
  projectId: "social-auth-305d2",
  storageBucket: "social-auth-305d2.appspot.com",
  messagingSenderId: "652882303546",
  appId: "1:652882303546:web:77c9445cd9fee3e1ebb303",
  measurementId: "G-Y5TL7429WG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const google = new GoogleAuthProvider();
export const facebook = new FacebookAuthProvider();
export const twitter = new TwitterAuthProvider();

const analytics = getAnalytics(app);
