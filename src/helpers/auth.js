import { auth } from "../api/firebase";


export function Signup(email, password) {
    return auth().createUserWithEmailAndPassword(email, password);
}

export function Signin(email, password) {
    return auth().signInWithEmailAndPassword(email, password);
}
export function signInWithGoogle() {
    const provider = new auth.GoogleAuthProvider();
    return auth().signInWithPopup(provider);
}
