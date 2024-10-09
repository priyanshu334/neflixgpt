// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSTm2qV0rYKSLhBpF0N9grzndOgzDXByk",
  authDomain: "netflixgpt-1a0fc.firebaseapp.com",
  projectId: "netflixgpt-1a0fc",
  storageBucket: "netflixgpt-1a0fc.appspot.com",
  messagingSenderId: "911932859054",
  appId: "1:911932859054:web:09ed9adaedfbe2c283833f",
  measurementId: "G-Y63M6JJMCX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);