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

const Us = () => {
  return (
    <div className="container">
        <MainLayout>
            <Heading>
                Nosotros
            </Heading>
        </MainLayout>
    </div>
  )
}

export default Us;