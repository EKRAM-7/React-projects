import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';

export async function signUp(email, pw) {
    return await createUserWithEmailAndPassword(auth, email, pw);
}

export async function signIn(email, pw) {
    return await signInWithEmailAndPassword(auth, email, pw);
}