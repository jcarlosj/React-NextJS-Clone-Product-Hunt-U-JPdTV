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
    `,
    Creator = styled .p `
        border: 1px solid #DA552F;
        color: #DA552F;
        display: inline-block;
        font-weight: bold;
        margin-right: 1rem;
        padding: .5rem 2rem;
        text-align: center;
        text-transform: uppercase;
    `;

/** Dynamic Component 
 * Construirá un Componente para cada ruta dinámica
*/
const Product = () => {

    const
        [ product, setProduct ] = useState( {} ),
        [ comment, setComment ] = useState( {} ),
        [ queryDatabase, setQueryDatabase ] = useState( true ),
        [ error, setError ] = useState( false ),
        { user, firebase } = useContext( FirebaseContext ),
    /** Obtener el parámetro pasado por la URL */
        router = useRouter(),
        { query: { id } } = router,     // Destructuring para obtener el ID del producto
        { name, companyName, productName, productUrl, productImageUrl, productDescription, comments, votes, voters, creationDate, creator } = product;

    console .log( 'ID', id );

    /** Tracking 'id' */
    useEffect( () => {
        /** Valida que el ID exista */
        if( id && queryDatabase ) {
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
                    setQueryDatabase( false );      // Update State
                } else {
                    setError( true );               // Update State
                    setQueryDatabase( false );      // Update State
                }
                
            } 
            getProduct();
        }
    }, [ id ] );

    /** Identify product creator comment */
    const isCreator = id => {
        if( id === creator .id ) {
            return true;
        }

        return false;
    }

    /** Can You Delete Product? */
    const canYouDeleteProduct = () => {
        /** Valida NO hay un usuario registrado */
        if( ! user ) return false;

        /** Verify that the creator of the product is the same authenticated user */
        if( creator .id === user .uid ) {
            return true;
        }

        return false;
    }

    /** Delete Product */
    const handleDeteleProduct = async () => {
        
        /** Valida NO hay un usuario registrado */
        if( ! user ) return router .push( '/' );                            // Redirecciona usando Next

        /** Verify that the creator of the product is the same authenticated user */
        if( creator .id !== user .uid ) return router .push( '/' );        // Redirecciona usando Next

        try {
            await firebase .db .collection( 'products' ) .doc( id ) .delete();
            router .push( '/' );

        } catch ( error ) {
            console .log( error );
        }

    }

    /** Vote a product */
    const handleOnClickVote = () => {
        /** Valida NO hay un usuario registrado */
        if( ! user ) return router .push( '/' );        // Redirecciona usando Next

        /** Check if a user has already voted */
        if( voters .includes( user .uid ) ) {
            console .log( `Este usuario con id ${ user .uid } ya ha votado este producto!` );
            return;
        }

        const totalNewVotes = votes + 1;

        /** Query to update property 'votes' of product by Id in Firebase */
        firebase .db 
            .collection( 'products' ) 
            .doc( id ) 
            .update({ 
                votes: totalNewVotes,               // Update number of votes
                voters: [ ...voters, user .uid ]    // Update user ID on list voters
            });        

        /** Update State 'product' */
        setProduct({
            ...product,
            votes: totalNewVotes
        });
        
        setQueryDatabase( true );      // Update State 'queryDatabase'
    }

    /** Handle change field values form */
    const handleChangeComment = event => {
        setComment({
            ...comment,
            [ event .target .name ]: event .target .value
        });
    }

    /** Handle value change of form fields */
    const handleSubmitComment = event => {
        event .preventDefault();

        console .log( 'Hola mi pez' );

        /** Valida NO hay un usuario registrado */
        if( ! user ) return router .push( '/' );        // Redirecciona usando Next

        /** Inserta datos adicionales al comentario */
        comment[ 'uid' ] = user .uid;
        comment[ 'userName' ] = user .displayName;
        comment[ 'creationDate' ] = Date .now();
        
        const newComments = [ ...comments, comment ];

        /** Consulta para actualizar datos en Firebase */
        firebase .db 
            .collection( 'products' )
            .doc( id )
            .update({
                comments: newComments
            });
        

        /** Update State 'comments' */
        setProduct({
            ...product,
            comments: newComments
        });

        setQueryDatabase( true );      // Update State 'queryDatabase'

    }

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
                                                        <form
                                                            onSubmit={ handleSubmitComment }
                                                        >
                                                            <Field>
                                                                <input 
                                                                    type="text"
                                                                    name="message"
                                                                    onChange={ handleChangeComment }
                                                                />
                                                            </Field>
                                                            <Field>
                                                                <Btn 
                                                                    type="submit"
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
                                                            { comments .map( ( comment, i ) => (
                                                                <li
                                                                    key={ `${ comment .uid }-${ i }` }
                                                                    css ={ css `
                                                                        border: 1px solid #E1E1E1;
                                                                        margin: 1.4rem 0;
                                                                        padding: 2rem;
                                                                    `}
                                                                >
                                                                    <div css={ css `
                                                                        font-size: 2rem;
                                                                        margin: 0;
                                                                    `}>
                                                                        { isCreator && 
                                                                            <Creator>Creador</Creator>
                                                                        }<b>Escrito por:</b> { comment .userName }
                                                                    </div>
                                                                    <p css={ css `
                                                                        font-size: 2rem;
                                                                        margin: 0;
                                                                    `}>{ comment .message }</p>
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
                                                            onClick={ handleOnClickVote }
                                                        >Votar</Button>
                                                    }
                                                </div>
                                                { canYouDeleteProduct() && 
                                                    <Button
                                                        href="#!"
                                                        css={ css `
                                                            border: 3px solid red;
                                                            color: red;    
                                                            margin: 9rem 0 1rem 0;
                                                        `}
                                                        onClick={ handleDeteleProduct }
                                                    >Eliminar Producto</Button>
                                                }  
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