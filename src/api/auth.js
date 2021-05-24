import { auth } from "./firebase";
import {db} from "./firebase";
import {storage} from "./firebase";

export async function Signup(email, password) {
    return auth().createUserWithEmailAndPassword(email, password);
};

export function Signin(email, password) {
    return auth().signInWithEmailAndPassword(email, password);
};

export function signInWithGoogle() {
    const provider = new auth.GoogleAuthProvider();
    return auth().signInWithPopup(provider);
};
