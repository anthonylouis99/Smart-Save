// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzV6JwmqV3k82UZDpTW2asB0flN7SiNF4",
  authDomain: "smart-save-a659c.firebaseapp.com",
  projectId: "smart-save-a659c",
  storageBucket: "smart-save-a659c.firebasestorage.app",
  messagingSenderId: "919258235337",
  appId: "1:919258235337:web:9f3f003c42c590cb2c2818",
  measurementId: "G-E9M3RJ7007"
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

