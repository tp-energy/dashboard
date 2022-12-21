// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqUUB0eW44rcdYqGDXvK7Lozgv_0gI4Mk",
  authDomain: "teamphon-backend.firebaseapp.com",
  projectId: "teamphon-backend",
  storageBucket: "teamphon-backend.appspot.com",
  messagingSenderId: "934056366670",
  appId: "1:934056366670:web:6ca3ddf07ff51b4041291f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);