import app from 'firebase/app';
import 'firebase/auth';

import firebaseConfig from './config';

/** Class */
class Firebase {

    constructor() {
        if( !app .apps .length ) {
            // Initialize Firebase
            app .initializeApp( firebaseConfig );
            this .auth = app .auth();               // Habilita metodos de autenticacion de firebase 
        }
    }

    /** Create authenticated user in Firebase */
    async createUser( name, email, password ) {
        /** Registra usuario en Firebase */
        const newUser = await this .auth .createUserWithEmailAndPassword( email, password );    
 
        /** Actualiza el nombredel perfil del usuario nuevo */
        await newUser .user .updateProfile({
            displayName: name
        });

        return newUser;
    }

    /** LogIn */
    async logInUser( email, password ) {
        return this .auth .signInWithEmailAndPassword( email, password );
    }

    /** Sign Out */
    async signOutUser() {
        await this .auth .signOut();
    }

}

const firebase = new Firebase();
export default firebase;