// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnkSzpzlNIJ-lwkjxljBKWJBOFznzQC_A",
  authDomain: "reactjs-assessment-ccd2a.firebaseapp.com",
  projectId: "reactjs-assessment-ccd2a",
  storageBucket: "reactjs-assessment-ccd2a.appspot.com",
  messagingSenderId: "679664769539",
  appId: "1:679664769539:web:1607ab1e1c94aaaa37cc36"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export const db = getDatabase(firebase)