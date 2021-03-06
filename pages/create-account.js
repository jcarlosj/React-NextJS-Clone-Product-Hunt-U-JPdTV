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
    email: '',
    password: ''
};

/** Component */
const CreateAccount = () => {

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
        { name, email, password } = dataForm;

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
            >Crear Cuenta</h1>
            <Form
                onSubmit={ handleSubmit }
                noValidate
            >
                { error 
                    ?   <Error>{ error }</Error>
                    :   null
                } 
                <Field>
                    <label htmlFor="name">Nombre</label>
                    <input 
                        type="text"
                        id="name"
                        placeholder="Nombre de pila"
                        name="name"
                        value={ name }
                        onChange={ handleChange }
                        onBlur={ handleBlur }
                    />
                </Field>
                { errors .name && <Error>{ errors .name }</Error>}
                <Field>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email"
                        id="email"
                        placeholder="Correo Electrónico"
                        name="email"
                        value={ email }
                        onChange={ handleChange }
                        onBlur={ handleBlur }
                    />
                </Field>
                { errors .email && <Error>{ errors .email }</Error>}
                <Field>
                    <label htmlFor="name">Contraseña</label>
                    <input 
                        type="password"
                        id="password"
                        placeholder="Una clave de acceso"
                        name="password"
                        value={ password }
                        onChange={ handleChange }
                        onBlur={ handleBlur }
                    />
                </Field>
                { errors .password && <Error>{ errors .password }</Error>}  
                <Field>
                    <Button 
                        type="submit"
                    >Crear Cuenta</Button>
                </Field>
            </Form>
        </MainLayout>
    )
}

export default CreateAccount;