import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyAq_CRH1OwpLk4SjcRNY5IFkRxk0X6eIRI",
  authDomain: "prayertime-73dea.firebaseapp.com",
  projectId: "prayertime-73dea",
  storageBucket: "prayertime-73dea.firebasestorage.app",
  messagingSenderId: "838870202940",
  appId: "1:838870202940:web:4073c947db99c82e926139",
  measurementId: "G-MPXZB7EQP4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

export default app;
