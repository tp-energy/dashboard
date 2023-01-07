// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqUUB0eW44rcdYqGDXvK7Lozgv_0gI4Mk",
  authDomain: "teamphon-backend.firebaseapp.com",
  projectId: "teamphon-backend",
  storageBucket: "teamphon-backend.appspot.com",
  messagingSenderId: "934056366670",
  appId: "1:934056366670:web:6ca3ddf07ff51b4041291f"
};

// const firebaseConfig = {
//   apiKey: "AIzaSyBPPcMk_ajqb-0rHN6H5YofxjLmlly40k4",
//   authDomain: "teamphon-backend2.firebaseapp.com",
//   projectId: "teamphon-backend2",
//   storageBucket: "teamphon-backend2.appspot.com",
//   messagingSenderId: "658758788404",
//   appId: "1:658758788404:web:5bdeb1f1717ae0c699f161"
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);