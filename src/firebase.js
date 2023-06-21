import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBrIRTOGoyOLa-jHrZshhwRahII5aHUvdg",
  authDomain: "memo-3adaf.firebaseapp.com",
  projectId: "memo-3adaf",
  storageBucket: "memo-3adaf.appspot.com",
  messagingSenderId: "1016122033462",
  appId: "1:1016122033462:web:2d4d5bda012380a0335f97",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };

