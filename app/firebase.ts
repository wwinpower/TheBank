// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAuth, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";
import {getFirestore, addDoc} from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCYNEAsbrkaDjysQDw4m_JQNF7dA771Itc",
    authDomain: "thebank-5c0d8.firebaseapp.com",
    projectId: "thebank-5c0d8",
    storageBucket: "thebank-5c0d8.appspot.com",
    messagingSenderId: "287038076622",
    appId: "1:287038076622:web:671eeedccb56e93557429f",
    measurementId: "G-BMD0ZZT8XT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export const register = (email: string, password: string) => createUserWithEmailAndPassword(auth, email, password);

export const login = (email: string, password: string) => signInWithEmailAndPassword(auth, email, password);

export const logout = () => signOut(auth);

export const db = getFirestore()


