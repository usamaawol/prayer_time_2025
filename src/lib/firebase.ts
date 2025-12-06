import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase config (public & safe to use)
const firebaseConfig = {
  apiKey: "AIzaSyAq_CRH1OwpLk4SjcRNY5IFkRxk0X6eIRI",
  authDomain: "prayertime-73dea.firebaseapp.com",
  projectId: "prayertime-73dea",
  storageBucket: "prayertime-73dea.firebasestorage.app",
  messagingSenderId: "838870202940",
  appId: "1:838870202940:web:4073c947db99c82e926139"
};
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services for the rest of your app
export const auth = getAuth(app);
export const db = getFirestore(app);

execute
