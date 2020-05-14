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
import validateLogIn from '../validations/log-in';

/** Firebase */
import firebase from '../firebase';

/** Define estructura de datos del componente */
const STATE = {
    email: '',
    password: ''
};

/** Component */
const LogIn = () => {

    const 
        /** Implementa Hook de Validación */
        {
            dataForm, errors,       // States definidos en el Hook
            handleChange, handleSubmit, handleBlur      // Funciones definidas en el Hook
        } = useValidateForm( 
            STATE,                  // State inicial para el componente
            validateLogIn,          // Reglas de validación para el componente
            loginUser               // Funcion que se ejecutará si la validación es exitosa
        ),
        /** Define state to handle errors */
        [ error, setError ] = useState( false ),
        /** Destructuring del State de datos del formulario */
        { email, password } = dataForm;

    /** Login user */
    async  function loginUser() {   
        console .log( `Inicia la sesión` );
    }

    return (
        <MainLayout>
            <h1
                css={ css `
                    text-align: center;
                    margin-top: 5rem; 
                `}
            >Ingresar</h1>
            <Form
                onSubmit={ handleSubmit }
                noValidate
            >
                { error 
                    ?   <Error>{ error }</Error>
                    :   null
                } 
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
                    >Iniciar Sesión</Button>
                </Field>
            </Form>
        </MainLayout>
    );
}

export default LogIn;