// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBr6iRpXRVtzgYFDqOXBmvDugI73DSv8go",
  authDomain: "netflixgpt-8bbd5.firebaseapp.com",
  projectId: "netflixgpt-8bbd5",
  storageBucket: "netflixgpt-8bbd5.appspot.com",
  messagingSenderId: "551690383523",
  appId: "1:551690383523:web:3b1a67ee5aae888d4bcf16",
  measurementId: "G-ZWQ4JMHMSN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
