import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";

import {
  getFirestore,
} from "firebase/firestore";

import {
  getStorage,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBqchJoTGV8uoccsBs86k7LZQLz1cQvHyQ",
  authDomain: "habit-tracker-178f6.firebaseapp.com",
  projectId: "habit-tracker-178f6",
  storageBucket: "habit-tracker-178f6.firebasestorage.app",
  messagingSenderId: "959583632783",
  appId:
    "1:959583632783:web:c4036f94bea2ac5b021ffa",
};

const app =
  initializeApp(firebaseConfig);

export const auth =
  getAuth(app);

export const provider =
  new GoogleAuthProvider();

export const db =
  getFirestore(app);

export const storage =
  getStorage(app);

console.log(
  "Firebase Connected"
);