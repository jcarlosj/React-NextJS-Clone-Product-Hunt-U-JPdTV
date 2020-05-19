import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';

/** Context */
import { FirebaseContext } from '../../firebase';

/** Components */
import MainLayout from '../../components/layouts/MainLayout';  
import Error404 from '../../components/layouts/404';

/** Dynamic Component 
 * Construirá un Componente para cada ruta dinámica
*/
const Product = () => {

    const
        [ product, setProduct ] = useState({}),
        [ error, setError ] = useState( false ),
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

                /** Valida si el registro existe en Firebase (exists es un método de Firebase) */
                if( product .exists ) {
                    setProduct( product .data() );  // Update State
                    setError( false );              // Update State
                } else {
                    setError( true );               // Update State
                }

            } 
            getProduct();
        }
    }, [ id ] );

    return (
        <MainLayout>
            { error 
                ?   <Error404 />
                :   <>
                        <h1>Archivo [id].js</h1>
                        <p>ID: { id }</p>   
                    </>
            }
        </MainLayout>
    );
}

export default Product;