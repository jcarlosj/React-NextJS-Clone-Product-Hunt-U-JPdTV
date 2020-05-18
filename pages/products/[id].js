import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

/** Dynamic Component 
 * Construirá un Componente para cada ruta dinámica
*/
const Product = () => {

    const   /** Obtener el parámetro pasado por la URL */
        router = useRouter(),
        { query: { id } } = router;     // Destructuring para obtener el ID del producto

    console .log( 'ID', id );

    /** Tracking 'id' */
    useEffect( () => {
        /** Valida que el ID exista */
        if( id ) {
            console .log( `Ya hay un ID` );
        }
    }, [ id ] );

    return (
        <>
            <h1>Archivo [id].js</h1>
            <p>ID: { id }</p>
        </>
    );
}

export default Product;