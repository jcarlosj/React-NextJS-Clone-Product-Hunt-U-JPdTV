import React from 'react';
import styled from '@emotion/styled';                       // Dependency
import MainLayout from '../components/layouts/MainLayout';  // Component

/** Define Style Components */
const Heading = styled .h1 `
    background-color: orange;
    color: white;
    margin: 0;
    padding: .5rem 1rem;
    text-align: center;
`;

const CreateAccount = () => {
    return (
        <MainLayout>
            <Heading>
                Crear Cuenta
            </Heading>
        </MainLayout>
    )
}

export default CreateAccount;