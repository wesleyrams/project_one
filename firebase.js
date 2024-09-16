// firebase-config.js
const { initializeApp } = require('firebase/app');
const { getStorage } = require('firebase/storage');

const firebaseConfig = {
  apiKey: "AIzaSyCXV-2RqhKoSYuPP9d3fc04vfKbfaHX0Pk",
  authDomain: "nossoday-dd4c0.firebaseapp.com",
  projectId: "nossoday-dd4c0",
  storageBucket: "nossoday-dd4c0.appspot.com",
  messagingSenderId: "939826146125",
  appId: "1:939826146125:web:138a865ea2311632e76504",
  measurementId: "G-7FCTK5KKFL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the storage service
const storage = getStorage(app);

module.exports = { storage };
