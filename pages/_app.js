import App from 'next/app';
import firebase, { FirebaseContext } from '../firebase';

/** Hooks */
import useAuth from '../hooks/useAuth';

/** Next: 
 *  Archivo sobre el Layout (Archivo principal para la configuración)
 *  Equivale al archivo App.js de una aplicación create-react-app */

/** Provider */
const AppState = props => {

    const 
        user = useAuth(),                     // Hook que obtiene informacion de usuario autenticado
        { Component, pageProps } = props;     // Component (El actual), propsPage (props del componente pasado)
    
    console .log( 'User', user );

    return (
        <FirebaseContext .Provider
            value={{
                user,           // State: Estado de autenticación de usuario disponible para toda la App
                firebase        // Funcionalidades de Firebase disponibles para toda la App
            }}
        >
            <Component { ...pageProps } />
        </FirebaseContext .Provider>
    );
}

export default AppState;