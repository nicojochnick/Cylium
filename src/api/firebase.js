import firebase from 'firebase';
import "firebase/auth";
import "firebase/database";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
    apiKey: "AIzaSyBSudatASG50WXqSeQxQVO7lKhktgoEZaw",
    authDomain: "feedboxx-e6837.firebaseapp.com",
    databaseURL: "https://feedboxx-e6837.firebaseio.com",
    projectId: "feedboxx-e6837",
    storageBucket: "feedboxx-e6837.appspot.com",
    messagingSenderId: "291483743497",
    appId: "1:291483743497:web:5f3f63264105231f6a0fd8",
    measurementId: "G-LKMXWVRD9S"
};

firebase.initializeApp(config);
export const auth = firebase.auth;
export const db = firebase.database();
