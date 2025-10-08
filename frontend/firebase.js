// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "jms1-7de17.firebaseapp.com",
  projectId: "jms1-7de17",
  storageBucket: "jms1-7de17.firebasestorage.app",
  messagingSenderId: "836913795441",
  appId: "1:836913795441:web:d32cb42ea9729a3fc2e6d0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
export {app,auth}