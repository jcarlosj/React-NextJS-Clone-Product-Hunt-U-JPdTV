import app from 'firebase/app';

import firebaseConfig from './config';

/** Class */
class Firebase {

    constructor() {
        if( !app .apps .length ) {
            // Initialize Firebase
            app .initializeApp( firebaseConfig );
        }
    }

}

const firebase = new Firebase();
export default firebase;