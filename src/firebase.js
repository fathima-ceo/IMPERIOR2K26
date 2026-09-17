import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

/*
  1. Create a Firebase project.
  2. Enable Firestore Database.
  3. Create a Web App.
  4. Paste the config below.
  5. For local/demo mode, leave the placeholders unchanged.
*/

const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.firebasestorage.app",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

export const firebaseEnabled = !Object.values(firebaseConfig).some(value =>
  String(value).startsWith("YOUR_")
);

export const db = firebaseEnabled
  ? getFirestore(initializeApp(firebaseConfig))
  : null;
