import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCOMapGubrDRkpazD5cldFISGBCfRMyhOY",
    authDomain: "media-chat-86bfa.firebaseapp.com",
    databaseURL: "https://media-chat-86bfa.firebaseio.com",
    projectId: "media-chat-86bfa",
    storageBucket: "media-chat-86bfa.appspot.com",
    messagingSenderId: "168596146422",
    appId: "1:168596146422:web:84a524e2d0dec50ef3c4d7",
    measurementId: "G-BLDD3T3BXK"
  };

export const myFirebase = firebase.initializeApp(firebaseConfig);
const baseDb = myFirebase.firestore();
export const db = baseDb;