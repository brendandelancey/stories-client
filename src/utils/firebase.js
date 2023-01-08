// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAEuYi3VD7Bwidib_V3c6KoPMyl52YFqe0",
  authDomain: "lac-media.firebaseapp.com",
  databaseURL: "https://lac-media.firebaseio.com",
  projectId: "lac-media",
  storageBucket: "lac-media.appspot.com",
  messagingSenderId: "170654381250",
  appId: "1:170654381250:web:9b67a5618270a1e5b4775b",
  measurementId: "G-WC2WTG2RBF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const analytics = getAnalytics(app);

export { auth };
export default app;
