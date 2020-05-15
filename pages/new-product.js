import React, { useState, useContext } from 'react';
import Router, { useRouter } from 'next/router';

import { css } from '@emotion/core';

/** Components */
import MainLayout from '../components/layouts/MainLayout';  

/** Style Components */
import { Form, Field, Button, Error } from '../components/ui/Form';

/** Hooks */
import useValidateForm from '../hooks/useValidateForm';

/** Reglas de Validación */
import validateNewProduct from '../validations/new-product';

/** Firebase */
import { FirebaseContext } from '../firebase';

/** Define estructura de datos del componente */
const STATE = {
    name: '',
    companyName: '',
    briefCompanyDescription: '',
    productName: '',
    //productImage: '',
    productUrl: '',
    productDescription: ''
};

/** Component */
const NewProduct = () => {

    const 
        /** Implementa Hook de Validación */
        {
            dataForm, errors,       // States definidos en el Hook
            handleChange, handleSubmit, handleBlur      // Funciones definidas en el Hook
        } = useValidateForm( 
            STATE,                  // State inicial para el componente
            validateNewProduct,     // Reglas de validación para el componente
            createProduct           // Funcion que se ejecutará si la validación es exitosa
        ),
        /** Define state to handle errors */
        [ error, setError ] = useState( false ),
        /** Destructuring del State de datos del formulario */
        { name, companyName, briefCompanyDescription, productName, productImage, productUrl, productDescription } = dataForm,
        /** Destructuring properties 'FirebaseContext' */
        { user, firebase } = useContext( FirebaseContext ),
        /** Hook del Router de Next */
        router = useRouter();

    /** Create user account */
    async  function createProduct() {

        /** Valida si el usuario No esta autenticadoen Firebase */
        if( user ) {
            return router .push( '/login' );        // Redirecciona usando el router de Next
        }

        /** Crea el nuevo producto */
        const newProduct = {
            name,
            companyName,
            briefCompanyDescription,
            productName,
            //productImage,
            productUrl,
            productDescription,
            votes: 0,
            comments: [],
            creationDate: Date .now()
        };

        /** Inserta nuevo producto a la base de datos de Firebase */
        firebase .db .collection( 'products' ) .add( newProduct );
    }

    return (
        <MainLayout>
            <h1
                css={ css `
                    text-align: center;
                    margin-top: 5rem; 
                `}
            >Nuevo Producto</h1>
            <Form
                onSubmit={ handleSubmit }
                noValidate
            >
                { error 
                    ?   <Error>{ error }</Error>
                    :   null
                } 
                <fieldset>
                    <legend>Información General</legend>

                    <Field>
                        <label htmlFor="name">Persona a cargo</label>
                        <input 
                            type="text"
                            id="name"
                            placeholder="Nombre de persona encargada"
                            name="name"
                            value={ name }
                            onChange={ handleChange }
                            onBlur={ handleBlur }
                        />
                    </Field>
                    { errors .name && <Error>{ errors .name }</Error> }
                    
                    <Field>
                        <label htmlFor="companyName">Empresa</label>
                        <input 
                            type="text"
                            id="companyName"
                            placeholder="Nombre de la empresa"
                            name="companyName"
                            value={ companyName }
                            onChange={ handleChange }
                            onBlur={ handleBlur }
                        />
                    </Field>
                    { errors .companyName && <Error>{ errors .companyName }</Error> }

                    <Field>
                        <label htmlFor="briefCompanyDescription">Descripción</label>
                        <textarea 
                            id="briefCompanyDescription"
                            placeholder="Breve descripción de las actividades de la empresa"
                            name="briefCompanyDescription"
                            value={ briefCompanyDescription }
                            onChange={ handleChange }
                            onBlur={ handleBlur }
                        />
                    </Field>
                    { errors .briefCompanyDescription && <Error>{ errors .briefCompanyDescription }</Error> }

                </fieldset>
                <fieldset>
                    <legend>Información del Producto</legend>

                    <Field>
                        <label htmlFor="productName">Producto</label>
                        <input 
                            type="text"
                            id="productName"
                            placeholder="Nombre del producto"
                            name="productName"
                            value={ productName }
                            onChange={ handleChange }
                            onBlur={ handleBlur }
                        />
                    </Field>
                    { errors .productName && <Error>{ errors .productName }</Error> }

                    {/* <Field>
                        <label htmlFor="productImage">Imagen</label>
                        <input 
                            type="file"
                            id="productImage"
                            name="productImage"
                            value={ productImage }
                            onChange={ handleChange }
                            onBlur={ handleBlur }
                        />
                    </Field>
                    { errors .productImage && <Error>{ errors .productImage }</Error> } */}

                    <Field>
                        <label htmlFor="productUrl">URL</label>
                        <input 
                            type="url"
                            id="productUrl"
                            placeholder="URL del producto"
                            name="productUrl"
                            value={ productUrl }
                            onChange={ handleChange }
                            onBlur={ handleBlur }
                        />
                    </Field>
                    { errors .productUrl && <Error>{ errors .productUrl }</Error> }

                    <Field>
                        <label htmlFor="productDescription">Descripción</label>
                        <textarea 
                            id="productDescription"
                            placeholder="Descripción detallada del producto"
                            name="productDescription"
                            value={ productDescription }
                            onChange={ handleChange }
                            onBlur={ handleBlur }
                        />
                    </Field>
                    { errors .productDescription && <Error>{ errors .productDescription }</Error> }

                </fieldset>
                
                <Field>
                    <Button 
                        type="submit"
                    >Crear Producto</Button>
                </Field>
            </Form>
        </MainLayout>
    );
}

export default NewProduct;