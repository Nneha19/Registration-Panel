import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

//configuration
const firebaseConfig = {
  apiKey:"",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId:"",
  appId:"",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);

export const auth = getAuth();
export default app;
