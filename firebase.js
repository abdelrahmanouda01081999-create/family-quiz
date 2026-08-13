import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";

import {
  getAuth,
  signInAnonymously
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";

import {
  getDatabase
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-database.js";


const firebaseConfig = {
  apiKey: "AIzaSyBaey6flBMzLve0p-bpsJaG11XlKAAJcNw",
  authDomain: "family-fued-cb71b.firebaseapp.com",
  databaseURL: "https://family-fued-cb71b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "family-fued-cb71b",
  storageBucket: "family-fued-cb71b.firebasestorage.app",
  messagingSenderId: "183974879528",
  appId: "1:183974879528:web:fc92802b2c395bddd7301d"
};


// Start Firebase
const app = initializeApp(firebaseConfig);

// Authentication
const auth = getAuth(app);

// Realtime Database
const db = getDatabase(app);


// Make these available to the other game files
export {
  app,
  auth,
  db,
  signInAnonymously
};
