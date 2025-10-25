import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhp1CAPaJ5X2yXuq3tHOPz0i1heyaNf7I",
  authDomain: "wantsandneeds-5fac9.firebaseapp.com",
  projectId: "wantsandneeds-5fac9",
  storageBucket: "wantsandneeds-5fac9.firebasestorage.app",
  messagingSenderId: "295957066079",
  appId: "1:295957066079:web:730abcd095f71c55f646ea"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
