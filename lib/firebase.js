
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from 'firebase/auth';
import { getDatabase } from "firebase/database";
// https://firebase.google.com/docs/web/setup#available-libraries

//web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5fkhdSemmbcu4DZZqLp44X5fgvKupxiE",
  authDomain: "doodle-dash-8571c.firebaseapp.com",
  projectId: "doodle-dash-8571c",
  storageBucket: "doodle-dash-8571c.firebasestorage.app",
  messagingSenderId: "27310148528",
  appId: "1:27310148528:web:bda31e7472fe50542da475",
  databaseURL: "https://doodle-dash-8571c-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // Initializing firebase firstore
export const auth = getAuth(app); // initializing firebase auth
export const rtdb = getDatabase(app) // initializing firebase real time database