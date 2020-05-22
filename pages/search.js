import React from 'react';
import { useRouter } from 'next/router';

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

/** Component */
const Search = () => {

    const router = useRouter();
    console .log( 'Router', router );

    return (
        <MainLayout>
            <Heading>
                Buscar
            </Heading>
        </MainLayout>
    )
}

export default Search;