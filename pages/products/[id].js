import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';

/** Dependencies */
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale';

/** Context */
import { FirebaseContext } from '../../firebase';

/** Components */
import MainLayout from '../../components/layouts/MainLayout';  
import Error404 from '../../components/layouts/404';
import { Field, Button } from '../../components/ui/Form';

/** Define Style Components */
const 
    InfoProduct = styled .article `
        @media( min-width: 768px ) {
            column-gap: 2rem;
            display: grid;
            grid-template-columns: 2fr 1fr;
        }
    `;

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
        { query: { id } } = router,     // Destructuring para obtener el ID del producto
        { name, companyName, productName, productUrl, productImageUrl, productDescription, comments, votes, creationDate } = product;

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
            <div className="container">
                { error 
                    ?   <Error404 />
                    :   <>
                            { ( Object .keys( product ) .length === 0 ) ? 'Cargando...' : '' }
                            <h1 
                                css={ css `
                                    margin-top: 5rem;
                                    text-align: center;
                                ` }
                            >{ companyName }</h1>
                            <InfoProduct>
                                <section>
                                    {/* TODO: Fix Display Date 
                                        <p>Publicado hace { formatDistanceToNow( new Date( creationDate ), {locale: es} )} </p> */}
                                    <img src={ productImageUrl } />
                                    <p>{ productDescription }</p>

                                    <h2>Agrega tu comentario</h2>
                                    <form>
                                        <Field>
                                            <input 
                                                type="text"
                                                name="message"
                                            />
                                        </Field>
                                        <Field>
                                            <Button 
                                                type="button"
                                            >Agregar comentario</Button>
                                        </Field>
                                    </form>

                                    <h2
                                        css={ css `
                                            margin: 2rem;
                                        ` }
                                    >Comentarios</h2>
                                    { comments
                                        ?   <ul>
                                                { comments .map( comment => (
                                                    <li>
                                                        <p>{ comment .message }</p>
                                                        <p>Escrito por: { comment .userName }</p>
                                                    </li>
                                                ))}

                                            </ul>
                                        :   <p>No hay comentarios</p> 
                                    }
                                </section>
                                <aside>

                                </aside>
                            </InfoProduct>   
                        </>
                }
            </div>
        </MainLayout>
    );
}

export default Product;