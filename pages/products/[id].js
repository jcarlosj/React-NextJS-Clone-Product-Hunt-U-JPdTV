import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';

import { FirebaseContext } from '../../firebase';

/** Dynamic Component 
 * Construirá un Componente para cada ruta dinámica
*/
const Product = () => {

    const
        [ product, setProduct ] = useState({}),
        { firebase } = useContext( FirebaseContext ),
    /** Obtener el parámetro pasado por la URL */
        router = useRouter(),
        { query: { id } } = router;     // Destructuring para obtener el ID del producto

    console .log( 'ID', id );

    /** Tracking 'id' */
    useEffect( () => {
        /** Valida que el ID exista */
        if( id ) {
            /** Get product  */
            const getProduct = async () => {
                const /** Query to get product by Id in Firebase */
                    response = await firebase .db .collection( 'products' ) .doc( id ),
                    product = await response .get();

                console .log( 'Product ', product .data() );
                setProduct( product .data() );
            } 
            getProduct();
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