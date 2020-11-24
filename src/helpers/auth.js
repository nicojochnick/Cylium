import { auth } from "../api/firebase";
import {db} from "../api/firebase";


export function Signup(email, password) {

    // Add a new document in collection "users"
    db.collection("users").doc(email).set({
        email: email,
        boxURL: Date.now()

    }).then(function() {
            console.log("Document successfully written!");
    }).catch(function(error) {
            console.error("Error writing document: ", error);
        });

    return auth().createUserWithEmailAndPassword(email, password);
}

export function Signin(email, password) {
    return auth().signInWithEmailAndPassword(email, password);
}
export function signInWithGoogle() {
    const provider = new auth.GoogleAuthProvider();
    return auth().signInWithPopup(provider);
}
