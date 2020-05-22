import React from 'react';                  

/** Components  */
import MainLayout from '../components/layouts/MainLayout';
import ProductDetail from '../components/layouts/ProductDetail';

/** Hooks */
import useProducts from '../hooks/useProducts';

/** Component */
const Popular = () => {

    /** Destructuring hook data 'use products' */
    const { products } = useProducts( 'votes' );    // Establece la propiedad que establecerá el ordenamiento de nuestra lista de productos

    return (
        <MainLayout>
            <div className="product-list">
                <div className="container">
                    <ul className="bg-white">
                        { ! products 
                            ?   <p>No hay productos</p>
                            :   products .map( product => (
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

export default Popular;