import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

import firebaseConfig from './config';

/** Class */
class Firebase {

    constructor() {
        if( !app .apps .length ) {
            // Initialize Firebase
            app .initializeApp( firebaseConfig );
        }

        this .auth = app .auth();               // Habilita metodos de autenticacion de firebase 

        /** Firestore & Storage requieren ser habilitados previamente en la plataforma */
        this .db = app .firestore();            // Habilita acceso a base de datos de Firebase
        this .storage = app .storage();         // Habilita acceso al storage de Firebase
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