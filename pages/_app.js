import App from 'next/app';
import firebase, { FirebaseContext } from '../firebase';

/** Next: 
 *  Archivo sobre el Layout (Archivo principal para la configuración)
 *  Equivale al archivo App.js de una aplicación create-react-app */

/** Provider */
const AppState = props => {

    /** Destructuring Next properties */
    const { Component, pageProps } = props;     // Component (El actual), propsPage (props del componente pasado)

    return (
        <FirebaseContext .Provider
            value={{
                firebase
            }}
        >
            <Component { ...pageProps } />
        </FirebaseContext .Provider>
    );
}

export default AppState;