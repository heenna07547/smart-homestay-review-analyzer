import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyASMlmbXqjxrpsSZJON0JCb3ZqvRkXhjiE",
  authDomain: "smart-homestay-review-analyzer.firebaseapp.com",
  projectId: "smart-homestay-review-analyzer",
  storageBucket: "smart-homestay-review-analyzer.firebasestorage.app",
  messagingSenderId: "957493617367",
  appId: "1:957493617367:web:e10ec5b8b356b1bb704692"
};

// Initialize Firebase

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();