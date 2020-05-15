import React, { useState } from 'react';
import Router from 'next/router';

import { css } from '@emotion/core';

/** Components */
import MainLayout from '../components/layouts/MainLayout';  

/** Style Components */
import { Form, Field, Button, Error } from '../components/ui/Form';

/** Hooks */
import useValidateForm from '../hooks/useValidateForm';

/** Reglas de Validación */
import validateCreateAccount from '../validations/create-account'

/** Firebase */
import firebase from '../firebase';

/** Define estructura de datos del componente */
const STATE = {
    name: '',
    companyName: '',
    briefCompanyDescription: '',
    productName: '',
    productImage: '',
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
            validateCreateAccount,  // Reglas de validación para el componente
            createUserAccount       // Funcion que se ejecutará si la validación es exitosa
        ),
        /** Define state to handle errors */
        [ error, setError ] = useState( false ),
        /** Destructuring del State de datos del formulario */
        { name, companyName, briefCompanyDescription, productName, productImage, productUrl, productDescription } = dataForm;

    /** Create user account */
    async  function createUserAccount() {

        try {
            /** Register new account in firebase */
            const user = await firebase .createUser( name, email, password );    
            console .log( 'createAccount', user );
            Router .push( '/' );         // Redirecionamos usando el Router de Next

        } catch ( error ) {
            console .error( error .message );
            setError( error .message );
        }

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
                            value={ name }
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

                    <Field>
                        <label htmlFor="productImage">Imagen</label>
                        <input 
                            type="file"
                            id="productImage"
                            name="productImage"
                            value={ name }
                            onChange={ handleChange }
                            onBlur={ handleBlur }
                        />
                    </Field>
                    { errors .productImage && <Error>{ errors .productImage }</Error> }

                    <Field>
                        <label htmlFor="productUrl">URL</label>
                        <input 
                            type="url"
                            id="productUrl"
                            placeholder="URL del producto"
                            name="productUrl"
                            value={ name }
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