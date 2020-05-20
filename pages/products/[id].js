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

/** Style Components */
import { Field, Button as Btn } from '../../components/ui/Form';
import Button from '../../components/ui/Button';

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
        { user, firebase } = useContext( FirebaseContext ),
    /** Obtener el parámetro pasado por la URL */
        router = useRouter(),
        { query: { id } } = router,     // Destructuring para obtener el ID del producto
        { name, companyName, productName, productUrl, productImageUrl, productDescription, comments, votes, creationDate, creator } = product;

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
                            { ( Object .keys( product ) .length === 0 ) 
                                ?   <p
                                        css={ css `
                                            text-align: center;
                                        ` }
                                    >Cargando...</p>
                                :   <>
                                        <hgroup
                                            css={ css `
                                                margin: 4rem 0;
                                                text-align: center;
                                            ` }
                                        >
                                            <h1 
                                                css={ css `
                                                    margin: 0;
                                                ` }
                                            >{ productName }</h1>
                                            <h2
                                                css={ css `
                                                    margin: 0;
                                                    font-weight: normal;
                                                ` }
                                            >{ name } - { companyName }</h2>
                                        </hgroup>
                                        <InfoProduct>
                                            <section> 
                                                <img src={ productImageUrl } />
                                                <p>{ productDescription }</p>

                                                { user && 
                                                    <>
                                                        <h2>Agrega tu comentario</h2>
                                                        <form>
                                                            <Field>
                                                                <input 
                                                                    type="text"
                                                                    name="message"
                                                                />
                                                            </Field>
                                                            <Field>
                                                                <Btn 
                                                                    type="button"
                                                                >Agregar comentario</Btn>
                                                            </Field>
                                                        </form>
                                                    </>
                                                }

                                                <h2
                                                    css={ css `
                                                        margin-top: 2rem;
                                                    ` }
                                                >Comentarios</h2>
                                                { ( comments .length <= 0 )
                                                    ?   <p>No hay comentarios</p> 
                                                    :   <ul>
                                                            { comments .map( comment => (
                                                                <li>
                                                                    <p>{ comment .message }</p>
                                                                    <p>Escrito por: { comment .userName }</p>
                                                                </li>
                                                            ))}

                                                        </ul>
                                                }
                                            </section>
                                            <aside>
                                                <p>Publicado hace { formatDistanceToNow( new Date( creationDate ), { locale: es } ) } por { creator .name }</p>
                                                <Button
                                                    target="_black"
                                                    bgColor="true"
                                                    href={ productUrl }
                                                >Visitar Url</Button>
                                                
                                                <div 
                                                    css={ css `
                                                        margin-top: 5rem;
                                                    `}
                                                >
                                                    <p
                                                        css={ css `
                                                            text-align: center;
                                                        `}
                                                    >{ votes } Votos</p>
                                                    { user && 
                                                        <Button
                                                            href="#!"
                                                        >Votar</Button>
                                                    }
                                                </div>
                                            </aside>
                                        </InfoProduct>   
                                    </>
                            }
                            
                        </>
                }
            </div>
        </MainLayout>
    );
}

export default Product;