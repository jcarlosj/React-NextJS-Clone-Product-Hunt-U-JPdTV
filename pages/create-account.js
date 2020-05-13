import React from 'react';

import { css } from '@emotion/core';

/** Components */
import MainLayout from '../components/layouts/MainLayout';  

/** Style Components */
import { Form, Field, Button } from '../components/ui/Form';

/** Hooks */
import useValidateForm from '../hooks/useValidateForm';

/** Reglas de Validación */
import validateCreateAccount from '../validations/create-account'

/** Define estructura de datos del componente */
const STATE = {
    name: '',
    email: '',
    password: ''
};

/** Component */
const CreateAccount = () => {

    const /** Implementa Hook de Validación */
        {
            dataForm, errors, submit,       // States definidos en el Hook
            handleChange, handleSubmit      // Funciones definidas en el Hook
        } = useValidateForm( 
            STATE,                  // State inicial para el componente
            validateCreateAccount,  // Reglas de validación para el componente
            createAccount           // Funcion que se ejecutará si la validación es exitosa
        );

    function createAccount() {
        console .log( `Crea cuenta` );
    }

    return (
        <MainLayout>
            <h1
                css={ css `
                    text-align: center;
                    margin-top: 5rem; 
                `}
            >Crear Cuenta</h1>
            <Form>
                <Field>
                    <label htmlFor="name">Nombre</label>
                    <input 
                        type="text"
                        id="name"
                        placeholder="Nombre de pila"
                        name="name"
                    />
                </Field>
                <Field>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email"
                        id="email"
                        placeholder="Correo Electrónico"
                        name="email"
                    />
                </Field>
                <Field>
                    <label htmlFor="name">Contraseña</label>
                    <input 
                        type="password"
                        id="password"
                        placeholder="Una clave de acceso"
                        name="password"
                    />
                </Field>
                <Field>
                    <Button 
                        type="button"
                    >Crear Cuenta</Button>
                </Field>
            </Form>
        </MainLayout>
    )
}

export default CreateAccount;