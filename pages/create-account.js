import React from 'react';

import { css } from '@emotion/core';

/** Components */
import MainLayout from '../components/layouts/MainLayout';  

/** Style Components */
import { Form, Field, Button } from '../components/ui/Form';

const CreateAccount = () => {
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