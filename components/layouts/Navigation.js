import React from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';

/** Define Style Component */
const Nav = styled .nav `
    padding-left: 2rem;

    a {
        color: var( --gray-two )
        font-family: 'PT Sans', sans-serif;
        font-size: 1.8rem;
        margin-left: 2rem;

        &:last-of-type {
            margin-right: 0;
        }
    }
`;

/** Define Component */
const Navigation = () => {
    return( 
        <Nav>
            <Link href="/"><a>Inicio</a></Link>
            <Link href="/popular"><a>Populares</a></Link>
            <Link href="/new-product"><a>Nuevo Producto</a></Link>
        </Nav>
    );
}

export default Navigation;