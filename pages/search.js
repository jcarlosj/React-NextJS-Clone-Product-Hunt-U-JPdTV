import React, { useEffect, useState } from 'react';  
import { useRouter } from 'next/router';                

/** Dependencies */
import { css } from '@emotion/core';

/** Components  */
import MainLayout from '../components/layouts/MainLayout';
import ProductDetail from '../components/layouts/ProductDetail';

/** Hooks */
import useProducts from '../hooks/useProducts';

/** Component */
const Search = () => {

    const 
        /** Define State 'results' */
        [ resultsObtained, setResultsObtained ] = useState([]),
        /** Obtine parametros pasados al componente por la URL */
        router = useRouter(),
        { query: { q } } = router,
        /** Destructuring hook data 'products' */
        { products } = useProducts( 'creationDate' );    // Establece la propiedad que establecerá el ordenamiento de nuestra lista de productos

    console .log( 'Termino de busqueda', q );
    
    /** Tracking 'q' & 'products' */
    useEffect( () => {
        const 
            searchTerm = q .toLowerCase(),
            productsFound = products .filter( product => {
                return (
                    product .productName .toLowerCase() .includes( searchTerm )
                    || product .productDescription .toLowerCase() .includes( searchTerm )
                );
            });

        console .log( 'Productos Encontrados', productsFound );

        setResultsObtained( productsFound );    // Update State 

    }, [ q, products ] );

    return (
        <MainLayout>
            <div className="product-list">
                <div className="container">
                    <ul className="bg-white">
                        { ( resultsObtained .length === 0 )
                            ?   <h3 css={ css `
                                    padding: 3rem 0;
                                    text-align: center;
                                ` }>No se encontro productos con resultados cohincidentes</h3>
                            :   resultsObtained .map( product => (
                                    <ProductDetail
                                        key={ product .id }
                                        product={ product }
                                    />
                                ))
                        }
                    </ul>
                </div>
            </div>
        </MainLayout>
    )
}

export default Search;