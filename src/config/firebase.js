// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAEbFqW-9w6UdiUlZ9ZVLhLQsEQi0M903A",
  authDomain: "ecommreceweb.firebaseapp.com",
  projectId: "ecommreceweb",
  storageBucket: "ecommreceweb.appspot.com",
  messagingSenderId: "369523384217",
  appId: "1:369523384217:web:dbe8ce4012dd833e5b3d08",
  measurementId: "G-HBQPT1VP8F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app)
export { analytics, auth,db}