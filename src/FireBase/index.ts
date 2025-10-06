// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJhdFaM6qBrBbScwfosDys5tyCUMzuU68",
  authDomain: "test-app-7ffe5.firebaseapp.com",
  projectId: "test-app-7ffe5",
  storageBucket: "test-app-7ffe5.firebasestorage.app",
  messagingSenderId: "963095422161",
  appId: "1:963095422161:web:5ed41d2bc9d4818e72d1f0",
  measurementId: "G-24V3362X0V"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

