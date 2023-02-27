import {auth} from "../../globals/firebase";


let promise;
export default class FirebaseService {

    async login(data) {

        promise = await auth.signInWithEmailAndPassword(auth.getAuth(), data.email, data.password);

        return promise;
    }

    async google() {
        const provider = new auth.GoogleAuthProvider();


        promise = await auth.signInWithPopup(auth.getAuth(), provider);

        return promise;
    }

    async password_reset(email) {
        promise = await auth.sendPasswordResetEmail(auth.getAuth(), email);

        return promise;
    }

    async get_user_by_email(data) {
        promise = await auth.getUser

        return promise;
    }
}

export const firebaseService = new FirebaseService();
