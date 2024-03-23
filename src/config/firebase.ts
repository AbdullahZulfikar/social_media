// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-5NFmZFuHWl8LZTQbJZ4KbaHzGtPgxSE",
  authDomain: "social-media-f4373.firebaseapp.com",
  projectId: "social-media-f4373",
  storageBucket: "social-media-f4373.appspot.com",
  messagingSenderId: "191072406307",
  appId: "1:191072406307:web:728e7f729a149f0028da96",
  measurementId: "G-17V8YLQQHX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)