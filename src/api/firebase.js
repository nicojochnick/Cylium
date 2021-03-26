import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/storage";
require("firebase/functions");



// Initialize Cloud Functions through Firebase



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

let app = firebase.initializeApp(config);
export const auth = firebase.auth;
export const db = firebase.firestore(app);
export const storage = firebase.storage();
export const functions = firebase.functions();


// export const analytics = firebase.analytics();



//FIREBASE FUNCTIONS

export const streamURL = (userID, observer) => {
    console.log(db.collection('users'));
    return db.collection('users')
        .doc(userID)
        .collection('users')
        .orderBy('created')
        .onSnapshot(observer);
};


