import React, { useState, useEffect } from 'react';
import firebase from '../firebase';

/** Hook personalizado para guardar los datos de un usuario autenticado en el State */
const useAuth = () => {

    /** Define State */
    const [ authenticatedUser, setAuthenticatedUser ] = useState( null );       // Para los datos del formulario

    /** Tracking 'authenticatedUser' 
     *  Mantiene actualizado el estado del usuario autenticado en el State de la aplicación
    */
    useEffect( () => {
        /** Obtén el usuario con sesión activa */
        const unsubscribe = firebase .auth .onAuthStateChanged( user => {
            if( user ) {
                setAuthenticatedUser( user );
            } else {
                setAuthenticatedUser( null );
            }
        });

        return () => unsubscribe();
    }, [] );

    return authenticatedUser;
}

export default useAuth;