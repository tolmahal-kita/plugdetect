import { initializeApp, getApp, getApps } from "firebase/app";

// It's recommended to store this in environment variables for production
export const firebaseConfig = {
  projectId: "studio-2732920271-b0051",
  appId: "1:479199464389:web:2d1d71e32bc52755fc99ac",
  apiKey: "AIzaSyBDD17SkQhXOzM82cfnHqMuK6UZ38xZnLs",
  authDomain: "studio-2732920271-b0051.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "479199464389",
  databaseURL: "https://studio-2732920271-b0051.firebaseio.com",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export { app };
