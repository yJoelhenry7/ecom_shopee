// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDl0QMISBr9KBSKE5xXQPHakUXAD8DrtkA",
  authDomain: "studentlearn-f085c.firebaseapp.com",
  projectId: "studentlearn-f085c",
  storageBucket: "studentlearn-f085c.appspot.com",
  messagingSenderId: "623664715427",
  appId: "1:623664715427:web:7494f273d41fca9334d116",
  measurementId: "G-311DE76NTD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);