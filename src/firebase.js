// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAo0sXN1aeb95oJf3tm31ITGMXDVu8isyQ",
  authDomain: "coffeefuel-4eee7.firebaseapp.com",
  projectId: "coffeefuel-4eee7",
  storageBucket: "coffeefuel-4eee7.appspot.com",
  messagingSenderId: "979512079125",
  appId: "1:979512079125:web:28b5062bec65280d2f6f1c",
  measurementId: "G-5HWXQNMFZM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);